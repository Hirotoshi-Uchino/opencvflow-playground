<template>
    <div>
    <nav class="nav-group">
      <h5 class="nav-group-title">OpenCVFlow の遊び場へようこそ</h5>
        <span class="nav-group-item">
          <span class="icon icon-thermometer"></span>
        <router-link to="/flask">Flask連携お試しページ</router-link>
        </span>
        <span class="nav-group-item">
          <span class="icon icon-mouse"></span>
        <br>
        <router-link to="/svg_canvas">SVGによるCanvasお試しページ</router-link>
        <br>
        <br>
        <router-link to="/svg_page">SVG全体作成ページ</router-link>
        <br>
        <router-link to="/custom_drag_drop">自作ドラッグアンドドロップのお試しページ</router-link>
        </span>
        <span class="nav-group-item">
          <span class="icon icon-mouse"></span>
        <router-link to="/konva_drag_drop">自作(Konva)ドラッグアンドドロップのお試しページ</router-link>
        </span>
        <span class="nav-group-item">
        <span class="icon icon-mouse"></span>
        <router-link to="/drag_drop">ドラッグアンドドロップのお試しページ</router-link>
        </span>
        <span class="nav-group-item">
          <span class="icon icon-list"></span>
        <router-link to="/drag_drop_list">ドラッグアンドドロップ (リスト) のお試しページ</router-link>
        </span>
        <span class="nav-group-item">
        <span class="icon icon-flow-branch"></span>
        <router-link to="/line_connect">線連結お試しページ</router-link>
        </span>
        <br>
        <router-link to="/vue_diagrams">vue-diagramsお試しページ</router-link>
        <!--<br>-->
        <!--<router-link to="/vue_mermaid">vue_mermaidお試しページ</router-link>-->
    </nav>
    </div>
</template>

<script>
  export default {
    name: 'main-page',
  };
</script>

<style>
  router-link{
    cursor: pointer !important;
  }
</style>
