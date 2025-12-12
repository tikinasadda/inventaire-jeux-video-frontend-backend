import Utilisateur from '../models/Utilisateur.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 1. Afficher la page de login (GET)
export const formLogin = (req, res) => {
    res.render('login');
};

// 2. Traiter la connexion (POST)
export const login = async (req, res) => {
    try {
        const { nom_utilisateur, mot_de_passe } = req.body;

        // Vérifier si l'utilisateur existe
        const utilisateur = await Utilisateur.findOne({ where: { nom_utilisateur } });
        if (!utilisateur) {
            return res.render('login', { error: "Utilisateur inconnu" });
        }

        // Vérifier le mot de passe
        const validPassword = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
        if (!validPassword) {
            return res.render('login', { error: "Mot de passe incorrect" });
        }

        // Créer le token JWT
        const token = jwt.sign(
            { id: utilisateur.id, nom: utilisateur.nom_utilisateur },
            'votre_cle_secrete', // Idéalement dans .env
            { expiresIn: '24h' }
        );

        // STOCKER LE TOKEN DANS UN COOKIE (C'est la clé du succès !)
        // httpOnly: true empêche le JavaScript client de lire le cookie (sécurité)
        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        // Redirection vers l'accueil
        res.redirect('/');

    } catch (error) {
        res.render('login', { error: "Erreur technique : " + error.message });
    }
};

// 3. Déconnexion (GET)
export const logout = (req, res) => {
    // On supprime le cookie
    res.clearCookie('token');
    res.redirect('/login');
};