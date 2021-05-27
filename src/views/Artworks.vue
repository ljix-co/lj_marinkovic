<template>
  <div class="artworks">
    <photo-slider
      :class="{ fade: show_order_list }"
      class="photo-slider"
      :key="'p' + componentKey"
      v-if="images.length > 0"
      :images="images"
    ></photo-slider>
    <div class="buy-nav-div">
      <transition name="fade">
        <p class="buy-nav" @click="showInstr" v-if="how_to_buy === false">
          {{ $t("artworks.nav.how_to_buy") }}
        </p>
      </transition>
      <transition name="fade">
        <i class="fas fa-times exit" @click="hideInstr" v-if="how_to_buy"></i>
      </transition>
    </div>

    <div class="order-nav-div">
      <transition name="fade" mode="out-in">
        <p class="order-nav" @click="showOrder" v-if="show_order === false">
          {{ $t("artworks.nav.order") }}
        </p>
      </transition>
      <transition name="fade" mode="out-in">
        <i
          class="fas fa-times exit-order"
          @click="hideOrder"
          v-if="show_order"
        ></i>
      </transition>
      <i class="fas fa-shopping-bag cart-icon"></i>
      <p class="cart-amount" @click="showOrder">{{ num_cart }}</p>
      <transition
        name="fade-in-out"
        enter-active-class="slide-in-left"
        leave-active-class="slide-out-right"
      >
        <div class="order-form" v-if="show_order">
          <div class="tooltip">
            <span class="tooltip-txt" v-if="order_list.length === 0">{{
              $t("tooltips.nt_show")
            }}</span>
            <h3 class="check-order-btn" @click="showOrderList">
              {{ $t("artworks.nav.order_list") }}
            </h3>
          </div>
          <div class="inpts" v-if="order_list.length > 0">
            <label for="">{{ $t("artworks.inpt_lbl.fullname") }}</label>
            <input type="text" v-model="fullname" />
            <label for="">{{ $t("artworks.inpt_lbl.email") }}</label>
            <input type="text" v-model="email" />
            <label for="">{{ $t("artworks.inpt_lbl.country") }}</label>
            <select name="" id="" v-model="country">
              <option
                v-for="(i, index) in contry_index_arr"
                :key="'c' + index"
                :value="$t(`country_list[${i}].country`)"
              >
                {{ $t(`country_list[${i}].country`) }}
              </option>
            </select>
            <label for="">{{ $t("artworks.inpt_lbl.address") }}</label>
            <input type="text" v-model="address" />
            <label for="">{{ $t("artworks.inpt_lbl.city") }}</label>
            <input type="text" v-model="city" />
            <label for="">{{ $t("artworks.inpt_lbl.phone_num") }}</label>
            <input type="text" v-model="phone_num" />

            <button @click="confirmOrder()">
              {{ $t("buttons.confirm") }}
            </button>
          </div>
          <!--   <div id="smart-button-container" v-if="pay_option">
          <pay-pal-button
            :key="'PPb' + componentKey"
            :totalPrice="total_price"
            :order_list="order_list"
            @confirm-order="confirmOrder"
          ></pay-pal-button>
        </div>-->

          <div
            class="order-list-div"
            v-if="show_order_list && order_list.length > 0"
          >
            <div class="order-top-line">
              <h2 class="order-total-price">
                {{ $t("artworks.total_price") }} <b>{{ total_price }}</b
                >€
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
      </transition>
    </div>
    <div class="dtls-nav-div">
      <transition name="fade">
        <p
          class="dtls-nav"
          @click="showArtwDetails"
          v-if="chosen_artwork !== null"
        >
          {{ $t("artworks.nav.artw_dtls") }}
        </p>
      </transition>
    </div>
    <transition
      name="fade-in-out"
      enter-active-class="slide-in-right"
      leave-active-class="slide-out-left"
    >
      <div v-if="how_to_buy" class="shop-instruction-div">
        <div class="shop-instruction">
          <h2 class="how-to-instr">{{ $t("artworks.nav.how_to_buy") }}</h2>
          <p class="how-to-instr">{{ $t("artworks.how-buy") }}</p>
        </div>
      </div>
    </transition>
    <div class="pg-col" :class="{ fade: show_order_list }">
      <div class="preview">
        <div class="prev-gallery">
          <div
            v-for="(art, index) in artworks"
            :key="index"
            :class="{
              'chosen-artwk': art.chosen,
              'prev-div': art.chosen === false || !art.chosen,
            }"
          >
            <div
              v-lazyload
              class="tooltip"
              :class="{ 'tooltip-chsn': art.chosen }"
            >
              <img
                class="prev-img"
                :data-url="art.artwork_imgpath"
                alt=""
                src="../../public/images/placeholder.gif"
                @click="getImages(art)"
              />
              <span class="tooltiptxt">{{ $t("tooltips.nav") }}</span>
            </div>
            <div class="prev-desc">
              <p class="artw-title">{{ art.title.toUpperCase() }}</p>
              <div class="prev-desc-txt">
                <p>Artform:</p>
                <p class="prev-txt">
                  <b>{{ art.artform }}</b>
                </p>
              </div>
              <div class="prev-desc-txt">
                <p>Tehcnique:</p>
                <p class="prev-txt">
                  <b>{{ art.technique }}</b>
                </p>
              </div>
              <div class="prev-desc-txt">
                <p>Materials:</p>
                <p class="prev-txt">
                  <b>{{ art.material }}</b>
                </p>
              </div>
              <div class="prev-desc-txt">
                <p>Dimensions:</p>
                <p class="prev-txt">
                  <b>{{ art.artwork_dmns }}</b>
                </p>
              </div>
              <div class="prev-desc-txt">
                <p>Year:</p>
                <p class="prev-txt">
                  <b>{{ art.artwork_year }}</b>
                </p>
              </div>
              <div class="prev-desc-txt">
                <p>Price:</p>
                <p class="prev-txt">
                  <b>{{ art.artwork_price }}</b> €
                </p>
              </div>

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
    <confirmation
      v-if="order_success"
      :message="message"
      @confirm="confirm"
    ></confirmation>
    <wrong v-if="wrong" :message="message" @confirm="confirm"></wrong>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import PhotoSlider from "../components/PhotoSlider.vue";
