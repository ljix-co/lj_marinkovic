<template>
  <div id="app">
    <div id="nav">
      <div class="nav">
        <img class="logo" src="../public/images/logo_slovo.png" alt="" />
        <i
          :class="{
            'fas fa-bars menu-bar': showMenu === false,
            'far fa-times-circle menu-bar': showMenu,
          }"
          @click="showMenuList()"
        ></i>
        <div :class="{ hide: showMenu === false, show: showMenu }">
          <router-link class="link" to="/">HOME</router-link>
          <router-link class="link" to="/biography">BIOGRAPHY</router-link>
          <router-link class="link" to="/artworks">ARTWORKS</router-link>
          <router-link class="link" to="/projects">PROJECTS</router-link>
          <router-link class="link" to="/exhibitions">EXHIBITIONS</router-link>
          <router-link class="link" to="/contact">CONTACT</router-link>
        </div>
      </div>
    </div>
    <router-view :class="{ 'no-show': loader || loaded_img === false}" />
    <Loader v-if="loader || loaded_img === false"></Loader>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Footer from "./components/Footer.vue";
import Loader from "./components/Loader.vue";
export default {
  components: { Footer, Loader },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    ...mapActions(["changeLoader", "changeLoadedImg"]),
    showMenuList() {
      if (this.showMenu == false) {
        this.showMenu = true;
      }
      else if(this.showMenu == true) {
        this.showMenu = false;
      }
    },
  },
  computed: {
    ...mapState(["loader", "loaded_img"]),
  },
  mounted() {
  },
  watch: {
    $route: {
      handler() {
        this.showMenu = false;
      
      }
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Forum&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
p,
li {
  color: gray;
}
#app {
  font-family: "Forum", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #214478;
}

#nav {
  padding: 20px;
  height: 7vh;
  width: 100%;
  background-color: white;
  position: fixed;
  z-index: 1;
  /* margin-left: 20%; */
}

#nav a {
  font-weight: bold;
  color: #214478;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #0a6c85;
}
.nav {
  width: 60%;
  margin-left: 20%;
  border-bottom: 1px solid #adadb0;
  /* margin-top: 1vh; */
  background-color: white;
}
.no-show {
  /* visibility: hidden; */
  opacity: 0.3;
}
.menu-bar {
  visibility: hidden;
}
.link {
  margin-left: 1rem;
}
.logo {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 150px;
}
@media only screen and (max-width: 768px) {
  .hide {
    visibility: hidden;
   
  }
  .nav{
    width: 65vw;
    margin-left: 15vw;
    /* height: 4vh; */
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
 
  .show {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 40vh;
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
