<template>
  <div class="exhibitions">
    <div class="pg-col" v-if="showGallery === false">
      <div class="preview">
        <div
          class="prev-div tooltip"
          v-for="(exh, index) in exhibitions"
          :key="'e' + index"
          @click="showExh(exh)"
        >
          <img class="prev-img" :src="exh.coverphoto_path" alt="" />

          <span class="tooltiptxt">{{ $t("tooltips.nav") }}</span>
          <div class="prev-dsc">
            <p class="exh-title">{{ exh.title.toUpperCase() }}</p>
            <div class="date">
              <p>{{ exh.exh_date_start }}</p>
              <p>-</p>
              <p>{{ exh.exh_date_finish }}</p>
            </div>

            <p>{{ exh.place }}</p>
          </div>
          <div class="short-desc" v-html="exh.short_desc">
          
          </div>
        </div>
      </div>
    </div>
    <Gallery
      v-if="showGallery"
      :key="'g' + componentKey"
      :images="images"
      :chosenExh="chosenExh"
      @go-back="goBack()"
    ></Gallery>
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
.short-desc  {
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 30vh;
  width: 20vw;/*
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;*/
}
.short-desc p{
text-align: start;
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