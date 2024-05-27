const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./src/routes/UserRoutes');
const breweryRoutes = require('./src/routes/BreweryRoutes');
const beerRoutes = require('./src/routes/BeerRoutes');
const reviewRoutes = require('./src/routes/ReviewRoutes');

const app = express();
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//RUTAS
app.use('/users', userRoutes); //Mount the user routes
app.use('/breweries', breweryRoutes);
app.use('/beers', beerRoutes);
app.use('/reviews', reviewRoutes);

app.use('/uploads', express.static('uploads'));
require('dotenv').config();

//conexion con BD
const CONNECTION_PORT = process.env.PORT || 3002;
app.listen(CONNECTION_PORT, () => {
    console.log(`Server running on port ${CONNECTION_PORT}`);
});