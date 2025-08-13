import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended:true }));

const posts = [];

app.get("/" , (req , res)  => {
 res.render("index.ejs", {posts});
});

app.get("/new" , (req ,res) =>{
 res.render("newPost.ejs");
});

//Adds a new post
app.post("/new", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  if (title && content) {
    posts.push({ title, content });
    res.redirect("/");
  } else {
    res.redirect("/new"); 
  }
});

//Edits the post and save changes
app.get("/edit/:index", (req , res) => {
   const i = Number(req.params.index);
   const post = posts[i];
   if(!post) return res.status(404).send("Post not found");
   res.render("edit.ejs", {index: i , post});
});

app.post("/edit/:index" , (req , res)=>{
 const i = Number(req.params.index);
 if(!posts[i]) return res.status(404).send("Post not found");

 const title = req.body.title.trim();
 const content = req.body.content.trim();

 if(!title || !content){
    return res.redirect("/");
 }

 posts[i] = {title,content};
 res.redirect("/");
});

// Deletes the post
app.post("/delete/:index", (req , res) =>{
  const i = Number(req.params.index);
  if(!posts[i]) return res.status(404).send("Post not found");

  posts.splice(i , 1);
  res.redirect("/");
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
