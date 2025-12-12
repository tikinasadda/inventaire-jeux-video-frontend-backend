import express from 'express';
import { body } from 'express-validator'; 

import { addUtilisateur, getAllUtilisateurs, login } from '../controllers/utilisateurController.js';

import { verifierToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/', 
  [
    body('nom').notEmpty().withMessage("Le nom est requis."),
    body('prenom').notEmpty().withMessage("Le prénom est requis."),
    body('email').isEmail().withMessage("Veuillez fournir une adresse email valide."),
    body('password').isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères."),
  ],
  addUtilisateur
);

router.post(
  '/login', 
  [
    body('email').notEmpty().withMessage("L'email est requis."),
    body('password').notEmpty().withMessage("Le mot de passe est requis."),
  ], 
  login
);

router.get('/', verifierToken, getAllUtilisateurs);

export default router;