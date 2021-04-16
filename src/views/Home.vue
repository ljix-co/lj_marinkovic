<template>
  <div class="home">
    <div class="home-nav">
      <div class="nav">
        <p>{{ $t("home.nav[0].txt") }}</p>
      </div>
      <div class="nav">
        <p>{{ $t("home.nav[1].txt") }}</p>
      </div>
    </div>
    <div class="pg">
      <div class="web-title">
        <div class="name-div">
          <div class="f-name">
            <p class="f-letter">LJ</p>
            <p class="name">ILJANA</p>
          </div>
          <div class="f-name">
            <p class="f-letter">M</p>
            <p class="name">ARINKOVIC</p>
          </div>
        </div>
        <p class="occup">{{ $t("home.subtitle") }}</p>
      </div>
      <div class="content">
        <p class="intro-txt" v-if="scrollIndex === 0">
          {{ $t("home.description") }}
        </p>

        <div class="category" v-if="scrollIndex === 1">
          <p class="cat-title car-left">{{ $t("home.categories[0].title") }}</p>
          <div class="tooltip">
            <img
              src="../../public/images/art.png"
              alt=""
              @click="goToArtworks"
            />
            <span class="tooltiptxt">{{ $t("tooltips.nav") }}</span>
          </div>
        </div>
        <div class="category" v-if="scrollIndex === 2">
          <p class="cat-title car-right">
            {{ $t("home.categories[1].title") }}
          </p>
          <div class="tooltip">
            <img
              src="../../public/images/nat.png"
              alt=""
              @click="goToProjects"
            />
            <span class="tooltiptxt">{{ $t("tooltips.nav") }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",

  data() {
    return {
      scrollIndex: 0,
    };
  },
  methods: {
    goToArtworks() {
      this.$router.push({ name: "Artworks" });
    },
    goToProjects() {
      this.$router.push({ name: "Projects" });
    },
  },
  computed: {},
  mounted() {},
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Megrim&display=swap");
@keyframes down_in {
  from {
    top: -100px;
  }
  to {
    top: 0px;
  }
}

h3 {
  margin-top: 1vh;
}
img {
  width: 30vw;
  margin-top: 2rem;
  height: 35vh;
  cursor: pointer;
  object-fit: cover;
  /*
border-radius: 2rem;*/
  border-bottom: 7px solid #27f2cb;
}

.category {
  width: 40vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
  width: 90vw;
}
.car-left {
  text-align: start;
}
.car-right {
  text-align: end;
}
.cat-title {
  font-size: 3rem;

  width: 30vw;
  border-bottom: 1px solid #27f2cb;
}
.f-letter {
  color: #27f2cb;
  font-size: 5rem;
  font-family: "Megrim", "Open Sans", cursive;
}
.f-name {
  display: flex;
  align-items: center;
  justify-content: center;
}
.home {
  height: 100%;
}
.home-nav{
position: fixed;
width: 15vw;
height: 60vh;
left: 85vw;
top: 30vh;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: 30vh;
}
.intro-txt {
  text-align: justify;
  width: 30vw;
  align-self: center;

  margin-top: 2rem;
}
.name {
  font-size: 5rem;
  font-family: "Megrim", cursive;
  color: #323131;
}
.name-div {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.nav{
  width: 15vw;
  border-bottom: 5px solid #27f2cb;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
.occup {
  font-size: 2rem;
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
.tooltip .tooltiptxt {
  position: absolute;
  margin-left: -30vw;
  background-color: #27f2c93b;
  width: 30vw;
  transition-delay: 0.2s;
  visibility: hidden;
}
.tooltip:hover .tooltiptxt {
  visibility: visible;
}
.web-title {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #27f2cb;
  width: 35vw;
  margin-top: 10vh;
}
@media only screen and (max-width: 768px) {
  .pg {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .intro-photo {
    width: 100vw;
    height: 100vh;
    position: absolute;
    object-fit: contain;
    z-index: -1;
  }
  .name {
    font-size: 1rem;
    width: 45vw;
    align-self: center;
    /* position: absolute;
  top: 53vh;
  left: 4vw; */
    /* transform: rotate(270deg); */
    /* color: black; */
  }
  .occup {
    /* transform: rotate(270deg); */
    font-size: 1rem;
    margin-left: 1vw;
    width: 60vw;
    /* position: absolute;
  left: 30vw;
  top: 52vh;
  color: #214478; */
  }
  .l-sqr {
    border: none;
    box-shadow: none;
    width: 20vw;
    position: absolute;
    left: 0;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left-decor {
    display: none;
  }
  .right-decor {
    display: none;
  }
  .web-title {
    margin-left: 0;
    transform: rotate(270deg);
    display: flex;
    width: 120vw;
    height: fit-content;
    margin-bottom: 6vh;
  }
}
</style>