import Plateforme from '../models/Plateforme.js';
import { validationResult } from 'express-validator'; 

export const addPlateforme = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "Erreur de validation. Veuillez vérifier les champs requis pour la plateforme.",
            errors: errors.array() 
        });
    }
    try {
        const nouvellePlateforme = await Plateforme.create(req.body);
        
        res.status(201).json(nouvellePlateforme);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la plateforme", error: error.message });
    }
};

export const getAllPlateformes = async (req, res) => {
    try {
        const plateformes = await Plateforme.findAll();
        
        res.status(200).json(plateformes);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des plateformes", error: error.message });
    }
};