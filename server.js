var app, express;

express = require('express');
app = express();

app.use(express.static('./public'));
app.listen(8021);
