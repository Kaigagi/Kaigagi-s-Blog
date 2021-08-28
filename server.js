const fs = require('fs');
const express = require("express");
const mongoose = require("mongoose");
const Blog = require('./models/blog.js');

const app = express();

const dbURI ="mongodb+srv://kaigagi:Quan12345@cluster0.0q0cp.mongodb.net/KaigagiBlog?retryWrites=true&w=majority"
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((result) => {
        app.listen(process.env.$PORT)
        console.log("listening on port 3000");
    }).catch((err) => {
        console.log(err);
    });


app.set("view engine", "ejs");

app.use(express.urlencoded({extend: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    Blog.find()
        .then((result)=>{
            res.render("index",{blogs: result});
        }).catch((err)=>{
            console.log(err);
        })
})

app.get("/about",(req,res)=>{
    res.render("about");
})

app.get("/create",(req,res)=>{
    res.render("create");
})

app.post("/create-blog",(req,res)=>{
    let blog = new Blog({
        title: req.body.title,
        snippet : req.body.snippet,
        body: req.body.content
    })

    blog.save()
        .then((result)=>{
            res.redirect("/");
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.get("/detail/:id",(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render("detail",{blog: result});
    }).catch((err)=>{
        console.log(err);
    })
})

app.delete("/detail/:id",(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect: "/"});
    }).catch((err)=>{
        console.log(err);
    })
})

app.use((req,res)=>{
    res.render("404");
})
