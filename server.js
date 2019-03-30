//David Acevedo
//A01196678
//Lab 8

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const postsRouter = require('./blog-post-router');

app.use(postsRouter);
app.use(jsonParser);
app.use("/")

app.listen(8080, () => {
	console.log('Your app is running in port 8080');
});