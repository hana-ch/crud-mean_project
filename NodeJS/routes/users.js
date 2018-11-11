const express = require('express');

// router specifique à express : router tjrs present dans les lang de progration front  et backend 
const router = express.Router();
const User = require('../models/user');


// comments indicate code lisibility : quel url à consommer dans postman 
// @route GET api/users/test  : routes à definir dans postman 
// @desc Test users route  : description de l'usage de route
// @access public  : access au route , public si y'a pas contraintes d'authentification 


// router est pareil à httpclient en angular
// req : jeya mel front / res : à donner au front
// @route GET api/users/test  : api/users tet3awid dans tt les URL , le rest de l4URL est à specifier au niveau de la req 

router.get("/test", (req, res) => res.json({ msg: "User work" }));

//@route POST api/users/register
//@desc Register user
//@access public
router.post("/register", (req, res) => {
    // check if user exist / with a mongoose fuction : fndone by email because an email is unique 
    User.findOne({ email: req.body.email })
        .then(user => {
            // user existant 
            if (user) {
                return res.status(400).json("Email already exist");
            } else /* user not exists  : prendre data du front */ {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                });
                // insert in data base : fonction mongoose save() // type retour de .save() est promise 
                // on va pas traiter le controle de saisie 
                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            }
        });
});


// get all users 
//@route GET api/users/getUsers
//@desc get all registred users
//@access public
router.get("/getUsers", (req, res) /* err dima à gauche et response à droite */ => {
    User.find((err, users)/*fct call back */ => {
        if (err) console.log(err);
        else
            res.json(users);
    })
})

// get a user by id : passer id en parametre dans url 
// nekhou id mel URL w nfarkes bih : nekhouh bil mongoos : req.params
router.get("/user/:id", (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) console.log(err);
        else res.json(user);
    });
});


// update a user 
// post au lieu de put car elle a meme role que add : ecrase anacien et ajoute un nouveau 
// nel0a user , n3abi user bil form mte3I puis je l'update
// Next : fonction node js : tkharej erreur et continue l'execution sans l'interrompre 
router.post("/update/:id", (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (!user)
            return next(new Errror("error"));
        else {
                user.name = req.body.name, // req correspond à la requete entrée par utilisateur 
                user.email = req.body.email,
                user.password = req.body.password,
                user.save()
                    .then(user => {
                        res.json("Update done");
                    })
                    .catch(err => {
                        res.status(400).send("Update failed" + err);
                    });
        }
    });
})


//Delete User 
router.delete("/delete/:id" , (req,res) => {
    User.findByIdAndDelete({_id : req.params.id} /* _id : l'id de mongodb generé par defaut */, (err,user) => {
  if(err)
      res.json(err);
  else 
  res.json("Removed successfully") ;

    }) ;
})

// faut tt exporter pur pouvoir le lire de l'exterieur 

module.exports = router; 