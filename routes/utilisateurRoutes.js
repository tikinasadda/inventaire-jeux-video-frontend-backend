import express from 'express';
import { body } from 'express-validator'; 
import { 
    addUtilisateur, 
    getAllUtilisateurs, 
    login, 
    formAjoutUtilisateur,
    getUtilisateurById,
    updateUtilisateur,
    deleteUtilisateur
} from '../controllers/utilisateurController.js';
import { verifierToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public : Voir la liste
router.get('/', getAllUtilisateurs);

// Public : Inscription (Formulaire et Traitement)
router.get('/ajouter', formAjoutUtilisateur);
router.post('/ajouter', [
    body('nom_utilisateur').notEmpty().withMessage("Le nom d'utilisateur est requis."),
    body('email').isEmail().withMessage("Veuillez fournir une adresse email valide."),
    body('mot_de_passe').isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères."),
], addUtilisateur);

// Public : Login
router.post('/login', [
    body('nom_utilisateur').notEmpty().withMessage("Le nom d'utilisateur est requis."),
    body('mot_de_passe').notEmpty().withMessage("Le mot de passe est requis."),
], login);

// Admin : Modifier un utilisateur
router.get('/modifier/:id', verifierToken, isAdmin, getUtilisateurById);
router.post('/modifier/:id', verifierToken, isAdmin, updateUtilisateur);

// Admin : Supprimer un utilisateur
router.get('/supprimer/:id', verifierToken, isAdmin, deleteUtilisateur);

export default router;