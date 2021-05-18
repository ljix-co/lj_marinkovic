<template>
  <div class="paypal-btn">
    <div style="text-align: center">
      <div id="paypal-button-container" ref="paypal"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    totalPrice: Number,
    order_list: Array,
  },
  data() {
    return {
      confirm_order: false,
    };
  },
  methods: {
    initPayPalButton() {
      console.log(this.totalPrice);
      console.log(this.order_list)
      let price = this.totalPrice;
      let order_list = this.order_list;
      // let emit = this.$emit("confirm-order");

      window.paypal
        .Buttons({
          style: {
            shape: "rect",
            color: "blue",
            layout: "vertical",
            label: "checkout",
          },

          commit: true,

          payment: function (data, actions) {
            return actions.payment.create({
              transactions: [
                {
                  amount: {
                    total: price,
                    currency: "EUR",
                  },
                  // soft_descriptor: 'ECHI5786786',
                  item_list: {
                    items: order_list,
                  },
                },
              ],
            });
          },

          onAuthorize: function (data, actions) {
            return actions.payment.execute().then(function () {
              // Show a confirmation message to the buyer
              window.alert("Thank you for your purchase!");
              // emit;
            });
          },

          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: { currency_code: "EUR", value: price },
                },
                //  soft_descriptor: 'ECHI5786786',
                {
                  item_list: {
                    items: order_list,
                  },
                },
              ],
            });
          },

          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              window.alert(
                "Transaction completed by " +
                  details.payer.name.given_name +
                  "!"
              );
              //  $emit('confirm-order')
              // emit;
            });
          },

          onError: function (err) {
            console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },
  },
  mounted() {
    this.initPayPalButton();
  },
};
</script>
<style scoped>
#paypal-button-container {
  margin-top: 4rem;
}
.paypal-btn {
  margin-top: 4rem;
}
</style>