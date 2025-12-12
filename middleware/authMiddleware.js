import jwt from 'jsonwebtoken';
import Utilisateur from '../models/Utilisateur.js';
import Role from '../models/Role.js';

// 1. Vérifier si connecté (Authentication)
export const verifierToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');

    try {
        const decoded = jwt.verify(token, 'votre_cle_secrete');
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

// 2. Vérifier si Admin (Authorization)
export const isAdmin = async (req, res, next) => {
    try {
        const userId = req.userId; // Vient de verifierToken

        // On cherche l'utilisateur ET ses rôles dans la BDD
        const utilisateur = await Utilisateur.findByPk(userId, {
            include: {
                model: Role,
                through: { attributes: [] } // On ignore la table de liaison
            }
        });

        // Vérification : est-ce que dans sa liste de rôles, il y a "Admin" ?
        // (Attention à la casse : 'Admin', 'admin', etc.)
        const roles = utilisateur.Roles || [];
        const estAdmin = roles.some(role => role.titre.toLowerCase() === 'admin');

        if (estAdmin) {
            next(); // C'est bon, on passe !
        } else {
            // Pas admin ? On le renvoie à l'accueil avec un message (optionnel)
            // Ou on affiche une page d'erreur 403
            return res.status(403).send("<h1>Accès Refusé ⛔</h1><p>Vous devez être Administrateur pour effectuer cette action.</p><a href='/'>Retour</a>");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur lors de la vérification des droits.");
    }
};

// 3. Gestion du Menu (Check User)
export const checkUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, 'votre_cle_secrete', (err, decoded) => {
            if (err) {
                res.locals.user = null;
                res.clearCookie('token');
                next();
            } else {
                res.locals.user = decoded;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};