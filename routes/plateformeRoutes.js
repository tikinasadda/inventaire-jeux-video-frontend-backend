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
import { verifierToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public : Voir la liste
router.get('/', getAllPlateformes);

// Connecté : Ajouter une plateforme
router.get('/ajouter', verifierToken, formAjoutPlateforme);
router.post('/ajouter', verifierToken, [
    body('nom').notEmpty().withMessage("Le nom est obligatoire.")
    .isLength({ min: 2, max: 50 }).withMessage("Le nom doit avoir entre 2 et 50 caractères.")
], addPlateforme);

// Admin : Modifier une plateforme
router.get('/modifier/:id', verifierToken, isAdmin, getPlateformeById);
router.post('/modifier/:id', verifierToken, isAdmin, updatePlateforme);

// Admin : Supprimer une plateforme
router.get('/supprimer/:id', verifierToken, isAdmin, deletePlateforme);

export default router;