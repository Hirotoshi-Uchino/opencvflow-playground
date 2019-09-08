<template>
  <div>
    <router-link to="/">ホームへ</router-link>
    <hr>


    <div id="canvas">
      <v-btn class="drag-and-drop" v-on:mousedown="mdown" v-bind:class="{drag: isDragging}">ガウシアンフィルタ</v-btn>
      <v-btn class="drag-and-drop">二値化</v-btn>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'

  var btn = new Vue({
    el: '.drag-and-drop',
    data: {
      isDragging: false
    },
    methods:{
      mdown: function(e){
          // if(e.type === "mousedown") {
          //   var event = e;
          // } else {
          //   var event = e.changedTouches[0];
          // }
          console.log("this!" + this)
          this.isDragging = true;
          this.x = event.pageX - this.offsetLeft;
          this.y = event.pageY - this.offsetTop;
          //
          // //タッチデイベントとマウスのイベントの差異を吸収
          //
          // //要素内の相対座標を取得
          // x = event.pageX - this.offsetLeft;
          // y = event.pageY - this.offsetTop;
          //
          // //ムーブイベントにコールバック
          // document.body.addEventListener("mousemove", this.methods.mmove, false);
          // document.body.addEventListener("touchmove", this.methods.mmove, false);
        },
      }
    }
  )


  export default {
    name: "DrugDropPage",
    methods: {
      // mdown: function(e){
      //   // if(e.type === "mousedown") {
      //   //   var event = e;
      //   // } else {
      //   //   var event = e.changedTouches[0];
      //   // }
      //   console.log("this!" + this)
      //   this.isDragging = true;
      //   this.x = event.pageX - this.offsetLeft;
      //   this.y = event.pageY - this.offsetTop;
      //   //
      //   // //タッチデイベントとマウスのイベントの差異を吸収
      //   //
      //   // //要素内の相対座標を取得
      //   // x = event.pageX - this.offsetLeft;
      //   // y = event.pageY - this.offsetTop;
      //   //
      //   // //ムーブイベントにコールバック
      //   document.body.addEventListener("mousemove", this.methods.mmove, false);
      //   document.body.addEventListener("touchmove", this.methods.mmove, false);
      // },
      // mmove: function(e){
      //   //ドラッグしている要素を取得
      //   var drag = document.getElementsByClassName("drag")[0];
      //
      //   //同様にマウスとタッチの差異を吸収
      //   if(e.type === "mousemove") {
      //     var event = e;
      //   } else {
      //     var event = e.changedTouches[0];
      //   }
      //
      //   //フリックしたときに画面を動かさないようにデフォルト動作を抑制
      //   e.preventDefault();
      //
      //   //マウスが動いた場所に要素を動かす
      //   drag.style.top = event.pageY - y + "px";
      //   drag.style.left = event.pageX - x + "px";
      //
      //   //マウスボタンが離されたとき、またはカーソルが外れたとき発火
      //   drag.addEventListener("mouseup", this.methods.mup, false);
      //   document.body.addEventListener("mouseleave",  this.methods.mup, false);
      //   drag.addEventListener("touchend",  this.methods.mup, false);
      //   document.body.addEventListener("touchleave",  this.methods.mup, false);
      // },
      // mup: function(e){
      //   var drag = document.getElementsByClassName("drag")[0];
      //
      //   //ムーブベントハンドラの消去
      //   document.body.removeEventListener("mousemove", this.methods.mmove, false);
      //   drag.removeEventListener("mouseup", this.methods.mup, false);
      //   document.body.removeEventListener("touchmove", this.methods.mmove, false);
      //   drag.removeEventListener("touchend", this.methods.mup, false);
      //
      //   //クラス名 .drag も消す
      //   this.isDragging = false;
      //   drag.classList.remove("drag");
      // }
    }
  }
</script>

<style scoped>
  #canvas{
    position: relative;
    width: 500px;
    height: 500px;
    border: 2px solid #333333;
  }


  .drag-and-drop {
    cursor: move;
    position: absolute;
    z-index: 1000;
  }

  .drag {
    z-index: 1001;
  }
</style>
