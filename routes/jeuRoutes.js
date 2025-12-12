import express from 'express';
import { body } from 'express-validator'; 

import { addJeu, getAllJeux } from '../controllers/jeuController.js';

const router = express.Router();

router.post(
  '/', 
  [
    body('titre')
      .notEmpty().withMessage("Le titre du jeu est obligatoire.")
      .isString().withMessage("Le titre doit être une chaîne de caractères valide."),
      
    body('genre')
      .notEmpty().withMessage("Le genre du jeu est obligatoire."),
      
    body('annee_sortie') 
      .optional()
      .isInt({ min: 1970, max: new Date().getFullYear() }).withMessage("L'année de sortie doit être une année valide.")
  ], 
  addJeu
);

router.get('/', getAllJeux);

export default router;