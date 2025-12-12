import Utilisateur from '../models/Utilisateur.js';
import Role from '../models/Role.js';
import Utilisateur_Roles from '../models/Utilisateur_Roles.js';
import { validationResult } from 'express-validator'; 

export const assignerRole = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "Erreur de validation. Les IDs de l'utilisateur et du rôle sont requis.",
            errors: errors.array() 
        });
    }
    try {
        const { utilisateurId, roleId } = req.body;

        const utilisateur = await Utilisateur.findByPk(utilisateurId);
        const role = await Role.findByPk(roleId);

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        if (!role) {
            return res.status(404).json({ message: "Rôle non trouvé" });
        }

        await utilisateur.addRole(role); 
        
        res.status(200).json({ message: `Rôle '${role.titre}' assigné à l'utilisateur '${utilisateur.nom_utilisateur}'` });
    
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'assignation du rôle", error: error.message });
    }
};