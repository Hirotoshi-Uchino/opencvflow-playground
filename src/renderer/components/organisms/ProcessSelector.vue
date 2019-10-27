<template>
  <div class="pane-sm sidebar">
    <nav class="nav-group">
      <h5 class="nav-group-title">処理を選択</h5>

      <OcvfProcessListItem
          v-for="process in processDefinitions"
          :label="process.label"
          :process-id="process.processId"
          @addBlock="addBlock"
      />

      <!--TODO: いずれ消す-->
      <h5 class="nav-group-title">その他</h5>
      <a class="nav-group-item" href="/">ホームへ</a>
    </nav>
  </div>

</template>

<script>
  import OcvfProcessListItem from "../moleculesSVG/OcvfProcessListItem"

  export default {
    name: "ProcessSelector",

    components :{
      OcvfProcessListItem
    },

    props:{
      processDefinitions: {
        type: Array
      },
    },

    methods: {
      addBlock: function(processId){
        console.log(processId)
        this.$emit('addBlock', processId)
      }
    }

  }
</script>

<style scoped>

</style>
