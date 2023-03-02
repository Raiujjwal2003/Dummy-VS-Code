var express = require('express');
var router = express.Router();
var fs = require("fs");


router.get('/', function(req, res, ) {
  var filesaaa = [];
 var data =  fs.readdirSync('./uploads' , {withFileTypes:true});

  data.forEach(function(f){
    filesaaa.push({name:f.name , isFolder : f.isDirectory() });
  })
  res.render('index' , {data: filesaaa , filename:""});
});


router.get('/file/:filename', function(req, res, ) {
   
  var filesaaa=[];

  var data =  fs.readdirSync('./uploads' , {withFileTypes:true});

  data.forEach(function(f){
    filesaaa.push({name:f.name , isFolder : f.isDirectory() });
  })
 
  
  fs.readFile(`./uploads/${req.params.filename}`, "utf8" ,function(err,data){
    res.render("index",{data:filesaaa , filename:req.params.filename, filedata:data} );
  })
});


router.get("/filecreate",function(req, res){
  fs.writeFile(`./uploads/${req.query.filename}`," ", function(err,data){
    res.redirect("/")
  })
});

router.get("/ref",function(req, res){
  fs.readdir(`./uploads/${req.query.filename}`, function(err,data){
    res.redirect("/")
  })
});


router.get("/foldercreatebtn",function(req, res){
  fs.mkdir(`./uploads/${req.query.foldername}`, function(err){
    res.redirect("/")
  })
});


router.get("/delete/:name",function(req, res){
  fs.unlink(`./uploads/${req.params.name}`, function(err,data){
    res.redirect("/")
  })
});

router.post("/save/:filename",function(req, res){
  fs.writeFile(`./uploads/${req.params.filename}` , req.body.filedata , function(err, data){
    res.redirect("back");
  })
});

module.exports = router;
