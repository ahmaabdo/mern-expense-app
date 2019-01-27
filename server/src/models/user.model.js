const mogoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mogoose;

const userSchema = Schema({
    name: { type: String },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    joined: { type: Date, default: new Date() }
});

userSchema.pre('save', async function (next) {
    //Check if new account, of password is modified
    if (!this.isModified('password')) {
        return next();

    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (e) {
        return next(e);
    }
});

userSchema.methods.isPasswordMatch = function (password, hashed, callback) {
    bcrypt.compare(password, hashed, (err, success) => {
        if (err) { return callback(err); }
        callback(null, success);
    });
};

const user = mogoose.model('User', userSchema);
module.exports = user;