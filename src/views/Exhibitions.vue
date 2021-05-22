<template>
  <div class="exhibitions">
  <transition name="fade" mode="out-in">
    <div class="pg-col" v-if="showGallery === false">
      <div class="preview">
        <div
          class="prev-div"
          v-for="(exh, index) in exhibitions"
          :key="'e' + index"
          @click="showExh(exh)"
        >
          <div class="date">
            <p class="date-string">{{ exh.exh_date_start }}</p>
            <p class="date-string">-</p>
            <p class="date-string">{{ exh.exh_date_finish }}</p>
          </div>
          <div class="line"></div>
          <div class="img-title">
            <div class="tooltip">
              <img class="prev-img" :src="exh.coverphoto_path" alt="" />
              <span class="tooltiptxt">{{ $t("tooltips.nav") }}</span>
            </div>
            <div class="prev-dsc">
              <p class="exh-title">{{ exh.title.toUpperCase() }}</p>
              <p class="place">{{ exh.place }}</p>
            </div>
          </div>
          <div class="short-desc" v-html="exh.short_desc"></div>
        </div>
      </div>
    </div>
  </transition>
  <transition name="fade" mode="out-in">
    <Gallery
      v-if="showGallery"
      :key="'g' + componentKey"
      :images="images"
      :chosenExh="chosenExh"
      @go-back="goBack()"
    ></Gallery>
    </transition>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import Gallery from "../components/Gallery.vue";
import { checkLanguage } from "../mixins/checkLanguage.js";
export default {
  components: {
    Gallery,
  },
  data() {
    return {
      exhibitions: [],
      images: [],
      showGallery: false,
      componentKey: 0,
      chosenExh: null,
    };
  },
  mixins: [checkLanguage],
  methods: {
    ...mapActions(["changeLoader"]),
    forceRerender() {
      this.componentKey += 1;
    },
    getExhbtns() {
      axios.get(this.baseUrl + "exhibitions").then((res) => {
        console.log(res);

        this.exhibitions = res.data.data;
        this.changeToLanguage();
        this.changeLoader(false);
      });
    },
    goBack() {
      this.showGallery = false;
    },

    showExh(exh) {
      let exh_id = exh.exh_id;
      axios
        .get(this.baseUrl + "exh_images", { params: { exh_id: exh_id } })
        .then((res) => {
          console.log(res);
          this.images = res.data.data;
          this.showGallery = true;
          this.chosenExh = exh;
        });
    },
  },
  computed: {
    ...mapState(["baseUrl", "curLanguage"]),
  },
  mounted() {
    this.getExhbtns();
  },
  watch: {
    curLanguage: {
      handler() {
        this.changeToLanguage();
        this.forceRerender();
      },
    },
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
  font-size: 1.5rem;
}
.date {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  transform: rotate(270deg);
  margin-top: .5rem;
  width: 5vw;
}
.date-string {
  color: #545454;
  
  font-size: 3rem;
}
.exh-title {
  font-size: 2rem;
  color: #545454;
  text-align: center;
  font-weight: 800;
}
.img-title{
  width: 50vw;
}
.line{
  height: 70vh;
  width: 1px;
  background-color: #27f2cb;
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
  position: relative;
  top: 6vh;
}
.place {
  color: gray;
  text-align: center;
  font-size: 1.7rem;
}
.preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20vh;
  margin-top: 10vh;
  flex-wrap: wrap;
  width: 100vw;
}
.prev-dsc {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.prev-img {
  width: 40vw;
  filter: grayscale(.3);
  /* height: 30vh;
  object-fit: cover;
  border-radius: 2rem;*/
}
.prev-div {
  width: 80vw;
  height: 70vh;
  margin-bottom: 10vh;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  
}
.short-desc {
  font-size: 1.2rem;
  margin-left: 2rem;
  height: 70vh;
  width: 20vw;
  border-bottom: 5px solid #27f2cb;
}

.tooltip .tooltiptxt {
  position: absolute;
  margin-left: -40vw;
  background-color: #63f8daab;
  width: 40vw;
  transition-delay: 0.2s;
  visibility: hidden;
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