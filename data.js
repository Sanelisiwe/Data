
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var multer = require('multer');
var assert = require('assert');
var path = require('path');
var engine = require('consolidate');
var Jimp = require("jimp");
app.set('views',__dirname);
app.engine('html', engine.mustache);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var getPixels = require("get-pixels")
var mongoClient = require('mongodb').MongoClient;
var async = require('async');
var imageColour =  [];
var fs = require("fs");
const excel = require('node-excel-export');


async.waterfall([

function getPixelValuesFunction(callback) {
  var pix = [];
  
getPixels("./result.jpg", function(err, pixels) {
  if(err) {
    console.log("Bad image path")
    //return
  }
  
  pix = pixels.shape.slice();
  var pixHeight = pix[0];
  var pixWidth = pix[1];
  console.log("got pixels :: ",pixHeight)
  callback(null, pixHeight,pixWidth);
});
},
function getColourOfPixels(pixWidth, pixHeight, callback) {
  
  var imageColourArray = [];
  Jimp.read("./result.jpg", function (err, image) {

    var c = {};
    
    
   // console.log("Converted ::",c); 

  //  console.log("got pixelsss :: ",pixHeight)
  var hPixels= [];
  var count = 0;

  
    for(var i = 1; i<=pixWidth; i++)
    {
      //console.log ("pixWidth :: ", pixWidth);
      //var x = pixHeight*pixWidth;
      //console.log(x,"bbhbhb")
      

      for(var j = 1; j<=pixHeight; j++)
      {
        var c = Jimp.intToRGBA(image.getPixelColor(i,j));
       // if(c.r>0){
         //console.log("i : j", i,j);
          // hPixels.data = c.r;
          // hPixels.postions = {i,j};
          // var count = 5;
          // if(j>1){
          //   while(left>0){
          //    var test = Jimp.intToRGBA(image.getPixelColor(postions.i,postions.j-1));

          //     left--;

          //   }
          
          //


          // }
          

          imageColour[count]= {
            "data": c.r,
            "position" : {i,j}
          };

          imageColourArray[count] = [imageColour];
          
        //imageColour.colourValue=c.r;
          //var x,y=i,j;
          //imageColour.position = {i,j};
          //imageColourArray.push([i,j,c.r]);
          //console.log("Pixel Colour ::", c.r);
          //console.log("i,j :: ", i,j);
         // mongoClient.connect('mongodb://localhost:27017/ImageProcessing',function(err,db){
           // db.collection('ImageColuors').save(imageColour);
            //console.log("MOngo :: ",imageColour);
         // })
         count = count + 1;

          
          

       //}
        

      }
      //console.log("count : ",count,"for column Y: ", i );
      
    }
   //console.log("imageColour :: ", imageColour);
   callback(null,imageColour );

});

//console.log("imageColour :: ", imageColour[1]);
  

},

function drawingG( imageColour, callback) {

  var dataa='';
  for (var u = 0; u < imageColour.length; u++) {
    if (imageColour[u]!=undefined){
    //console.log("2 : ", imageColour[u].data);
    if(imageColour[u].data==0){
      dataa=dataa+imageColour[u].data+'\t'+imageColour[u].position.i+'\t'+imageColour[u].position.j+'\n';
    }
    

  }
  
 }

  fs.appendFile('result.xls', dataa, (err) => {
      if (err) throw err;
        console.log('File created');
  });

  callback(null,"done" );
}], function (err, result) {
  
});


// var cannyEdgeDetector = require('canny-edge-detector');
// var imageJS = require('image-js');
 
// Image.load('FS1P4b.jpg').then((img) => {
//   const grey = img.grey();
//   const edge = cannyEdgeDetector(grey);
//   return edge.save('edge.png');
// })


var server = app.listen(9000,function(){
  
    var port = server.address().port;
    var host = server.address().address;
    console.log('Listening on port http:' + host +":" + port);

});
