<template>
  <div class="wrong">
    <div class="alert">
      <h1>{{ message }}</h1>
      <button @click="confirm()">OK</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    message: String,
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
  },
};
</script>
<style scoped>
h1{
    color: #26905f;
    width: 20vw;
}
button {
  width: 10vh;
  height: 5vh;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  background-color: #26905f;
  color: white;
  cursor: pointer;
  margin-top: 2rem;
  font-size: 1rem;
  font-family: "Forum", cursive;
  text-align: center;
}
.alert {/*
  margin-top: 20vh;
  margin-bottom: 10vh;*/
  width: 30vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  border: 3px solid #26905f;
  background-color: white;
}
.wrong {
position: fixed;/*
left: 35vw;*/
top: 10vh;
background-color: rgba(255, 255, 255, 0.452);
width: 100vw;
height: 90vh;
display: flex;
align-items: center;
justify-content: center;
}
</style>