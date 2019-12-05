import Vue from 'vue'
import VueStripeCheckout from 'vue-stripe-checkout'

const options = {
  key: process.env.STRIPE_PUBLISHABLE_KEY,
  locale: 'auto',
  currency: 'EUR',
}

Vue.use(VueStripeCheckout, options)