const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const currentReservation = []

const waitingList = []

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", (req, res) => {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/all", (req, res) => {
    res.sendFile(path.join(__dirname, "all.html"));
});

// display
app.get("/api/reservations", (req, res) => {
    return res.json(currentReservation);
});

app.get("/api/waitlist", (req, res) => {
    return res.json(waitingList);
});

// Displays a current reservation, or returns false


// Create new current reservation - takes in JSON input
app.post("/api/reservations", (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newReservation = req.body;

    if (currentReservation.length > 1) {
        waitingList.push(newReservation)
    } else {
        currentReservation.push(newReservation)
    }
    res.json(newReservation);
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});