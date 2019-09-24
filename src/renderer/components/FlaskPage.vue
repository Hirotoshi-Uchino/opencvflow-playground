<template>
  <div>
    <router-link to="/">ホームへ</router-link>
    <br>
    <h1>足し算します</h1>
      <input v-model="aNum" type="number" style="width: 50px"> +
      <input v-model="bNum" type="number" style="width: 50px"> =
      <span>{{this.result}}</span>
    <br>
    <div class="btn-group">
  <button class="btn btn-large btn-primary" @click="sum">実行</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  const URL = 'http://localhost:9999/sum';
  export default {
    name: 'FlaskPage',
    data() {
      return {
        aNum: 0,
        bNum: 0,
        result: null,
      };
    },
    methods: {
      sum(ev) {
        const query = `?aNum=${this.aNum}&bNum=${this.bNum}`;
        axios.get(URL + query)
          .then((response) => {
            console.log('from Flask:', response.data);
            this.result = Number(this.aNum) + Number(this.bNum);
          });
        // TODO: ajax & Flask-API
        // console.log(Number(this.aNum) + Number(this.bNum));
        console.log(ev);
        // this.result = Number(this.aNum) + Number(this.bNum);
      },
    },
  };</script>

<style scoped>

</style>
