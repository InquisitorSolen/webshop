const functions = require("firebase-functions");

const express = require("express");
const app = express();

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST_KEY);

const bodyParser = require("body-parser");

const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/payment", cors(), async (req, res) => {
  let { price, id } = req.body;

  try {
    await stripe.paymentIntents.create({
      amount: price,
      currency: "huf",
      description: "AlkIO Vásárlás",
      payment_method: id,
      confirm: true,
      return_url: "https://webshop-d4135.firebaseapp.com/",
    });

    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    res.json({
      message: "Payment failed",
      success: false,
      error,
    });
  }
});

exports.api = functions.region("europe-west1").https.onRequest(app);
