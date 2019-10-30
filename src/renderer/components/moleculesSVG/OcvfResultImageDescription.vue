<template>
  <div>
    <div class="process-label" @click="downloadImage">
      <span class="icon icon-download"></span>
      <span style="margin-left: 5px">{{processLabel}}</span>
    </div>
    <div v-for="(value, key) in detailParameters" class="parameter-label">
      {{key}}: {{value}}
    </div>
  </div>
</template>

<script>
  import {processDefinitions} from '../../configs/processDefinitions'

  export default {
    name: "OcvfResultImageDescription",

    props:{
      blockId: {
        type: Number
      }
    },

    computed: {
      processLabel: function(){
        let block = this.$store.getters.getBlock(this.blockId)
        let processId = block.processId

        let processName = processDefinitions.find(process => process.processId === processId).name

        let parameters  = block.parameters
        let detailProcess = parameters.detailProcess
        if(detailProcess){
          return processName + ' - ' + detailProcess
        } else{
          return processName
        }

      },

      detailParameters: function () {
        let block = this.$store.getters.getBlock(this.blockId)
        console.log('hoge')

        let parameters  = block.parameters
        return parameters.detailParameters
      },

    },

    methods:{
      downloadImage: function(){
        console.log("download Image.")
      }

    }
  }
</script>

<style scoped>
  .process-label{
    background-color: #FCFDD4;
    border: solid #dddddd;
    border-width: 1px 0px 1px 0px;
  }

  .process-label:active{
    background-color: #F3F5A9;
  }

  .process-label .icon{
    margin-left: 5%;
  }

  .process-label span{
    font-weight: bold;
    font-size: 15px;
  }

  .parameter-label{
    width: 90%;
    margin-left: 5%;
    font-weight: bold;
  }

  hr{
    margin-top: 0px;
    margin-bottom: 0px;
  }

</style>
