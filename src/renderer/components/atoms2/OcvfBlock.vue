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
    {{iconLabel}}
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
    }

  }
</script>

<style scoped>
  .ocvf-block {
    position: absolute;
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

  v-label {
    user-select: none;
  }
</style>

<!--参考-->
<!--https://github.com/branu-ws/v-drag-->
<!--https://github.com/Esvalirion/vue-drag-it-dude-->
