<template>
  <dialog>
    <form method="dialog">
      <input type="file" id="select-file" @click="setFileEvent" accept="image/png,image/jpge,image/bmp">
      <br>
      <img :src="imageData" alt="">

      <menu>
        <span class="btn btn-default">リセット</span>
        <button class="btn btn-primary active pull-right">完了</button>
      </menu>
    </form>
  </dialog>

</template>

<script>
  export default {
    name: "OcvfFileInputDialog",

    data: function(){
      return {
        imageData: ""
      }
    },

    methods: {
      setFileEvent: function(){
        let _vm = this

        let objFile = document.getElementById("select-file");
        objFile.addEventListener("change", function(evt) {
          let file = evt.target.files[0];
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(e) {
            _vm.imageData = e.target.result
          };
        }, false)
      }
    }
  }
</script>

<style scoped>
  /*#input-image{*/
    /*vertical-align: middle;*/
    /*display: block;*/
  /*}*/

  img{
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 350px;
    /*border: solid 1px black;*/
    display: block;
    /*max-width: 100%;*/
  }


  dialog {
    width: 400px;
    /*height: 100%;*/
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
</style>
