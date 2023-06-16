//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to The Daily Journal! We are thrilled to have you here. Whether you're a passionate reader, an enthusiastic writer, or someone seeking knowledge and inspiration, you've come to the right place. At our core, we are passionate about knowledge-sharing and fostering meaningful conversations. We believe that everyone has something valuable to contribute, and our blog serves as a hub where diverse ideas and perspectives converge. What can you expect from our blog? Well, we cover a vast array of subjects, catering to different interests and curiosities. Whether you're into technology, science, arts and culture, personal development, or any other exciting field, we've got you covered.";

const aboutContent = "Our team of knowledgeable writers and experts strive to deliver well-researched, thought-provoking, and engaging articles that aim to inform, entertain, and inspire our readers. We go beyond the surface to dive deep into the intricacies of various topics, offering unique insights and perspectives that you won't find elsewhere. As a reader, you are an integral part of our blog community. We encourage you to share your thoughts, opinions, and experiences in the comments section of each article. We value the power of open dialogue and believe that the exchange of ideas can broaden our collective understanding. To stay connected with us and never miss an update, be sure to subscribe to our newsletter and follow us on social media platforms. This way, you'll receive notifications about our latest articles, exclusive content, and exciting events.";

const contactContent = "Welcome to our Contact Us page! We're thrilled that you'd like to get in touch with us. Whether you have a question, suggestion, partnership opportunity, or just want to say hello, we're here to listen and respond.";

const app = express();
// mongoose.connect('mongodb://127.0.0.1:27017/BlogDB');

mongoose.connect("mongodb+srv://virustrojangoku:Arth4094@cluster0.q9xjbud.mongodb.net/blogDB");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// DATABASE

const composeSchema = {
  title : String,
  content : String
}

const Compose = mongoose.model("Compose", composeSchema);












// let posts = [];

app.get("/", function(req, res){


  Compose.find({}).then((foundPosts) => {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: foundPosts
      });
});
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Compose({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save().then((err)=>{
    res.redirect("/");
  });

  // console.log("Post save Successfully");



});

app.get("/posts/:postId", function(req, res){
  // const requestedTitle = _.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId;

  Compose.findOne({_id:requestedPostId}).then((post)=>{
    res.render("post" , {
      title: post.title,
      content: post.content
    });
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
