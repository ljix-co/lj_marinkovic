<template>
  <div class="exhibitions">
    <div class="pg-col" v-if="showGallery === false">
      <div class="preview">
        <div
          v-lazyload
          class="prev-div tooltip"
          v-for="(exh, index) in exhibitions"
          :key="'e' + index"
          @click="showExh(exh)"
        >
          <img class="prev-img" :data-url="exh.coverphoto_path" alt="" />

          <span class="tooltiptxt">{{ $t("tooltips.nav") }}</span>
          <div class="prev-dsc">
            <p class="exh-title">{{ exh.exh_title.toUpperCase() }}</p>
            <!-- <div class="date">
              <p>{{ exh - exh_date_start }}</p>
              <p>-</p>
              <p>{{ exh.exh_date_finish }}</p>
            </div> -->
            <p>{{ date }}</p>
            <p>{{ exh.exh_place }}</p>
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
p {
  text-align: center;
  font-size: 1.5rem;
}
.date {
  display: flex;
  align-items: center;
  justify-content: center;
}
.exh-title {
  font-size: 2rem;
  color: #545454;
}
.pg-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
  align-self: center;
  justify-self: center;
  margin-top: 5vh;
  animation: in 2s 1;
  position: relative;
  top: 6vh;
}
.preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20vh;
  flex-wrap: wrap;
  width: 100vw;
}
.prev-dsc {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.prev-img {
  width: 40vw;
  /* height: 30vh;
  object-fit: cover;
  border-radius: 2rem;*/
}
.prev-div {
  width: 40vw;

  margin-bottom: 2rem;

  cursor: pointer;
}
.tooltip .tooltiptxt {
  position: absolute;
  margin-left: -35vw;
  background-color: #63f8daab;
  width: 30vw;
  transition-delay: 0.2s;
  visibility: hidden;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
.tooltip:hover .tooltiptxt {
  visibility: visible;
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