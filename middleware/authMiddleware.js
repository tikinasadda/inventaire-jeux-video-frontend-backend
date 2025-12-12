import jwt from 'jsonwebtoken';
import Utilisateur from '../models/Utilisateur.js';
import Role from '../models/Role.js';

// 1. Middleware pour vérifier le token (Protection des routes)
export const verifierToken = (req, res, next) => {
    // On cherche le token dans les cookies (navigateur) OU le header (Postman)
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        // Si c'est une requête API (AJAX), on renvoie 401
        // Mais ici pour EJS, on redirige vers le login
        return res.redirect('/login');
    }

    try {
        // Vérification avec la même clé que dans authController
        const valeurDecodee = jwt.verify(token, 'votre_cle_secrete'); // Remplace par process.env.JWT_SECRET si tu l'utilises
        req.userId = valeurDecodee.id;
        next();
    } catch (error) {
        // Si le token est expiré ou faux, on le supprime et on redirige
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

// 2. Middleware pour vérifier si c'est un Admin (Autorisation)
export const isAdmin = async (req, res, next) => {
    try {
        const userId = req.userId; // Récupéré depuis verifierToken

        const utilisateur = await Utilisateur.findByPk(userId, {
            include: {
                model: Role,
                through: { attributes: [] } // On ignore la table de liaison
            }
        });

        if (!utilisateur) {
            return res.redirect('/login');
        }

        // On vérifie si l'un des rôles est "Admin"
        // Note: Assure-toi que ton modèle s'appelle bien "Roles" ou adapte ici (utilisateur.Roles ou utilisateur.roles)
        // Sequelize met souvent le pluriel automatiquement.
        const roles = utilisateur.Roles || []; 
        const hasAdminRole = roles.some(role => role.titre.toLowerCase() === 'admin'); // J'utilise 'titre' car c'est ce qu'on a mis dans la BDD

        if (hasAdminRole) {
            next(); // C'est un admin, on continue
        } else {
            // Pas admin : on affiche une erreur ou on redirige
            return res.status(403).render('index', { 
                error: "Accès refusé : Vous n'êtes pas administrateur.",
                user: utilisateur // Pour garder le menu connecté
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur lors de la vérification admin.");
    }
};

// 3. Middleware pour le menu (celui qu'on a fait avant)
export const checkUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, 'votre_cle_secrete', (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.clearCookie('token');
                next();
            } else {
                res.locals.user = decodedToken;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};