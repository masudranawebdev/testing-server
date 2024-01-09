
const express = require("express");
const app = express();
const cors = require("cors");
const httpStatus = require("http-status");
const connectDB = require("./server");
const routes = require('./src/routes/routes');
const globalErrorHandler = require("./src/middleware/global.error.handler");
const path = require('path');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Ecommerce App is working! YaY !");
});

// Import All Api
app.use('/api/v1', routes);
app.use('/api/v1/collectionImages', express.static(path.join(__dirname, 'collection.images')));
app.use('/api/v1/categoryImages', express.static(path.join(__dirname, 'category.images')));
app.use('/api/v1/subCategoryImages', express.static(path.join(__dirname, 'sub_category.images')));


//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});


connectDB();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Ecommerce app is running on port ${port}`);
});



// index.js -> routes -> route -> controllers -> services -> models.