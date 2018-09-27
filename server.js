const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear() + 1;
});

hbs.registerHelper('screamIt',(text)=>{ 
    return text.toUpperCase();
});

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    // console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err) {
            console.log('Cannot save log');
        };
        console.log(log);
    });
    next();
});
 
// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });

hbs.registerPartials(__dirname + '/views/partials');



app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/',(req, res)=>{
    var data = {
        pageTitle: 'home',
        welcomeMessage: 'Welcome to home page' ,
    }
    res.render('home.hbs',data);
});

app.get('/about',(req, res)=>{
    var myInfo = {
        pageTitle: 'About',
        name: 'steve',
        occupation: 'software engineer'
    };
    res.render('about.hbs', myInfo);
});

app.get('/portfolio',(req,res)=>{
    var data = {
        pageTitle: 'PortFolio'
    };
    res.render('portfolio.hbs',data);
})

app.get('/bad',(req,res)=>{
    var error = {
        errorMessage : 'cannot find the specified page'
    };
    res.send(error);
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port} port`);
});