import Utilisateur from '../models/Utilisateur.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator'; 

// 1. Traitement du formulaire d'ajout (POST)
export const addUtilisateur = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('utilisateurs/add', { error: "Données invalides. Vérifiez les champs." });
    }
    
    try {
        const { nom_utilisateur, email, mot_de_passe } = req.body;
        const salt = await bcrypt.genSalt(10);
        const mot_de_passe_hache = await bcrypt.hash(mot_de_passe, salt);

        await Utilisateur.create({
            nom_utilisateur: nom_utilisateur,
            email: email,
            mot_de_passe: mot_de_passe_hache 
        });

        res.redirect('/utilisateurs');

    } catch (error) {
        res.render('utilisateurs/add', { error: "Erreur : " + error.message });
    }
};

// 2. Récupérer tous les utilisateurs (GET)
export const getAllUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await Utilisateur.findAll({
            attributes: { exclude: ['mot_de_passe'] }
        });
        res.render('utilisateurs/list', { data: utilisateurs });
    } catch (error) {
        res.status(400).send("Erreur : " + error.message);
    }
};

// 3. Afficher le formulaire d'ajout (GET)
export const formAjoutUtilisateur = (req, res) => {
    res.render('utilisateurs/add');
};

// 4. Connexion (POST) - C'est celle qui manquait ou était mal exportée !
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "Erreur de validation.",
            errors: errors.array() 
        });
    }
    try {
        const { nom_utilisateur, mot_de_passe } = req.body;

        const utilisateur = await Utilisateur.findOne({ where: { nom_utilisateur: nom_utilisateur } });
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const isMatch = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        const payload = { id: utilisateur.id };
        const token = jwt.sign(payload, 'votre_cle_secrete', {
            expiresIn: '1h' 
        });

        res.status(200).json({ message: "Connexion réussie", token: token });

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la connexion", error: error.message });
    }
};
// --- AJOUTER À LA FIN DE utilisateurController.js ---

// 5. Afficher le formulaire de modification (GET)
export const getUtilisateurById = async (req, res) => {
    try {
        const id = req.params.id;
        const utilisateur = await Utilisateur.findByPk(id);

        if (!utilisateur) {
            return res.status(404).send("Utilisateur non trouvé");
        }
        
        res.render('utilisateurs/edit', { utilisateur });
    } catch (error) {
        res.status(500).send("Erreur : " + error.message);
    }
};

// 6. Traiter la modification (POST)
export const updateUtilisateur = async (req, res) => {
    const id = req.params.id;
    const { nom_utilisateur, email, mot_de_passe } = req.body;

    try {
        const utilisateur = await Utilisateur.findByPk(id);
        if (!utilisateur) return res.status(404).send("Utilisateur introuvable");

        // Mise à jour des champs de base
        utilisateur.nom_utilisateur = nom_utilisateur;
        utilisateur.email = email;

        // Si un nouveau mot de passe est fourni, on le hache
        if (mot_de_passe && mot_de_passe.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            utilisateur.mot_de_passe = await bcrypt.hash(mot_de_passe, salt);
        }

        await utilisateur.save(); // Enregistre les modifs en BDD
        res.redirect('/utilisateurs');

    } catch (error) {
        // En cas d'erreur, on réaffiche le formulaire (il faudrait idéalement repasser l'objet utilisateur)
        res.status(400).send("Erreur lors de la modification : " + error.message);
    }
};

// 7. Supprimer un utilisateur (GET pour simplifier, ou DELETE via formulaire)
export const deleteUtilisateur = async (req, res) => {
    const id = req.params.id;
    try {
        await Utilisateur.destroy({ where: { id: id } });
        res.redirect('/utilisateurs');
    } catch (error) {
        res.status(500).send("Erreur lors de la suppression : " + error.message);
    }
};