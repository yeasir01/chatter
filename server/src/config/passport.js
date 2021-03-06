"use strict";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import db from "../models/index.js";

const options = {
    usernameField: "email",
    passwordField: "password",
};

passport.use(
    new LocalStrategy(options, async (email, password, done) => {
        try {
            const user = await db.User.findOne({ where: { email: email }});
            
            if (!user) {
                return done(null, false);
            }

            if (!(await user.isPassword(password))) {
                return done(null, false);
            }

            if (!user.emailVerified) {
                return done({status: 401, message: "Please verify your account to login."}, false);
            }
            
            return done(null, user.toJSON());
        } catch (err) {
            done(err, null);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.User.findByPk(id);
        user ? done(null, user.toJSON()) : done(null, null);
    } catch (err) {
        done(err, null);
    }
});

export default passport;
