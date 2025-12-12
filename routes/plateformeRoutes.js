import express from 'express';
import { body } from 'express-validator'; 

import { 
    getAllPlateformes, 
    formAjoutPlateforme, 
    addPlateforme, 
    getPlateformeById, 
    updatePlateforme, 
    deletePlateforme 
} from '../controllers/plateformeController.js';

const router = express.Router();

// 1. Afficher la liste
router.get('/', getAllPlateformes);

// 2. Afficher le formulaire d'ajout
router.get('/ajouter', formAjoutPlateforme);

// 3. Traiter le formulaire d'ajout (POST)
router.post(
  '/ajouter', 
  [
    body('nom')
      .notEmpty().withMessage("Le nom est obligatoire.")
      .isLength({ min: 2, max: 50 }).withMessage("Le nom doit avoir entre 2 et 50 caractères.")
  ], 
  addPlateforme 
);

// 4. Afficher le formulaire de modification
router.get('/modifier/:id', getPlateformeById);

// 5. Traiter la modification
router.post('/modifier/:id', updatePlateforme);

// 6. Supprimer une plateforme
router.get('/supprimer/:id', deletePlateforme);

export default router;