var express = require("express");
var fs = require("fs");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
const reservationFile = "./Reservation.json";

var reservation = [
  //   {
  //     routeName: "yoda",
  //     name: "1",
  //     role: "Jedi Master",
  //     age: 900,
  //     forcePoints: 2000
  //   },
  //   {
  //     routeName: "darthmaul",
  //     name: "2",
  //     role: "Sith Lord",
  //     age: 200,
  //     forcePoints: 1200
  //   },
  //   {
  //     routeName: "obiwankenobi",
  //     name: "3",
  //     role: "Jedi Master",
  //     age: 55,
  //     forcePoints: 1350
  //   },
  //   {
  //     routeName: "darthmaul",
  //     name: "4",
  //     role: "Sith Lord",
  //     age: 200,
  //     forcePoints: 1200
  //   },
  //   {
  //     routeName: "obiwankenobi",
  //     name: "5",
  //     role: "Jedi Master",
  //     age: 55,
  //     forcePoints: 1350
  //   },
  //   {
  //     routeName: "darthmaul",
  //     name: "6",
  //     role: "Sith Lord",
  //     age: 200,
  //     forcePoints: 1200
  //   },
  //   {
  //     routeName: "obiwankenobi",
  //     name: "7",
  //     role: "Jedi Master",
  //     age: 55,
  //     forcePoints: 1350
  //   },
  //   {
  //     routeName: "darthmaul",
  //     name: "8",
  //     role: "Sith Lord",
  //     age: 200,
  //     forcePoints: 1200
  //   },
  //   {
  //     routeName: "obiwankenobi",
  //     name: "9",
  //     role: "Jedi Master",
  //     age: 55,
  //     forcePoints: 1350
  //   }
];

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

if (fs.existsSync(reservationFile)) {
  fs.readFile(reservationFile, "utf8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      reservation = JSON.parse(data);
    }
  });
}

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/api/waitlist", function (req, res) {
  res.json(reservation.slice(5));
});

app.get("/api/tables", function (req, res) {
  res.json(reservation.slice(0, 5));
});

app.get("/tables", function (req, res) {
  // res.sendFile(path.join(__dirname, "tables.html"))
  const part1 = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Tables</title>
      <!-- Latest compiled and minified CSS & JS -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      <script src="https://code.jquery.com/jquery.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    </head>
    <body>
    <div class="jumbotron" style="text-align: center;">
        <h1 class="display-4">Current Reservations and Waiting List</h1>
        <svg class="bi bi-sun" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 8a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z"/>
            <path fill-rule="evenodd" d="M8.202.28a.25.25 0 00-.404 0l-.91 1.255a.25.25 0 01-.334.067L5.232.79a.25.25 0 00-.374.155l-.36 1.508a.25.25 0 01-.282.19l-1.532-.245a.25.25 0 00-.286.286l.244 1.532a.25.25 0 01-.189.282l-1.509.36a.25.25 0 00-.154.374l.812 1.322a.25.25 0 01-.067.333l-1.256.91a.25.25 0 000 .405l1.256.91a.25.25 0 01.067.334L.79 10.768a.25.25 0 00.154.374l1.51.36a.25.25 0 01.188.282l-.244 1.532a.25.25 0 00.286.286l1.532-.244a.25.25 0 01.282.189l.36 1.508a.25.25 0 00.374.155l1.322-.812a.25.25 0 01.333.067l.91 1.256a.25.25 0 00.405 0l.91-1.256a.25.25 0 01.334-.067l1.322.812a.25.25 0 00.374-.155l.36-1.508a.25.25 0 01.282-.19l1.532.245a.25.25 0 00.286-.286l-.244-1.532a.25.25 0 01.189-.282l1.508-.36a.25.25 0 00.155-.374l-.812-1.322a.25.25 0 01.067-.333l1.256-.91a.25.25 0 000-.405l-1.256-.91a.25.25 0 01-.067-.334l.812-1.322a.25.25 0 00-.155-.374l-1.508-.36a.25.25 0 01-.19-.282l.245-1.532a.25.25 0 00-.286-.286l-1.532.244a.25.25 0 01-.282-.189l-.36-1.508a.25.25 0 00-.374-.155l-1.322.812a.25.25 0 01-.333-.067L8.203.28zM8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" clip-rule="evenodd"/>
        </svg>
        <hr class="my-4">
        <p class="lead">We only have 5 tables! Book your seat before they all are gone!</p>
        <a class="btn btn-primary btn-lg" href="./reserve.html" role="button" id="reservation">Make Reservation</a>
        <a class="btn btn-secondary btn-lg" href="./home.html" role="button" id="reservation">Home</a>
      </div>
    <div class="card mb-4" id="currentReservations">
      <div class="card-header">`;
  const part2 = ` </div>
      </div>
    </div>
    <div class="card mb-4" id="waitingList">
      <div class="card-header">
        <h4><strong>Waiting List</strong></h4>
      </div>
      <div class="card-body">`;

  const part3 = `    </div>
      </div>
    </div>
    <div class="col-sm-12">
      <a href="/api/tables">API Table Link</a>
      <span>|</span>
      <a href="/api/waitlist">API Wait List</a>
    </div>
    </body>
    </html>`;

  var htmlOut = part1;
  let len = reservation.length;
  if (len > 5) len = 5;
  for (let index = 0; index < len; index++) {
    let count = index + 1;
    htmlOut += `<div class="well" id="tableWell-01"><h2><span class="label label-primary">${count}</span> | ${reservation[index].customerID}</h2></div>`;
  }

  htmlOut += part2;

  if (reservation.length > 5) {
    let count = 1;
    for (let index = 5; index < reservation.length; index++) {
      htmlOut += `<div class="well" id="tableWell-01"><h2><span class="label label-primary">${count}</span> | ${reservation[index].customerID}</h2></div>`;
      count++;
    }
  }

  htmlOut += part3;

  res.end(htmlOut);
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.post("/reserve", function (req, res) {
  var newReservation = req.body;

  console.log(newReservation);

  reservation.push(newReservation);

  fs.writeFile(reservationFile, JSON.stringify(reservation), function (error) {
    console.log(error);
  });
  res.end("successfully sent");
});
