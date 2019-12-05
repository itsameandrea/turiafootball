const functions = require('firebase-functions')

const stripe = require('stripe')(functions.config().stripe.secret_key)
const admin = require('firebase-admin')

admin.initializeApp()

exports.processPayment = functions.https.onCall(({ token, user, game }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // create stripe customer
      const customer = await stripe.customers.create({
        email: user.email
      })
      
      // create stripe source
      const source = await stripe.customers.createSource(customer.id, {
        source: token
      })
      
      // process the charge
      await stripe.charges.create({
        amount: parseInt(game.price) * 100,
        currency: 'eur',
        customer: source.customer
      })
      
      // add charge to db
      const chargeRef = await admin
        .firestore()
        .collection('charges')
        .add({
          user,
          game,
          status: 'COMPLETED'
        })

      let charge = await chargeRef.get()
      charge = charge.data()

      resolve(charge)
    } catch (error) {
      console.log('Something went wrong...')
      console.log(error)
      reject(error)
    }
  })
})
