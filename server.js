// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;
var path = require('path')

// Arrays
var reservation = [];
var waitlist = [];

// // Test
// app.get("/", function(req, res) {
//   res.send("Huzzah!");
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// App listening
app.listen(PORT, function() {
    console.log("App is listening on PORT " + PORT);
});

// Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Adding to Reservation/Waitlist
app.post("/api/new", function(req, res) {

    var newReservation = req.body;
   // newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReservation);

    if (reservation.length < 5) {
    	reservation.push(newReservation);
    } else {
    	waitlist.push(newReservation);
    };    

    res.json(newReservation);
});

// Get lists
app.get("/api/:list", function(req, res) {
    var chosen = req.params.list;

    if (chosen === "reservation") {
        res.json(reservation);


   } else {
    	res.json(waitlist);
        }
    });