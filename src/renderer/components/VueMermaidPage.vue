<!--<template>-->
  <!--<div>-->
    <!--<router-link to="/">ホームへ</router-link>-->
    <!--<vue-mermaid-->
        <!--:nodes="data"-->
        <!--type="graph LR"-->
        <!--@nodeClick="editNode"-->
    <!--&gt;</vue-mermaid>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import Vue from 'vue';-->
  <!--import VueMermaid from "vue-mermaid";-->

  <!--Vue.use(VueMermaid);-->

  <!--export default {-->
    <!--name: "VueMermaid",-->

    <!--data: function () {-->
      <!--return {-->
        <!--data: [-->
          <!--{-->
            <!--id: "1",-->
            <!--text: "A",-->
            <!--link: "-&#45;&#45;",-->
            <!--next: ["2"],-->
            <!--editable: true,-->
            <!--style: "fill:#f9f,stroke:#333,stroke-width:4px"-->
          <!--},-->
          <!--{id: "2", text: "B", edgeType: "circle", next: ["3"]},-->
          <!--{id: "3", text: "C", next: ["4", "6"]},-->
          <!--{id: "4", text: "D", link: "&#45;&#45; This is the text -&#45;&#45;", next: ["5"]},-->
          <!--{id: "5", text: "E"},-->
          <!--{id: "6", text: "F"}-->
        <!--]-->
      <!--};-->
    <!--},-->
    <!--methods: {-->
      <!--editNode(nodeId) {-->
        <!--alert(nodeId);-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
