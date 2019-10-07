<template>
  <div>
    <router-link to="/">ホームへ</router-link>
    <hr>
    <div id="main">
      <div id="sample">
        <OcvfButton
            v-for="process in processDefinitions"
            :name="process.name"
            :label="process.label"
            :icon-label="process.icon"
            @click="addBlock"
        >
          {{process.label}}
        </OcvfButton>
      </div>


      <svg id="svg-canvas" @pointermove="onPointerMove" @pointerup="stopDrag" @pointerdown="onPointerDown">
        <!--<OcvfTile :icon-label="iconLabel" :x="10" :y="10" @blockSelected="startDragBlock"/>-->
        <!--<OcvfTile v-for="block in blocks" :block-id="block.blockId" :icon-label="block.iconLabel" :x="block.x" :y="block.y" @blockSelected="startDragBlock"/>-->
        <OcvfBlock
            v-for="block in blocks"
            :block-id="block.blockId"
            :icon-label="block.iconLabel"
            :x="block.x" :y="block.y"
            :dragging="dragging"
            @blockSelected="startDragBlock"
            @addLink="addLink"
            @removeBlock="removeBlock"
        />
        <OcvfLink
            v-for="link in links"
            :link-info="link"
            @removeLink="removeLink"
        >
        </OcvfLink>

      </svg>
    </div>
  </div>
</template>

