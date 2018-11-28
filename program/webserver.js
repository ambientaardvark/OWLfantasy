const express = require("express");

class WebServer
{
    constructor(port)
    {
        this.server = express();
        this.port = port;
        this.server.get("/\/[a-zA-Z0-9]*/", function(req, res) { //todo figure out how to use regex
            res.send("test");
        });
        this.server.listen(this.port, function() {
            console.log("listening on " + this.port);
        });

        this.server.use(express.static("public"));
    }
}
module.exports = function() { return WebServer };