<template>
  <dialog
      :process-id="processId"
      :block-id="blockId"
  >
    <!--:parameters="parameters"-->
    <form method="dialog">
      <header class="toolbar toolbar-header">
        <h1 class="title">Parameter Settings</h1>
      </header>

      <!--<div id="input-area">-->
      <div id="detail-process-select">
        <span>select process</span>
        <select class="form-control">
          <option v-for="(value, key) in settingParameters">
            {{key}}
          </option>
        </select>
      </div>

      <!--</div>-->

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

    props: {
      // parameters:{
      //   type: Object
      // },
      processId: {
        type: Number,
        default: 2
      },
      blockId: {
        type: Number
      }
    },

    computed: {
      settingParameters: function(){
        let processName = processDefinitions.find(process => process.processId === this.processId).name
        // if(processName.hasOwnProperty('name')){
        //
        // } else{
        //
        // }
        return settingDefinitions[processName]
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
      }

    },

  }
</script>

<style scoped>

  #detail-process-select{
    width: 90%;
    margin: auto;
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
