const express = require('express'); //include this from the library
 const app = express();

 const port = process.env.PORT || 3000;
 app.use('/', require('./routes'));  

 app.listen(port, () => {console.log(`Running on port ${port}`)});