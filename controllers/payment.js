

exports.createOrder = async(req, res, next) => {
    try {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

        const amount  = req.body.amount;

        try {

            const customer = await stripe.customers.create({
                name: 'Rajkiran Kalowar',
                address: {
                  line1: 'Gurgaon, Haryana',
                  postal_code: '122022',
                  city: 'Gurgaon',
                  state: 'Haryana',
                  country: 'IN',
                },
              });

            const paymentIntent = await stripe.paymentIntents.create({
                currency: 'USD',
                metadata: { integration_check: 'accept_a_payment' },
                amount : amount,
                description: 'YouTube Automation Services',
                shipping: {
                    name: 'Rajkiran Kalowar',
                    address: {
                        line1: 'Gurgaon, Haryana',
                        postal_code: '122022',
                        city: 'Gurgaon',
                        state: 'Haryana',
                        country: 'IN',
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