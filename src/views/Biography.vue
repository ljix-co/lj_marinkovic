<template>
  <div class="biography">
    <div class="author-info" v-for="(info, index) in author_info" :key="index">
      <div class="prof-img">
        <img :src="info.profimg_path" alt="" @load="imgLoaded()" />
      </div>
      <div class="txt">
        <h2 class="title">BIOGRAPHY</h2>
        <div class="bio" v-html="info.aut_bio"></div>
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
    ...mapActions(["changeLoader", "changeLoadedImg"]),
    getAuthInfo() {
      axios.get(this.baseUrl + "author_info").then((res) => {
        console.log(res);
        this.author_info.push(res.data.data[0]);
        // console.log(res.data.data[0].aut_fullname);
        this.changeLoader(false);
      });
    },
    imgLoaded() {
      setTimeout(() => {
        this.changeLoadedImg(true);
      }, 1000);
    },
  },
  computed: {
    ...mapState(["baseUrl"]),
  },
  mounted() {
    this.getAuthInfo();
    this.changeLoadedImg(false);
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
  width: 50vw;
  margin-left: 0;
  margin-top: 15vh;
  box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.23);
}
.author-info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 0;
  height: 100%;
  margin-bottom: 15vh;
}
.bio {
  width: 30vw;
  text-align: justify;
}
.biography {
  margin-left: 0;
  animation: in 2s 1;
  position: relative;
}
.prof-img {
  margin-top: 2rem;
}
.title {
  margin-bottom: 5vh;
  font-size: 2.5rem;
}
.txt {
  border: 10px solid #adadb0;
  border-top: 1px solid #adadb0;
  height: 90vh;
  width: 35vw;
  position: absolute;
  top: 7vh;
  left: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.23);
}
@media only screen and (max-width: 768px) {
  img{
    width: 90vw;
    margin-top: 7vh;
  }
.author-info {
  display: flex;
  flex-direction: column;
}
.bio{
  width: 75vw;
  margin-bottom: 1rem;
}
.prof-img {
  margin-top: 0;
}
.txt{
  position: initial;
  width: 90vw;
  height: fit-content;
  border: none;
}
}
</style>