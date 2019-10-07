<template>
  <v-label :config="labelConfig">
    <v-tag :config="tagConfig" />
    <v-text :config="textConfig" :text-label="textLabel"/>
  </v-label>
</template>

<script>
  export default {
    name: "CustomBlock",

    data: function () {
      return {
        labelConfig: {
          x: 170,
          y: 75,
          opacity: 0.75,
          draggable: true
        },
        tagConfig: {
          stroke: '#555',
          strokeWidth: 5,
          fill: '#ddd',
          lineJoin: 'round',
          shadowColor: 'black',
          shadowBlur: 10,
          shadowOffset: 10,
          shadowOpacity: 0.5,
          cornerRadius: 10,
        },
        textConfig: {
          text: this.textLabel,
          fontSize: 20,
          fontWeight: 'bold',
          padding: 10,
          stroke: 'black',
          strokeWidth: 1,
        },
      }
    },

    props: {
      textLabel: {
        type: String,
        default: ''
      },
    },

  }
</script>
