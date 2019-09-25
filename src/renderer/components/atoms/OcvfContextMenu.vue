<template>
  <vue-context id="context-menu">
    <li @click="openHelp">Help</li>
    <!--<li class="disabled">Help</li>-->
    <li @click="deleteMenu">ブロックを削除</li>
  </vue-context>
</template>

<script>
  // import contextMenu from 'vue-context-menu'
  import { VueContext } from 'vue-context';

  export default {
    name: "OcvfContextMenu",

    components: {VueContext},

    methods: {
      deleteMenu: function () {
        console.log('削除するぞ')
      },
      openHelp: function () {
        console.log('Help Menu.')
      }
    }
  }
</script>

<style scoped>

</style>

<!--参考-->
<!--https://github.com/michitaro/vue-menu-->
<!--https://www.kabanoki.net/4648/-->
<!--https://github.com/rawilk/vue-context-->
