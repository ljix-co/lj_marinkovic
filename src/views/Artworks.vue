<template>
  <div class="artworks">
    <div class="pg-col">
      <div class="up-sqr">
        <h1>ARTWORKS</h1>
      </div>
      <div class="preview">
        <div class="shop-instruction-div">
          <div class="shop-instruction">
            <h2>How to buy</h2>
            <p>
              If you are interested in buying artworks, please contact the
              author via email and specify which artwork would you like to buy.
            </p>
            <p>
              If the artwork is not already sold, the next step would be signing
              the contract that guarantees that there will be no copies of a
              sold art piece, but also obliges the buyer to borrow purchased
              artwork to be exposed on significant exhibitions.
            </p>
            <p>
              After signing the document, money should be transferred directly
              to the author's bank account. The instructions will be sent via
              email.
            </p>
            <p>All the taxes are included in the price.</p>
          </div>
        </div>
        <div class="prev-gallery">
          <div class="prev-div" v-for="(art, index) in artworks" :key="index">
            <img
              class="prev-img"
              :src="art.artwork_imgpath"
              alt=""
              
            />
            <div class="prev-desc">
              <p>{{ art.artwork_title.toUpperCase() }}</p>
              <p>
                Tehcnique: <b>{{ art.artwork_technique }}</b>
              </p>
              <p>
                Materials: <b>{{ art.artwork_material }}</b>
              </p>
              <p>
                Price: <b>{{ art.artwork_price }}</b> $
              </p>
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
export default {
  data() {
    return {
      artworks: [],
    };
  },
  methods: {
    ...mapActions(["changeLoader", "changeLoadedImg"]),
    getArtworks() {
      this.changeLoader(true);
      axios.get(this.baseUrl + "artworks").then((res) => {
        this.artworks = res.data.data;
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
    ...mapState(["baseUrl", "loader"]),
  },
  mounted() {
    this.getArtworks();
    this.imgLoaded();
  },
};
</script>
<style scoped>
.pg-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90vw;
  height: 100%;
  align-self: center;
  justify-self: center;
  margin-left: 6rem;
  animation: in 2s 1;
  position: relative;
  top: 6vh;
}
.preview {
  display: flex;
  margin-bottom: 20vh;
  width: 100vw;
  height: fit-content;
  align-items: flex-start;
  justify-content: flex-start;
}
.prev-img {
  width: 30vw;
}
.prev-div {
  width: 30vw;
  margin-left: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  height: fit-content;
  /* align-self: stretch; */
}
.prev-desc {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-left: 1rem;
  /* margin-top: 1rem; */
  margin-bottom: 1rem;
}
.prev-gallery {
  width: 70vw;
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: baseline; */
  column-count: 2;
  column-gap: 1rem;
  height: fit-content;

  /* position: absolute; */
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
  width: 25vw;
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.48);
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  margin-left: 2rem;
  /* position: fixed; */
  /* left: 0;
 top: 15vh; */
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
  .prev-div{
    width: 80vw;
    margin-left: 1.5rem;
  }
  .prev-img {
  width: 80vw;
  /* height: 50vh; */
  object-fit: cover;
}
.prev-gallery {
  width: 90vw;
  margin-left: 0.7rem;
  column-count: 1;
  column-gap: 1rem;
  height: fit-content;

  /* position: absolute; */
}
.shop-instruction{
  width: 70vw;
  /* align-self: center; */

}
.shop-instruction-div{
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