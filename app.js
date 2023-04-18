const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static("public"));

mongoose.set({});
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: false});

const articlesSchema = {
    title : String,
    content : String
}

const Article = mongoose.model("Article", articlesSchema);

app.get("/", (req,res) =>{

    const newArticle = new Article({
        title : "REST",
        content : "REST defintion"
    })

    // newArticle.save().then(() =>{
    //     console.log("inserted");
    // }).catch((err) =>{
    //         console.log(err);
    //     });

    Article.find({}).then((docs)=>{
        console.log(docs);
    }).catch((err) =>{
        console.log(err);
    })
})

let port = process.env.PORT;

if(port == null || port == "") port = 3000;

app.listen(port, ()=>{
    console.log("Server has started Succusfully");
})