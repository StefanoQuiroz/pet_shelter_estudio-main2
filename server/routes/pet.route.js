const express = require('express');
const router = express();
const {findPet, findSinglePet, createPet, updatePet, deletePet, likePet} = require('../controllers/pet.controller')

router.get(`/pet`, findPet);
router.get(`/pet/:id`, findSinglePet);
router.post(`/pet/new`, createPet);
router.put(`/pet/update/:id`, updatePet);
router.delete(`/pet/delete/:id`, deletePet);
router.put(`/pet/like/:id`, likePet)

module.exports = router;