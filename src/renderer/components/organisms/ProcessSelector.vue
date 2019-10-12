<template>
  <div>
    <OcvfButton
        v-for="process in processDefinitions"
        :name="process.name"
        :label="process.label"
        :icon-label="process.icon"
        :process-id="process.processId"
        @click="addBlock"
    >
      {{process.label}}
    </OcvfButton>
  </div>
</template>

<script>
  import OcvfButton from "../atoms2/OcvfButton"

  export default {
    name: "BlockSelector",

    components: {
      OcvfButton,
    },

    props:{
      processDefinitions: {
        type: Array
      },
    },

    methods: {
      addBlock: function(ev, iconLabel, processId){
        this.$emit('addBlock', ev, iconLabel, processId)
      }
    }


  }
</script>

<style scoped>

</style>
