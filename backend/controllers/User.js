const User = require('../models/User');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

exports.signUp = (req, res) =>{
    bcrypt.hash(req.body.password, 10)
    .then(hash =>{
        const newUser = new User({
            email:req.body.email,
            password: hash
        })
        newUser.save()
        .then((user)=> res.status(200).json(user))
        .catch(error => {
            console.error('Error saving user', error)
            res.status(500).json({error})})
    })
    .catch(error => res.status(400).json({error}))
   
};

exports.logIn = (req, res) =>{
    User.findOne({email:req.body.email})
    .then(user=>{
        if(!user){
            res.status(400).json({message:'email or password incorrect'})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(async (valid)=>{
            if(!valid){
               return await res.status(500).json({message:'email or password incorrect'})
            }
            res.status(200).json({
                userId:user._id,
                token:jwt.sign(
                    {userId:user._id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn:'24h'}
                )
            })
        })
    })
}