<template>
  <g :icon-label="iconLabel" @pointerdown="startDrag" @click.right="handleRightClick" :block-id="blockId" :x="x" :y="y">
    <rect :x="x" :y="y" width="50" height="50" stroke="#444444" stroke-width="4" rx="10" yr="10" fill="#f0f8ff"/>
    <!--TODO: 文字のブロック内の位置調整-->
    <text :x="textX" :y="textY">
      {{iconLabel}}
    </text>
  </g>
</template>

<script>
  export default {
    name: "OcvfTile",

    props: {
      blockId: {
        type: Number,
        default: 0
      },
      iconLabel: {
        type: String,
        default: ''
      },
      x: {
        type: Number,
        default: 0
      },
      y: {
        type: Number,
        default: 0
      }

    },

    computed: {
      textX: function() {
        return this.x + 5
      },
      textY: function() {
        return this.y + 33
      }
    },

    methods: {
      startDrag(ev) {
        console.log("drag Start in Tile.")
        this.$emit("blockSelected", ev, this.blockId, this.x, this.y);
      },
      handleRightClick: function (ev) {
        this.$emit('handleRightClick', ev, this.blockId)
      },
    }
  }

</script>

<style scoped>

  g{
    cursor: pointer;
  }

  text {
    font-family: Times New Roman;
    font-size: 26px;
    font-weight: bold;
    /*text-align: justify;*/
    /*text-align-last: justify;*/
    /*text-align-last:center;*/
  }

</style>
