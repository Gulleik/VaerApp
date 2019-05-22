const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")

const Port = process.env.PORT || 3000;
var app = express();
 
 
const PublicDirectoryPath = path.join(__dirname, "../Public");
const ViewsPath = path.join(__dirname, "../Views");
const PartialsPath = path.join(__dirname, '../Views/Partials');
  
     
app.set("view engine", "hbs");   
app.set("views", ViewsPath);
hbs.registerPartials(PartialsPath);

app.use(express.static(PublicDirectoryPath));

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    fs.appendFile(`ServerLog`, log + `\n`,(err) =>{
        if(err){
            console.log("klarte ikke å koble til FS");
        }
    })
    next();  
});

 //app.use((req,res,next) =>{
 //    res.render("Maintanence.hbs");
 //});

 
hbs.registerHelper("getCurrentYear", ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text)=>{
    return text.toUpperCase();
}) 

app.get(`/`, (req,res)=>{
    res.render("Home.hbs",{
        WelcomeMessage: "Her kommer været",
        PageTitle:"Gullis vær app"
    })
});
 
app.get("/about",(req,res)=>{
    res.render("about.hbs",{
        PageTitle:"About page",
        title: "About page",
    });
});

app.get("/help",(req,res)=>{
    res.render("help.hbs",{
        PageTitle:"Help page",
    });
});
   
app.get("/weather",(req,res)=>{
    if(!req.query.adresse){
        return res.send({error: "du må oppgi en adresse"});
    }
    geocode(req.query.adresse, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, weathermessage)=> {
            if(error){
                return res.send({error});
            }
            res.send({adresse: req.query.adresse,
                      location, 
                      weather: weathermessage});
        })
    })
    
});

app.get("*", (req,res)=>{
    res.render("error", {
        PageTitle: "404, page not found"
    }
    )
});

app.listen(Port, ()=>{
    console.log(`Serveren er oppe på ${Port}`)
});

