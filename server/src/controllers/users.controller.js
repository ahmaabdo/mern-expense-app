const jwt = require('jsonwebtoken');
const user = require('../models/user.model');
const userController = {};

userController.register = async (req, res, next) => {
    const { name, email, password, joind } = req.body;
    const newUser = new user({
        name, email, password, joind
    });
    try {
        const user = await newUser.save();
        return res.send({ user });
    } catch (e) {
        if (e.code === 11000 && e.name === 'MongoError') {
            var error = new Error(`Email address ${newUser.email} is already taken`);
            next(error);
        } else {
            next(e);
        }
    }
};

userController.login = async (req, res, next) => {
    //Username, password in request
    const { email, password } = req.body;
    try {
        //Check username and password are right, then create jwt and return it
        const userAcc = await user.findOne({ email });
        if (!userAcc) {
            const err = new Error(`The email ${email} was not found on our system`);
            err.status = 404;
            next(err);
        }
        userAcc.isPasswordMatch(password, userAcc.password, (err, matched) => {
            if (matched) {
                //Secret & Expiration
                const secret = process.env.JWT_SECRET;
                const expire = process.env.JWT_EXPIRATION;

                const token = jwt.sign({ _id: user._id }, secret, { expiresIn: expire });
                return res.send({ token});
            }
            res.status(401).send({
                error: 'Invalid username/password'
            });
        });
    } catch (e) {
        next(e);
    }
};

module.exports = userController;