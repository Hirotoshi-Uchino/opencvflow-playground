<template>
  <dialog>
    <form method="dialog">
      <header class="toolbar toolbar-header">
        <h1 class="title">画像ファイル入力</h1>
      </header>

      <div id="input-area">
        <label for="select-file">
          <span class="btn btn-default">ファイルを選択</span>
          <span style="text-align: center">
            {{imageFileName}}
          </span>
          <input
              type="file"
              id="select-file"
              @click="setFileEvent"
              accept="image/png,image/jpge,image/bmp"
          >
        </label>
      </div>
      <img :src="imageData" alt="">

      <footer class="toolbar toolbar-footer">
        <span class="btn btn-default reset-btn">リセット</span>
        <button class="btn btn-primary pull-right complete-btn">完了</button>
      </footer>
    </form>
  </dialog>
</template>

<script>
  // TODO: input parameter to block
  export default {
    name: "OcvfFileInputDialog",

    data: function(){
      return {
        imageFileName: '',
        imageFilePath: '',
        imageData: ''
      }
    },

    methods: {
      setFileEvent: function(){
        let _vm = this

        let objFile = document.getElementById("select-file");
        objFile.addEventListener("change", function(evt) {
          console.log(evt.target)
          try{
            let file = evt.target.files[0];
            let reader = new FileReader();

            _vm.imageFileName = file.name
            _vm.imageFilePath = file.path
            reader.readAsDataURL(file);
            reader.onload = function(e) {
              _vm.imageData = e.target.result
            };
          } catch (e) {
            console.log('input File Error')
            console.log(e)
          }
        }, false)
      }
    },

  }
</script>

<style scoped>
  img{
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 350px;
    display: block;
  }

  #select-file{
    display:none
  }

  #input-area{
    margin: 10px;
  }

  dialog {
    width: 400px;
    /*height: 100%;*/
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translate(-50%, 0);
    border: solid 1px #aaa;
    border-radius: 5px;
    box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.3);
  }

  .reset-btn{
    margin: 5px;
  }

  .complete-btn{
    margin: 5px;
  }
</style>
