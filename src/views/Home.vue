<template>
  <div class="home" v-scroll="scrollEvent">
    <transition name="fade">
      <div class="pg" v-if="order_web_form === false">
        <div class="home-nav">
          <div class="nav nav-mob-right">
            <p @click="goToArtworks" class="nav-left">
              {{ $t("home.nav[0].txt") }}
            </p>
          </div>
          <div class="dec-div">
            <div class="dec-line"></div>
            <div class="dec-line"></div>
            <div class="dec-line"></div>
            <div class="dec-line"></div>
            <div class="dec-line"></div>
          </div>
          <div class="dec-div-mob">
            <div class="dec-line-mob"></div>
            <div class="dec-line-mob"></div>
            <div class="dec-line-mob"></div>
            <div class="dec-line-mob"></div>
            <div class="dec-line-mob"></div>
          </div>
          <div class="nav nav-mob-left" v-if="order_web_form === false">
            <p @click="orderWeb" class="nav-left">
              {{ $t("home.nav[1].txt") }}
            </p>
          </div>
        </div>

        <div class="start-img" v-if="scrollIndex === 0">
          <img class="img-prof" src="../../public/images/portret.png" alt="" />
        </div>
        <div class="web-img" v-if="scrollIndex === 1">
          <img
            class="logo-img"
            src="../../public/images/webdvlp_home.png"
            alt=""
          />
        </div>
        <div
          class="art-img"
          v-if="scrollIndex === 2 && order_web_form === false"
        >
          <img
            class="detail-img"
            src="../../public/images/artdtl_home.png"
            alt=""
          />
        </div>

        <div class="web-title">
          <div class="name-div">
            <div class="f-name">
              <p class="f-letter">LJ</p>
              <p class="name">ILJANA</p>
            </div>
            <div class="f-name">
              <p class="f-letter">M</p>
              <p class="name">ARINKOVIĆ</p>
            </div>
          </div>
          <p class="occup">{{ $t("home.subtitle") }}</p>
        </div>
        <div class="content">
          <transition
            name="up-down"
            enter-active-class="down-in"
            leave-active-class="up-leave"
          >
            <div class="category-txt" v-if="scrollIndex === 0">
              <p class="intro-txt">
                {{ $t("home.description") }}
              </p>
            </div>
          </transition>
          <transition
            name="up-down"
            :enter-active-class="scrollDirectionIn"
            :leave-active-class="scrollDirectionLeave"
          >
            <div class="category" v-if="scrollIndex === 1">
              <p class="cat-title">
                {{ $t("home.categories[1].title") }}
              </p>
              <div class="cat-content">
                <p class="cat-desc">{{ $t("home.web_desc") }}</p>

                <div class="tooltip">
                  <img
                    class="image-home"
                    src="../../public/images/nat.png"
                    alt=""
                    @click="goToProjects"
                  />
                  <span class="tooltiptxt">{{ $t("tooltips.nav") }}</span>
                </div>
              </div>
            </div>
          </transition>
          <transition
            name="up-down"
            enter-active-class="up-in"
            leave-active-class="down-leave"
          >
            <div class="category" v-if="scrollIndex === 2">
              <p class="cat-title">{{ $t("home.categories[0].title") }}</p>
              <div class="cat-content">
                <p class="cat-desc">{{ $t("home.art_desc") }}</p>

                <div class="tooltip">
                  <img
                    class="image-home"
                    src="../../public/images/art.png"
                    alt=""
                    @click="goToExhibitions"
                  />
                  <span class="tooltiptxt">{{ $t("tooltips.nav") }}</span>
                </div>
              </div>
            </div>
          </transition>
          <div class="scroll">
            <p class="nav-scroll" v-if="scrollIndex !== 2" @click="scroll">
              {{ $t("home.nav[2].txt") }}
            </p>
            <p class="nav-scroll nav-scroll-back" v-if="scrollIndex === 2" @click="scrollBack">
              {{ $t("home.nav[3].txt") }}
            </p>
          </div>
        </div>
      </div>
    </transition>
    <transition
      enter-active-class="down-in-order"
      leave-active-class="up-out-order"
    >
      <div class="order-form" v-if="order_web_form">
        <h1 class="order-title">{{ $t("home.order_title") }}</h1>
        <i class="fas fa-times order-exit" @click="exitOrderWeb"></i>
        <div class="instr">
          <p>{{ $t("home.order_instr") }}</p>
        </div>
        <div class="inpts">
          <div class="inpt-lbl">
            <label for="">{{ $t("home.inpt_lbl.website_type") }}</label>
            <select name="" id="opt-web-type" ref="optWebType">
              <option
                class="opt-web-type"
                v-for="(i, index) in web_types_index_arr"
                :key="'w' + index"
                :value="$t(`home.website_types[${i}].type`)"
              >
                {{ $t(`home.website_types[${i}].type`) }}
              </option>
            </select>

            <label for="">{{ $t("home.inpt_lbl.photo-editing") }}</label>
            <select name="" id="" ref="optPhotoEdit">
              <option value="1">{{ $t("select.yes") }}</option>
              <option value="0">{{ $t("select.no") }}</option>
            </select>
          </div>
          <div class="inpt-lbl">
            <label for="">{{ $t("home.inpt_lbl.domain") }}</label>
            <input type="text" v-model="domain" />

            <label for="">{{ $t("home.inpt_lbl.fullname") }}</label>
            <input type="text" v-model="fullname" />

            <label for="">{{ $t("home.inpt_lbl.email") }}</label>
            <input type="text" v-model="email_address" />
          </div>
        </div>
        <div class="instr">
          <p>{{ $t("home.send_email") }}</p>
        </div>
        <div class="editor">
          <vue-editor v-model="cust_message"></vue-editor>
        </div>
        <button class="btn-send" @click="sendOrder">
          {{ $t("buttons.send") }}
        </button>
      </div>
    </transition>
    <wrong v-if="wrong" :message="message" @confirm="exitWrongMssg"></wrong>
    <confirmation
      v-if="orderSuccess"
      :message="message"
      @confirm="exitConfrmMssg"
    ></confirmation>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import axios from "axios";
