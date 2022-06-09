

const express = require("express")
const app = express();
const _webpage =  require("./libs/webpage");


app.set('view engine', 'ejs');

app.get("/i/want/title", async (req,res) => {
    let {address} = req.query;
    if(typeof address !== "object") address = [address];
    const result = await Promise.all(address.map(address => _webpage.extractTitle(address)));

    res.render('home', {result: result});
});


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3000);