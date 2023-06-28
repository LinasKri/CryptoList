<template>
  <div class="py-3 my-md-4">
    <h1 class="mb-3">Crypto single-page application</h1>
    <div class="header-line"></div>
    <CryptoList />
  </div>
</template>

<script>
import CryptoList from './components/CryptoList.vue';
export default {
  name: 'App',
  components: {
    CryptoList,
  },
};
</script>
<style>
#app {
  text-align: center;
}
.header-line {
  width: 100%;
  height: 3px;
  background-color: orange;
}
</style>