import Wrong from "../components/Wrong.vue";
import Confirmation from "../components/Confirmation.vue";

export default {
  components: { Wrong, Confirmation },
  name: "Home",

  data() {
    return {
      scrollIndex: 0,
      lastScrollPosition: 0,
      order_web_form: false,
      web_types_index_arr: [0, 1, 2, 3, 4],
      domain: "",
      fullname: "",
      email_address: "",
      message: "",
      cust_message: "",
      wrong: false,
      orderSuccess: false,
      scrollDirectionLeave: "up-leave",
      scrollDirectionIn: "up-in",
      componentKey: 0,
    };
  },

  methods: {
    exitConfrmMssg() {
      this.orderSuccess = false;
      this.message = "";
      this.order_web_form = false;
    },
    exitOrderWeb() {
      this.order_web_form = false;
      // window.scrollTo(this.lastScrollPosition)
    },
    exitWrongMssg() {
      this.wrong = false;
      this.message = "";
    },
    goToArtworks() {
      this.$router.push({ name: "Artworks" });
    },
    goToExhibitions() {
      this.$router.push({ name: "Exhibitions" });
    },
    goToProjects() {
      this.$router.push({ name: "Projects" });
    },
    orderWeb() {
      this.order_web_form = true;
      window.scrollTo(0, 0);
    },
    scroll() {
      if (this.scrollIndex === 0) {
        this.scrollIndex = 1;
        this.scrollDirectionLeave = "up-leave";
        window.scrollTo(0, 500);
      } else if (this.scrollIndex === 1) {
        console.log(this.scrollIndex);
        this.scrollIndex = 2;
        console.log(this.scrollIndex);
        this.scrollDirectionIn = "down-in";
        window.scrollTo(0, 700);
      }
    },
    scrollBack() {
      this.scrollIndex = 0;
      this.scrollDirectionIn = "up-in";
      // this.lastScrollPosition = 0;
      window.scrollTo(0, 0);
    },
    scrollEvent() {
      if (window.scrollY < 150) {
        this.scrollIndex = 0;
        this.lastScrollPosition = window.scrollY;
        // console.log(this.lastScrollPosition);
        this.scrollDirectionIn = "up-in";
      }
      if (window.scrollY > 200 && window.scrollY <= 590) {
        this.scrollIndex = 1;
        // this.lastScrollPosition = window.scrollY;
        if (window.scrollY > this.lastScrollPosition) {
          this.scrollDirectionLeave = "up-leave";
        } else {
          this.scrollDirectionLeave = "down-leave";
        }
        this.lastScrollPosition = window.scrollY;
      }

      if (window.scrollY >= 600) {
        this.scrollIndex = 2;
        this.lastScrollPosition = window.scrollY;
        this.scrollDirectionIn = "down-in";
      }
    },
    sendOrder() {
      if (
        this.fullname === "" ||
        this.email_address === "" ||
        this.domain === ""
      ) {
        this.message = this.$t("wrong.empty_fields");
        this.wrong = true;
      } else {
        if (this.emailReg.test(this.email_address)) {
          let custFormData = new FormData();
          custFormData.append("cust_fullname", this.fullname);
          custFormData.append("cust_email", this.email_address);
          axios.post(this.baseUrl + "customers", custFormData).then((res) => {
            console.log(res);
            let cust_id = res.data.cust_id;

            let elWebType = this.$refs.optWebType;
            let elPhotoEdit = this.$refs.optPhotoEdit;

            let formData = new FormData();
            formData.append("cust_id", cust_id);
            formData.append("webord_domain", this.domain);
            formData.append("webord_type", elWebType.value);
            formData.append("webord_photoediting", elPhotoEdit.value);
            formData.append("webord_dtldemands", this.cust_message);
            axios.post(this.baseUrl + "web_orders", formData).then((res) => {
              console.log(res);
              this.message = this.$t("success.web_ord");
              this.orderSuccess = true;
            });
          });
        } else {
          this.message = this.$t("wrong.invld_email");
          this.wrong = true;
        }
      }
    },
  },
  computed: {
    ...mapState(["baseUrl", "emailReg"]),
  },
  mounted() {
    // window.addEventListener('scroll', this.scrollEvent())
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Megrim&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
@keyframes down_in {
  from {
    top: -500px;
  }
  to {
    top: 0px;
  }
}
@keyframes up_in {
  from {
    top: 50vh;
    opacity: 0.1;
  }
  to {
    top: 0;
  }
}
@keyframes up_leave {
  from {
    top: 37vh;
  }
  to {
    top: -50vh;
    opacity: 0.1;
  }
}
@keyframes up_out_order {
  from {
    top: 0;
    opacity: 1;
  }
  to {
    top: -50vh;
    opacity: 0.1;
  }
}
@keyframes left_in {
  from {
    left: -15vh;
  }
  to {
    left: 0px;
  }
}
@keyframes down_leave {
  from {
    top: 37vh;
  }
  to {
    top: 100vh;
    opacity: 0.1;
  }
}
@keyframes down_in_category {
  from {
    top: -50vh;
    opacity: 0.1;
  }
  to {
    top: 35vh;
    opacity: 1;
  }
}
@keyframes down_in_mob {
  from {
    top: -50vh;
    opacity: 0.1;
  }
  to {
    top: 55vh;
    opacity: 1;
  }
}
@keyframes down_in_order {
  from {
    top: -50vh;
    opacity: 0.1;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
h3 {
  margin-top: 1vh;
}
p {
  font-size: 1rem;
}
label {
  font-size: 1.5rem;
}
select {
  width: 15vw;
  height: 5vh;
  border-radius: 10px;
  text-align: center;
}

.art-img {
  position: fixed;
  left: -4rem;
  top: 15vh;
}
.btn-send {
  margin-bottom: 5vh;
}
.category {
  width: 45vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.5rem;
  min-height: 50vh;
  position: fixed;
  top: 35vh;
  left: 27vw;
  margin-top: 2vh;
}
.cat-content {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.5rem;
  animation: up_in 2s 1;
  position: relative;
}
.cat-desc {
  width: 15vw;
  text-align: justify;
}

.category-txt {
  width: 40vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 40vw;
  min-height: 50vh;
  position: fixed;
  top: 35vh;
  left: 30vw;
}
.cat-title {
  font-size: 3rem; 
  font-family: "HortaRegular", cursive;
  animation: left_in 2s 1;
  position: relative;
  color: #aaaaaa;
}
.dec-div {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 2rem;
}
.dec-div-mob{
display: none;
}
.dec-line {
  height: 50vh;
  width: 3vw;
  border-left: 5px dotted #c3eae3;
}
.detail-img {
  width: 25vw;
  opacity: 0.7;
}
.down-in {
  animation: down_in_category 2s 1;
}
.down-in-order {
  animation: down_in_order 2s 1;
}
.down-leave {
  animation: down_leave 1s 1;
}

.f-letter {
  color: #27f2cb;
  font-size: 4.5rem;
  font-family: "HortaRegular", cursive;
  animation: down_in 1s 1;
  position: relative;
}
.f-name {
  display: flex;
  align-items: center;
  justify-content: center;
}
.home {
  height: 1300px;
}
.home-nav {
  position: fixed;
  width: 15vw;
  height: 60vh;
  left: 85vw;
  top: 15vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10vh;
}
.image-home {
  width: 30vw;
  /*
  height: 35vh;*/

  object-fit: cover;
  /*
border-radius: 2rem;*/
  border-bottom: 5px solid #27f2cb;
}
.img-prof {
  width: 25vw;
}
.inpts {
  width: 50vw;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10vw;
}
.inpt-lbl {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 20vw;
  gap: 1rem;
}
.instr {
  width: 50vw;
  text-align: justify;
  margin-top: 5vh;
  margin-bottom: 5vh;
}
.intro-txt {
  text-align: justify;
  width: 30vw;
  align-self: center;
  font-size: 1.2rem;
  margin-top: 2rem;
}

.logo-img {
  width: 25vw;

  opacity: 0.8;
}
.name {
  font-size: 4.5rem;
  font-family: "HortaRegular", cursive;
  color: #323131;
}
.name-div {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.nav {
  width: 15vw;
  border-bottom: 5px solid #27f2cb;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
.nav-scroll {
  margin-left: -2rem;
  font-size: 1.7rem;
  color: #323131;
  border-bottom: 3px solid #27f2cb;
  font-family: "HortaRegular", cursive;
}

.occup {
  font-size: 2rem;
}
.order-exit {
  position: absolute;
  top: 1rem;
  left: 55vw;
  font-size: 3rem;
}
.order-form {
  width: 60vw;
  left: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15vh;
  position: absolute;
  background-color: #f9fff7;
  border: 2px solid #27f2cb;
  z-index: 2;
}
.order-title {
  margin-top: 2rem;
  font-family: "HortaRegular", cursive;
  font-size: 3rem;
}
.pg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  align-self: center;
  animation: down_in 2s 1;
  position: relative;
  margin-top: 15vh;
}
.scroll {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  position: fixed;
  top: 85vh;
} /*
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}*/
.start-img {
  position: fixed;
  left: -6rem;
  top: 20vh;
}

.tooltip .tooltiptxt {
  position: absolute;
  margin-left: -30vw;

  background-color: #63f8daab;
  width: 30vw;
  transition-delay: 0.2s;
  visibility: hidden;
}
.tooltip:hover .tooltiptxt {
  visibility: visible;
} /*
.up-in{
 animation: up_in 2s  1;
}*/
.up-leave {
  animation: up_leave 1s 1;
}
.up-out-order {
  animation: up_out_order 1s 1;
}
.web-img {
  position: fixed;
  top: 15vh;
  left: -4rem;
}
.web-title {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #27f2cb;
  width: 50vw;

  position: fixed;
  top: 20vh;
}
@media only screen and (min-width: 1024px) and (max-width: 1440px) {
  p {
    font-size: 0.9rem;
  }
  .category {
    margin-top: 0;
  }
  .cat-title {
    font-size: 2rem;
  }
  .f-letter,
  .name {
    font-size: 3.5rem;
  }
  .img-prof,
  .logo-img,
  .detail-img {
    width: 30vw;
  }
  .intro-txt {
    font-size: 1rem;
  }
  .occup {
    font-size: 1.5rem;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  label {
    font-size: 1rem;
  }
  p {
    font-size: 0.8rem;
  }
  select {
    font-size: 0.8rem;
  }
  .art-img,
  .web-img {
    top: 20vh;
  }
  .btn-send {
    width: 15vw;
  }
  .category {
    margin-top: 0;
    gap: 0;
    margin-left: 1rem;
    top: 32vh;
  }
  .cat-content {
    flex-direction: column;
  }
  .cat-desc {
    width: 45vw;
    margin-left: 1rem;
  }
  .cat-title {
    font-size: 2rem;
    margin-left: 1rem;
  }
  .dec-line {
    height: 40vh;
  }
  .f-letter,
  .name {
    font-size: 3.5rem;
  }
  .img-prof,
  .logo-img,
  .detail-img {
    width: 35vw;
  }
  .image-home {
    width: 45vw;
    margin-left: 1rem;
  }
  .intro-txt {
    font-size: 1rem;
    margin-left: 3rem;
    width: 40vw;
    margin-top: 0;
  }
  .nav {
    border-width: 3px;
  }
  .nav-scroll {
    font-size: 1.5rem;
  }
  .occup {
    font-size: 1.5rem;
  }
  .order-exit {
    font-size: 2rem;
  }
  .order-title {
    font-size: 2rem;
    margin-top: 1.5rem;
  }
  .start-img {
    top: 25vh;
  }
  .web-title {
    margin-left: 3rem;
    top: 18vh;
  }
}
@media only screen and (max-width: 768px) {
input{
width: 30vw;
height: 5vh;
font-size: .9rem;
}
label{
font-size: .9rem;
}
p{
font-size: .8rem;
}
select{
width: 30vw;
height: 5vh;
font-size: .9rem;
}
.btn-send{
width: 30vw;
}
  .pg {
    width: 100vw;
    display: flex;
    flex-direction: column;
    margin-top: 0;
  }
  .category {
    width: 50vw;
    top: 25vh;
  }
  .cat-desc {
    width: 50vw;
    margin-top: 25vh;
  }
  .cat-title{
  position: absolute;
  top: 20vh;
  font-size: 2rem;
  }
  .category-txt {
    width: 50vw;
    left: 25vw;
    top: 55vh;
  }
  .dec-div {
    position: fixed;
    left: -5vw;
    top: 27vh;
  }
  .dec-div-mob {
    position: fixed;
    left: 85vw;
    top: 27vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dec-line-mob {
    height: 50vh;
    width: 3vw;
    border-left: 5px dotted #c3eae3;
  }
  .down-in{
  animation: down_in_mob 2s 1;
  }
  .f-letter {
    font-size: 3.5rem;
  }
  .home-nav {
    position: static;
  }
  .image-home {
    width: 50vw;
  }
  .img-prof {
    width: 50vw;
  }
  .inpts{
  width: 90vw;
  gap: 5vw;
  }
  .inpt-lbl{
  width: 40vw;
  }
  .instr{
  width: 80vw;
  }
  .intro-photo {
    width: 100vw;
    height: 100vh;
    position: absolute;
    object-fit: contain;
    z-index: -1;
  }
  .intro-txt {
    width: 50vw;
    font-size: .8rem;
    margin-top: 10vh;
  }
  .name {
    font-size: 3.5rem;
    align-self: center;
  }
  .nav {
    width: 30vw;
    border-width: 1px;
  }
  .nav-mob-left {
    position: fixed;
    left: 0;
    top: 10vh;
    justify-content: flex-end;
  }
  .nav-mob-right {
    position: fixed;
    left: 70vw;
    top: 10vh;
  }
  .nav-scroll{
  margin-left: -5vw;
  }
  .nav-scroll-back{
  margin-left: -12vw;
  }
  .occup {
    font-size: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .order-exit{
  left: 80vw;
  top: 1.5rem;
  }
  .order-form{
  width: 90vw;
  left: 5vw;
  margin-top: 7vh;
  }
  .order-title, .order-exit{
  font-size: 2rem;
  }

  .left-decor {
    display: none;
  }
  .right-decor {
    display: none;
  }
  .start-img {
    left: 25vw;
    top: 27vh;
  }
  .tooltip {
    width: 50vw;
    position: absolute;
    left: 0;
    top: 0;
  }

  .web-title {
    margin-left: 0;
    display: flex;
    width: 90vw;
    height: fit-content;
    margin-bottom: 6vh;
    top: 13vh;
  }
  .web-img, .art-img {
    visibility: hidden;
  }
}
</style>