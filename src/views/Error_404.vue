<template>
  <div class="error">
    <div class="content">
      <h1>404</h1>
      <p>
        {{$t('error')}}
        <i class="far fa-frown"></i>
      </p>
      <button @click="goHome()">GO HOME</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["changeLoader"]),
    goHome() {
      this.$router.push({ name: "Home" });
    },
    loaded() {
      this.changeLoader(false);
      
    },
  },
  mounted() {
    this.loaded();
  },
};
</script>
<style scoped>
h1 {
  font-size: 7rem;
}
p {
  font-size: 1.5rem;
}

.content {
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 15vh;
  margin-left: 30vw;
  width: 40vw;
  height: 70vh;
}
</style>