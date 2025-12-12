import express from 'express';
import { body } from 'express-validator'; 

import { addInventaire, getAllInventaire } from '../controllers/inventaireController.js';

const router = express.Router();

router.post(
  '/', 
  [
    body('utilisateurId')
      .exists().withMessage("L'ID de l'utilisateur est requis."),
      
    body('jeuId')
      .exists().withMessage("L'ID du jeu est requis."),
      
    body('plateformeId')
      .exists().withMessage("L'ID de la plateforme est requis."),
      
    body('quantite')
      .optional() 
      .isInt({ min: 1 }).withMessage("La quantité doit être un nombre entier positif.")
      
  ], 
  addInventaire
);

router.get('/', getAllInventaire);

export default router;