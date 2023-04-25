const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

mongoose.set({});
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB successfully");
});

const articlesSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articlesSchema);

app.route("/articles")

    .get((req, res) => {

        Article.find({}).then((results) => {
            console.log(res);
            res.send(results);
        }).catch((err) => {
            console.log(err);
        })

    })

    .post((req, res) => {

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })

        console.log(req.body.title);
        console.log(req.body.content);

        newArticle.save().then((result) => {
            console.log(result);
            res.send("added successfullty " + result);
        }).catch((err) => {
            console.log(err);
        })

    })

    .delete((req, res) => {

        Article.deleteMany({}).then((result) => {
            console.log(result);
            res.send("deleted successfullty " + result);
        }).catch((err) => {
            console.log(err);
        })

    });


app.route("/articles/:articleTitle")


    .get((req, res) => {
        
        console.log(req.params.articleTitle);
        let articleTitle = req.params.articleTitle.replace(/-/g," ");
        console.log(articleTitle);

        Article.findOne({ 
            title : new RegExp(`^${articleTitle}$`, 'i') 
        })
        .then((result) => {
            console.log(result);
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })


    })
    .put((req, res) => {
        console.log(req.params.articleTitle);
        let articleTitle = req.params.articleTitle.replace(/-/g," ");
        console.log(articleTitle);

        Article
        .updateOne({ title : new RegExp(`^${articleTitle}$`, 'i') }, { title: req.body.title, content: req.body.content })
        .then((result) => {
            console.log(result);
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });

    })
    .delete((req, res) => {

    });


let port = process.env.PORT;

if (port == null || port == "") port = 3000;

app.listen(port, () => {
    console.log("Server has started Succusfully");
})


/* 
{
  _id: ObjectId("61a31d8947d77d3c384c8b45"),
  title: "MERN Stack",
  author: "John Smith",
  content: "This article explains how to use the MERN stack to build web applications."
}
You have set up an Express.js route to handle GET requests to the URL /articles/:articleTitle, where :articleTitle is a route parameter that corresponds to the title of an article.

Suppose a user visits the URL /articles/mern-stack in their web browser. The Express.js server receives the GET request and triggers the handler function associated with the /articles/:articleTitle route.

The code inside the handler function first logs the article title to the console: console.log(req.params.articleTitle). In this case, the article title is "mern-stack".

Next, the code replaces any hyphens in the article title with spaces using the .replace(/-/g, " ") method. In this case, the updated article title is "mern stack", which is logged to the console using console.log(articleTitle).

The code then uses Article.findOne() to search for a document in the Article collection that matches the updated article title. The regular expression created with new RegExp() matches the updated article title exactly, but case-insensitively. This means that the search will return articles with titles that match the updated title regardless of capitalization or formatting.

In this case, the search will find the document with the title "MERN Stack", since it matches the regular expression created from the updated title.

*/