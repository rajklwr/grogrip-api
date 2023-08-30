

exports.createOrder = async(req, res, next) => {
    try {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

        const amount  = req.body.amount;

        try {

            const customer = await stripe.customers.create({
                name: 'Jenny Rosen',
                address: {
                  line1: '510 Townsend St',
                  postal_code: '98140',
                  city: 'San Francisco',
                  state: 'CA',
                  country: 'US',
                },
              });

            const paymentIntent = await stripe.paymentIntents.create({
                currency: 'USD',
                metadata: { integration_check: 'accept_a_payment' },
                amount : amount,
                description: 'YouTube Automation Services',
                shipping: {
                    name: 'Jenny Rosen',
                    address: {
                      line1: '510 Townsend St',
                      postal_code: '98140',
                      city: 'San Francisco',
                      state: 'CA',
                      country: 'US',
                    },
                  },
            });
            res.status(200).json({
                clientSecret: paymentIntent.client_secret
            })
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error });
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err });
    }
};