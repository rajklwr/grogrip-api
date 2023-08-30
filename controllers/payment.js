

exports.createOrder = async(req, res, next) => {
    try {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

        const amount  = req.body.amount;

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                currency: 'USD',
                metadata: { integration_check: 'accept_a_payment' },
                amount : amount,
                description: 'YouTube Automation Services',
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