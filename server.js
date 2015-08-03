var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    termColor = require("term-color");
  
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html'); // load our public/index.html file
});

app.listen(port);    

console.log(termColor.green("Server running on http://localhost:" + port))           



