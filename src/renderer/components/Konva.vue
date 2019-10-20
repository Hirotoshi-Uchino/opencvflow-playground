<template>
  <v-stage
      id="canvas"
      ref="stage"
      :config="configKonva"
  >
    <v-layer ref="layer">
      <CustomBlock
          :text-label="text"
      />
    </v-layer>
  </v-stage>
</template>

<script>

  import Vue from 'vue';
  import VueKonva from 'vue-konva';
  import CustomBlock from './atoms/CustomBlock'

  Vue.use(VueKonva);

  const width = window.innerWidth;
  const height = window.innerHeight;

  export default {
    name: "Konva",
    components: {CustomBlock},
    data() {
      return {
        configKonva: {
          width: width,
          height: height
        },
        text: "TEST"
      };
    },
  };

</script>

<style scoped>
  #canvas {
    width: 800px;
    height: 800px;
  }
</style>
