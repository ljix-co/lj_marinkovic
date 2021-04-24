<template>
  <div class="login">
    <div class="login-form" :class="{'fade': wrong}">
      <h1>LOGIN</h1>
      <label for="">FULL NAME</label>
      <input v-model="fname" type="text" />
      <label for="">PASSWORD</label>
      <input v-model="pass" type="password" @keyup.enter="login()"/>
      <button @click="login()">LOGIN</button>
    </div>
    <Wrong v-if="wrong" :message="message" @confirm="closeAlert()"></Wrong>
  </div>
</template>
<script>
import Wrong from '../components/Wrong.vue'
import { mapState } from "vuex";
import axios from "axios";
export default {
  components: {
    Wrong
  },
  data() {
    return {
      fname: "",
      pass: "",
      wrong: false,
      message: ""
    };
  },
  methods: {
  
    closeAlert() {
      this.wrong = false;
      this.message = "";
    },
    login() {
      axios
        .post(this.baseUrl + "authentication", {
          fname: this.fname,
          pass: this.pass,
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("sid", res.data.sid);
          this.$router.push({ name: "Admin" });
          this.$router.go();
        }).catch((res) => {
          console.log(res);
          this.wrong = true;
          this.message = "Username or password is incorrect."
        });
    },
  },
  computed: {
    ...mapState(["baseUrl", "isLogged"]),
  },
  mounted() {
  
  },
};
</script>
<style scoped>
label {
  font-size: 1.2rem;
}
input {
  width: 20vw;
  height: 5vh;
  border-radius: 10px;
  border: none;
  background-color: #bebebe;
  font-size: 1.2rem;
  font-family: "Forum", cursive;
  text-align: center;
}
input:focus {
  outline: none;
}
button {
  width: 10vh;
  height: 5vh;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  background-color: #27f2cb;
  color: #545454;
  cursor: pointer;
  margin-top: 2rem;
  font-size: 1rem;
  font-family: "Forum", cursive;
  text-align: center;
}
.fade{
  opacity: 0.1;
}
.login {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-form {
  margin-top: 20vh;
  margin-bottom: 10vh;
  width: 30vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
}
</style>