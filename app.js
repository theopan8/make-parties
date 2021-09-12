// Initialize express
const express = require('express');
const methodOverride = require('method-override');
const app = express();
// require handlebars
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const models = require('./db/models');

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');
app.use(express.urlencoded());
app.use(methodOverride('_method'));

require('./controllers/events')(app, models);
require('./controllers/rsvps')(app, models);

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
    console.log('App listening on port 3000!')
});