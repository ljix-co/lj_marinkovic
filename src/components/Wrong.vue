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
    color: #f55977;
    width: 20vw;
    
}
button {
  width: 10vh;
  height: 5vh;
  border-radius: 10px;
  border: none;
  background-color: #27f2cb;
  color: #545454;
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
  border: 3px solid #f55977;
  background-color: #F9FFF7;
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