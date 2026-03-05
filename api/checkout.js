const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Επιτρέπουμε μόνο POST αιτήματα
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Εδώ δημιουργούμε τη συνεδρία πληρωμής
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Χειροποίητη Αγιογραφία', // Μπορείς να το αλλάξεις αργότερα
            },
            unit_amount: 15000, // Το ποσό σε λεπτά (150.00€)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Πεδίο για την αφιέρωση που λέγαμε
      custom_fields: [
        {
          key: 'dedication',
          label: { type: 'custom', custom: 'Αφιέρωση (Προαιρετικά)' },
          type: 'text',
        },
      ],
      // Πού θα γυρίσει ο χρήστης μετά την πληρωμή
      success_url: `${req.headers.origin}/success.html`,
      cancel_url: `${req.headers.origin}/index.html`,
    });

    // Στέλνουμε το URL της Stripe πίσω στο frontend
    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};