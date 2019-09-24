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
    </nav>
    </div>
</template>

<script>
  export default {
    name: 'main-page',
  };
</script>

<style>
</style>
