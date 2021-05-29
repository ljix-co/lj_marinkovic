<template>
  <div class="biography">
    <div class="author-info" v-for="(info, index) in author_info" :key="index">
      <div class="dec-div">
        <div class="dec-line"></div>
        <div class="dec-line"></div>
        <div class="dec-line"></div>
      </div>
      <div class="prof-img">
        <img :src="info.profimg_path" alt="" />
      </div>
      <div class="txt">
        <!-- <h2 class="title">BIOGRAPHY</h2> -->
        <div class="bio" v-html="info.aut_bio"></div>
      </div>
      <div class="dec-div">
        <div class="dec-line"></div>
        <div class="dec-line"></div>
        <div class="dec-line"></div>

        <div class="dec-line-mob"></div>
        <div class="dec-line-mob"></div>
        <div class="dec-line-mob"></div>
        <div class="dec-line-mob"></div>
        <div class="dec-line-mob"></div>
        <div class="dec-line-mob"></div>
        <div class="dec-line-mob"></div>
        
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      author_info: [],
    };
  },
  methods: {
    ...mapActions(["changeLoader"]),
    getAuthInfo() {
      this.changeLoader(true);
      axios.get(this.baseUrl + "author_info").then((res) => {
        console.log(res);
        this.author_info.push(res.data.data[0]);
        // console.log(res.data.data[0].aut_fullname);
        this.changeLoader(false);
      });
    },
  },
  computed: {
    ...mapState(["baseUrl"]),
  },
  mounted() {
    this.getAuthInfo();
  },
};
</script>
<style scoped>
@keyframes in {
  from {
    left: -100px;
  }
  to {
    left: 0px;
  }
}
img {
  width: 30vw;
  height: 90vh;
  object-fit: contain;
  margin-left: 0;
  margin-top: 15vh;
  filter: grayscale(50%);
  background-color: #7e7e7e;
}
.author-info {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 5vw;
  height: 100%;
  margin-bottom: 15vh;
}
.bio {
  width: 25vw;
  text-align: justify;
}
.biography {
  margin-left: 0;
}
.dec-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
  margin-top: 15vh;
}
.dec-line {
  height: 90vh;
  width: 3vw;
  border-left: 7px dotted #c3eae3;
}
.txt {
  margin-top: 15vh;
  height: 90vh;
  width: 35vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #c3eae3;
}
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  img {
    height: 50vh;
  }
  .bio {
    width: 40vw;
  }
  .dec-div {
    position: absolute;
    left: 1rem;
    top: 55vh;
  }
  .dec-line, .dec-line-mob {
    height: 35vh;
  }
  .dec-line-mob {
  width: 3vw;
  border-left: 7px dotted #c3eae3;
  }
  .txt {
    width: 55vw;
  }
}
@media only screen and (max-width: 768px) {
  img {
    width: 90vw;
    height: auto;
    margin-top: 7vh;
  }
  .author-info {
    display: flex;
    flex-direction: column;
    margin-left: 5vw;
  }
  .bio {
    width: 75vw;
    margin-bottom: 1rem;
  }
  .dec-div{
display: none;
  }
  .prof-img {
    margin-top: 0;
  }
  .txt {
    position: initial;
    width: 90vw;
    height: 70vh;
    margin-top: 0;
  }
}
</style>