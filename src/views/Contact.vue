<template>
  <div class="contact">
    <div class="pg">
      <div class="dec-div" @click="exitSendEmail">
        <div class="dec-line"></div>
        <div class="dec-line"></div>
        <div class="dec-line"></div>
        <div class="dec-line"></div>
        <div class="dec-line"></div>
      </div>
      <div class="center">
        <transition enter-active-class="fade-in" leave-active-class="fade-out">
          <div class="content" v-if="send_email === false">
            <h1>{{ $t("contact.title") }}</h1>
            <div class="sqr up-sqr">
              <p class="instr">{{ $t("contact.soc") }}</p>
              <div class="soc-icons">
                <a
                  href="https://www.facebook.com/ljiljanamarinkovicceramic"
                  target="_blank"
                  ><i class="fab fa-facebook fb"></i
                ></a>
                <a
                  href="https://www.instagram.com/ljiljanam_webdeveloper/"
                  target="_blank"
                  ><i class="fab fa-instagram"></i
                ></a>
                <a href="https://github.com/ljix-co" target="_blank"
                  ><i class="fab fa-github"></i
                ></a>
                <a
                  href="https://www.linkedin.com/in/ljiljana-marinkovi%C4%87-a71928a8/"
                  target="_blank"
                  ><i class="fab fa-linkedin-in"></i
                ></a>
              </div>
            </div>
            <div class="sqr">
              <p class="instr">{{ $t("contact.personal") }}</p>
              <div class="pers-info">
                <p class="conct-mail" @click="sendEmail">
                  <i class="fas fa-envelope"></i>
                  <b>ljiljanamarinkovic.webandart</b>
                </p>
                <p><i class="fas fa-phone-alt"></i><b>+381605014494</b></p>
              </div>
            </div>
          </div>
        </transition>
        <transition enter-active-class="fade-in" leave-active-class="fade-out">
          <div class="email-form" v-if="send_email">
            <div class="top-line">
              <h1 class="mymail">{{ to }}</h1>
              <i class="fas fa-times" @click="exitSendEmail"></i>
            </div>
            <div class="inpts">
              <label for="">{{ $t("artworks.inpt_lbl.fullname") }}</label>
              <input type="text" v-model="fullname" />
              <label for="">{{ $t("artworks.inpt_lbl.email") }}</label>
              <input type="text" v-model="email" />
            </div>
            <div class="editor-div">
              <label for="">{{ $t("contact.inpt_lbl_mssg") }}</label>
              <textarea class="editor" v-model="email_message"></textarea>
            </div>
            <button class="btn-send" @click="send">
              {{ $t("buttons.send") }}
            </button>
          </div>
        </transition>
      </div>
      <div class="dec-div" @click="exitSendEmail">
        <div class="dec-line"></div>
        <div class="dec-line"></div>
        <div class="dec-line"></div>
        <div class="dec-line"></div>
        <div class="dec-line"></div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <confirmation
        v-if="confirm"
        :message="message"
        @confirm="exitConfrmMssg"
      ></confirmation>
    </transition>
    <transition name="fade" mode="out-in">
      <wrong v-if="wrong" :message="message" @confirm="exitWrongMssg"></wrong>
    </transition>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import Confirmation from "../components/Confirmation.vue";
import Wrong from "../components/Wrong.vue";

export default {
  components: { Confirmation, Wrong },
  data() {
    return {
      send_email: false,
      fullname: "",
      to: "ljiljanamarinkovic.webandart@gmail.com",
      email: "",
      title: "",
      email_message: "",
      confirm: false,
      message: "",
      wrong: false,
    };
  },
  methods: {
    ...mapActions(["changeLoader"]),
    exitConfrmMssg() {
      this.send_email = false;
      this.confirm = false;
      this.fullname = "";
      this.email = "";
      this.email_message = "";
    },
    exitSendEmail() {
      this.send_email = false;
    },
    exitWrongMssg() {
      this.wrong = false;
      this.message = "";
    },
    loaded() {
      this.changeLoader(false);
    },
    send() {
      if (
        this.fullname !== "" &&
        this.email !== "" &&
        this.email_message != ""
      ) {
        if (this.emailReg.test(this.email)) {
          let email = `<h2>From: ${this.fullname}, ${this.email}</h2>
                  <p style="background-color:purple; width:300px; height:200px; color:gray; font-size:20px;">${this.email_message}</p>`;
          let formData = new FormData();
          formData.append("email_txt", email);
          axios.post(this.baseUrl + "send_email", formData).then((res) => {
            console.log(res);
            this.message = this.$t("success.contact");
            this.confirm = true;
          });
        } else {
          this.message = this.$t("wrong.invld_email");
          this.wrong = true;
        }
      } else {
        this.message = this.$t("wrong.empty_fields");
        this.wrong = true;
      }
    },
    sendEmail() {
      this.send_email = true;
    },
  },
  computed: {
    ...mapState(["baseUrl", "emailReg"]),
  },
  mounted() {
    this.loaded();
  },
};
</script>
<style scoped>
@keyframes fade_in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fade_out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
a {
  text-decoration: none;
  font-size: 3rem;
  color: gray;
  /* margin-left: 4rem; */
}

