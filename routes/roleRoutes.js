import express from 'express';
import { body } from 'express-validator';
import { 
    getAllRoles, 
    formAjoutRole, 
    addRole, 
    getRoleById, 
    updateRole, 
    deleteRole 
} from '../controllers/roleController.js';
import { verifierToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public : Voir la liste
router.get('/', getAllRoles);

// Connecté : Ajouter un rôle
router.get('/ajouter', verifierToken, formAjoutRole);
router.post('/ajouter', verifierToken, [ body('titre').notEmpty().withMessage('Titre requis') ], addRole);

// Admin : Modifier un rôle
router.get('/modifier/:id', verifierToken, isAdmin, getRoleById);
router.post('/modifier/:id', verifierToken, isAdmin, updateRole);

// Admin : Supprimer un rôle
router.get('/supprimer/:id', verifierToken, isAdmin, deleteRole);

export default router;