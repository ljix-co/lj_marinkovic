<template>
  <div class="artworks">
    <photo-slider
      class="photo-slider"
      :key="'p' + componentKey"
      v-if="images.length > 0"
      :images="images"
    ></photo-slider>
    <div class="buy-nav-div">
      <p class="buy-nav" @click="showInstr" v-if="how_to_buy === false">
        {{ $t("artworks.nav.how_to_buy") }}
      </p>
      <i class="fas fa-times exit" @click="hideInstr" v-if="how_to_buy"></i>
    </div>
    <div class="order-nav-div">
      <p class="order-nav" @click="showOrder" v-if="show_order === false">
        {{ $t("artworks.nav.order") }}
      </p>
      <i
        class="fas fa-times exit-order"
        @click="hideOrder"
        v-if="show_order"
      ></i>
      <div class="order-form" v-show="show_order">
        <div class="tooltip">
          <span class="tooltip-txt" v-if="order_list.length === 0">{{
            $t("tooltips.nt_show")
          }}</span>
          <h3 class="check-order-btn" @click="showOrderList">
            {{ $t("artworks.nav.order_list") }}
          </h3>
        </div>
        <div  class="inpts" v-if="order_list.length > 0 && pay_option === false">
          <label for="">{{ $t("artworks.inpt_lbl.fullname") }}</label>
          <input type="text" v-model="fullname" />
          <label for="">{{ $t("artworks.inpt_lbl.email") }}</label>
          <input type="text" v-model="email" />
          <label for="">{{ $t("artworks.inpt_lbl.address") }}</label>
          <input type="text" v-model="address" />
          <label for="">{{ $t("artworks.inpt_lbl.city") }}</label>
          <input type="text" v-model="city" />
          <label for="">{{ $t("artworks.inpt_lbl.country") }}</label>
          <input type="text" v-model="country" />
          <button @click="confirmOrder()">{{ $t("buttons.confirm") }}</button>
          
        </div>
        <div id="smart-button-container" v-show="pay_option">
          
            <pay-pal-button :key="'PPb' + componentKey" :totalPrice="total_price"></pay-pal-button>
          </div>
        <div
          class="order-list-div"
          v-if="show_order_list && order_list.length > 0"
        >
          <div class="order-top-line">
            <h2 class="order-total-price">
              {{ $t("artworks.total_price") }} <b>{{ total_price }}</b>
            </h2>
            <h1 class="order-list-title">{{ $t("artworks.order_list") }}</h1>
            <i class="fas fa-times order-exit" @click="closeOrderList"></i>
          </div>
          <div class="order-list">
            <div
              class="order"
              v-for="(order, index) in order_list"
              :key="'o' + index"
            >
              <i
                class="fas fa-times order-delete"
                @click="removeFromOrder(order)"
              ></i>
              <img class="order-img" :src="order.artwork_imgpath" alt="" />
              <p class="order-title">{{ order.title.toUpperCase() }}</p>
              <p class="order-price">
                Price: <b>{{ order.artwork_price }}</b> €
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dtls-nav-div">
      <p class="dtls-nav" @click="showArtwDetails">
        {{ $t("artworks.nav.artw_dtls") }}
      </p>
    </div>
    <div
      :class="{
        'shop-instruction-div': how_to_buy,
        hide: how_to_buy === false,
      }"
    >
      <div
        :class="{ 'shop-instruction': how_to_buy, hide: how_to_buy === false }"
      >
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
            v-for="(art, index) in artworks"
            :key="index"
            :class="{
              'chosen-artwk': art.chosen,
              'prev-div': art.chosen === false || !art.chosen,
            }"
          >
            <img
              class="prev-img"
              :data-url="art.artwork_imgpath"
              alt=""
              src="../../public/images/placeholder_photo_l.gif"
              @click="getImages(art)"
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
                Price: <b>{{ art.artwork_price }}</b> €
              </p>
              <button
                :key="'b' + buttonKey"
                class="btn-buy"
                :disabled="art.sold || art.artwork_sold === 1"
                @click="buyArtwork(art)"
              >
                {{ $t("buttons.buy") }}
              </button>
              <!-- <pay-pal-button :totalPrice="total_price"></pay-pal-button> -->
              <!-- <div ref="payment"></div>-->
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
import { scrollToElement } from "../mixins/scrollToElement.js";
import PayPalButton from '../components/PayPalButton.vue';
// import PayPalButton from '../components/PayPalButton.vue';
export default {
  components: { PhotoSlider, PayPalButton },
  data() {
    return {
      artworks: [],
      how_to_buy: false,
      images: [],
      componentKey: 0,
      chosen_artwork: null,
      order_list: [],
      show_order: false,
      fullname: "",
      email: "",
      address: "",
      city: "",
      country: "",
      show_order_list: false,
      buttonKey: 0,
      total_price: 0,
      pay_option: false
    };
  },
  mixins: [checkLanguage, scrollToElement],
  methods: {
    ...mapActions(["changeLoader"]),
    buyArtwork(art) {
      this.order_list.push(art);
      for (let i = 0; i < this.artworks.length; i++) {
        if (art === this.artworks[i]) {
          this.artworks[i].sold = true;
          this.buttonKey += 1;
          this.total_price += art.artwork_price;
        }
      }
    },
  
    confirmOrder() {
      let formData = new FormData();
      formData.append("cust_fullname", this.fullname);
      formData.append("cust_email", this.email);
      formData.append("cust_address", this.address);
      formData.append("cust_city", this.city);
      formData.append("cust_country", this.country);
      axios.post(this.baseUrl + "customers", formData).then((res) => {
        console.log(res);
        let cust_id = res.data.cust_id;
        for (let i = 0; i < this.order_list.length; i++) {
          let artwk_id = this.order_list[i].artwork_id;
          let orderFormData = new FormData();
          orderFormData.append("cust_id", cust_id);
          orderFormData.append("artwork_id", artwk_id);
          axios.post(this.baseUrl + "orders", orderFormData).then((res) => {
            console.log(res);
            let order_id = res.data.order_id;
            this.pay_option = true;
            axios
              .get(this.baseUrl + "send_email", {
                params: { order_id: order_id },
              })
              .then((res) => {
                console.log(res);
                
                //ovde ubaciti modal kojim se potvrđuje porudžbina
              });
          });
        }
      });
    },
    closeOrderList() {
      this.show_order_list = false;
    },
    forceRerender() {
      this.componentKey += 1;
    },
    getArtworks() {
      // this.changeLoader(true);
      axios.get(this.baseUrl + "artworks").then((res) => {
        console.log(res);
        this.artworks = res.data.data;
        this.artworks[0].chosen = true;
        // this.changeLoader(false);
        this.changeToLanguage();
        this.getImages();
      });
    },
    getImages(art) {
      if (!art) {
        this.images.push({
          path: this.artworks[0].artwork_imgpath,
          id: this.artworks[0].artwork_id,
        });

        axios
          .get(this.baseUrl + "images", {
            params: { artwork_id: this.artworks[0].artwork_id },
          })
          .then((res) => {
            console.log(res);
            for (let i = 0; i < res.data.data.length; i++) {
              this.images.push({
                path: res.data.data[i].img_path,
                id: res.data.data[i].img_id,
              });
            }
          });
      } else if (art) {
        this.images = [];
        for (let i = 0; i < this.artworks.length; i++) {
          if (this.artworks[i].chosen === true) {
            this.artworks[i].chosen = false;
          }
          if (art === this.artworks[i]) {
            this.artworks[i].chosen = true;
          }
        }
        this.images.push({
          path: art.artwork_imgpath,
          id: art.artwork_id,
        });
        axios
          .get(this.baseUrl + "images", {
            params: { artwork_id: art.artwork_id },
          })
          .then((res) => {
            console.log(res);
            for (let i = 0; i < res.data.data.length; i++) {
              this.images.push({
                path: res.data.data[i].img_path,
                id: res.data.data[i].img_id,
              });
            }
          });
        this.forceRerender();
        this.scrollToElement("photo-slider");
      }
    },
    hideInstr() {
      this.how_to_buy = false;
    },
    hideOrder() {
      this.show_order = false;
    },
    hideOrderList() {
      this.show_order_list = false;
    },

    removeFromOrder(order) {
      for (let i = 0; i < this.order_list.length; i++) {
        if (order === this.order_list[i]) {
          this.order_list.splice(i, 1);
          this.total_price -= order.artwork_price;
        }
      }
      for (let i = 0; i < this.artworks.length; i++) {
        if (order === this.artworks[i]) {
          this.artworks[i].sold = false;
        }
      }
    },

    showArtwDetails() {
      this.scrollToElement("chosen-artwk");
    },
    showInstr() {
      this.how_to_buy = true;
    },
    showOrder() {
      this.show_order = true;
    },
    showOrderList() {
      this.show_order_list = true;
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
    total_price: {
      handler() {
        this.componentKey += 1;
      }
    }
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
button {
  width: 5vw;
  height: 2.5vw;
  font-size: 1.2rem;
  font-weight: 800;
  color: #27f2cb;
  background-color: #545454;
}
input {
  width: 10vw;
}
p {
  color: #545454;
  text-align: start;
}
.artw-title {
  font-size: 1.2rem;
  font-weight: 800;
  text-align: start; /*
  width: 20vw;*/
  align-self: center;
}
.btn-buy {
  align-self: center;
}
.btn-buy:disabled {
  opacity: 0.2;
}
.buy-nav-div {
  position: fixed;
  top: 15vh;
  left: -2rem;
  z-index: 2;
}

.buy-nav,
.exit {
  width: 15vw;
  border-bottom: 5px solid #27f2cb;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  cursor: pointer;
}
.check-order-btn {
  border: 3px dotted #27f2cb;
  cursor: pointer;
  width: 10vw;
  margin-left: 2rem;
}
.chosen-artwk {
  border: 5px solid #545454;
  width: 20vw;
  margin-bottom: 2rem;
  background-color: #ced0d1;
  height: 65vh;
}
.chosen-artwk .prev-img {
  width: 18vw;
}

.dtls-nav-div {
  position: fixed;
  top: 85vh;
  left: 85vw;
  z-index: 2;
}
.exit-order {
  width: 15vw;
  border-bottom: 5px solid #27f2cb;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;
}

.hide {
  visibility: hidden;
  height: 0;
}
.inpts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3vh;
}
.order {
  width: 15vw;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ced0d1;
  border-bottom: 3px solid #27f2cb;
}
.order-delete {
  width: 13vw;
  text-align: end;
  cursor: pointer;
}
.order-exit {
  position: absolute;
  top: 1rem;
  left: 65vw;
  font-size: 3rem;
  cursor: pointer;
}
.order-img {
  width: 15vw;
  height: 20vh;
  object-fit: contain;
  background-color: #d4d4d4;
}
.order-list {
  width: 67vw;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 10vh;
  margin-left: 1rem;
}
.order-list-div {
  position: fixed;
  width: 70vw;
  min-height: 80vh;
  top: 10vh;
  left: 15vw;
  background-color: white;

  overflow-y: scroll;
  border: 4px solid #545454;
}
.order-list-title {
  margin-top: 1rem;
  font-size: 3rem;
  width: 65vw;
}
.order-nav,
.dtls-nav {
  width: 15vw;
  border-bottom: 5px solid #27f2cb;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;
}
.order-nav-div {
  position: fixed;
  top: 10vh;
  left: 85vw;
  z-index: 2;
}
.order-form {
  position: fixed;
  left: 85vw;
  top: 15vh;
  background-color: white;
  width: 15vw;
}
.order-top-line {
  width: 60vw;
  position: absolute;
  top: 0;
  left: 0;
}
.order-total-price {
  position: absolute;
  top: 1rem;
  left: 1rem;
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
  object-fit: contain;
  background-color: #d4d4d4;
  cursor: pointer;
}
.prev-div {
  width: 20vw; /*
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
  gap: 0.5rem; /*
  margin-left: 1rem;*/
  margin-top: 1rem;
  width: 20vw;
  height: 30vh;
}
.prev-desc-txt {
  margin-left: 1rem;
}
.prev-gallery {
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
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
.tooltip .tooltip-txt {
  visibility: hidden;
  background-color: #545454af;
  color: #545454;
  position: absolute;
  margin-left: -5.5vw;
  margin-top: -1rem;
  background-color: #63f8daab;
  width: 10vw;
  transition-delay: 0.2s;
}
.tooltip:hover .tooltip-txt {
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