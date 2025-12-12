import Jeu from '../models/Jeu.js';
import { validationResult } from 'express-validator'; 

export const addJeu = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "Erreur de validation. Veuillez vérifier les champs requis pour le jeu.",
            errors: errors.array() 
        });
    }
    try {
        const nouveauJeu = await Jeu.create(req.body);

        res.status(201).json(nouveauJeu);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la création du jeu", error: error.message });
    }
};

export const getAllJeux = async (req, res) => {
    try {
        const jeux = await Jeu.findAll();

        res.status(200).json(jeux);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la récupération des jeux", error: error.message });
    }
};