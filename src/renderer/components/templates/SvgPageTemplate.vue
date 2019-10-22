<template>
  <div class="window">
    <div class="window-content">
      <ProcessSelector
          :process-definitions="processDefinitions"
          @addBlock="addBlock"
      />
      <div id="main" class="pane">
        <SvgCanvas
            id="canvas"
            @execPipeline="execPipeline"
        />
        <ResultPreview
            id="preview"
        />
      </div>

    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {ipcRenderer} from 'electron'
  import ProcessSelector from "../organisms/ProcessSelector"
  import ProcessSelectorButtons from "../organisms/ProcessSelectorButtons"
  import SvgCanvas from "../organisms/SvgCanvas"
  import ResultPreview from "../organisms/ResultPreview"
  import {processDefinitions} from "../../configs/processDefinitions"
  import settingDefinitions from "../../configs/settingDefinitions"

  let extReg=/(.*)(?:\.([^.]+$))/;
  let vm;

  ipcRenderer.on('reply', function(ev, result){
    console.log(result)
    vm.$store.commit('setPipelineResult', result[0].resultList)
  })

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
        const nextLabelId = this.$store.getters.getNextBlockId
        const block = {
          blockId: nextLabelId,
          iconLabel: process.icon,
          x: 100,
          y: 100,
          execButton: false,
          processId: processId,
          linksToNextBlock: [],
          parameters: this.getDefaultParameters(processId)
        }
        this.$store.commit('addBlock', block)

      },

      getDefaultParameters: function (processId) {
        if (processId === 0) {
          console.log(settingDefinitions.Input)
          // settingDefinitionsからの参照を切って初期化しないと勝手に書き換えられる可能性あり
          return Vue.util.extend({}, settingDefinitions.Input)

        } else {
          let processName = processDefinitions.find(process => process.processId === processId).name
          let settingParameters = Vue.util.extend({}, settingDefinitions[processName])
          let processDetail = Object.keys(settingParameters)[0] // Binarization なら Binary

          let detailParameters = []
          for (let i in settingParameters[processDetail]) {
            let tmp = {
              paramName: settingParameters[processDetail][i]['paramName'],
              paramDefault: settingParameters[processDetail][i]['paramDefault']
            }
            detailParameters.push(tmp)
          }

          return {
            processDetail: processDetail,
            detailParameters: detailParameters
          }

        }

      },

      execPipeline: function (blockId) {
        vm = this
        let pipeline = this.$store.getters.getPipeline(blockId)

        // ipcRenderer.send('message', 'ping')
        console.log(pipeline)
        console.log(JSON.stringify(pipeline))

        let ext = pipeline.imageFilePath.match(extReg)[2]
        this.$store.commit('setTargetImageExt', ext)
        ipcRenderer.send('message', JSON.stringify(pipeline))
      }

    }
  }
  // }



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
