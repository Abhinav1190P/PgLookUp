const dotenv = require("dotenv");
const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");
const cors = require('cors');
dotenv.config();

const corsOptions = {
  origin: 'http://localhost:5173/', 
  methods: 'GET,POST', 
  optionsSuccessStatus: 200 
};

// Add cors middleware with custom options
app.use(cors(corsOptions));

const server = http.createServer(app);

// db connect
mongoose
  .connect(config.mongooseUrl)
  .then(() => {
    console.log("mongodb connected");

    server.listen(config.port, () => {
      console.log(`Server running on port: ${config.port}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(0);
  });
