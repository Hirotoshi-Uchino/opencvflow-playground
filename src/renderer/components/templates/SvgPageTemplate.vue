<template>
  <div>
    <router-link to="/">ホームへ</router-link>
    <hr>
    <div id="main">
      <div id="process-selector">
        <ProcessSelector
            :process-definitions="processDefinitions"
            @addBlock="addBlock"
        />
      </div>

      <div id="canvas">
        <SvgCanvas />
      </div>

      <div id="preview">
        <ResultPreview />
      </div>
    </div>
  </div>
</template>

<script>
  import ProcessSelector from "../organisms/ProcessSelector"
  import SvgCanvas from "../organisms/SvgCanvas"
  import ResultPreview from "../organisms/ResultPreview"
  import {processDefinitions} from "../../../main/definitions"

  export default {
    name: "SvgPage",

    components: {
      ProcessSelector,
      SvgCanvas,
      ResultPreview
    },

    data: function () {
      return {
        processDefinitions: processDefinitions,
      }
    },

    methods: {
      addBlock: function (ev, iconLabel, processId) {
        const nextLabelId = this.$store.getters.getNextBlockId;
        const block = {
          blockId: nextLabelId,
          iconLabel: iconLabel,
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
    width: 200px;
    /*border: solid #444444;*/
    /*border-width: 0px 1px 0em 0px;*/
    height: 800px;
  }

  #canvas{
    width: 800px;
    height: 800px;
    border: solid #444444;
    border-width: 0px 1px 0px 1px;
  }

  #preview{
    width: 400px;
    height: 800px;

  }

  #main {
    display: flex;
  }

</style>
