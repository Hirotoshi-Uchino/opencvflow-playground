<template>
  <div>
    <router-link to="/">ホームへ</router-link>
    <br>
    <hr>
    <div id="main">
      <div id="sample">
        <OcvfButton
            v-for="process in processDefinitions"
            :name="process.name"
            :label="process.label"
            @click="addBlock"
        >
          {{process.label}}
        </OcvfButton>
        <!--<div>-->
          <!--<p @contextmenu.prevent="$refs.menu.open">-->
            <!--Right click on me-->
          <!--</p>-->
        <!--</div>-->
        <!--<vue-context ref="menu">-->
          <!--<li>-->
            <!--<a href="#" @click.prevent="onClick($event.target.innerText)">Option 1</a>-->
          <!--</li>-->
          <!--<li>-->
            <!--<a href="#" @click.prevent="onClick($event.target.innerText)">Option 2</a>-->
          <!--</li>-->
        <!--</vue-context>-->

      </div>
      <div>
      <v-stage
          id="canvas"
          ref="stage"
          :config="configKonva"
          @dragstart="handleDragstart"
          @dragend="handleDragend"
      >
        <v-layer ref="layer">
          <CustomBlock
              :text-label="text"
          />
          <!--v-for="(block, id) in blocks"-->
          <!--<OcvfBlock-->
              <!--v-for="block in blocks"-->
              <!--:text-label="block.label"-->
              <!--@rightClick="removeBlock"-->
          <!--/>-->


        </v-layer>

        <v-layer ref="dragLayer"></v-layer>
      </v-stage>
      </div>
    </div>
    <!--<OcvfContextMenu ref="ctxMenu"></OcvfContextMenu>-->
  </div>
</template>

<script>

  import Vue from 'vue';
  import VueKonva from 'vue-konva';
  import OcvfButton from './atoms/OcvfButton'
  import OcvfBlock from './atoms/OcvfBlock'
  import CustomBlock from './atoms/CustomBlock'
  import OcvfContextMenu from './atoms/OcvfContextMenu'
  // import {VueContext} from 'vue-context';


  Vue.use(VueKonva);

  const width = window.innerWidth - 200;
  const height = window.innerHeight;
  let vm = {};

  let processDefinitions = [
    // '二値化', 'ガウシアンフィルタ'
    {
      id: 1,
      label: '二値化',
      name: 'Binarization'
    },
    {
      id: 2,
      label: 'ガウシアンフィルタ',
      name: 'GaussianFilter'
    }
  ]


  export default {
    name: "KonvaDragDropPage",
    // components: {OcvfButton, OcvfBlock, OcvfContextMenu, VueContext},
    components: {OcvfButton, OcvfBlock, OcvfContextMenu, CustomBlock},
    display: "Simple",
    order: 0,
    data() {
      return {
        // blocks: [],
        configKonva: {
          width: width,
          height: height
        },
        processDefinitions: processDefinitions,
        text: "TEST"
      };
    },
    computed: {
      blocks: function () {
        console.log('ああああああああああああ')
        return this.$store.state.blocks
      },
    },
    methods: {

      handleDragstart(e) {
        const shape = e.target;
        const dragLayer = vm.$refs.dragLayer.getNode();
        const stage = vm.$refs.stage.getNode();
        // moving to another layer will improve dragging performance
        shape.moveTo(dragLayer);
        stage.draw();
        shape.setAttrs({
          shadowOffsetX: 15,
          shadowOffsetY: 15,
          // scaleX: shape.getAttr("startScale") * 1.2,
          // scaleY: shape.getAttr("startScale") * 1.2
        });
      },
      handleDragend(e) {
        const shape = e.target;
        const layer = vm.$refs.layer.getNode();
        const stage = vm.$refs.stage.getNode();
        shape.moveTo(layer);
        stage.draw();
        shape.to({
          duration: 0.5,
          easing: Konva.Easings.ElasticEaseOut,
          // scaleX: shape.getAttr("startScale"),
          // scaleY: shape.getAttr("startScale"),
          shadowOffsetX: 5,
          shadowOffsetY: 5
        });
      },
      addBlock(e) {
        // e.currentTarget.__vue__.process.id こういう参照方法もある
        const name = e.currentTarget.getAttribute('name')
        const label = e.currentTarget.getAttribute('label')
        const nextLabelId = this.$store.getters.getNextBlockId;

        console.log('nextLabelId = ', nextLabelId)
        console.log('button name = ', name)
        console.log('button label = ', label)

        const block = {blockId: nextLabelId, name: name, label: label}

        this.$store.commit('addBlock', block)
        // this.$store.commit('incrementNextBlockId');
        // this.blocks.push(block)

      },
      removeBlock(e) {
        this.$store.commit('removeBlock', 1)
      },
      openMenu(e) {
        // vm.$refs.ctxMenu.open
        console.log('メニューを開くよ')
      },
      onClick(text) {
        alert(`You clicked ${text}!`);
      }
    },

    mounted() {
      vm = this;

    }
  };

  // 参考
  // https://codesandbox.io/s/9j1zp

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

  OcvfBlock {
    cursor: pointer;
  }

</style>
