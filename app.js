
var express     = require("express"),
    app         = express(),
    mongu       = require("mongoose"),
    bodyParser  = require("body-parser"),
    port        = process.env.PORT || 3000,
    ip          = process.env.IP || "127.0.0.1";


mongu.connect("mongodb://localhost/restfulBlogApp");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var blogSchema = new mongu.Schema({
    title   : String,
    image   : String,
    body    : String,
    created : {type : Date,default : Date.now}
});

var blogModel = mongu.model("blog",blogSchema);

// blogModel.create({
//     title   : "First of many!!!",
//     image   : "/y0.jpeg",
//     body    : "This is my first blog and start of something awesome!!! Hope to do something good and go a long way ;)"
// });

// ROUTES

// index
app.get("/blogs",(req,res)=>{
    res.render("index");
});

app.listen(port,ip,()=>{
    console.log("Server started in port "+port+" and ip "+ip);
})