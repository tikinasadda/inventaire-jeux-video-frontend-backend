import express from 'express';
import cookieParser from 'cookie-parser'; // 1. IMPORT IMPORTANT
import connexion from './config/connexion.js';
import dotenv from 'dotenv';
dotenv.config();

// Imports des modèles
import Role from './models/Role.js';
import Plateforme from './models/Plateforme.js';
import Utilisateur from './models/Utilisateur.js';
import Jeu from './models/Jeu.js';
import Inventaire from './models/Inventaire.js';
import Utilisateur_Roles from './models/Utilisateur_Roles.js';

// Imports des routes
import roleRoutes from './routes/roleRoutes.js';
import plateformeRoutes from './routes/plateformeRoutes.js';
import jeuRoutes from './routes/jeuRoutes.js';
import utilisateurRoutes from './routes/utilisateurRoutes.js';
import inventaireRoutes from './routes/inventaireRoutes.js';
import utilisateurRoleRoutes from './routes/utilisateurRoleRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Import des routes d'auth

// Import du middleware pour vérifier l'utilisateur
import { checkUser } from './middleware/authMiddleware.js';

const app = express();
const PORT = 5000;

// --- CONFIGURATION EJS ---
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/public', express.static('public'));

// --- MIDDLEWARES (L'ORDRE EST CRUCIAL ICI !) ---
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 2. ACTIVATION DES COOKIES (DOIT ÊTRE AVANT checkUser)
app.use(cookieParser());

// 3. VÉRIFICATION UTILISATEUR (APPLIQUÉ APRÈS cookieParser)
app.use(checkUser);

// --- BASE DE DONNÉES ---
try {
  await connexion.authenticate();
  console.log('Connexion à la base de données MySQL réussie !');
} catch (error) {
  console.error('Impossible de se connecter à la base de données:', error);
}

// Associations
Utilisateur.hasMany(Inventaire, { foreignKey: 'utilisateurId' });
Inventaire.belongsTo(Utilisateur, { foreignKey: 'utilisateurId' });
Jeu.hasMany(Inventaire, { foreignKey: 'jeuId' });
Inventaire.belongsTo(Jeu, { foreignKey: 'jeuId' });
Plateforme.hasMany(Inventaire, { foreignKey: 'plateformeId' });
Inventaire.belongsTo(Plateforme, { foreignKey: 'plateformeId' });
Utilisateur.belongsToMany(Role, { through: Utilisateur_Roles, foreignKey: 'utilisateurId' });
Role.belongsToMany(Utilisateur, { through: Utilisateur_Roles, foreignKey: 'roleId' });

try {
  await connexion.sync();
  console.log("Base de données synchronisée !");
} catch (error) {
  console.error("Erreur synchro BDD:", error);
}

// --- ROUTES ---
// Route d'accueil
app.get('/', (req, res) => {
  res.render('index');
});

// Routes de l'application
app.use('/', authRoutes); // Login/Logout
app.use('/roles', roleRoutes);
app.use('/plateformes', plateformeRoutes);
app.use('/jeux', jeuRoutes);
app.use('/utilisateurs', utilisateurRoutes);
// app.use('/inventaire', inventaireRoutes); // À activer si tu as fait le controller EJS correspondant
// app.use('/assigner-role', utilisateurRoleRoutes); // Idem

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});