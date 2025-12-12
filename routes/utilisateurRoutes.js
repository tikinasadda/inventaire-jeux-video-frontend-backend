import express from 'express';
import { body } from 'express-validator'; 

// 1. MISE À JOUR DES IMPORTS
// On ajoute getUtilisateurById, updateUtilisateur et deleteUtilisateur
import { 
    addUtilisateur, 
    getAllUtilisateurs, 
    login, 
    formAjoutUtilisateur,
    getUtilisateurById,  // <-- Nouveau
    updateUtilisateur,   // <-- Nouveau
    deleteUtilisateur    // <-- Nouveau
} from '../controllers/utilisateurController.js';

const router = express.Router();

// Route pour afficher la liste (Page d'accueil utilisateurs)
router.get('/', getAllUtilisateurs);

// Route pour afficher le formulaire d'ajout
router.get('/ajouter', formAjoutUtilisateur);

// Route pour traiter le formulaire d'ajout
router.post(
  '/ajouter', 
  [
    body('nom_utilisateur').notEmpty().withMessage("Le nom d'utilisateur est requis."),
    body('email').isEmail().withMessage("Veuillez fournir une adresse email valide."),
    body('mot_de_passe').isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères."),
  ],
  addUtilisateur
);

// Route Login
router.post(
  '/login', 
  [
    body('nom_utilisateur').notEmpty().withMessage("Le nom d'utilisateur est requis."),
    body('mot_de_passe').notEmpty().withMessage("Le mot de passe est requis."),
  ], 
  login
);

// --- NOUVELLES ROUTES POUR MODIFIER ET SUPPRIMER ---

// 1. Afficher le formulaire de modification (GET)
// Cette route appelle la fonction qui va chercher l'utilisateur par son ID
router.get('/modifier/:id', getUtilisateurById);

// 2. Traiter la modification (POST)
// Cette route reçoit les données du formulaire edit.ejs
router.post('/modifier/:id', updateUtilisateur);

// 3. Supprimer un utilisateur (GET)
// Cette route supprime l'utilisateur directement
router.get('/supprimer/:id', deleteUtilisateur);

export default router;