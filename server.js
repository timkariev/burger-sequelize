const express = require('express');
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const path = require('path');

// port
let PORT = process.env.PORT || 8080;

//initializes express
let app = express();

// requiring our models for syncing
let db = require(path.join(__dirname, '/models'));

// serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// method override
app.use(methodOverride('_method'));

// set handlebars
let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./controllers/burger_controller")(app);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync().then(function(){
  app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
});
