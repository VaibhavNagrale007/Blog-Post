const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contactContent = "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?";
const journal = [];

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("index", {homeText: homeStartingContent, journals: journal});
})

app.post("/", function(req, res){
    console.log(req.body);
    console.log("hello");
    var data = {
        tle : req.body.title,
        cont: req.body.contentText
    }
    journal.push(data);
    res.redirect("/");
})

app.get("/about", function(req, res){
    res.render("about", {aboutus: aboutContent});
})

app.get("/contact", function(req, res){
    res.render("contact", {contactus: contactContent});
})

app.get("/compose", function(req, res){
    res.render("compose", {contactus: contactContent});
})

app.get("/posts/:postName", function(req, res){
    const requestedTitle = _.lowerCase(req.params.postName);
    console.log("--out-->"+req.params.postName);
    // for (let i = 0; i < journal.length; i++) {
    //     const storedTitle = _.lowerCase(journal[i].tle);
    //     if (requestedTitle === storedTitle){
    //         res.render("posts",{title: journal[i].tle, content: journal[i].cont});
    //     }
    // }
    journal.forEach(function(post){
        const storedTitle = _.lowerCase(post.tle);
        if (requestedTitle == storedTitle){
            res.render("posts",{title: post.tle, content: post.cont});
        }
    });
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server 3000 is up and running.");
})
