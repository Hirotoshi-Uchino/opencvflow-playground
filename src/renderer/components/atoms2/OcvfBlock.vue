<template>
  <!--<v-label :config="labelConfig" @click.right="handleRightClick">-->
  <!--&lt;!&ndash;<v-label :config="labelConfig">&ndash;&gt;-->
  <!--<v-tag :config="tagConfig" />-->
  <!--<v-text :config="textConfig" :text-label="textLabel"/>-->
  <!--</v-label>-->

  <!--<drag-it-dude-->
      <!--:id="blockId"-->
      <!--class="ocvf-block"-->
      <!--:icon-label="iconLabel"-->
      <!--@click.right="handleRightClick"-->
      <!--@mouseover="hoge"-->
  <!--&gt;-->
    <!--&lt;!&ndash;v-drag&ndash;&gt;-->
    <!--{{iconLabel}}-->
  <!--</drag-it-dude>-->

  <div v-draggable
       :id="blockId"
       class="ocvf-block"
       :icon-label="iconLabel"
       @click.right="handleRightClick"
       v-drag
  >
    <div class="ocvf-block-left" @click="createPoint"></div>
    <div class="ocvf-block-inside">
    {{iconLabel}}
    </div>
    <div class="ocvf-block-right"  @click="createPoint"></div>
  </div>


  <!--<div-->
  <!--:id="blockId"-->
  <!--class="ocvf-block"-->
  <!--:icon-label="iconLabel"-->
  <!--@click.right="handleRightClick"-->
  <!--v-drag-->
  <!--&gt;-->
  <!--{{iconLabel}}-->
  <!--</div>-->
</template>

<script>
  import Vue from 'vue';
  // import vDragDrop from 'v-drag-drop';
  // Vue.use(vDragDrop);
  import $ from "jquery";
  import {Draggable} from 'draggable-vue-directive'
  import DragItDude from "vue-drag-it-dude";
  import drag from '@branu-jp/v-drag'

  export default {
    name: "OcvfBlock",

    components: {DragItDude},

    directives: {
      Draggable,
      drag
    },
    // data: function () {
    //   return {
    //     labelConfig: {
    //       x: 170,
    //       y: 75,
    //       opacity: 0.75,
    //       draggable: true
    //     },
    //     tagConfig: {
    //       stroke: '#555',
    //       strokeWidth: 5,
    //       fill: '#ddd',
    //       lineJoin: 'round',
    //       shadowColor: 'black',
    //       shadowBlur: 10,
    //       shadowOffset: 10,
    //       shadowOpacity: 0.5,
    //       cornerRadius: 10,
    //     },
    //     textConfig: {
    //       text: this.textLabel,
    //       fontSize: 20,
    //       fontWeight: 'bold',
    //       padding: 10,
    //       stroke: 'black',
    //       strokeWidth: 1,
    //     },
    //   }
    // },

    props: {
      // textLabel: {
      //   type: String,
      //   default: ''
      // },
      blockId: {
        type: String,
        default: ''
      },
      iconLabel: {
        type: String,
        default: ''
      }
    },

    methods: {
      handleRightClick: function (ev) {
        console.log('右クリック!')

        let blockId = ev.currentTarget.id;

        $('#' + blockId).remove()
        console.log('index: ', blockId)
        this.$store.commit('removeBlock', blockId)

        // this.$storeは、コンポーネントをextendしてnew した場合だと使えない
        // storeをマウントするには...？
        // this.$emit('rightClick', ev)
      },

      createPoint: function (ev) {
        // 左borderを仮定
        // この要素にまずは点を打ちたい
        // click: 点を打つ, drag: border内での点の移動
        // 離す: 線描画開始
        // 再度クリック
        //  if: right border
        //     線をリンク
        //     離すまでborder内で点を移動できる
        //  else: 点&線消す

        // point&lineはocvf-blockにbindされる...?

      }
    }

  }
</script>

<style scoped>
  .ocvf-block {
    position: absolute;
    display: flex;
  }


  .ocvf-block-inside {
    /*position: absolute;*/
    cursor: pointer;
    text-align: center;
    margin: 0 auto;
    line-height: 42px;
    font-size: 24px;
    width: 50px;
    height: 50px;
    background-color: #f0f8ff;
    border-radius: 5px;
    border: solid 3px #444444;
  }


  .ocvf-block-left{
    cursor: pointer;
    margin-right: 4px;
    border-left: solid 2px black;
  }

  .ocvf-block-right{
    cursor: pointer;
    margin-left: 4px;
    border-right: solid 2px black;
  }


</style>

<!--参考-->
<!--https://github.com/branu-ws/v-drag-->
<!--https://github.com/Esvalirion/vue-drag-it-dude-->
