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

const router = express.Router();

// Liste
router.get('/', getAllRoles);

// Ajout
router.get('/ajouter', formAjoutRole);
router.post('/ajouter', [ body('titre').notEmpty().withMessage('Titre requis') ], addRole);

// Modification
router.get('/modifier/:id', getRoleById);
router.post('/modifier/:id', updateRole);

// Suppression
router.get('/supprimer/:id', deleteRole);

export default router;