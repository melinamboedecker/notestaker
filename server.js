const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/Develop/public'));
app.use(express.static(__dirname + '/Develop/db'));

require('./Develop/routes/apiroutes')(app);
require('./Develop/routes/htmlroutes')(app);

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});