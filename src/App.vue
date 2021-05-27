<template>
  <div id="app">
    <div id="nav">
      <img
        class="logo"
        src="../public/images/logo_stable_trnspr.png"
        alt=""
        @click="$router.push({ name: 'Home' })"
      />
      <i
        :class="{
          'fas fa-bars menu-bar': showMenu === false,
          'far fa-times-circle menu-bar': showMenu,
        }"
        @click="showMenuList()"
      ></i>
      <div class="nav" :class="{ hide: showMenu === false, show: showMenu }">
        <router-link class="link" to="/">{{
          $t("links[0].title")
        }}</router-link>

        <router-link class="link" to="/artworks">{{
          $t("links[2].title")
        }}</router-link>
        <router-link class="link" to="/projects">{{
          $t("links[3].title")
        }}</router-link>
        <router-link class="link" to="/exhibitions">{{
          $t("links[4].title")
        }}</router-link>
        <router-link class="link" to="/biography">{{
          $t("links[1].title")
        }}</router-link>
        <router-link class="link" to="/contact">{{
          $t("links[5].title")
        }}</router-link>
        <local-switcher></local-switcher>
        <div class="logged-icons">
          <a class="logout" v-if="loggedIn" @click="logout()">LOGOUT</a>
          <router-link v-if="loggedIn" class="link" to="/admin"
            ><i class="far fa-edit prof-link"></i
          ></router-link>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
    <router-view :class="{ 'no-show': loader }" />
    </transition>
    <Loader v-if="loader"></Loader>
    <footer>
      <Footer></Footer>
    </footer>
     <custom-cursor
      :targets="[ 'a', 'button', 'i', 'nav-left', 'nav-scroll', 'order-nav', 'dtls-nav', 'order-exit', 'exit-order', 'order-delete', 'exit-order', 'check-order-btn',
      'buy-nav', 'exit', 'prev-img', 'lines', 'delete', 'ctrl', 'img-gallery', 'logo', 'image-home', 'flag', 'cart-icon', 'cart-amount',
      'add-icon', 'img-prof', 'cover-img']"
      :circleColor="'#27f2cb'"
      :circleColorHover="'#C3EAE3'"
      :hoverSize="4"
    ></custom-cursor>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Footer from "./components/Footer.vue";
import Loader from "./components/Loader.vue";
import LocalSwitcher from "./components/LocalSwitcher.vue";
import CustomCursor from './components/CustomCursor'
export default {
  components: { Footer, LocalSwitcher, CustomCursor, Loader},
  // ,
  data() {
    return {
      showMenu: false,
      loggedIn: false,
     
    };
  },
  methods: {
    ...mapActions(["changeLoader"]),
    showMenuList() {
      if (this.showMenu == false) {
        this.showMenu = true;
      } else if (this.showMenu == true) {
        this.showMenu = false;
      }
    },
    isLogged() {
      if (localStorage.getItem("sid")) {
        this.loggedIn = true;
      }
    },
    logout() {
      localStorage.removeItem("sid");
      this.$router.push({ name: "Login" });
      this.loggedIn = false;
    },
  },
  computed: {
    ...mapState(["loader"]),
  },
  mounted() {
    this.isLogged();
  },

  watch: {
    $route: {
      handler() {
        this.showMenu = false;
      },
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Forum&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  cursor: none;
  
}/*
h1{
  font-family: 'HortaRegular';
}*/
button {
  width: 10vw;
  height: 7vh;
  border-radius: 10px;
  border: none;
  background-color: #27f2cb;
  color: #545454;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 2rem;
  font-family: "Forum", cursive;
  text-align: center;
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
p,
li {
  color: #545454;
  text-align: justify;
}
select {
  border: none;
  width: 5vw;
  font-size: 1.2rem;
  font-family: "Forum", cursive;
  background-color: #bebebe;
  text-align: center;
}
select:focus {
  outline: none;
}
#app {
  font-family: "Forum", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #545454;
  overflow-x: hidden;
  background-color: #FFF7F9;
}

#nav {
  padding: 10px;
  height: 8vh;
  width: 100%;
  background-color: #FFF7F9;
  position: fixed;
  z-index: 2;
  position: fixed;
  top: 0;
  border-bottom: 1px dotted #27f2cb;
}

#nav a {
  font-weight: 400;
  color: #545454;
  text-decoration: none;
  font-size: 1.5rem;

}

#nav a.router-link-exact-active {
  color: #27f2cb;
  border-bottom: 1px solid #545454;
  font-weight: 800;
}
.fade-enter-active, .fade-leave-active{
  transition: opacity 1s ease;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.nav {
  width: 70%;
  margin-left: 15%;
  background-color: #FFF7F9;
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;
}
.no-show {
  /* visibility: hidden; */
  opacity: 0.3;
}
.menu-bar {
  visibility: hidden;
}

.logo {
  position: absolute;
  top: 1rem;
  left: 5vw;
  width: 7vw;
  
}
.logged-icons {
  position: absolute;
  top: 3vh;
  left: 90vw;
}
.logout {
  cursor: pointer;
}

.prof-link {
  font-size: 1.5rem;
  margin-left: 1rem;
}
@media only screen and (max-width: 768px) {
  #nav {
    z-index: 3;
  }
  .hide {
    visibility: hidden;
  }
  .nav {
    width: 65vw;
    margin-left: 15vw;
    margin-top: -2vh;
    border: none;
  }
  .menu-bar {
    visibility: visible;
    font-size: 2rem;
    position: absolute;
    left: 90vw;
    top: 1vh;
  }
  .logo {
    width: 100px;
    z-index: 2;
  }
  .logged-icons {
    position: unset;
  }
  .long-menu {
    margin-left: 0;
  }
  .show {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: fit-content;
    position: absolute;
    left: 0;
    top: 6vh;
    background-color: white;
    /* align-items: center; */
    justify-content: center;
    text-align: center;
    gap: 2rem;
  }
}
</style>
