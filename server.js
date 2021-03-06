var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require(`method-override`);
var app = express();
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/config/config.json')[env];
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
//requireing our models for syncing
var db = require("./public/js");
app.use(methodOverride('_method'));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
// new comment
