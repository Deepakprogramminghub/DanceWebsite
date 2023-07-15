const express=require('express');
const path =require('path');
const app = express();
const mongoose = require('mongoose');
const bodyparser=require("body-parser");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

}
const port =800;
var ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    gender: String,
    address: String
  });
  var Contact = mongoose.model('Contact', ContactSchema);  
 app.use('/static',express.static('static'));                   // set the static file
 app.set('view engine','pug'); //set the template view for the pug
 app.set('views',path.join(__dirname,'views')) //set the directory for the template view

app.get('/',(req,res)=>{
    res.status(200).render('home.pug')
}
);
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug')
}
);
app.post('/contact',(req,res)=>{
var myData = new Contact(req.body);
 myData.save().then(()=>{
    res.send("This item has been saved to the database")
}).catch(()=>{
    res.status(400).send("Item was not saved to the database")
})
}
);
 app.listen(port,()=>{
    console.log("the application was started on the port 8000")
 }
 );
