import Jeu from '../models/Jeu.js';
import { validationResult } from 'express-validator'; 

// 1. Afficher la liste des jeux
export const getAllJeux = async (req, res) => {
    try {
        const jeux = await Jeu.findAll();
        res.render('jeux/list', { data: jeux });
    } catch (error) {
        res.status(500).send("Erreur : " + error.message);
    }
};

// 2. Afficher le formulaire d'ajout
export const formAjoutJeu = (req, res) => {
    res.render('jeux/add');
};

// 3. Traiter l'ajout
export const addJeu = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('jeux/add', { error: "Erreur de validation. Vérifiez les champs." });
    }
    try {
        const { titre, genre, annee_sortie } = req.body;
        
        await Jeu.create({ 
            titre, 
            genre, 
            annee_sortie 
        });
        
        res.redirect('/jeux');
    } catch (error) {
        res.render('jeux/add', { error: "Erreur lors de la création : " + error.message });
    }
};

// 4. Afficher le formulaire de modification
export const getJeuById = async (req, res) => {
    try {
        const id = req.params.id;
        const jeu = await Jeu.findByPk(id);

        if (!jeu) {
            return res.status(404).send("Jeu non trouvé");
        }
        res.render('jeux/edit', { jeu });
    } catch (error) {
        res.status(500).send("Erreur : " + error.message);
    }
};

// 5. Mettre à jour
export const updateJeu = async (req, res) => {
    const id = req.params.id;
    const { titre, genre, annee_sortie } = req.body;
    try {
        await Jeu.update({ titre, genre, annee_sortie }, { where: { id: id } });
        res.redirect('/jeux');
    } catch (error) {
        res.status(400).send("Erreur de modification : " + error.message);
    }
};

// 6. Supprimer
export const deleteJeu = async (req, res) => {
    const id = req.params.id;
    try {
        await Jeu.destroy({ where: { id: id } });
        res.redirect('/jeux');
    } catch (error) {
        res.status(500).send("Erreur de suppression : " + error.message);
    }
};