b {
  margin-left: 1rem;
}
h1 {
  font-family: "HortaRegular", cursive;
  position: absolute;
  top: 10vh;
  font-size: 3rem;
  color: black;
}
input {
  width: 15vw;
  background-color: #f9fff7;
}
.center {
  width: 60vw;
}
.contact {
  height: 100vh;
  display: flex;
}
.btn-send {
  position: absolute;
  top: 70vh;
  left: 25vw;
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5vw;
  font-size: 1.2rem;
  position: absolute;
  top: 10vh;
}
.dec-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
}
.dec-line {
  height: 70vh;
  width: 3vw;
  border-left: 7px dotted #c3eae3;
  margin-top: 10vh;
}
.editor {
  width: 25vw;
  height: 30vh;
  background-color: #f9fff7;

  border-radius: 1.5rem;
}
.editor-div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 1rem;
  margin-top: 30vh;
  width: 25vw;
  height: 35vh;
}
.email-form {
  width: 60vw;
  min-height: 90vh;
  display: flex; /*
  flex-direction: column;*/
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;
  background-color: #c3eae3;
  position: absolute;
  top: 10vh;
  left: 20vw;
}
.fa-times {
  font-size: 2rem;
  position: absolute;
  left: 55vw;
  top: 10vh;
}
.fab {
  font-size: 4rem;
}
.fa-envelope,
.fa-phone-alt {
  font-size: 2rem;
  color: gray;
}
.fade-in {
  animation: fade_in 2s 1;
}
.fade-out {
  animation: fade_out 1s 1;
}
.inpts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  margin-left: 5vw;
  margin-top: 30vh;
}
.instr {
  width: 20vw;
  margin-left: 2.5vw;
  margin-top: 1.5rem;
}
.mymail {
  margin-left: 7vw;
}
.sqr {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 25vw;
  height: 25vw;
  gap: 5vh;
  background-color: #c3eae3;
  margin-top: 30vh;
}
.pers-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 20vw;
  gap: 2rem;
  align-self: center;
  justify-self: center;
  margin-top: 5vh;
}
.pg {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
}
.soc-icons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-self: center;
  justify-self: center;
  gap: 2rem;
  width: 15vw;
  margin-top: 5vh;
}
@media only screen and (min-width: 1024px) and (max-width: 1440px) {
  p {
    font-size: 1rem;
  }
  .contact {
    height: 90vh;
  }
  .content {
    left: 23vw;
  }
  .conct-mail {
    font-size: 1rem;
  }
  .dec-line {
    height: 50vh;
  }
  .fab {
    font-size: 4rem;
    width: 8vw;
  }
  .mymail {
    font-size: 2.2rem;
  }
  .pers-info,
  .soc-icons {
    margin-top: 0;
    width: 20vw;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  button {
    width: 12vw;
  }
  h1 {
    font-size: 2rem;
  }
  input {
    height: 3vh;
  }
  p {
    font-size: 0.8rem;
  }
  .contact {
    height: 90vh;
  }
  .conct-mail {
    font-size: 0.8rem;
  }
  .content {
    left: 20vw;

    gap: 1rem;
  }
  .dec-line {
    height: 50vh;
  }
  .fab {
    font-size: 3rem;
    width: 8vw;
  }
  .fas {
    font-size: 2rem;
  }
  .instr {
    width: 25vw;
  }
  .mymail {
    font-size: 1.5rem;
  }
  .pers-info {
    width: 30vw;
    margin-left: 5vw;
  }
  .soc-icons {
    gap: 1rem;
    width: 20vw;
  }

  .sqr {
    gap: 0;
    width: 30vw;
    height: 30vw;
    margin-top: 30vh;
  }
}
@media only screen and (max-width: 767px) {
  h1 {
    font-size: 2.5rem;
    top: 0;
    width: 90vw;
  }
  h2 {
    font-size: 1rem;
  }
  input{
  width: 40vw;
  height: 5vh;
  }
  .btn-send{
  width: 30vw;
  height: 7vh;
  left: 33vw;
  top: 80vh;
  }
  .editor{
  width: 60vw;
  }
  .content {
    flex-direction: column;
    gap: 0;
    left: 20vw;
  }
  .conct-mail {
    font-size: 0.9rem;
  }
  .dec-div {
    margin-left: 0;
  }
  .email-form {
    width: 90vw;
    height: 100vh;
    left: 5vw;
    top: 7vh;
    flex-direction: column;
  }
  .editor-div {
    width: 30vw;
    margin-top: 0;
    margin-left: 15vw;
    align-items: flex-start;
  }
  .fab {
    font-size: 3rem;
  }
  .fas {
    font-size: 1.5rem;
    margin-left: 0;
  }
  .fa-times {
    left: 80vw;
    top: 1vh;
    font-size: 2rem;
  }
  .instr {
    margin-left: 2.5vw;
    width: 55vw;
  }
  .inpts {
    margin-top: 15vh;
    margin-left: 15vw;
  }
  .mymail {
    margin-left: 0;
    font-size: 1.7rem;
    margin-top: 7vh;
  }
  .pers-info {
    width: 50vw;
    gap: 1.5rem;
    margin-top: 2vh;
  }
  .soc-icons {
    width: 40vw;
    gap: 1.5rem;
    margin-top: -2vh;
  }
  .sqr {
    width: 60vw;
    height: 60vw;
    margin-top: 5vh;
  }
  .up-sqr{
  margin-top: 15vh;
  }
}
</style>