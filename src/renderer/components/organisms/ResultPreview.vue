<template>
  <div class="result-preview">
    <!--display area.-->
    <div class="title">
      Result Preview
    </div>
    <div v-for="result in resultList">
      <!--<span>{{getProcessParameters(result.blockId)}}</span>-->
      <OcvfResultImageDescription
        class="description"
        :block-id="result.blockId"
      />
      <img :src="addSourcePrefix(result.base64)" />
    </div>
  </div>
</template>

<script>
  import OcvfResultImageDescription from '../moleculesSVG/OcvfResultImageDescription'
  import {processDefinitions} from '../../configs/processDefinitions'

  export default {
    name: "ResultPreview",
    components: {OcvfResultImageDescription},
    computed: {
      resultList: function () {
        return this.$store.state.pipelineResultList
      }
    },

    methods: {
      addSourcePrefix: function(base64){
        let ext = this.$store.state.targetImageExt
        if(ext === 'jpg' || ext === 'jpeg'){
          return 'data:image/jpeg;base64,' + base64
        } else{
          return 'data:image/' + ext +';base64,' + base64
        }
      },

      getProcessParameters: function(blockId){
        let block = this.$store.getters.getBlock(blockId)
        let processId = block.processId

        let processName = processDefinitions.find(process => process.processId === processId).name
        let parameters  = block.parameters

        let detailProcess = parameters.detailProcess
        if(detailProcess){
          return processName + ' - ' + detailProcess
        } else{
          return processName
        }

      }
    }
    // data: function () {
    //   return {
    //     display: false
    //   }
    // },

    // props: {
    //   resultList: {
    //     type: Array
    //   }
    // }
  }
</script>

<style scoped>
  .title{
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    background-color: #f5f5f4;
  }

  .description{
    /*width: 90%;*/
    /*margin-left: 5%;*/
    /*margin-top: 15px;*/
  }

  img {
    width: 90%;
    margin-left: 5%;
    margin-top: 5px;
    margin-bottom: 15px;
  }

  .result-preview{
    /*background-color: #f5f5f4;*/
  }

</style>
