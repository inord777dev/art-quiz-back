const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use("/top10", function(request, response){
     
    response.send("<h1>TOP10</h1>");
});
app.listen(3000);