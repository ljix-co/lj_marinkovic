<template>
  <div class="home">
    <div>
      <div class="pg">
        <div class="l-sqr">
          <div class="decor">
            <img
              class="left-decor"
              src="../../public/images/snovulje_dve3.png"
              alt=""
            />
          </div>
          <div class="web-title">
            <p class="name">LJILJANA MARINKOVIĆ</p>
            <p class="occup">Visual Artist and Web Developer</p>
          </div>
          <div class="decor">
            <img
              class="right-decor"
              src="../../public/images/snovulje_dve3.png"
              alt=""
            />
          </div>
        </div>
        <img class="intro-photo" :src="image" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapActions, mapState } from "vuex";

export default {
  name: "Home",

  data() {
    return {
      image: null,
      index: 0,
      baseImgPath: "../../public/images/",
      images: [
        "pillow.png",
        "hibrid.png",
        
        "umorna.png",
      ],
      interval: null,
    };
  },
  methods: {
    ...mapActions(["changeLoadedImg"]),
    imgLoaded() {
      this.changeLoadedImg(true);
    },
    getImgUrl() {
      this.image = require("../../public/images/" +
        this.images[this.images.length - 1]);
      this.interval = setInterval(() => {
        this.image = require("../../public/images/" + this.images[this.index]);
        this.index = (this.index + 1) % this.images.length;
      }, 5000);
    },
    
  },
  computed: {
    ...mapState(["loader"]),
  },
  mounted() {
    this.imgLoaded();
    //  this.image = this.baseImgPath + this.images[0];
    this.getImgUrl();
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
};
</script>
<style scoped>
@keyframes left_in {
  from {
    left: -100px;
  }
  to {
    left: 0px;
  }
}

h3 {
  margin-top: 1vh;
}

.show-left {
  visibility: visible;
  animation: left_in 2s 1;
  position: relative;
}
.home {
  height: 100%;
}
.intro-photo {
  height: 100vh;
  margin-top: 6vh;
  box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.23);
}
.intro-logo {
  width: 40vw;
  margin-left: 3rem;
}
.l-sqr {
  margin-left: 0vw;
  margin-right: 15vw;
  width: 60vw;
  height: 65vh;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  /* border: 10px solid #adadb0; */
  border-left: none;
  /* box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48); */
}
.left-decor {
  width: 44vw;
  position: absolute;
  height: 60vh;
  object-fit: cover;
  border-bottom-right-radius: 350px;
  /* border-bottom-left-radius:-550px; */
  border-top-right-radius: 250px;
  border-top-left-radius: 500px;
  /* position: absolute; */
  margin-top: -30vh;
  /* margin-left: 1rem; */
  opacity: 0.3;
}
.left-decor:hover {
  opacity: 0.05;
}
.name {
  font-size: 6rem;
  color: #214478;
}
.occup {
  font-size: 2rem;
}
.page-out {
  animation: out 2s 1;
}
.pg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  align-self: center;
  animation: left_in 2s 1;
  position: relative;
}
.right-decor {
  height: 30vh;
  width: 10vw;
  object-fit: cover;
  position: absolute;
  margin-top: 5vh;
  margin-left: -12vw;
  transform: rotate(90deg);
  opacity: 0.1;
  border-top-left-radius: 300px;
}

.web-title {
  text-align: start;
  margin-left: 3rem;
  /* font-weight: 400; */
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