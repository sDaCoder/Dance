const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { };
    res.status(200).render('home.pug', params);
})

app.post('/', (req, res) => {
    name = req.body.name;
    phone = req.body.phone;
    address = req.body.address;
    email = req.body.email;

    let outputWrite = `The name of the client is ${name}, bearing phone number ${phone}, residing at ${address}. His/Her email is: ${email}`;
    fs.writeFileSync('output.txt', outputWrite);
    const params = {'message': 'Your form has been submitted successfully'};
    res.status(200).render('index.pug', params);
    
})
 
app.get('/contact', (req, res)=>{
    const params = { };
    res.status(200).render('contact', params);
})
 



//* START THE SERVER 
app.listen(port, () => {
    console.log(`The fu**ing dance website started successfully on port http://localhost:${port}`);
})