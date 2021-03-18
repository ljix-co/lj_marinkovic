<template>
  <div class="exhibitions">
    <div class="pg-col" v-if="showGallery === false">
      <div class="up-sqr">
        <h1>EXHIBITIONS</h1>
      </div>
      <div class="preview">
        <div
          v-lazyload
          class="prev-div"
          v-for="(exh, index) in exhibitions"
          :key="'e' + index"
          @click="showExh(exh)"
        >
          <img class="prev-img" :data-url="exh.coverphoto_path" alt="" />
          <div class="prev-title">
            <h3>{{ exh.exh_title.toUpperCase() }}</h3>
          </div>
        </div>
      </div>
    </div>
    <Gallery
      v-if="showGallery"
      :images="images"
      :description="description"
      :title="title"
      :date="date"
      :review="review"
      @go-back="goBack()"
    ></Gallery>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import Gallery from "../components/Gallery.vue";
export default {
  components: {
    Gallery,
  },
  data() {
    return {
      exhibitions: [],
      images: [],
      description: "",
      title: "",
      showGallery: false,
      date: "",
      review: "",
    };
  },
  methods: {
    ...mapActions(["changeLoader", "changeLoadedImg"]),
    getExhbtns() {
      this.changeLoader(true);
      axios.get(this.baseUrl + "exhibitions").then((res) => {
        console.log(res.data.data);
        this.exhibitions.push(res.data.data[0]);
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].exh_id != this.exhibitions[0].exh_id) {
            this.exhibitions.push(res.data.data[i]);
          }
        }
        this.changeLoader(false);
      });
    },
    goBack() {
      this.showGallery = false;
    },
    imgLoaded() {
      this.changeLoadedImg(true);
    },
    showExh(exh) {
      let exh_id = exh.exh_id;
      axios
        .get(this.baseUrl + "exh_images", { params: { exh_id: exh_id } })
        .then((res) => {
          console.log(res);
          this.images = res.data.data;
          this.description = exh.exh_desc;
          this.title = exh.exh_title;
          this.showGallery = true;
          this.date = exh.exh_date_start + " - " + exh.exh_date_finish;
          this.review = exh.exh_rec;
        });
    },
  },
  computed: {
    ...mapState(["baseUrl"]),
  },
  mounted() {
    this.getExhbtns();
    this.changeLoadedImg(false);
    this.imgLoaded();
  },
};
</script>
<style  scoped>
@keyframes in {
  from {
    top: -100px;
  }
  to {
    top: 6vh;
  }
}
.pg-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90vw;
  height: 100%;
  align-self: center;
  justify-self: center;
  margin-left: 4rem;
  animation: in 2s 1;
  position: relative;
  top: 6vh;
}
.preview {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20vh;
  flex-wrap: wrap;
  width: 100vw;
  margin-left: 4rem;
  
}
.prev-img {
  width: 30vw;
  height: 30vh;
  object-fit: cover;
}
.prev-div {
  width: 30vw;
  margin-left: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  cursor: pointer;
}

.up-sqr {
  height: 15vh;
  margin-bottom: 30vh;
  /* border-top: none; */
  width: 30vw;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  border: 10px solid #adadb0;
  border-top: none;
}
@media only screen and (max-width: 768px) {
  .pg-col {
    margin-left: 2rem;
  }
  .preview {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100vw;
    margin-left: 0;
  }
  .prev-div {
    width: 80vw;
    margin-left: 1.5rem;
  }
  .prev-img {
    width: 80vw;
    /* height: 50vh; */
    object-fit: cover;
  }
  .up-sqr {
    width: 80vw;
    margin-left: -1.2rem;
    border: 4px solid #adadb0;
    border: none;
    margin-bottom: 2vh;
  }
}
</style>