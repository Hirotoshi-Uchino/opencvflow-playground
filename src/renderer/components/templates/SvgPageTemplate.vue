<template>
  <div class="window">
    <div class="window-content">
      <ProcessSelector
          :process-definitions="processDefinitions"
          @addBlock="addBlock"
      />
      <div id="main" class="pane">
        <SvgCanvas id="canvas"/>
        <ResultPreview id="preview"/>
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
          parameters: process.parameters
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
