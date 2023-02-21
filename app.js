const express = require("express");
const bodyPaser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config({ path: require("find-config")(".env") });
app.use(express.json());
app.use(cors());

const login = require("./routes/login");
const ticket = require("./routes/ticket");
const badge = require("./routes/badge");
const checksum_lib = require("./paytm/checksum");
const config = require("./paytm/config");

const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });

app.use(bodyPaser.json({ limit: "50mb" }));
app.use(bodyPaser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use("/login", login);
app.use("/ticket", ticket);
app.use("/badge", badge);

app.use(express.static(path.join(__dirname, "Upload")));
const fileUpload = require("express-fileupload");
app.use(fileUpload());
app.set("view engine", "html");
// app.use('/uploads', express.static(__dirname + '/Upload'))
app.post("/upload-file", async (req, res) => {
  try {
    console.log(req);
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let avatar = req.files.files;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      avatar.mv("./Landuploads/" + avatar.name);

      // send response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          // size: avatar.size
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

const root = path.join(__dirname, "dist", "BioVeda");
app.get("*", function (req, res) {
  fs.stat(root + req.path, function (err) {
    if (err) {
      res.sendFile("index.html", { root });
      //document;
    } else {
      res.sendFile(req.path, { root });
    }
  });
});

// app.post("/paynow", [parseUrl, parseJson], (req, res) => {
//     // Route for making paymen

//     var paymentDetails = {
//       amount: req.body.price,
//       customerId: req.body.name,
//       customerEmail: req.body.email,
//       customerPhone: req.body.mobile
//   }
//   console.log(paymentDetails)
//   if(!paymentDetails.amount || !paymentDetails.customerId || !paymentDetails.customerEmail || !paymentDetails.customerPhone) {
//       res.status(400).send('Payment failed')
//   } else {
//       var params = {};
//       params['MID'] = config.PaytmConfig.mid;
//       params['WEBSITE'] = config.PaytmConfig.website;
//       params['CHANNEL_ID'] = 'WEB';
//       params['INDUSTRY_TYPE_ID'] = 'Retail';
//       params['ORDER_ID'] = 'TEST_'  + new Date().getTime();
//       params['CUST_ID'] = paymentDetails.customerId;
//       params['TXN_AMOUNT'] = paymentDetails.amount;
//       params['CALLBACK_URL'] = 'http://localhost:3000/callback';
//       params['EMAIL'] = paymentDetails.customerEmail;
//       params['MOBILE_NO'] = paymentDetails.customerPhone;

//       checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
//           var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
//           // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

//           var form_fields = "";
//           for (var x in params) {
//               form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
//           }
//           form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

//           res.writeHead(200, { 'Content-Type': 'text/html' });
//           res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
//           res.end();
//       });
//   }
//   });

mongoose
  .connect(
    "mongodb+srv://fardindev:OQQXVTimjmG6LspR@cluster0.tkbjee1.mongodb.net/tickets",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then((result) => {
    app.listen(5000, console.log("connected 5000"));
  })
  .catch((err) => {
    console.log(err);
  });
