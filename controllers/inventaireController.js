import Inventaire from '../models/Inventaire.js';

import Utilisateur from '../models/Utilisateur.js';
import Jeu from '../models/Jeu.js';
import Plateforme from '../models/Plateforme.js';

import { validationResult } from 'express-validator'; 

export const addInventaire = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "Erreur de validation. Veuillez vérifier les champs requis.",
            errors: errors.array() 
        });
    }
    try {
        const nouvelInventaire = await Inventaire.create(req.body); 
        
        res.status(201).json(nouvelInventaire);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout à l'inventaire", error: error.message });
    }
};

export const getAllInventaire = async (req, res) => {
    try {
        const inventaire = await Inventaire.findAll({
            include: [
                { 
                    model: Utilisateur,
                    attributes: ['nom_utilisateur']
                },
                { 
                    model: Jeu,
                    attributes: ['titre', 'genre']
                },
                { 
                    model: Plateforme,
                    attributes: ['nom']
                }
            ]
        });
        
        res.status(200).json(inventaire);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'inventaire", error: error.message });
    }
};