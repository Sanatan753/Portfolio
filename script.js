console.error("Why the FUCK YOU are in the Console ");

var website="https://tinywow.com/";
var name="Sanatan"
console.log(website);

let appels = 1;
const height = "6'0\"";

if ( name == "Sanatan"){
    let apples = 5;
    console.log("I have",apples,"apples") 
}

const express = require('express');
const bodyParser = require('body-parser');
const { loadModel } = require('sklearn-pickle');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Load your model
let model;
loadModel('linear_regression_model.pkl').then(loadedModel => {
    model = loadedModel;
}).catch(err => {
    console.error('Error loading model:', err);
});

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/predict', (req, res) => {
    try {
        let data = Object.values(req.body).map(Number);
        let prediction = model.predict([data]);
        let output = Math.round(prediction[0] * 100) / 100; // Round to 2 decimal places
        res.render('project2', { prediction_text: `Predicted Value: ${output}` });
    } catch (e) {
        res.render('project2', { prediction_text: `Error: ${e.message}` });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
