import express from 'express';
import { body } from 'express-validator'; 
import { 
    getAllJeux, 
    addJeu, 
    formAjoutJeu, 
    getJeuById, 
    updateJeu, 
    deleteJeu 
} from '../controllers/jeuController.js';

const router = express.Router();

// Liste
router.get('/', getAllJeux);

// Formulaire Ajout
router.get('/ajouter', formAjoutJeu);

// Traitement Ajout
router.post('/ajouter', [
    body('titre').notEmpty().withMessage("Le titre est requis."),
    body('genre').notEmpty().withMessage("Le genre est requis."),
    body('annee_sortie').optional().isInt({ min: 1950, max: new Date().getFullYear() + 1 }).withMessage("Année invalide")
], addJeu);

// Formulaire Modification
router.get('/modifier/:id', getJeuById);

// Traitement Modification
router.post('/modifier/:id', updateJeu);

// Suppression
router.get('/supprimer/:id', deleteJeu);

export default router;