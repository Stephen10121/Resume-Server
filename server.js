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
const { getSubdomain, getPassword } = require('./functions.js');
const socketio = require('socket.io');
const { runInNewContext } = require("vm");

const app = express();
app.set('view engine', 'ejs');
app.use(
    express.json(),
    express.static('public'),
    express.urlencoded({ extended: true })
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

app.post("/verify", (req, res) => {
  let host = req.get('host');
  if (getSubdomain(host) == "admin") {
    if (!req.body.submit || !req.body.password) {
      console.log("empty");
      res.redirect("/");
      return;
    }
    const password = req.body.password;
    res.send(password);
  } else {
    res.redirect("localhost");
  }
});

app.get("/verify", async (req, res) => {
  //console.log(await getPassword());
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

io.on('connection', socket => {
  socket.on("test", (data) => {
    console.log(data);
    socket.emit("adminTest", data);
    socket.broadcast.emit("adminTest", data);
  });

  socket.on("height", (data) => {
    socket.emit("adminHeight", data);
    socket.broadcast.emit("adminHeight", data);
  });

  socket.on("width", (data) => {
    socket.emit("adminWidth", data);
    socket.broadcast.emit("adminWidth", data);
  });

  socket.on("amp", (data) => {
    socket.emit("adminAmp", data);
    socket.broadcast.emit("adminAmp", data);
  });

  socket.on("canvasHeight", (data) => {
    socket.emit("adminCanvasHeight", data);
    socket.broadcast.emit("adminCanvasHeight", data);
  });
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));