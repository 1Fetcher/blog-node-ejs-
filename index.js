const express = require('express');
const bodyParser = require('body-parser');
var _ = require('lodash');
const app = express();
app.use(express.static(__dirname+'/public'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))


const posts = [];
app.get('/',(req,res)=>{
   res.render('index',{posts}) 
})

app.get('/add',(req,res)=>{
    res.render('add');
})

app.post('/add',(req,res)=>{
    posts.push({
        title:req.body.postTitle,
        content:req.body.postData
    })
    res.redirect('/');
})
app.get('/posts/:postID',(req,res)=>{
   
const requestTitle = _.lowerCase(req.params.postID);
    posts.forEach(arr=>{
        const title = arr.title;
         const postData = arr.data
        if(title ==requestTitle){
            res.render('posts',{
                title:title,content:postData
            })
        }
    })
})

app.listen(3000,()=>{
    console.log('server is listening at port 3000');
})