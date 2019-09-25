<template>
  <v-btn
      :name="name"
      :label="label"
      :icon-label="iconLabel"
      @click="handleClick"
  >
    <!--:name="name"-->
    <!--:definition="definition"-->
    <slot/>
    <!--{{ definition }}-->
  </v-btn>
</template>

<script>
  export default {
    name: "OcvfButton",

    // data: function (){
    //   return {
    //     process: process
    //   }
    // },
    //
    props: {
      // type: {
      //   type: String,
      //   default: 'button'
      // },
      name: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      iconLabel: {
        type: String,
        default: 'A'
      },
    },

    methods: {
      handleClick: function (ev) {
        console.log(this.process)
        this.$emit('click', ev)
      }
    }
  }
</script>

<style scoped>

</style>
