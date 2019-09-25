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
            :icon-label="process.icon"
            @click="addBlock"
        >
          {{process.label}}
        </OcvfButton>
      </div>

      <div id="canvas" ref="canvas">
        <!--<OcvfBlock-->
            <!--v-for="(block, index) in blocks"-->
            <!--:id="block.blockId"-->
            <!--:icon-label="block.iconLabel"-->
            <!--@rightClick="removeBlock(block.blockId)"-->
        <!--/>-->
      </div>
    </div>
    <!--<OcvfContextMenu ref="ctxMenu"></OcvfContextMenu>-->
  </div>
</template>

<script>
  import $ from "jquery";
  import Vue from 'vue';
  import OcvfButton from './atoms2/OcvfButton'
  import OcvfBlock from './atoms2/OcvfBlock'
  // import vDragDrop from 'v-drag-drop';
  //
  // Vue.use(vDragDrop);

  let vm = {};

  let processDefinitions = [
    // '二値化', 'ガウシアンフィルタ'
    {
      id: 1,
      label: 'グレースケール',
      name: 'GrayScale',
      icon: 'GS'
    },
    {
      id: 2,
      label: '二値化',
      name: 'Binarization',
      icon: 'Bi'
    },
    {
      id: 3,
      label: 'ガウシアンフィルタ',
      name: 'GaussianFilter',
      icon: 'GF'
    },
    {
      id: 4,
      label: 'プーリング',
      name: 'Pooling',
      icon: 'Po'
    }
  ]


  let OcvfBlockComp = Vue.extend(OcvfBlock)

  // let OcvfBlockComp2 = Vue.component(OcvfBlock)

  export default {
    name: "KonvaDragDropPage",
    // components: {OcvfButton, OcvfBlock, OcvfContextMenu, VueContext},
    components: {OcvfButton, OcvfBlock},
    display: "Simple",
    // directives: {
    //   drag
    // },
    order: 0,
    data() {
      return {
        // blocks: [],
        processDefinitions: processDefinitions

      };
    },
    // computed: {
    //   blocks: function () {
    //     console.log('ああああああああああああ')
    //     return this.$store.state.blocks
    //   },
    // },
    methods: {

      addBlock(e) {
        // e.currentTarget.__vue__.process.id こういう参照方法もある
        const name = e.currentTarget.getAttribute('name')
        const label = e.currentTarget.getAttribute('label')
        const iconLabel = e.currentTarget.getAttribute('icon-label')

        const nextLabelId = this.$store.getters.getNextBlockId;
        // const nextLabelId = store.getters.getNextBlockId;

        console.log('nextLabelId = ', nextLabelId)
        console.log('button name = ', name)
        console.log('button label = ', label)

        const block = {blockId: nextLabelId, name: name, label: label, iconLabel: iconLabel}

        this.$store.commit('addBlock', block)
        // store.commit('addBlock', block)

        // https://stackoverflow.com/questions/44463984/using-vuex-inside-a-manually-mounted-vue-component
        let instance = new OcvfBlockComp({
          store: vm.$store,
          propsData: {
            iconLabel: iconLabel,
            blockId: String(nextLabelId)
          },
        })
        instance.$mount()

        this.$refs.canvas.appendChild(instance.$el)
        // let blockComponent = '<OcvfBlock :id="' + block.blockId + '" :icon-label="' + block.iconLabel + '" @rightClick="removeBlock(' + block.blockId + ')" />'

        // console.log(blockComponent)
        // let a = '<div>aaa</div>'
        // $('#canvas').append(blockComponent)
        // console.log($('.v-btn__content').length)

      },
      // removeBlock(index) {
      //   $('#' + index).remove()
      //   console.log('index: ', index)
      //   this.$store.commit('removeBlock', index)
      // },

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
    /*height: 500px;*/
    border: solid #444444;
    border-width: 0px 1px 0em 0px;
  }

  #canvas {
    width: 800px;
    height: 800px;
    position: relative;
  }

  /*#red-box{*/
  /*cursor: pointer;*/
  /*text-align: center;*/
  /*margin: 0 auto;*/
  /*line-height: 42px;*/
  /*font-size: 24px;*/
  /*width: 50px;*/
  /*height: 50px;*/
  /*background-color: #f0f8ff;*/
  /*border-radius: 5px;*/
  /*border: solid 3px #444444;*/
  /*}*/

  /*OcvfBlock {*/
  /*cursor: pointer;*/
  /*}*/

</style>
<!--参考-->
<!--■ appendChild-->
<!--https://css-tricks.com/creating-vue-js-component-instances-programmatically/-->
