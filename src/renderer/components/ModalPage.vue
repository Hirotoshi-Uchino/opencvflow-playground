<template>
  <div>
    <router-link to="/">ホームへ</router-link>
    <br>
    <hr>
    <div id="dialog-main">
      <dialog id="inputDialog">
        <form method="dialog">
          <!--button要素は、dialogをcloseされてしまうので-->
          <!--<span class="btn btn-default" @click="showOpenDialog">ファイルを選択</span>-->
          <input type="file" id="select-file" @click="setFileEvent" accept="image/png,image/jpge,image/bmp">
          <br>
          <br>
          <div id="input-image">
            <img :src="imageData" alt="">
          </div>
          <!--<img id="input-image" src="/Users/hirotoshi/Desktop/a.png" alt="">-->

          <menu>
            <!--<button class="btn btn-danger" @click="showOpenDialog">ファイルを選択</button>-->
            <span class="btn btn-default">リセット</span>
            <button class="btn btn-primary active pull-right">完了</button>
          </menu>
        </form>
      </dialog>

      <dialog id="paramDialog">
        <form method="dialog">
          <!--<p><label>Favorite animal:-->
          <!--<select class="form-control">-->
          <!--<option></option>-->
          <!--<option>Brine shrimp</option>-->
          <!--<option>Red panda</option>-->
          <!--<option>Spider monkey</option>-->
          <!--</select>-->
          <!--</label></p>-->
          <div class="form-group">
            <label>閾値(0.0 - 1.0)</label>
            <input
                v-model="threshold"
                type="number"
                step="0.00001"
                class="form-control"
                placeholder="0.1"
                name="threshold"
            >
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox"> Flag
            </label>
          </div>
          <menu>
            <span class="btn btn-default">リセット</span>
            <button type="submit" class="btn btn-primary active pull-right">完了</button>
          </menu>
        </form>
      </dialog>


      <button @click="showOpenDialog">ファイル読み込みモーダル</button>
      <br>
      <button @click="showMessageBox">メッセージBOX</button>
      <br>
      <button @click="subWindow">フォーカス奪わないモーダル</button>
      <br>
      <button @click="customDialog">customDialog</button>
      <br>
      <button @click="paramDialog">paramSettingDialog</button>
    </div>


  </div>
</template>

<script>
  import {remote, BrowserWindow, app, dialog} from 'electron'

  // let app などで定義すると app がduplicate で怒られる
  let _bw = remote.BrowserWindow
  let _app = remote.app
  var _dialog = remote.dialog

  export default {
    name: "ModalPage",

    data: function(){
      return{
        threshold: 0,
        imageData: ""
      }
    },

    methods: {
      showOpenDialog: function() {

        // console.log('モーダル表示')
        //
        // // console.log(remote)
        // console.log(_bw.getAllWindows())
        // console.log(_app.getVersion())
        // // console.log(dialog)
        //
        // var options = {
        //   title: 'Open Dialog Example',
        //   defaultPath: _app.getPath('userDesktop'),
        //   filters: [
        //     {name: 'Images', extensions: ['jpg', 'png', 'bmp']},
        //     {name: 'Documents', extensions: ['txt', 'html']},
        //   ],
        //   properties: ['openFile']
        // };
        //
        // var win = _bw.getFocusedWindow();
        // _dialog.showOpenDialog(win, options, function(filenames){
        //   console.log(filenames[0])
        //   let reader = new FileReader()
        //   // reader.onload = function(e){
        //   //   this.imageData = e.target.result
        //   // }
        //   reader.readAsDataURL(filenames[0])
        //   // showMsg(filenames);
        // });

      },

      setFileEvent: function(){
        let _vm = this

        var objFile = document.getElementById("select-file");
        objFile.addEventListener("change", function(evt) {
          var file = evt.target.files;
          var reader = new FileReader();
          reader.readAsDataURL(file[0]);
          reader.onload = function(e) {
            _vm.imageData = e.target.result
          };
        }, false)

      },

      showMessageBox: function(){
        var options = {
          title: 'Message Box Example',
          type: 'info',
          buttons: ['OK', 'Cancel', 'Info', 'あああああ', 'いいいいいいいいい'],
          message: 'Message Box Example',
          detail: 'Extra info'
        };

        var win = _bw.getFocusedWindow();
        _dialog.showMessageBox(win, options, function(response){
          showMsg(response.toString());
        });
      },

      subWindow: function() {
        const subWindow = new BrowserWindow({
          parent: _bw,
          show: false,
        });
        console.log(`${__dirname}`)

        subWindow.loadURL(`file://${__dirname}/subwindow_content.html`);
        subWindow.showInactive();
      },

      customDialog: function(){
        var favDialog = document.getElementById('inputDialog');
        favDialog.showModal();

      },

      paramDialog: function(){
        let _vm = this;

        let thisDialog = document.getElementById('paramDialog');
        thisDialog.showModal();

        thisDialog.addEventListener('close', function(event){
          console.log('submit')
          console.log(_vm.threshold)
        });
      }

    }
  }
</script>

<style scoped>
  dialog{
    border: solid 1px #aaa;
    border-radius: 5px;
    box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.3);

  }

  #input-image{
    /*vertical-align: middle;*/
    /*display: block;*/
    margin: auto;
    width: 350px;
    border: solid 1px black;
  }

  img{
    display: block;
    max-width: 100%;
  }

  #dialog-main{
    position: relative;
  }

  #paramDialog{
    position: absolute;
    width: 200px;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }

  #inputDialog{
    width: 400px;
    /*height: 100%;*/
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
</style>
