
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
    content : String,
    created : {type : Date,default : Date.now}
});

var blogModel = mongu.model("blog",blogSchema);

// blogModel.create({
//     title   : "First of many!!!",
//     image   : "/y0.jpeg",
//     content : "This is my first blog and start of something awesome!!! Hope to do something good and go a long way ;)"
// });

// ROUTES
// root
app.get("/",(req,res)=>{
    console.log("Get : root");
    res.redirect("/blogs");
})
// index
app.get("/blogs",(req,res)=>{
    console.log("Get : /blogs");
    blogModel.find({},(err , blogs)=>{
        if(err){
            res.send("<h1>Oops an error<h2>");
        }
        else{
            res.render("index",{pageBlogs : blogs});
        }
    })
    
});

// new
app.get("/blogs/new",(req,res)=>{
    console.log("Get : /blogs/new");
    res.render("new.ejs");
});

//Create
app.post("/blogs",(req,res)=>{
    // create new blog
    blogModel.create(req.body.blog,(err,newBlog)=>{
        if(err){
            res.render("/blogs/new");
        }
        else{
            res.redirect("/blogs");
        }
    });
    // redirects to blogs
    //res.redirect("/blogs");
})

app.listen(port,ip,()=>{
    console.log("Server started in port "+port+" and ip "+ip);
})