<template>
  <dialog
      :process-name="processName"
      :block-id="blockId"
  >
    <!--:process-id="processId"-->
    <!--:parameters="parameters"-->
    <form method="dialog">
      <header class="toolbar toolbar-header">
        <h1 class="title">Parameter Settings</h1>
      </header>

      <!--<div id="input-area">-->
      <div id="detail-process-select">
        <div>
          <span>select process of {{processName}}</span>
          <select class="form-control" v-model="nowDetailProcess">
            <option v-for="dp in detailProcesses">
              {{dp}}
            </option>
          </select>
        </div>
        <div id="detail-parameters-setting">
          <div class="detail-parameter" v-for="sp in settingParameters">
            <span>set {{sp.paramName}} {{sp.description}}</span><br>
            <input class="form-control" type="number" :step="sp.step" :value="sp.paramDefault"/>
          </div>
        </div>

      </div>

      <footer class="toolbar toolbar-footer">
        <span class="btn btn-default reset-btn" @click="resetParameters">Reset</span>
        <button class="btn btn-primary pull-right complete-btn" @click="setParametersComplete">OK</button>
      </footer>
    </form>
  </dialog>

</template>

<script>
  import Vue from 'vue'
  import {processDefinitions} from "../../configs/processDefinitions"
  import settingDefinitions from "../../configs/settingDefinitions"


  export default {
    name: "OcvfParameterSettingDialog",

    data: function(){
      return {
        nowDetailProcess: ''
      }
    },

    props: {
      processName:{
        type: String,
        default: 'Binarization'
      },
      // processId: {
      //   type: Number,
      //   default: 2
      // },
      blockId: {
        type: Number
      }
    },

    computed: {
      detailProcesses: function(){
      //   let processName = processDefinitions.find(process => process.processId === this.processId).name

        // TODO: O.K.後に保持しているものがあればそれを使うようにする
        this.nowDetailProcess = Object.keys(settingDefinitions[this.processName])[0]
        return Object.keys(settingDefinitions[this.processName])
        // if(processName.hasOwnProperty('name')){
        //
        // } else{
        //
        // }
        // return settingDefinitions[processName]
      },

      settingParameters: function(){
        // let processName = processDefinitions.find(process => process.processId === this.processId).name
        let parameters = settingDefinitions[this.processName][this.nowDetailProcess]

        return parameters
      }

    },

    methods: {
      setParametersComplete: function(){
        this.setParameters()
        this.$emit('reconstructPipelines') // 無駄が多いがこれがわかりやすいので採用
      },

      setParameters: function(){
        // let copiedFileParameters = Vue.util.extend({}, this.fileParameters)
        // let info = {blockId: this.blockId, parameters: copiedFileParameters}
        // this.$store.commit('setParameters', info)
      },

      resetParameters: function(){
        // for(let i in this.fileParameters){
        //   this.fileParameters[i] = ''
        // }
        // let copiedFileParameters = Vue.util.extend({}, this.fileParameters)
        // let info = {blockId: this.blockId, parameters: copiedFileParameters}
        // this.$store.commit('inputFileParameters', info)
      },
      onSelectorChange: function(){
        console.log('changed')
      }

    },

  }
</script>

<style scoped>

  #detail-process-select{
    width: 90%;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 5%;
    margin-right: 5%;
  }

  #detail-parameters-setting{
    margin-top: 10px;
  }

  .detail-parameter{
    margint-top: 10px;
  }

  select{
    /*width: 10%;*/
    margin: auto;
  }

  dialog {
    width: 250px;
    /*height: 100%;*/
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translate(-50%, 0);
    border: solid 1px #aaa;
    border-radius: 5px;
    box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.3);
  }

  .reset-btn{
    margin: 5px;
  }

  .complete-btn{
    margin: 5px;
  }
</style>
