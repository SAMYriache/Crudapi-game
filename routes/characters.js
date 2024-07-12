const express = require('express');
const router = express.Router();
const Character = require('../models/Character');
const validateCharacter = require('../middlewares/validation');
const charactermodel = require('../../crudgame/database/models/character');

// Créer un personnage
router.post('/', validateCharacter, async (req, res, next) => {
    try {
        const { name, classe, level } = req.body;
        const data = await Character.create({ name, classe, level });
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
});

// Récupérer tous les personnages avec pagination
router.get('/', async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const data = await Character.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Character.countDocuments();
        res.json({
            characters: data,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        next(error);
    }
});

// Récupérer un personnage par ID
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Character.findById(id);
        if (!data) {
            return res.status(404).json({ message: 'Character not found' });
        }
        res.json(data);
    } catch (error) {
        next(error);
    }
});


// Mettre à jour un personnage par ID
router.put('/:id', validateCharacter, async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, classe, level } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (classe) updateData.classe = classe;
        if (level !== undefined) updateData.level = level; // Assurez-vous de vérifier "undefined" car "0" est une valeur valide

        const character = await Character.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }

        res.json({ message: 'Character updated', character });
    } catch (error) {
        next(error);
    }
});



// Supprimer un personnage par ID
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Character.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ message: 'Character not found' });
        }
        res.json({ message: 'Character deleted' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
