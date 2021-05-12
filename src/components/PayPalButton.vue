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
  },
  data() {
    return {};
  },
  methods: {
    initPayPalButton() {
      console.log(this.totalPrice)
      let price = this.totalPrice
      window.paypal
        .Buttons({
          style: {
            shape: "rect",
            color: "gold",
            layout: "vertical",
            label: "paypal",
          },

          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [{ amount: { currency_code: "EUR", value: price } }],
            });
          },

          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              alert(
                "Transaction completed by " +
                  details.payer.name.given_name +
                  "!"
              );
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