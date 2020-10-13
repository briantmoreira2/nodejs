var express = require('express');
var router = express.Router();
var userSchema = require('../schemas/usuarioSchema').Usuario;
var mongodb = require('mongodb');

module.exports = function () {
    router.get('/', async (req, res, next) => {
        return new Promise(async (resolve, reject) => {
            userSchema.find().then((doc) => {
                res.send({doc});
              },(e) => {
                res.status(400).send(e);
              }
              );
        });
    })

    router.get('/:id', async (req, res, next) => {
        return new Promise(async (resolve, reject) => {
            userSchema.findById(req.params.id).then((doc) => {
                res.send({doc});
              },(e) => {
                res.status(400).send(e);
              }
              );
        });
    })

    router.post('/user', async (req, res, next) => {
        return new Promise(async (resolve, reject) => {
            console.log(req.body);
            let user = new userSchema(req.body);
            user.save().then((doc) => {
                res.send({doc});
              },(e) => {
                res.status(400).send(e);
              }
              );
        });
    })

    router.post('/user/:id', async (req, res, next) => {
        return new Promise(async (resolve, reject) => {
            console.log(req.body);
            let user = userSchema.findByIdAndUpdate(req.params.id,req.body)
                                  .then((doc) => {
                                    res.send({doc});
                                   },(e) => {
                                    res.status(400).send(e);
                                   }
              );
        });
    })

    router.post('/user/delete/:id', async (req, res, next) => {
        return new Promise(async (resolve, reject) => {
            userSchema.deleteOne({_id: new mongodb.ObjectID(req.params.id)}).then((doc) => {
                console.log(doc);
                res.send({doc});
                },(e) => {
                res.status(400).send(e);
                }
            );
        });
    })

   

    return router;
}