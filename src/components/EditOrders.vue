<template>
  <div class="order-list">
    <div class="top-line">
      <h1>LIST ORDERS</h1>
      <i class="fas fa-times" @click="exit"></i>
    </div>
    <div class="btns">
      <button @click="showOrdered">ORDERED</button>
      <button @click="showSent">SENT</button>
      <button @click="showReceived">RECEIVED</button>
    </div>
    <transition name="fade" mode="out-in">
      <div class="ordered" v-if="show">
        <div class="order" v-for="(order, index) in orders" :key="'o' + index">
          <div class="order-dtls">
            <div class="order-top-line">
              <div class="order-top-txt">
                <p>Order id:</p>
                <p>{{ order.order_id }}</p>
              </div>
              <div class="order-top-txt">
                <p>Order ordered:</p>
                <p>{{ order.order_ordered }}</p>
              </div>
              <div class="order-top-txt">
                <p>Order sent:</p>
                <p>{{ order.order_sent }}</p>
              </div>
              <div class="order-top-txt">
                <p>Order received:</p>
                <p>{{ order.order_received }}</p>
              </div>
            </div>
            <div class="cust_dtls">
              <p class="row-title">Customer information:</p>
              <div class="cust-info">
                <p>{{ order.cust_fullname }}</p>
                <p>{{ order.cust_email }}</p>
                <p>{{ order.cust_address }}</p>
                <p>{{ order.cust_city }}</p>
                <p>{{ order.cust_country }}</p>
                <p>{{ order.cust_phone }}</p>
              </div>
            </div>
            <div class="order-items">
              <p class="row-title">Ordered items:</p>
              <div class="order-items-list">
              <div class="order-item" v-for="(artwork, index) in order.artworks" :key="'a' + index">
                <img width="200px" :src="artwork.artwork_imgpath" />
                <p>{{ artwork.artwork_title }}</p>
                <p>{{ artwork.artwork_price }}€</p>
              </div>
              </div>
            </div>
            <div class="total-price">
              <p>Total price:</p>
              <p>{{ order.order_totalprice }} €</p>
            </div>
          </div>
          <div class="order-btns">
            <button @click="orderSent(order)" v-if="order.order_sent === null">
              SENT
            </button>
            <button @click="orderReceived(order)" v-if="order.order_received === null">
              RECEIVED
            </button>
            <button @click="orderCanceled(order)">CANCEL</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    order_list: Array,
  },
  data() {
    return {
      show: false,
      orders: [],
    };
  },
  methods: {
    exit() {
      this.$emit('exit')
    },
    orderCanceled(order) {
        this.$emit('cancel-order', order)
        for(let i = 0; i < this.orders.length; i++) {
            if(order.order_id === this.orders[i].order_id) {
                console.log(order)
            }
        }
    },
     orderReceived(order) {
        this.$emit('received-order', order)
    },
     orderSent(order) {
        this.$emit('sent-order', order)
    },
    showOrdered() {
      this.show = false;
      this.orders = [];
      for (let i = 0; i < this.order_list.length; i++) {
        if (
          this.order_list[i].order_sent === null &&
          this.order_list[i].order_received === null
        ) {
          this.orders.push(this.order_list[i]);
          this.show = true;
        }
      }
    },
    showReceived() {
      this.show = false;
      this.orders = [];
      for (let i = 0; i < this.order_list.length; i++) {
        if (this.order_list[i].order_received !== null) {
          this.orders.push(this.order_list[i]);
          this.show = true;
        }
      }
    },
    showSent() {
      this.show = false;
      this.orders = [];
      for (let i = 0; i < this.order_list.length; i++) {
        if (
          this.order_list[i].order_sent !== null &&
          this.order_list[i].order_received === null
        ) {
          this.orders.push(this.order_list[i]);
          this.show = true;
        }
      }
    },
  },
};
</script>
<style scoped>
h1{
 font-family: "HortaRegular", cursive;
 font-size: 3rem;
}
img{
width: 10vw;
height: 20vh;
object-fit: contain;
background-color: #7e7e7e;
}
.btns{
display: flex;
align-items: center;
justify-content: center;
gap: 1rem;
}
.cust_dtls{
display: flex;
align-items: flex-start;
justify-content: flex-start;
gap: 2rem;
border-bottom: 1px solid #27f2cb;
width: 50vw;
}
.cust-info{
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: .5rem;

}
.fa-times{
font-size: 3rem;
}
.order{
display: flex;
align-items: center;
justify-content: center;
width: 70vw;
gap: 5vw;
border-bottom: 5px solid #27f2cb;
margin-bottom: 5vh;
}
.ordered{
margin-top: 5vh;
}
.order-btns{
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 1rem;
width: 20vw;
}
.order-dtls{
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: 1rem;
width: 50vw;
border-right: 1px solid #27f2cb;
margin-bottom: 5vh;
}
.order-items{
display: flex;
align-items: flex-start;
justify-content: flex-start;
gap: 1rem;
border-bottom: 1px solid #27f2cb;
width: 50vw;
}
.order-item {
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;

}
.order-items-list{
display: flex;
flex-wrap: wrap;
width: 40vw;
align-items: flex-start;
justify-content: flex-start;
gap: 1rem;
}
.order-list{
margin-top: 10vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100vw;
}
.order-top-line{
display: flex;
align-items: flex-start;
justify-content: flex-start;
gap: 1rem;
border-bottom: 1px solid #27f2cb;
width: 50vw;
background-color: #F9FFF7;
font-size: 1.1rem;
}
.order-top-txt{
display: flex;
align-items: center;
justify-content: center;
gap: .5rem;
font-weight: 800;
}
.row-title{
width: 8vw;
}
.top-line{
display: flex;
align-items: center;
justify-content: flex-end;
gap: 36vw;
width: 90vw;
margin-top: 5vh;
}
.total-price{
display: flex;
align-items: flex-start;
justify-content: flex-start;
gap: 1rem;
font-size: 2rem;

}
</style>