// server.js

const path = require('path')
const express = require('express')

const app = express()
const bodyParser = require('body-parser')

const port = 8080

var fs = require('fs')


app.use(bodyParser.json())

//routes
app.get('/',function(req,res) {
	res.sendFile(path.join(__dirname + '/views/login.html'));
})

app.get('/views/projectList.html',function(req,res) {
	res.sendFile(path.join(__dirname + '/views/projectList.html'));
})

app.get('/views/newProject.html',function(req,res) {
	res.sendFile(path.join(__dirname + '/views/newProject.html'));
})

app.get('/projects',function(req,res) {
	res.sendFile(path.join(__dirname + '/src/json/projects.json'));
})

app.get('/css',function(req,res) {
	res.sendFile(path.join(__dirname + '/src/css/style.css'));
})

app.post('/projects', function(req,res) {
	console.log('Request Payload: ' + req.body.id +' '+ req.body.name +' '+ req.body.email);
	fs.readFile(__dirname + '/src/json/projects.json',function (err,data){
		var json = JSON.parse(data);
		json.push({
			"name": req.body.name, 
			"priority": req.body.priority,
			"starting_date": req.body.starting_date,
			"deadline": req.body.deadline,
			"nb_of_part": req.body.nb_of_part,
			"description": req.body.description
		});

		fs.writeFile(__dirname + "/src/json/projects.json", JSON.stringify(json))
	});
});

app.post('/users', function(req,res) {
	console.log('Request Payload: ' + req.body.username +' '+ req.body.password);
	fs.readFile(__dirname + '/src/json/users.json',function (err,data){
		var json = JSON.parse(data);
		json.push({
			"username": req.body.username, 
			"password": req.body.password,
		});

		fs.writeFile(__dirname + "/src/json/users.json", JSON.stringify(json))
	});
});

app.get('/users', function(req, res) {
  res.sendFile(path.join(__dirname + '/src/json/users.json'));
});




//listener
app.listen(port, (err) => {
	if(err) {
		return console.log('something bad happened',err)
	}
	console.log(`server is listening on ${port}`)
})