import { checkLanguage } from "../mixins/checkLanguage.js";
import { scrollToElement } from "../mixins/scrollToElement.js";
import Confirmation from "../components/Confirmation.vue";
import Wrong from "../components/Wrong.vue";
// import PayPalButton from "../components/PayPalButton.vue";
// import PayPalButton from '../components/PayPalButton.vue';
export default {
  components: { PhotoSlider, Confirmation, Wrong },
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
      phone_num: "",
      show_order_list: false,
      buttonKey: 0,
      total_price: 0,
      num_cart: 0,
      order_success: false,
      message: "",
      wrong: false,
      contry_index_arr: [0, 1, 2],
      email_trigger: 0,
      cust_id: null,
      order_id: null,
      // pay_option: false,
    };
  },
  mixins: [checkLanguage, scrollToElement],
  methods: {
    ...mapActions(["changeLoader"]),
    buyArtwork(art) {
      this.order_list.push(art);
      localStorage.setItem("order_list", JSON.stringify(this.order_list));
      for (let i = 0; i < this.artworks.length; i++) {
        if (art === this.artworks[i]) {
          this.artworks[i].sold = true;
          this.buttonKey += 1;
          this.total_price += art.artwork_price;
          this.num_cart += 1;
        }
      }
    },
    chckOrderList() {
      if (!localStorage.getItem("order_list")) {
        this.order_list = [];
      } else {
        this.order_list = JSON.parse(localStorage.getItem("order_list"));
        this.num_cart = this.order_list.length;
        for (let art of this.order_list) {
          this.total_price += art.artwork_price;
          for (let i = 0; i < this.artworks.length; i++) {
            // console.log(art)
            if (art.artwork_id === this.artworks[i].artwork_id) {
              this.artworks[i].sold = true;
              // this.buttonKey += 1;
            }
          }
        }
      }
    },
    confirmOrder() {
      let formData = new FormData();
      this.order_id = null;
      if (
        this.fullname === "" ||
        this.email === "" ||
        this.address === "" ||
        this.city === "" ||
        this.country === "" ||
        this.phone_num === ""
      ) {
        this.message = this.$t("wrong.empty_fields");
        this.wrong = true;
      } else {
        if (!this.emailReg.test(this.email)) {
          this.message = this.$t("wrong.invld_email");
          this.wrong = true;
        } else {
          formData.append("cust_fullname", this.fullname);
          formData.append("cust_email", this.email);
          formData.append("cust_address", this.address);
          formData.append("cust_city", this.city);
          formData.append("cust_country", this.country);
          formData.append("cust_phone", this.phone_num);
          axios.post(this.baseUrl + "customers", formData).then((res) => {
            console.log(res);

            this.cust_id = res.data.cust_id;

            let email_txt = "";
            for (let i = 0; i < this.order_list.length; i++) {
              email_txt += `<li><p>${this.order_list[i].artwork_title}</p>
                        <img width="200px" src="${this.order_list[i].artwork_imgpath}"/>
                        <p>${this.order_list[i].artwork_price}€</p>
                        </li>`;
            }
            email_txt += ` <h2>Total price: ${this.total_price}€</h2>`;

            let orderFormData = new FormData();
            orderFormData.append("cust_id", this.cust_id);
            orderFormData.append("order_totalprice", this.total_price);
            orderFormData.append("email_txt", email_txt);
            axios.post(this.baseUrl + "orders", orderFormData).then((res) => {
              console.log(res);

              this.order_id = res.data.order_id;
              this.email_trigger += 1;
              for (let i = 0; i < this.order_list.length; i++) {
                let artwk_id = this.order_list[i].artwork_id;
                let orderListFormData = new FormData();
                orderListFormData.append("cust_id", this.cust_id);
                orderListFormData.append("order_id", this.order_id);
                orderListFormData.append("artwork_id", artwk_id);
                axios
                  .post(this.baseUrl + "order_list", orderListFormData)
                  .then((res) => {
                    console.log(res);
                  });
              }
            });
          });
        }
      }
    },
    // confirmCustomerInfo() {
    //   this.pay_option = true;
    // },
    confirm() {
      this.order_success = false;
      this.wrong = false;
      this.message = "";
      this.show_order_list = false;
      this.show_order = false;
    },
    closeOrderList() {
      this.show_order_list = false;
    },
    forceRerender() {
      this.componentKey += 1;
    },
    getArtworks() {
      this.changeLoader(true);
      axios.get(this.baseUrl + "artworks").then((res) => {
        console.log(res);
        this.artworks = res.data.data;
        // this.artworks[0].chosen = true;
        this.changeLoader(false);
        this.changeToLanguage();
        this.chckOrderList();
        // this.getImages();
      });
    },
    getImages(art) {
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
      this.chosen_artwork = art;
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
          this.forceRerender();
          this.scrollToElement("photo-slider");
        });
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
          this.num_cart -= 1;
          localStorage.setItem("order_list", JSON.stringify(this.order_list));
        }
      }
      for (let i = 0; i < this.artworks.length; i++) {
        if (order.artwork_id === this.artworks[i].artwork_id) {
          this.artworks[i].sold = false;
          console.log(this.artworks[i].sold);
          this.buttonKey += 1;
        }
      }
      if (this.order_list.length === 0) {
        this.show_order_list = false;
      }
    },

    showArtwDetails() {
      this.scrollToElement("chosen-artwk");
    },
    showInstr() {
      this.how_to_buy = true;
    },
    showOrder() {
      if (this.show_order === false) {
        this.show_order = true;
      } else {
        this.show_order_list = true;
      }
    },
    showOrderList() {
      this.show_order_list = true;
    },
  },
  computed: {
    ...mapState(["baseUrl", "loader", "curLanguage", "emailReg"]),
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
      },
    },
    email_trigger: {
      handler() {
        let email_txt = "";
        for (let i = 0; i < this.order_list.length; i++) {
          email_txt += `<li><p>${this.order_list[i].artwork_title}</p>
                        <img width="200px" src="${this.order_list[i].artwork_imgpath}"/>
                        <p>${this.order_list[i].artwork_price}€</p>
                        </li>`;
        }
        email_txt += ` <h2>Total price: ${this.total_price}€</h2>`;
        let emailFormData = new FormData();
        emailFormData.append("email_txt", email_txt);
        // emailFormData.append("cust_id", this.cust_id);
        emailFormData.append("order_id", this.order_id);
        axios.post(this.baseUrl + "send_email", emailFormData).then((res) => {
          console.log(res);
          this.message = this.$t("success.art_ord");
          this.order_success = true;
          localStorage.removeItem("order_list");
          this.order_list = [];
          this.num_cart = 0;
          this.total_price = 0;
        });
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
@keyframes slide_in_left {
  from {
    left: 100vw;
    opacity: 0.1;
  }
  to {
    left: 85vw;
    opacity: 1;
  }
}
@keyframes slide_in_right {
  from {
    left: -20vw;
    opacity: 0.1;
  }
  to {
    left: 0;
    opacity: 1;
  }
}
@keyframes slide_out_left {
  from {
    left: 0;
    opacity: 1;
  }
  to {
    left: -20vw;
    opacity: 0.1;
  }
}
@keyframes slide_out_right {
  from {
    left: 85vw;
    opacity: 1;
  }
  to {
    left: 120vw;
    opacity: 0.1;
  }
}
b {
  width: 10vw;
  margin-left: 1rem;
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
  width: 5vw;
}
select {
  width: 10vw;
  height: 5vh;
  border-radius: 0.5rem;
}
.artw-title {
  font-size: 1.2rem;
  font-weight: 800;
  text-align: center;
  width: 20vw;
  align-self: center;
}
.btn-buy {
  align-self: center;
  position: absolute;
  margin-top: 30vh;
}
.btn-buy:disabled {
  opacity: 0.2;
}
.buy-nav-div {
  position: fixed;
  top: 10vh;
  left: -2rem;
  z-index: 2;
}

.buy-nav,
.exit {
  width: 15vw;
  border-bottom: 3px solid #27f2cb;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 2vh;
  position: absolute;
}
.cart-amount {
  position: absolute;
  left: 10vw;
  width: 5vw;
  text-align: center;
  color: #545454;
  font-weight: 600;
}
.cart-icon {
  position: absolute;
  font-size: 1.8rem;
  left: 10vw;
  top: -1.5vh;
  color: #27f2cb;
  width: 5vw;
  text-align: center;
}
.check-order-btn {
  /*
  border: 3px dotted #27f2cb;*/
  width: 10vw;
  margin-left: 2rem;
  margin-top: 1rem;
  font-family: "HortaRegular", cursive;
  font-size: 1.8rem;
  border-bottom: 2px solid #27f2cb;
}
.check-order-btn:hover {
  color: #27f2cb;
}
.chosen-artwk {
  border: 5px solid #27f2cb;
  width: 20vw;
  margin-bottom: 2rem;
  background-color: #ced0d1;
  height: 75vh;
}
.chosen-artwk .prev-img {
  width: 18vw;
}

.dtls-nav-div {
  position: fixed;
  top: 85vh;
  left: 85vw;
}
.exit-order {
  width: 15vw;
  border-bottom: 3px solid #27f2cb;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 2.5vh;
  position: absolute;
}
.fade {
  opacity: 0.1;
}
.hide {
  visibility: hidden;
  height: 0;
}
.how-to-instr {
  width: 15vw;
  text-align: justify;
  margin-left: 1rem;
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
}
.order-exit {
  position: absolute;
  top: 1vh;
  left: 45vw;
  font-size: 2rem;
}
.order-img {
  width: 15vw;
  height: 20vh;
  object-fit: contain;
  background-color: #d4d4d4;
}
.order-list {
  width: 45vw;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  margin-top: 20vh;
  margin-left: 2.5vw;
  position: absolute;
}
.order-list-div {
  position: fixed;
  width: 50vw;
  min-height: 60vh;
  top: 20vh;
  left: 25vw;
  background-color: #f9fff7;

  overflow-y: scroll;
  overflow-x: hidden;
  border: 3px solid #27f2cb;
}
.order-list-title {
  margin-top: 1rem;
  font-size: 2rem;
  width: 50vw;
  font-family: "HortaRegular", cursive;
}
.order-nav,
.dtls-nav {
  width: 15vw;
  border-bottom: 3px solid #27f2cb;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 2.5vh;
  position: absolute;
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
  top: 13vh;
  background-color: #f9fff7;
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
  left: 3rem;
  border-bottom: 1px solid #27f2cb;
  font-family: "HortaRegular", cursive;
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
  background-color: #7e7e7e;
}
.prev-div {
  width: 20vw; /*
  margin-left: 2rem;*/
  margin-bottom: 2rem;
  background-color: #ced0d1;
  height: 70vh; /*
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
  height: 50vh;
}
.prev-desc-txt {
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.prev-gallery {
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 5vh;
}
.prev-txt {
  width: 15vw;
  margin-left: 0.5rem;
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
  width: 18vw;
  background-color: #f9fff7;
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  position: fixed;
  top: 12.5vh;
  left: 0;
  z-index: 2;
}
.slide-in-left {
  animation: slide_in_left 1s 1;
}
.slide-in-right {
  animation: slide_in_right 1s 1;
}
.slide-out-right {
  animation: slide_out_right 2s 1;
}
.slide-out-left {
  animation: slide_out_left 2s 1;
}
.tooltip .tooltiptxt {
  position: absolute;
  margin-left: -20vw;

  background-color: #63f8daab;
  width: 20vw;
  transition-delay: 0.2s;
  visibility: hidden;
}
.tooltip-chsn .tooltiptxt {
  margin-left: -18vw;
  width: 18vw;
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