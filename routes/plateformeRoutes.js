import express from 'express';
import { body } from 'express-validator'; 

import { addPlateforme, getAllPlateformes } from '../controllers/plateformeController.js';

const router = express.Router();

router.post(
  '/', 
  [
    body('nom')
      .notEmpty().withMessage("Le nom de la plateforme est obligatoire.")
      .isString().withMessage("Le nom doit être une chaîne de caractères.")
      .isLength({ min: 2, max: 50 }).withMessage("Le nom doit avoir entre 2 et 50 caractères."),
      
  ], 
  addPlateforme 
);

router.get('/', getAllPlateformes);

export default router;