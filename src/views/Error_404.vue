<template>
  <div class="error">
    <div class="content">
      <h1>404</h1>
      <p>
        Sorry, but the page you are looking for is not here...
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
    ...mapActions(["changeLoader", "changeLoadedImg"]),
    goHome() {
      this.$router.push({ name: "Home" });
    },
    loaded() {
      this.changeLoader(false);
      this.changeLoadedImg(true);
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
button {
  width: 10vh;
  height: 5vh;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  background-color: #214478;
  color: white;
  cursor: pointer;
}
.content {
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  justify-content: center;
  position: absolute;
  gap: 2rem;
  top: 35vh;
  left: 30vw;
  width: 40vw;
  height: 50vh;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
}
</style>