<template>
  <div class="artworks">
    <photo-slider v-if="images.length > 0" :images="images"></photo-slider>
    <div class="buy-nav">
      <p class="nav" @click="showInstr" v-if="how_to_buy === false">
        {{ $t("artworks.nav") }}
      </p>
      <i class="fas fa-times exit" @click="hideInstr" v-if="how_to_buy"></i>
    </div>
    <div
      :class="{
        'shop-instruction-div': how_to_buy,
        hide: how_to_buy === false,
      }"
    >
      <div :class="{'shop-instruction': how_to_buy, hide: how_to_buy === false}">
        <h2>How to buy</h2>
        <p>
          If you are interested in buying artworks, please contact the author
          via email and specify which artwork would you like to buy.
        </p>
        <p>
          If the artwork is not already sold, the next step would be signing the
          contract that guarantees that there will be no copies of a sold art
          piece, but also obliges the buyer to borrow purchased artwork to be
          exposed on significant exhibitions.
        </p>
        <p>
          After signing the document, money should be transferred directly to
          the author's bank account. The instructions will be sent via email.
        </p>
        <p>All the taxes are included in the price.</p>
      </div>
    </div>
    <div class="pg-col">
      <div class="preview">
        <div class="prev-gallery">
          <div
            v-lazyload
            class="prev-div"
            v-for="(art, index) in artworks"
            :key="index"
          >
            <img
              class="prev-img"
              :data-url="art.artwork_imgpath"
              alt=""
              src="../../public/images/placeholder_photo_l.gif"
            />
            <div class="prev-desc">
              <p class="artw-title">{{ art.title.toUpperCase() }}</p>
               <p class="prev-desc-txt">
                Artform: <b>{{ art.artform }}</b>
              </p>
              <p class="prev-desc-txt">
                Tehcnique: <b>{{ art.technique }}</b>
              </p>
              <p class="prev-desc-txt">
                Materials: <b>{{ art.material }}</b>
              </p>
              <p class="prev-desc-txt">
                Price: <b>{{ art.artwork_price }}</b> $
              </p>
              <button class="btn-buy">{{$t('buttons.buy')}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import PhotoSlider from "../components/PhotoSlider.vue";
import { checkLanguage } from "../mixins/checkLanguage.js";
export default {
  components: { PhotoSlider },
  data() {
    return {
      artworks: [],
      how_to_buy: false,
      images: [],
    };
  },
  mixins: [checkLanguage],
  methods: {
    ...mapActions(["changeLoader"]),
    getArtworks() {
      // this.changeLoader(true);
      axios.get(this.baseUrl + "artworks").then((res) => {
        console.log(res);
        this.artworks = res.data.data;
        // this.changeLoader(false);
        this.changeToLanguage();
        this.getImages();
      });
    },
    getImages() {
      for (let i = 0; i < this.artworks.length; i++) {
        this.images.push({
          path: this.artworks[i].artwork_imgpath,
          id: this.artworks[i].artwork_id,
        });
      }
    },
    hideInstr() {
      this.how_to_buy = false;
    },

    showInstr() {
      this.how_to_buy = true;
    },
  },
  computed: {
    ...mapState(["baseUrl", "loader", "curLanguage"]),
  },
  mounted() {
    this.getArtworks();
  },
  watch: {
    curLanguage: {
      handler() {
        this.changeToLanguage();
      },
    },
  },
};
</script>
<style scoped>
@keyframes in {
  from {
    top: -100px;
  }
  to {
    top: 6vh;
  }
}
button{
width: 5vw;
height: 2.5vw;
font-size: 1.2rem;
font-weight: 800;
color: #27f2cb;
background-color: #545454;
}
p {
  color: #545454;
  text-align: start;
}
.artw-title {
  font-size: 1.2rem;
  font-weight: 800;
  text-align: start;/*
  width: 20vw;*/
  align-self: center;
}
.btn-buy{
align-self: center;
}
.buy-nav {
  position: fixed;
  top: 15vh;
  left: -2rem;
  z-index: 2;
}
.hide {
  visibility: hidden;
  height: 0;
}
.nav,
.exit {
  width: 15vw;
  border-bottom: 5px solid #27f2cb;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  cursor: pointer;
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
  margin-bottom: 20vh;
  width: 100vw;
  height: fit-content;
  align-items: center;
  justify-content: center;
}
.prev-img {
  width: 20vw;
  height: 30vh;
  object-fit: cover;
  background-color: #d4d4d4; /*
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;*/
}
.prev-div {
  width: 20vw;/*
  margin-left: 2rem;*/
  margin-bottom: 2rem;
  background-color: #ced0d1;
  height: 60vh; /*
  border-radius: 2rem;*/
  border-bottom: 5px solid #27f2cb;
}
.prev-desc {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;/*
  margin-left: 1rem;*/
  margin-top: 1rem;
  width: 20vw;
  height: 30vh;
}
.prev-desc-txt{
margin-left: 1rem;
}
.prev-gallery {
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.up-sqr {
  height: 15vh;
  margin-bottom: 5vh;
  border-top: none;
  width: 30vw;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  border: 10px solid #adadb0;
  border-top: none;
}
.shop-instruction {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: justify;
  width: 20vw;
  margin-bottom: 2rem;
  margin-top: 2rem;
}
.shop-instruction-div {
  width: 15vw;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  position: fixed;
  top: 20vh;
  left: 1rem;
  z-index: 2;
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
  }
  .prev-div {
    width: 80vw;
    margin-left: 1.5rem;
  }
  .prev-img {
    width: 80vw;
    object-fit: cover;
  }
  .prev-gallery {
    width: 90vw;
    margin-left: 0.7rem;
    column-count: 1;
    column-gap: 1rem;
    height: fit-content;
  }
  .shop-instruction {
    width: 70vw;
  }
  .shop-instruction-div {
    width: 80vw;
    margin-left: 2rem;
  }
  .up-sqr {
    width: 80vw;
    margin-left: 0;
    border: 4px solid #adadb0;
    border: none;
  }
}
</style>