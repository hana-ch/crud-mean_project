const express = require('express') ;
const bodyParser = require('body-parser') ;
const mongoose = require('mongoose') ;
const cors = require('cors') ;
const users = require('./routes/users') ;

const app = express() ;


//Body parser middleware
// urlencoded et json sont les seuls qu'on a configuré dans postman y'en a formdata aussi // à voir la differance 
app.use(bodyParser.urlencoded({ extended: false})) ;
app.use(bodyParser.json());

app.use(cors({origin: '*'}));

//DB Config  : not used
// const db = require("./config/keys").mongoURI ;

//Connect to MongoDB
mongoose 
 .connect(
   "mongodb://localhost:27017/dbCRUD" ,
   {useNewUrlParser: true }   
 )
 .then(() => console.log("MongoDB Connected"))
 .catch(err => console.log("err" , err));

 // cors Midelware
 // app.use(cors()) ;

 //use Routes / net used yet 
 // routes tjrs à definir aprés tt le travail qu'on a fais 
 // ici on definit le reste de l'URL , la partie statique , l'URL dans routes est celui qu'on va changer  
 app.use("/api/users" , users) ;

 const port = process.env.PORT || 5000 ;
 app.listen(port, () => console.log(`Server running on port ${port}`)) ;