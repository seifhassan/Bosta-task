// userService.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const asyncWrapper = require('../middleware');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

dotenv.config();
const { JWT_SECRET, PORT } = process.env;

class UserService {
    constructor() {
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.emailVerify = this.emailVerify.bind(this);
        this.logout = this.logout.bind(this);
    }

    async signup(req, res, next) {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        const promise = user.save();
        const [err, data] = await asyncWrapper(promise);

        if (err) {
            return next(err);
        }
        const verificationLink = `http://localhost:${PORT}/user/verify?id=${data._id}`;
        process.nextTick(() => {
            res.json({ message: 'success', data });

            sendEmail.sendStatusChangeNotificationSingup(req.body.email, verificationLink);
        });
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const promise = User.findOne({ email }).exec();
        const [err, user] = await asyncWrapper(promise);
        if (user.emailVerified === false) {
            return next({ message: 'should verify by email' });
        }

        if (err) {
            return next(err);
        }
        if (!user) {
            return next({ message: 'User not found' });
        }
        const valid = user.comparePassword(password);

        if (!valid) {
            return next({ message: 'UNAUTHENTICATED to login' });
        }
        const token = this.generateJWTToken(user);
        try {
            this.setJWTTokenInCookie(res, token);
        } catch (error) {
            return next({ message: error.message });
        }

        return res.json({ message: 'success', token });
    }

    async emailVerify(req, res) {
        const { id } = req.query;
        try {
            await User.updateOne({ _id: id }, { emailVerified: true });
            return res.send('success');
        } catch (error) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
    }

    logout(req, res) {
        res.clearCookie('jwt');
        res.json({ message: 'User logged out' });
    }

     generateJWTToken(user) {
        const token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            active: user.active,
        }, JWT_SECRET, { expiresIn: '4h' });
        return token;
    }

    setJWTTokenInCookie(res, token) {
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 4 });
    }
}

const userService = new UserService();
module.exports = userService;
