const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static("public"));

mongoose.set({});
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB successfully");
});

const articlesSchema = {
    title : String,
    content : String
}

const Article = mongoose.model("Article", articlesSchema);

app.get("/articles", (req,res) =>{

    Article.find({}).then((results) => {
        // console.log(res);
        res.send(results);
    }).catch((err) => {
        console.log(err);
    })

})

app.post("/articles", (req,res) =>{

    

})

let port = process.env.PORT;

if(port == null || port == "") port = 3000;

app.listen(port, ()=>{
    console.log("Server has started Succusfully");
})