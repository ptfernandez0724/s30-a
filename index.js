
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

mongoose.connect("mongodb+srv://admin:admin@zuitt-bootcamp.kc9re.mongodb.net/S30-Activity?retryWrites=true&w=majority", 
			{
				useNewUrlParser: true,
				useUnifiedTopology: true
			}
);

let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", () => console.log("We are connected to the cloud database"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const userSchema = new mongoose.Schema({
	username: String,
	password: String

})

const User = mongoose.model("User", userSchema)

app.post('/signup', (req, res) => {
	User.findOne({username: req.body.username}, (err, result) => {
		if(result !== null && result.username == req.body.username){
			return res.send("Duplicate user found")
		} else {

			let newUser = new User({
				username: req.body.username,
				password: req.body.password
			})

			newUser.save((saveErr, savedUser) => {
				if(saveErr){
					return console.error(saveErr)
				} else {
					return res.status(201).send("New user created")
				}
			})
		}
	})
})



app.listen(port, () => console.log(`Server is running at port ${port}`));

