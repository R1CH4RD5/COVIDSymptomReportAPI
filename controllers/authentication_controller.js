// Imports
const connector = require('../connector')
const _Crypto = require('../custommodules/classes.js')._Crypto
const Baker = require('../custommodules/classes.js').baker


// Register
exports.register = function (req, res) {
    if(!req.headers.cookie) {
        if (req.params.user && req.params.pw) {

            var hashcreator = new _Crypto(req.params.user, req.params.pw)
            const Hash = hashcreator.Hash

            let newconnection = new connector()
            newconnection.connect().then(()=>{

                newconnection.getUsers().then(users=>{
                    
                    hashcreator.compare(users).then(hash =>{
                        if (hash) res.json({notice: "User already exists."})
                    }).catch(exist=>{
                        if (exist) {
                            newconnection.NewUser(Hash).then(user=>{
                                if (user) res.json({user: Hash})
                                else {
                                    res.json({notice: user})
                                }
                            })
                        }
                    })
                    
                }).catch(err=>console.log("error: ", err))
            }).catch(err=>console.log("error: ", err))

        } else {
            res.json({notice: "Missing parameters."})
        }
    } else {
        res.json({notice: "User already logged."})
    }
};

// Login
exports.login = function (req, res) {
    if(!req.headers.cookie) {
        if (req.params.user && req.params.pw) {

            let newconnection = new connector()
            newconnection.connect().then(()=>{

                newconnection.getUsers().then(users=>{
                    
                    new _Crypto(req.params.user, req.params.pw).compare(users).then(hash =>{
                        if (hash) {
                            Baker(res, "ID", hash, 1).then(() => {
                                res.json({notice: hash})
                            })
                        }
                    }).catch(error=>{
                        if(error) res.json({notice: "error: Incorrect credentials"})
                    })
                    
                }).catch(err=>console.log("error: ", err))
            }).catch(err=>console.log("error: ", err))

        }
    } else {
        let ID = req.headers.cookie.split('=')[1];
        if(ID.split('').length==64)
        {
            res.json({notice: "User already logged."})
        }
    }
};

// Logout
exports.logout = function (req, res) {
    if(!req.headers.cookie) {
        res.json({notice: "No user logged."})
    } else {
        let ID = req.headers.cookie.split('=')[1];
        if(ID.split('').length==64)
        {
            Baker(res, "ID", "", 0).then(() => {
                res.json({notice: "Logout successful."
                })
            })
        }
    }
};