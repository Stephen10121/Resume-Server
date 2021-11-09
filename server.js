const PORT = 80;
let https;
if (PORT == 80) {
  https = require("http");
} else {
  https = require("https");
}
const express = require('express');
const path = require('path');
const fs = require('fs');
const { getSubdomain, getPassword, hashIt, cpuAverage } = require('./functions.js');
const socketio = require('socket.io');
const { runInNewContext } = require("vm");
const cookieParser = require('cookie-parser')
let randKey;

const app = express();
app.set('view engine', 'ejs');
app.use(
    express.json(),
    express.static('public'),
    express.urlencoded({ extended: true }),
    cookieParser()
    );
let server;
if (PORT == 80) {
  server = https.createServer(app);
} else {
  server = https.createServer(
      {
          key: fs.readFileSync(path.join(__dirname,"key.key")),
          cert: fs.readFileSync(path.join(__dirname,"cert.crt"))
      },
      app
  );
}

const io = socketio(server);

app.get('/', async (req, res) => {
  let host = req.get('host');
  if (getSubdomain(host) == "admin") {
    res.render("preadmin");
  } else {
    res.render('index');
  }
});

// REMOVE THIS AFTER DEBUG OR IN PRODUCTION
app.get("/admin", (req, res) => {
  res.render("admin");
});

app.post("/verify", async (req, res) => {
  let host = req.get('host');
  if (getSubdomain(host) == "admin") {
    if (!req.body.submit || !req.body.password) {
      console.log("empty");
      res.redirect("/");
      return;
    }
    const password = req.body.password;
    if (await getPassword() !== hashIt(password)) {
      res.redirect("/");
      return;
    }
    randKey = hashIt(hashIt(password));
    res.cookie("G_VER", randKey);
    res.redirect("/panel");
  } else {
    res.redirect("/");
  }
});

app.get("/verify", async (req, res) => {
  res.redirect("/");
});

app.get("/panel", (req, res) => {
  let host = req.get('host');
  if (getSubdomain(host) == "admin") {
    if (!req.cookies["G_VER"]) {
      res.redirect("/");
      return;
    }
    if (req.cookies["G_VER"] !== randKey) {
      res.redirect("/");
      return;
    }
    res.render("admin");
  } else {
    res.redirect("/");
  }
});

app.get("/admin-logout", (req, res) => {
  res.clearCookie("G_VER");
  res.redirect("/");
});

app.get('/projects', (req, res) => {
  res.render('projects');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/random', (req, res) => {
  res.render('random');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/bubble', (req, res) => {
  res.render("bubble");
});

app.get('/sine', async (req, res) => {
    res.render('sine');
});

app.get('/cpanel', async (req, res) => {
    res.render('panel');
});

app.post("/contact", (req, res) => {
  res.render("contact", {message: "Message Sent!"});
});

let whiteList = new Object();
let startMeasure = cpuAverage();
let prevPercentage = 0;
io.on('connection', socket => {
  setInterval(()=>{
    var endMeasure = cpuAverage(); 
    var idleDifference = endMeasure.idle - startMeasure.idle;
    var totalDifference = endMeasure.total - startMeasure.total;
    var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
    if (percentageCPU != prevPercentage) {
      io.emit('adminCpu', percentageCPU);
      prevPercentage = percentageCPU;
    }
  }, 1000);
  socket.on("auth", async (data) => {
    let password = await getPassword()
    password = hashIt(password);
    if (data == password) {
      whiteList[socket.id] = 200;
      socket.emit("adminConnect", {id: socket.id, error: 200});
    } else {
      socket.disconnect();
      console.log("disconnected someone");
      //socket.emit("adminConnect", {error: 403});
    }
  });
  socket.on('disconnect', () => {
    delete whiteList[socket.id];
  });

  socket.on("test", (data) => {
    if (whiteList[socket.id]) {
      socket.emit("adminTest", "Hi there");
    } else {
      socket.emit("adminTest", {error: 403});
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));