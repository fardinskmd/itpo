const mongoose = require("mongoose");
const express = require("express");
const app = express();
var ba64 = require("ba64");
var base64ToImage = require("base64-to-image");
const login = require("../Model/login");
const qruser = require("../Model/qruser");
const ticketss = require("../Model/ticket");
const payments = require("../Model/payment");
const qrcode = require("qrcode");
const qrOption = {
  margin: 7,
  width: 175,
};
const badge = require("../Model/badge");
const price = require("../Model/price");
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");
const qs = require("querystring");
const checksum_lib = require("../paytm/checksum");
const config = require("../paytm/config");

const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });
const sendMail = async (email, name, price, date, urnno, citizentype) => {
  console.log("hello");
  const qrData = await qrcode.toDataURL(urnno);
  const ImageFileName = "img-" + Date.now();
  var base64Str = qrData;
  var filepath = path.join(__dirname, "../uploads/");
  var optionalObj = { fileName: ImageFileName, type: "png" };

  base64ToImage(base64Str, filepath, optionalObj);

  //  saveImage(qrData)
  const filePath = path.join(__dirname, "../view/email.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  var maillist = [email];
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "info@iitf2022tickets.com",
      pass: "zuvjlxreztvrqscw",
    },
  });

  const replacements = {
    nameData: name,
    priceData: price,
    dateData: date,
    urnData: urnno,
    citizenData: citizentype,
    qrData: ImageFileName,
  };

  maillist.toString();
  const htmlToSend = template(replacements);
  var mailOptions = {
    from: "info@iitf2022tickets.com",
    to: maillist,
    subject: "ITPO Ticket",
    html: htmlToSend,
    //   attachments: [{
    //     filename: 'image.png',
    //      content:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKlSURBVO3BQW7ARgwEwW5C///yxEeeFhAkOQ7DKvODNUaxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFEuHlL5TUm4Q+UkCScqvykJTxRrlGKNUqxRLl6WhDep3KHSJeFEpUvCSRLepPKmYo1SrFGKNcrFx1TuSMIdKicqX1K5IwlfKtYoxRqlWKNcDJOEO1QmKdYoxRqlWKMUa5RijVKsUYo1ysXHkvCbVLokdCpdEp5Iwl9SrFGKNUqxRrl4mcq/KQmdSpeETqVLwonKX1asUYo1SrFGMT/4D1O5IwmTFWuUYo1SrFHMDx5Q6ZLQqbwpCXeonCThROVNSfhSsUYp1ijFGuXiZSpdEjqVO5LQqXRJ6FTuUHkiCXeonCThiWKNUqxRijWK+cGLVE6S0Kl0SehUnkjCiUqXhE7lJAl/SbFGKdYoxRrF/OBDKidJ6FS6JHQqJ0noVL6UhE7ljiS8qVijFGuUYo1y8ZBKl4QuCScqJypdEu5IwolKl4QTlTuS8JuKNUqxRinWKBcPJeGJJDyh0iXhS0noVLokdCpdEjqVLglPFGuUYo1SrFEuHlL5TUnoknCHSpeETqVLQqfSJaFTOVH5UrFGKdYoxRrl4mVJeJPKicodSThJwh0qXRJOVL5UrFGKNUqxRrn4mModSfiSSpeETqVLQpeETqVTOUnCl4o1SrFGKdYoF/9zKicqJ0n4S4o1SrFGKdYoF8Mk4Q6VLgmdyonKHUn4UrFGKdYoxRrl4mNJ+FISOpUnVE6S0Kl0SThR6ZLwpmKNUqxRijXKxctUfpNKl4Q7VLokvEmlS8KXijVKsUYp1ijmB2uMYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVij/AP7h/zry1NuzwAAAABJRU5ErkJggg==',
    //     cid: 'unique@nodemailer.com' //same cid value as in the html img src
    // }]
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.paynow = (req, res) => {
  var paymentDetails = {
    amount: req.body.price,
    customerId: req.body.name,
    customerEmail: req.body.email,
    customerPhone: req.body.mobile,
  };
  console.log(paymentDetails);
  if (
    !paymentDetails.amount ||
    !paymentDetails.customerId ||
    !paymentDetails.customerEmail ||
    !paymentDetails.customerPhone
  ) {
    res.status(400).send("Payment failed");
  } else {
    var params = {};
    params["MID"] = config.PaytmConfig.mid;
    params["WEBSITE"] = config.PaytmConfig.website;
    params["INDUSTRY_TYPE_ID"] = "Retail";
    params["CHANNEL_ID"] = "WEB";
    params["ORDER_ID"] = req.body.ORDERID;
    params["CUST_ID"] = paymentDetails.customerId;
    params["MOBILE_NO"] = paymentDetails.customerPhone;
    params["EMAIL"] = paymentDetails.customerEmail;
    params["TXN_AMOUNT"] = paymentDetails.amount;
    params["CALLBACK_URL"] = "https://www.iitf2022tickets.com/badge/callback";

    var paytmChecksum = checksum_lib.generateSignature(
      params,
      config.PaytmConfig.key
    );
    paytmChecksum
      .then(function (result) {
        res.status(200).json({ data: result, params: params });
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

exports.callback = async (req, res) => {
  // console.log(req.body)
  const tickets = new payments(req.body);
  const newbadge = await tickets.save();

  if (req.body.STATUS === "TXN_SUCCESS") {
    try {
      // res.status(200).json({data:'success'})
      const email = req.body.ORDERID;
      const status = req.body.STATUS;
      res.redirect("/thankuPage");
      badge.find({ ORDERID: req.body.ORDERID }).then((data) => {
        console.log(data);
        for (let item of data) {
          sendMail(
            item.email,
            item.name,
            item.price,
            item.bookingDate,
            item.urnno,
            item.citizentype
          );
          item.paymentStatus = "Paid";
          item.save();
        }
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    // res.status(200).json({data:'success'})
    res.redirect("/failure");
  }
};

exports.updatePaymentStatus = async (req, res) => {
  let status = "";
  await paymentsfindOne({ ORDERID: req.body.ORDERID })
    .then((data) => {
      data.STATUS = req.body.STATUS;
      data.save();
      if (req.body.STATUS === "TXN_SUCCESS") {
        status = "Paid";
        badge.find({ email: req.body.ORDERID }).then((data) => {
          for (let item of data) {
            item.paymentStatus = paymentStatus;
            item.save();
          }
        });
      } else {
      }
      res.status(200).json({
        status: "success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};

const addPayment = async (data) => {
  try {
    await payments.create(data);
  } catch (error) {
    console.log("Payment Failed!");
  }
};

const { randomBytes } = require("crypto");

exports.addbadge = async (req, res) => {
  let urnno =
    9 +
    Math.random().toString(16).slice(50) +
    randomBytes(1).toString("hex") +
    Date.now();
  const {
    name,
    email,
    mobile,
    status,
    ticketid,
    price,
    date,
    citizentype,
    ORDERID,
    bookingDate,
  } = req.body;

  // const urnno= Math.random().toString(36).slice(36) + randomBytes(1).toString('hex') + new Date().getTime();
  if (ticketid == "636b010d90351e553fa1afa7") {
    try {
      const bypassstatus = "False";
      const tickets = new badge({
        name,
        email,
        mobile,
        status,
        ticketid,
        urnno,
        price,
        date,
        citizentype,
        bypassstatus,
        ORDERID,
        bookingDate,
      });
      const newbadge = await tickets.save();

      if (newbadge) {
        res.status(200).json({
          Message: "Badge Added Succsesfully",
          tickets,
        });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const bypassstatus = "True";
      const tickets = new badge({
        name,
        email,
        mobile,
        status,
        ticketid,
        urnno,
        price,
        date,
        citizentype,
        bypassstatus,
        ORDERID,
        bookingDate,
      });
      const newbadge = await tickets.save();
      console.log(newbadge.urnno);

      if (newbadge) {
        res.status(200).json({
          Message: "Badge Added Succsesfully",
          tickets,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

exports.getbadge = async (req, res) => {
  try {
    const getticket = await badge.find().populate("ticketid");
    console.log(getticket);
    return res.json(getticket);
  } catch (err) {
    console.log(err);
    res.json({ message: "no crop Found" });
  }
};
exports.getByNumber = async (req, res) => {
  console.log(Number(req.params.id));
  badge
    .find({ mobile: req.params.id })
    .then((data) => {
      console.log(data);
      res.status(200).json({
        resultData: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.getbadgedataBySMBID = async (req, res) => {
  console.log(req.params._id);
  badge
    .findOne({ sNo: req.params._id })
    .populate("ticketid")
    .then((result) => {
      res.status(200).json({
        resultData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Id not matched in records",
      });
    });
};

//get data by urn nunmber

exports.getbadgebyurnnumber = async (req, res) => {
  console.log(req.params.urnno);
  badge
    .findOne({ urnno: req.params.urnno })
    .populate("ticketid")
    .then((result) => {
      res.status(200).json({
        resultData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Id not matched in records",
      });
    });
};

exports.getbadgebycitizentype = async (req, res) => {
  let Id = req.body._id;
  console.log(req.body._id);
  let citizentype = req.body.citizentype;
  let date = req.body.date;

  price
    .find({ id: Id, citizentype: req.body.citizentype, date: req.body.date })
    .then((result) => {
      res.status(200).json({
        resultData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Id not matched in records",
      });
    });
};



exports.updatebadgestatus = async (req, res) => {
  try {
    const userid = req.body.userid;
    const status = req.body.status;
    const updateat = new Date().toLocaleTimeString();

    const updatetype = await badge.findByIdAndUpdate(req.body._id, {
      status,
      userid,
      updateat,
    });
    const updatelivestock = await updatetype.save();
    if (updatelivestock) {
      return res
        .status(200)
        .json({ msg: "livestock type update successfulley", updatelivestock });
    }
    return res
      .status(200)
      .json({ msg: "livestock type update successfulley", updatelivestock });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "something went wrong" });
  }
};

exports.getpaymentstatus = async (req, res, next) => {
  const payment = await payments.findOne({ ORDERID: req.body.ORDERID });

  if (!payment) {
    return next(new ErrorHandler("Payment Details Not Found", 404));
  }

  const txn = {
    id: payment.TXNID,
    status: payment,
  };

  res.status(200).json({
    success: true,
    txn,
  });
};

saveImage = (imageData) => {
  // Save base64 image to disk
  try {
    // Decoding base-64 image
    // Source: http://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
    function decodeBase64Image(dataString) {
      var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      var response = {};

      if (matches.length !== 3) {
        return new Error("Invalid input string");
      }

      response.type = matches[1];
      response.data = new Buffer(matches[2], "base64");

      return response;
    }

    // Regular expression for image type:
    // This regular image extracts the "jpeg" from "image/jpeg"
    var imageTypeRegularExpression = /\/(.*?)$/;

    // Generate random string
    var crypto = require("crypto");
    var seed = crypto.randomBytes(20);
    var uniqueSHA1String = crypto.createHash("sha1").update(seed).digest("hex");

    var base64Data =
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAZABkAAD/4Q3zaHR0cDovL25zLmFkb2JlLmN...";

    var imageBuffer = decodeBase64Image(base64Data);
    var userUploadedFeedMessagesLocation = "../img/upload/feed/";

    var uniqueRandomImageName = "image-" + uniqueSHA1String;
    // This variable is actually an array which has 5 values,
    // The [1] value is the real image extension
    var imageTypeDetected = imageBuffer.type.match(imageTypeRegularExpression);

    var userUploadedImagePath =
      userUploadedFeedMessagesLocation +
      uniqueRandomImageName +
      "." +
      imageTypeDetected[1];

    // Save decoded binary image to disk
    try {
      require("fs").writeFile(
        userUploadedImagePath,
        imageBuffer.data,
        function () {
          console.log(
            "DEBUG - feed:message: Saved to disk image attached by user:",
            userUploadedImagePath
          );
        }
      );
    } catch (error) {
      console.log("ERROR:", error);
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
};

exports.gettotalticket = async (req, res) => {
  try {
    await badge
      .find({ paymentStatus: "Paid" })
      .count()
      .then((userData) => {
        res.status(200).json({ Data: userData });
        console.log(userData);
      })

      .catch((err) => {
        res.status(500).json({ msg: err.message });
      });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.gettotalscaneeduser = async (req, res) => {
  try {
    await badge
      .find({ status: "Marked" })
      .count()
      .then((userData) => {
        res.status(200).json({ Data: userData });
        console.log(userData);
      })

      .catch((err) => {
        res.status(500).json({ msg: err.message });
      });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.gettotalscaneeduserdatainadmin = async (req, res) => {
  try {
    await badge
      .find({ paymentStatus: "Paid" })
      .populate("ticketid")
      .then((userData) => {
        res.status(200).json({ Data: userData });
        console.log(userData);
      })

      .catch((err) => {
        res.status(500).json({ msg: err.message });
        cosnole.log(err);
      });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//get ticketbooking data

exports.gettotalscaneeduserdata = async (req, res) => {
  try {
    await badge
      .find({ status: "Marked" })
      .then((userData) => {
        res.status(200).json({ Data: userData });
        console.log(userData);
      })

      .catch((err) => {
        res.status(500).json({ msg: err.message });
      });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getbuinessdaybooking = async (req, res) => {
  try {
    await badge
      .find({ ticketid: "636b00c990351e553fa1afa5" })
      .count()
      .then((userData) => {
        res.status(200).json({ Data: userData });
        console.log(userData);
      })

      .catch((err) => {
        res.status(500).json({ msg: err.message });
      });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getnonbuinessdaybooking = async (req, res) => {
  try {
    await badge
      .find({ ticketid: "636b010d90351e553fa1afa7" })
      .count()
      .then((userData) => {
        res.status(200).json({ Data: userData });
        console.log(userData);
      })

      .catch((err) => {
        res.status(500).json({ msg: err.message });
      });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.gettotalpayment = async (req, res) => {
  let abc = await badge.aggregate([
    {
      $group: {
        _id: "",
        Price: {
          $sum: "$price",
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  if (abc) {
    res.status(200).json({ Data: abc });
  } else {
    res.status(400).json({ Data: abc });
  }
};

const updateat = new Date().toLocaleTimeString();
console.log(updateat);
