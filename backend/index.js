require("dotenv").config();
// Imports
const express = require("express");
const cors = require("cors");
let path = require("path");

// Set Ports
const PORT = process.env.PORT || 8080;

// Initialize app
const app = express();

// Use public directory
app.use(express.static(path.join(__dirname, "public")));

// CORS
let corsOptions = {
  origin: "http://localhost:8100",
};

// Enable CORS
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// Database
const db = require("./models");

// Normal use. Doesn't delete  database
// db.sequelize.sync();

// Use { force: true } to drop and re-create all tables each time the server starts.
db.sequelize.sync({ force: false }).then(() => {
  console.log(
    "\n[SERVER] - Backend:  Welcome to Fleets backend server..... [OK] connected database.\n",
  );

  console.log("\n[DEBUG LOG] - Backend: MODELOS DISPONIBLES:", Object.keys(db));
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Bienvenid@  a Fleets" });
});

/*
//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use((req, res, next) => {
    // check header or url parameters or post parameters for token
    let token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue

    if(req.headers.authorization.indexOf('Basic ') === 0){
        // verify auth basic credentials
        const base64Credentials =  req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        // Inizilice req.body if empty
        if (!req.body) req.body = {};

        req.body.username = username;
        req.body.password = password;
        return next();
    };

    token = token.replace('Bearer ','');
     // .env should contain a line like JWT_SECRET=yourSecretKey
    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        } else {
            req.user = user; //set the user to req so other routes can use it
            req.token = token;
            next();
        }
    });
});
*/
require("./routes/dota.routes")(app);
require("./routes/employee.routes")(app);
require("./routes/incidence.routes")(app);
require("./routes/inventory.routes")(app);
require("./routes/unit.routes")(app);

app.listen(PORT, () => {
  console.log(`\n[SERVER] - Backend: Servidor corriendo en el puerto ${PORT}\n`);
});
