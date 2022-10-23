const dotenv = require("dotenv");
dotenv.config();

const methodOverride = require("method-override");
const engineRender = require("ejs");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const pach = require("path");
const routes = require("./routers");

const server = express();
const exJson = express.json({ limit: "50mb" });
const bodyParser = express.urlencoded({ limit: "50mb", extended: true });

server.use(methodOverride("X-HTTP-Method")); //          Microsoft
server.use(methodOverride("X-HTTP-Method-Override")); // Google/GData
server.use(methodOverride("X-Method-Override")); //      IBM

server.use(exJson);
server.use(bodyParser);
server.use(morgan("dev"));
server.use(cors());

// server.use(upload.array());
const dirname = pach.join(__dirname, "/public");
console.log(dirname);
server.use(express.static(dirname));

// Configuracion de view engine para el rederizado de html
server.set("views", dirname);
server.engine("ejs", engineRender.renderFile);
server.set("view engine", "ejs");

// Rutas para el backend
server.use("/api/v1/", routes);

// Ruta para plantilla de UI
server.get("*", async (req, res) => {
  const data = {
    business: {
      name: "Hola mamonas",
    },
  };

  res.render("index.ejs", data);
});

server.listen(3030, () => {
  console.warn(`node server running on: http://localhost:3030/`);
  // Mostramos por consola la ruta del servidor
});
