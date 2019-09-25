<template>
    <div>
        <h1>OpenCVFlow の遊び場へようこそ</h1>
        <router-link to="/flask">Flask連携お試しページ</router-link>
        <br>
        <router-link to="/custom_drag_drop">自作ドラッグアンドドロップのお試しページ</router-link>
        <br>
        <router-link to="/konva_drag_drop">自作(Konva)ドラッグアンドドロップのお試しページ</router-link>
        <br>
        <router-link to="/drag_drop">ドラッグアンドドロップのお試しページ</router-link>
        <br>
        <router-link to="/drag_drop_list">ドラッグアンドドロップ (リスト) のお試しページ</router-link>
        <br>
        <router-link to="/line_connect">線連結お試しページ</router-link>
    </div>
</template>

<script>
  export default {
    name: 'main-page',
  };
</script>

<style>
</style>
