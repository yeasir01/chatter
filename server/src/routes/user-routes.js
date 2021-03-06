"use strict";

import express from "express";
import validate from "../middleware/validate.js";
import schema from "../validation/user-schema.js";
import checkAuth from "../middleware/authorization.js";
import passport from "../config/passport.js";
import { login, register, updateProfile, logout, getProfile } from "../controller/user-controller.js";

const user = express.Router();

user.route("/login")
    // @route  GET - /auth/login
    // @desc   GET - check credentials and return a session cookie if auth passes.
    // @access Public
    .post(validate(schema.login), passport.authenticate("local"), login);

user.route("/authenticate")
    // @route  GET - /api/auth/authenticate
    // @desc   GET - check cookie and return user object.
    // @access Private
    .get(checkAuth, getProfile);

user.route("/register")
    // @route  GET - /api/auth/register
    // @desc   GET - insert a new user into the database
    // @access Public
    .post(validate(schema.register), register);

user.route("/profile")
    // @route  PUT - /api/auth/register
    // @desc   PUT - update a users profile data.
    // @access Private
    .put(validate(schema.profile), checkAuth, updateProfile);

user.route("/logout")
    // @route  DELETE - /auth/logout
    // @desc   DELETE - destroys the current session.
    // @access Private
    .delete(checkAuth, logout);

export default user;