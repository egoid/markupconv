'use strict'

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var marked = require('marked');
var htmlparser = require("htmlparser2");


app.set('view engine','jade');
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/markup',function(req,res){
  res.send('markup')
})
app.post('/markup',function(req,res){
  var x = req.body
  x = x.markup
  var y = marked(x)
  var parsehtml='';
  var parser = new htmlparser.Parser({
    onopentag: function(name, attribs){
        if(name === "script" && attribs.type === "text/javascript"){
            console.log("JS! Hooray!");
        }
    },
    ontext: function(text){
        parsehtml+=text
    },
    onclosetag: function(tagname){
        if(tagname === "script"){
            console.log("That's it?!");
        }
    }
}, {decodeEntities: true});
parser.write(y)
res.render('html', { data: {'val': parsehtml }});

parser.end();


});
app.listen(3000);