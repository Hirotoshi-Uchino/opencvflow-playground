<template>
  <div class="window">
    <!--<header class="toolbar toolbar-header">-->
      <!--<h1 class="title">Header</h1>-->
    <!--</header>-->
    <!--<router-link to="/">ホームへ</router-link>-->
    <!--<hr>-->
    <div class="window-content">
      <ProcessSelector
          :process-definitions="processDefinitions"
          @addBlock="addBlock"
      />
      <!--<div id="process-selector" class="pane-sm sidebar">-->
        <!--<ProcessSelectorButtons-->
            <!--:process-definitions="processDefinitions"-->
            <!--@addBlock="addBlock"-->
        <!--/>-->
        <!--<div class="pane">-->
        <!--<nav class="nav-group">-->
          <!--<h5 class="nav-group-title">処理を選択</h5>-->
          <!--<a class="nav-group-item">-->
            <!--<span class="icon icon-upload"></span>-->
            <!--画像ファイル入力-->
          <!--</a>-->
          <!--<a class="nav-group-item">-->
            <!--<span class="icon icon-picture"></span>-->
            <!--二値化-->
          <!--</a>-->
          <!--<h5 class="nav-group-title">その他</h5>-->
          <!--<a class="nav-group-item" href="/">ホームへ</a>-->
        <!--</nav>-->
      <!--</div>-->

      <div id="main" class="pane">
        <div id="canvas">
          <SvgCanvas />
        </div>

        <div id="preview">
          <ResultPreview />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProcessSelector from "../organisms/ProcessSelector"
  import ProcessSelectorButtons from "../organisms/ProcessSelectorButtons"
  import SvgCanvas from "../organisms/SvgCanvas"
  import ResultPreview from "../organisms/ResultPreview"
  import {processDefinitions} from "../../../main/definitions"

  export default {
    name: "SvgPage",

    components: {
      ProcessSelector,
      ProcessSelectorButtons,
      SvgCanvas,
      ResultPreview
    },

    data: function () {
      return {
        processDefinitions: processDefinitions,
      }
    },

    methods: {
      addBlock: function (processId) {
        const process = this.processDefinitions.find(process => process.processId === processId)
        const nextLabelId = this.$store.getters.getNextBlockId;
        const block = {
          blockId: nextLabelId,
          iconLabel: process.icon,
          x: 100,
          y: 100,
          execButton: false,
          processId: processId,
          linksToNextBlock: [],
          parameters: {}
        }
        this.$store.commit('addBlock', block)

      },

    }

  }
</script>

<style scoped>
  #process-selector {
    /*width: 200px;*/
    /*border: solid #444444;*/
    /*border-width: 0px 1px 0em 0px;*/
    height: 800px;
  }

  #canvas{
    width: 800px;
    height: 800px;
    border: solid #444444;
    border-width: 0px 1px 0px 0px;
  }

  #preview{
    width: 400px;
    height: 800px;
  }

  #main {
    display: flex;
  }

</style>