<script>
  // 参考 http://hashrock.hatenablog.com/entry/2017/12/04/215559
  // https://github.com/hashrock-sandbox/study-vue-touch-ui-svg
  // ベジエ曲線上を動かす
  // https://liginc.co.jp/web/html-css/html/154217

  import OcvfButton from './atoms2/OcvfButton'
  import OcvfBlock from "./moleculesSVG/OcvfBlock"
  import OcvfLink from "./moleculesSVG/OcvfLink"
  import {processDefinitions} from "../../main/definitions"
  import closestPoint from "../../main/line";

  export default {
    name: "SvgCanvas",

    components: {
      OcvfButton,
      OcvfBlock,
      OcvfLink
    },

    data: function () {
      return {
        dragging: "none",
        linkIdsAttachingBlock: {}, // BlockのSidebarに対してlinkは1対多の関係
        processDefinitions: processDefinitions,
        selectedBlockId: 0,
        selectedLinkId: 0,
        selectedPointType: "",
        linkPointType: "",
        links: [],
        dragOffset: {
          x: 0,
          y: 0
        },
      }
    },


    computed: {
      blocks: function () {
        return this.$store.state.blocks
      },
      selectedLink: function () {
        return this.links.find(link => link.id === this.selectedLinkId)
      }
    },

    methods: {
      removeLink: function(linkId) {
        let index = this.links.findIndex(link => link.id === linkId)
        if(index >= 0) {
          this.links.splice(index, 1)
        }
      },

      existSameLink: function(){
        // 同じBlockをつなぐリンクがすでに生成されているか
        let leftBarBlockId = this.selectedLink.leftBarPoint.blockId;
        let rightBarBlockId = this.selectedLink.rightBarPoint.blockId;
        let sameLinks = this.links.filter((link) => {
          return link.leftBarPoint.blockId === leftBarBlockId & link.rightBarPoint.blockId === rightBarBlockId
        })
        return sameLinks.length > 1
      },

      addBlock: function (ev) {
        // const name = ev.currentTarget.getAttribute('name')
        // const label = ev.currentTarget.getAttribute('label')
        const iconLabel = ev.currentTarget.getAttribute('icon-label')
        const nextLabelId = this.$store.getters.getNextBlockId;

        const block = {blockId: nextLabelId, iconLabel: iconLabel, x: 50, y: 50}
        this.$store.commit('addBlock', block)

      },

      removeBlock: function(ev, blockId){
        // blockに紐づくLinkを消去
        let rLinkId = this.linkIdsAttachingBlock[blockId].rightSideBar.id
        let lLinkId = this.linkIdsAttachingBlock[blockId].leftSideBar.id
        this.removeLink(rLinkId)
        this.removeLink(lLinkId)

        // blockを消去
        this.$store.commit('removeBlock', blockId)
      },

      startDragBlock: function (ev, blockId, blockX, blockY) {
        if (this.dragging === "drawingPath") this.removeLink(this.selectedLinkId)

        this.dragging = "move";
        this.selectedBlockId = blockId;

        this.$nextTick(() => {
          //ページ左上とオブジェクト左上の差分から、ドラッグ開始位置（オブジェクト相対座標）を取得
          this.dragOffset.x = ev.offsetX - blockX;
          this.dragOffset.y = ev.offsetY - blockY;
        });

      },

      onPointerMove(ev) {
        console.log("dragging: ", this.dragging)
        if (this.dragging === "move") {
          //差分値を基点に反映
          let x = ev.offsetX - this.dragOffset.x;
          let y = ev.offsetY - this.dragOffset.y;
          // selectedBlockの x, yを取得
          let block = this.$store.getters.getBlock(this.selectedBlockId)
          // 今回のx, yとの差分をとる
          // 差分をpoint, pathに反映
          let diffX = x - block.x
          let diffY = y - block.y

          this.$store.commit('updateBlockPosition', {blockId: this.selectedBlockId, x: x, y: y})


          // TODO: linkも同時にずらす
          this.selectedLinkId =  this.linkIdsAttachingBlock[this.selectedBlockId].leftSideBar.id
          let pathEdge = this.linkIdsAttachingBlock[this.selectedBlockId].leftSideBar.pathEdge
          if(this.selectedLink){
            let nowX = this.selectedLink.leftBarPoint.x
            let nowY = this.selectedLink.leftBarPoint.y
            this.selectedLink[pathEdge].x = nowX + diffX
            this.selectedLink[pathEdge].y = nowY + diffY
            this.selectedLink.leftBarPoint.x = nowX + diffX
            this.selectedLink.leftBarPoint.y = nowY + diffY
          }

          this.selectedLinkId = this.linkIdsAttachingBlock[this.selectedBlockId].rightSideBar.id
          pathEdge = this.linkIdsAttachingBlock[this.selectedBlockId].rightSideBar.pathEdge
          if(this.selectedLink) {
            let nowX = this.selectedLink.rightBarPoint.x
            let nowY = this.selectedLink.rightBarPoint.y
            this.selectedLink[pathEdge].x = nowX + diffX
            this.selectedLink[pathEdge].y = nowY + diffY
            this.selectedLink.rightBarPoint.x = nowX + diffX
            this.selectedLink.rightBarPoint.y = nowY + diffY
          }

        }

        if (this.dragging === "firstPointMove") {
          let pathNode = this.selectedLink[this.selectedPointType].on
          let x = ev.offsetX - this.dragOffset.x;
          let y = ev.offsetY - this.dragOffset.y;
          let posOnBar = closestPoint(pathNode, [x, y])

          this.selectedLink.pathStart.x = posOnBar[0];
          this.selectedLink.pathStart.y = posOnBar[1];
          this.selectedLink[this.selectedPointType].x = posOnBar[0];
          this.selectedLink[this.selectedPointType].y = posOnBar[1];
        }

        if (this.dragging === "drawingPath") {
          let x = ev.offsetX - this.dragOffset.x
          let y = ev.offsetY - this.dragOffset.y
          this.selectedLink.path = true
          // ポインタをpath上からずらしてイベント検知しやすくする
          if(this.selectedLink.pathStart.x < x){
            this.selectedLink.pathEnd.x = x - 3
          } else{
            this.selectedLink.pathEnd.x = x + 3
          }
          this.selectedLink.pathEnd.y = y
        }

        if (this.dragging === "secondPointMove"){
          let pathNode = this.selectedLink[this.selectedPointType].on
          let x = ev.offsetX - this.dragOffset.x;
          let y = ev.offsetY - this.dragOffset.y;
          let posOnBar = closestPoint(pathNode, [x, y])

          this.selectedLink.pathEnd.x = posOnBar[0];
          this.selectedLink.pathEnd.y = posOnBar[1];
          this.selectedLink[this.selectedPointType].x = posOnBar[0];
          this.selectedLink[this.selectedPointType].y = posOnBar[1];
        }

      },

      onPointerDown(ev){
        // キャンバス上のなにもない部分を押したとき、作成中のリンクを消す
        if (this.dragging === "drawingPath") this.removeLink(this.selectedLinkId)
      },

      stopDrag(ev) {
        console.log("drag End!")
        if (this.dragging === "firstPointMove") {
          this.dragging = "drawingPath";
        } else if (this.dragging !== "none") {
          this.dragging = "none";
        }

        this.selectedBlockId = "";
      },

      addLink(ev, point) {
        if(this.dragging === "drawingPath"){
          if(this.selectedPointType === point.pointType){
            // サイドバーの種類が同じ場合、linkを消す
            this.selectedPointType = ""
            this.removeLink(this.selectedLinkId)

          } else{
            this.selectedPointType = point.pointType
            this.selectedLink[this.selectedPointType].blockId = point.blockId

            // 同じブロックの場合、リンクを消す
            if(this.selectedLink.leftBarPoint.blockId === this.selectedLink.rightBarPoint.blockId){
              // linkを消す
              this.selectedPointType = ""
              this.removeLink(this.selectedLinkId)
              return
            }

            // すでに同じリンクが生成されている場合、リンクを消す
            if(this.existSameLink()){
              this.selectedPointType = ""
              this.removeLink(this.selectedLinkId)
              return
            }

            // TODO: ループが形成されてしまう場合、リンクを消す

            this.selectedPointType = point.pointType
            this.dragging = "secondPointMove"

            this.selectedLink[this.selectedPointType].x = point.x
            this.selectedLink[this.selectedPointType].y = point.y
            this.selectedLink[this.selectedPointType].on = point.on
            this.selectedLink[this.selectedPointType].display = true

            let linkIdsForPreviousBlock = {
              leftSideBar: {
                id: 0,
                pathEdge: ''
              },
              rightSideBar: {
                id: this.selectedLinkId,
                pathEdge: ''
              }
            }

            let linkIdsForNextBlock = {
              leftSideBar: {
                id: this.selectedLinkId,
                pathEdge: ''
              },
              rightSideBar: {
                id: 0,
                pathEdge: ''
              }
            }

            if(this.selectedPointType === 'leftBarPoint'){
              linkIdsForPreviousBlock.rightSideBar.pathEdge = 'pathStart'
              linkIdsForNextBlock.leftSideBar.pathEdge = 'pathEnd'
            } else {
              linkIdsForPreviousBlock.rightSideBar.pathEdge = 'pathEnd'
              linkIdsForNextBlock.leftSideBar.pathEdge = 'pathStart'
            }


            if(this.linkIdsAttachingBlock[this.selectedLink.rightBarPoint.blockId]){
              this.linkIdsAttachingBlock[this.selectedLink.rightBarPoint.blockId].rightSideBar.id
                = this.selectedLinkId

              if(this.selectedPointType === 'leftBarPoint'){
                this.linkIdsAttachingBlock[this.selectedLink.rightBarPoint.blockId].rightSideBar.pathEdge
                  = 'pathStart'
              } else {
                this.linkIdsAttachingBlock[this.selectedLink.rightBarPoint.blockId].rightSideBar.pathEdge
                  = 'pathEnd'
              }

            } else{
              this.linkIdsAttachingBlock[this.selectedLink.rightBarPoint.blockId] = linkIdsForPreviousBlock
            }

            if(this.linkIdsAttachingBlock[this.selectedLink.leftBarPoint.blockId]){
              this.linkIdsAttachingBlock[this.selectedLink.leftBarPoint.blockId].leftSideBar.id
                = this.selectedLinkId

              if(this.selectedPointType === 'leftBarPoint'){
                this.linkIdsAttachingBlock[this.selectedLink.leftBarPoint.blockId].leftSideBar.pathEdge
                  = 'pathEnd'
              } else {
                this.linkIdsAttachingBlock[this.selectedLink.leftBarPoint.blockId].leftSideBar.pathEdge
                  = 'pathStart'
              }

            } else {
              this.linkIdsAttachingBlock[this.selectedLink.leftBarPoint.blockId] = linkIdsForNextBlock
            }

          }
          return
        }

        const link = {
          id: this.$store.getters.getNextLinkId,
          pointType: point.pointType,
          path: false,
          leftBarPoint: {x: 0, y: 0, on: "", display: false, blockId: 0},
          rightBarPoint: {x: 0, y: 0, on: "", display: false, blockId: 0},
          pathStart: {x: 0, y: 0},
          pathEnd: {x: 0, y: 0},
        }

        link[point.pointType].x = point.x
        link[point.pointType].y = point.y
        link.pathStart.x        = point.x
        link.pathStart.y        = point.y
        link.pathEnd.x        = point.x
        link.pathEnd.y        = point.y
        link[point.pointType].blockId = point.blockId
        link[point.pointType].on = point.on // sidebarの要素
        link[point.pointType].display = true

        this.$store.commit('incrementNextLinkId')
        this.dragging = "firstPointMove"
        this.links.push(link)
        this.selectedLinkId = link.id
        this.selectedPointType = point.pointType

        this.$nextTick(() => {
          //ページ左上とオブジェクト左上の差分から、ドラッグ開始位置（オブジェクト相対座標）を取得
          this.dragOffset.x = ev.offsetX - point.x;
          this.dragOffset.y = ev.offsetY - point.y;
        });

      }

    }

  }
</script>

<style scoped>
  #main {
    display: flex;
  }

  #sample {
    width: 200px;
    border: solid #444444;
    border-width: 0px 1px 0em 0px;
  }

  #svg-canvas {
    width: 800px;
    height: 800px;
  }

</style>
