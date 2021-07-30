const Pet = require('../models/pet.model');


const findPet = (req,res) => {
    Pet.find({}).sort("petType")
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(404)
        })
}

const findSinglePet = (req,res) => {
    Pet.findById(req.params.id)
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(404)
        })
}

const createPet = (req,res) => {
    Pet.findOne({petName: req.body.petName})
        .then(response => {
            if(response){
                res.json({error: true, message:`This pet´s name exists`})
            } else {
                let {petName, petType, petDescription, skillOne, skillTwo, skillThree} = req.body;
                let likes = 0
                Pet.create({
                    petName,
                    petType,
                    petDescription,
                    skillOne,
                    skillTwo,
                    skillThree,
                    likes
                })
                    .then(result => res.json({data:result}))
                    .catch(error => {
                        res.json({error:error, message:"Something went wrong"});
                        res.sendStatus(500)
                    })
            }
        });
}

const updatePet = (req,res) => {
    Pet.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(500);
        })
}

const deletePet = (req,res) => {
    Pet.deleteOne({_id:req.params.id})
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(202);
        })
}

const likePet = (req, res) => {
    Pet.findOneAndUpdate({_id: req.params.id}, {$inc: {likes:1}})
        .then(result => res.json({data: result}))
        .catch(error => {
            res.json({error:error, message:"Something went wrong"});
            res.sendStatus(500);
        })
}

module.exports = {findPet, findSinglePet, createPet, updatePet, deletePet, likePet};