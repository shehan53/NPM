var express = require("express")
var app = express()
var db = require("./database.js")
var cron = require('node-cron');
var bodyParser = require("body-parser");
const { request, response } = require("express");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let HTTP_PORT = 8080
const cors = require('cors');
app.use(cors({
    origin: '*'
}));



// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});



app.post("/api/customer/register/", (req, res, next) => {

    try {
        var errors = []

        if (!req.body) {
            errors.push("An invalid input");
        }

        const { 
            name, 
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expirytDate,
            cvv,
            timeStamp,
        } = req.body;

        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const creditCardRegEx = /^\d[0-9]{12}$/;
        //validate email address
        if (emailRegEx.test(email)!=true) {
            res.status(400).send('Invalid email address');
            return;
        }
        //validate credit card 12 digits
        if (creditCardRegEx.test(cardNumber)!=true) {
            res.status(400).send('Invalid credit card number,only 12 digit allowed');
            return;
        }


        var sql = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expirytDate,cvv,timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
        var params = [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expirytDate,cvv,timeStamp]
        db.run(sql, params, function (err, result) {

            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.status(201).json({
                    "message": "customer " +name+ " has registered",
                    "inpm run d": this.lastID
                })
            }

        });
    } catch (E) {
        res.status(400).send(F);
    }
});



    




// Root path
app.get("/", (req, res, next) => {
    res.json({ "message": "University of Moratuwa" })
});