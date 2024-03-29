const express = require("express");
const cors = require("cors");
const os = require("os");
/* Routes */
const transactionsRoute = require("./routes/Transactions");
const categoriesRoute = require("./routes/Categories");
const currenciesRoute = require("./routes/Currencies");
const typesRoute = require("./routes/Types");
const prioritiesRoute = require("./routes/Priorities");
const attachmentsRoute = require("./routes/Attachments");
const db = require("./db");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8000;

app.get("/", (req, res) => {
  res.json({ message: "Hello There" });
});

app.use("/api/transactions", transactionsRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/currencies", currenciesRoute);
app.use("/api/types", typesRoute);
app.use("/api/priorities", prioritiesRoute);
app.use("/api/attachments", attachmentsRoute);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/api/lastTransaction", (req, res) => {
  const query = `SELECT ROWID FROM 'transaction' ORDER BY ROWID DESC LIMIT 1`;
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(400).json({ error: err.message });
    }
    console.log(rows);
    res.json({ rows });
  });
});
const networkInterfaces = os.networkInterfaces();
console.log(networkInterfaces);

const getInterface = (networkInterfaces) => {
  let int;
  if ("Ethernet" in networkInterfaces) {
    int = networkInterfaces.Ethernet[1].address;
  } else if ("en0" in networkInterfaces) {
    int = networkInterfaces.en0[1].address;
  }
  else if ("Wi-Fi" in networkInterfaces) {
    int = networkInterfaces['Wi-Fi'][1].address;
  }
  return int
};

const ip = getInterface(networkInterfaces);

//save ip variable to a json file in key "ip"
const fs = require("fs");
const data = { ip };
fs.writeFileSync("../public/ip.json", JSON.stringify(data));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
  console.log("local ip:", ip);
});

/* ERROR IF ENDPOINT DOES NOT EXIST */
app.use(function (req, res, next) {
  res.status(404).send({ error: "Not found" });
});
