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
// Import des middlewares de sécurité
import { verifierToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public : Voir la liste
router.get('/', getAllJeux);

// Connecté : Ajouter un jeu
router.get('/ajouter', verifierToken, formAjoutJeu);
router.post('/ajouter', verifierToken, [
    body('titre').notEmpty().withMessage("Le titre est requis."),
    body('genre').notEmpty().withMessage("Le genre est requis."),
    body('annee_sortie').optional().isInt({ min: 1950, max: new Date().getFullYear() + 1 }).withMessage("Année invalide")
], addJeu);

// Admin : Modifier un jeu
router.get('/modifier/:id', verifierToken, isAdmin, getJeuById);
router.post('/modifier/:id', verifierToken, isAdmin, updateJeu);

// Admin : Supprimer un jeu
router.get('/supprimer/:id', verifierToken, isAdmin, deleteJeu);

export default router;