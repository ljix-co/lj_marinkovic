<template>
  <div class="warning">
    <h1>{{ message }}</h1>
    <div class="btns">
      <button class="yes" @click="confirm()">YES</button>
      <button class="no" @click="deny()">NO</button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    message: String,
    confirmEditFunction: Function,
    id: Number,
    images: Array,
    editObject: Object,
    array: Array,
    artworks: Array
  },
  methods: {
    confirm() {
      this.confirmEditFunction();
      this.$emit("confirm");
    },
    deny() {
      this.$emit("deny");
    },
  },
  computed: {
    ...mapState(["baseUrl"]),
  },
};
</script>
<style scoped>
button {
  width: 10vh;
  height: 5vh;
  border-radius: 10px;
  border: none;
  color: #545454;
  margin-top: 2rem;
  font-size: 1rem;
  font-family: "Forum", cursive;
  text-align: center;
}
h1{
    width: 30vw;
}
.btns {
  display: flex;
  gap: 1rem;
}
.warning {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F9FFF7;
  gap: 2rem;
}
.yes {
  background-color: #27f2cb;
}
.no {
  background-color: #f55977;
}
</style>