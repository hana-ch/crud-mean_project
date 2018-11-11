// definir models via syntax mongoos

const mongoose = require('mongoose');

// definir user schema 

const UserSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },

});


// export de User Schema : on peut l'appeler dans n'importe quel endroit 

module.exports = User = mongoose.model("users" , UserSchema) ;