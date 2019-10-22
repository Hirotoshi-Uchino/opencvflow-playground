<template>
  <div>
    display area.
    <div v-for="result in resultList">
      <span>{{result.blockId}}</span>
      <br>
      <img :src="addSourcePrefix(result.base64)" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "ResultPreview",

    computed: {
      resultList: function () {
        return this.$store.state.pipelineResultList
      }
    },

    methods: {
      addSourcePrefix: function(base64){
//        # b64 = 'data:image/jpeg;base64,' + b64
        let ext = this.$store.state.targetImageExt
        if(ext === 'jpg' || ext === 'jpeg'){
          return 'data:image/jpeg;base64,' + base64
        } else{
          return 'data:image/' + ext +';base64,' + base64
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
  img {
    width: 90%;
    margin: auto;
  }

</style>
