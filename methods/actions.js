var User = require('../models/user')
var Admin = require('../models/admin')
var Expert = require('../models/expert')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')

var functions = {
    addUser: function (req, res) {
        if ((!req.body.nom) || (!req.body.prenom) || (!req.body.numtel) || (!req.body.email) || (!req.body.password)) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            var newUser = User({
                nom: req.body.nom,
                prenom: req.body.prenom,
                numtel: req.body.numtel,
                email: req.body.email,
                password: req.body.password
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {
                    res.json({ success: true, msg: 'Successfully saved' })
                }
            })
        }
    },

    addAdmin: function (req, res) {
        if ((!req.body.nom) || (!req.body.prenom) || (!req.body.numtel) || (!req.body.email) || (!req.body.password)) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            var newAdmin = Admin({
                nom: req.body.nom,
                prenom: req.body.prenom,
                numtel: req.body.numtel,
                email: req.body.email,
                password: req.body.password
            });
            newAdmin.save(function (err, newAdmin) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {
                    res.json({ success: true, msg: 'Successfully saved' })
                }
            })
        }
    },

    addExpert: function (req, res) {
        if ((!req.body.nom) || (!req.body.prenom) || (!req.body.numtel) || (!req.body.email) || (!req.body.password)) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            var newExpert = Expert({
                nom: req.body.nom,
                prenom: req.body.prenom,
                numtel: req.body.numtel,
                email: req.body.email,
                password: req.body.password
            });
            newExpert.save(function (err, newExpert) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {
                    res.json({ success: true, msg: 'Successfully saved' })
                }
            })
        }
    },

    authenticateUser: function (req, res) {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) throw err
            if (!user) {
                res.status(403).send({ success: false, msg: 'Authentication Failed, User not found' })
            }

            else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(user, config.secret)
                        res.json({ success: true, token: token, user: user._id, numtel: user.numtel })
                    }
                    else {
                        return res.status(403).send({ success: false, msg: 'Authentication failed, wrong password' })
                    }
                })
            }
        }
        )
    },


    authenticateAdmin: function (req, res) {
        Admin.findOne({
            email: req.body.email
        }, function (err, admin) {
            if (err) throw err
            if (!admin) {
                res.status(403).send({ success: false, msg: 'Authentication Failed, Admin not found' })
            }

            else {
                admin.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(admin, config.secret)
                        res.json({ success: true, token: token, admin: admin._id, numtel: admin.numtel })
                    }
                    else {
                        return res.status(403).send({ success: false, msg: 'Authentication failed, wrong password' })
                    }
                })
            }
        }
        )
    },

    authenticateExpert: function (req, res) {
        Expert.findOne({
            email: req.body.email
        }, function (err, expert) {
            if (err) throw err
            if (!expert) {
                res.status(403).send({ success: false, msg: 'Authentication Failed, Expert not found' })
            }

            else {
                expert.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(expert, config.secret)
                        res.json({ success: true, token: token, expert: expert._id, numtel: expert.numtel })
                    }
                    else {
                        return res.status(403).send({ success: false, msg: 'Authentication failed, wrong password' })
                    }
                })
            }
        }
        )
    },

    // Delete a user with the specified id in the request
    deleteUser: function (req, res) {
        const id = req.params.id;
    
        User.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
            res.status(404).send({
                message: `Impossible de supprimer user avec l'identifiant=${id}.`
            });
            } else {
            res.send({
                message: "L'utilisateur a été supprimé avec succès!"
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Impossible de supprimer l'utilisateur avec l'identifiant=" + id
            });
        });
    },

    deleteExpert: function (req, res) {
        const id = req.params.id;
    
        Expert.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
            res.status(404).send({
                message: `Impossible de supprimer l'expert avec l'identifiant=${id}.`
            });
            } else {
            res.send({
                message: "L'expert a été supprimé avec succès!"
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Impossible de supprimer l'expert avec l'identifiant=" + id
            });
        });
    },

    findAllUsers: function (req, res) {
        const nom = req.query.nom;
        var condition = nom ? { nom: { $regex: new RegExp(nom), $options: "i" } } : {};
      
        User.find(condition)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Une erreur s'est produite lors de la récupération des comptes."
            });
          });
    },

    findAllExperts: function (req, res) {
        const nom = req.query.nom;
        var condition = nom ? { nom: { $regex: new RegExp(nom), $options: "i" } } : {};
      
        Expert.find(condition)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Une erreur s'est produite lors de la récupération des comptes."
            });
          });
    },

    findOneUser: function (req, res) {
        const id = req.params.id;
      
        User.findById(id)
          .then(data => {
            if (!data)
              res.status(404).send({ message: "User non trouvé avec identifiant " + id });
            else res.send(data);
          })
          .catch(err => {
            res
              .status(500)
              .send({ message: "Erreur lors de la récupération du user avec l'identifiant=" + id });
          });
    },

    findOneExpert: function (req, res) {
        const id = req.params.id;
      
        Expert.findById(id)
          .then(data => {
            if (!data)
              res.status(404).send({ message: "User non trouvé avec identifiant " + id });
            else res.send(data);
          })
          .catch(err => {
            res
              .status(500)
              .send({ message: "Erreur lors de la récupération du user avec l'identifiant=" + id });
          });
    },

    updateExpert: function (req, res) {
        if (!req.body) {
          return res.status(400).send({
            message: "Les données à mettre à jour ne peuvent pas être vides!"
          });
        }
      
        const id = req.params.id;
      
        Expert.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Impossible de mettre à jour l'expert avec l'identifiant=${id}. Peut-être que l'expert n'a pas été trouvé!`
              });
            } else res.send({ message: "L'expert a été mis à jour avec succès." });
          })
          .catch(err => {
            res.status(500).send({
              message: "Erreur lors de la mise à jour du expert avec l'ID=" + id
            });
          });
    },


    /* GET /protected-resource
    Authorisation: Bearer <JWT> */
    getinfo: function (req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            return res.json({ success: true, msg: 'Hello ' + decodedtoken.nom + ' ' + decodedtoken.prenom })
        }
        else {
            return res.json({ success: false, msg: 'No Headers' })
        }
    },




}

module.exports = functions