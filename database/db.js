const mongoose = require('mongoose');
const options = {useNewUrlParser: true,  useUnifiedTopology: true};
const mongoURI = 'mongodb://localhost/register';
mongoose.connect(mongoURI, options);
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

const db = mongoose.connection;

const User = mongoose.model('User', UserSchema);

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {
   console.log('We are connected to MongoDB!')
})

module.exports = User;
