const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
})

//@desc Adding new user
//@route POST /adduser
router.post('/adduser', actions.addUser)
router.post('/addadmin', actions.addAdmin)
router.post('/addexpert', actions.addExpert)

//@desc Authenticate a user
//@route POST /authenticateuser
router.post('/authenticateuser', actions.authenticateUser)
router.post('/authenticateadmin', actions.authenticateAdmin)
router.post('/authenticateexpert', actions.authenticateExpert)

//@desc delete a user
//@route DELETE /deleteuser
router.delete("/deleteuser/:id", actions.deleteUser);
router.delete("/deleteexpert/:id", actions.deleteExpert);

//@route GET /
router.get("/findUsers", actions.findAllUsers);
router.get("/findExperts", actions.findAllExperts);

router.get("/users/:id", actions.findOneUser);
router.get("/experts/:id", actions.findOneExpert);

//@route PUT
router.put("/experts/:id", actions.updateExpert);


//@desc Get info on a user
//@route GET /getinfo
router.get('/getinfo', actions.getinfo)



module.exports = router