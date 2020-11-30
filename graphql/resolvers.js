const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator").default;

const User = mongoose.model("user");

module.exports = {
    hello: () => "Welcome to GraphQL",
    createUser: async (args, req) => {
        const {
            data: { name, username, email, password, image },
        } = args;

        const errors = {};

        if (!validator.isEmail(email)) {
            errors.email = "Invalid email address";
        }

        if (!validator.isLength(password, { min: 8 })) {
            errors.password = "Password has to be atleast 8 characters long";
        }

        if (Object.keys(errors).length > 0) {
            const error = new Error("Invalid Input");
            error.data = { ...errors };
            error.code = 422;
            throw error;
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            const error = new Error("This email is already in use");
            error.data = { email: error.message };
            error.code = 401;
            throw error;
        }

        try {
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);

            const userObj = { email, password: hashedPassword };
            if (name) userObj.name = name;
            if (username) userObj.username = username;
            if (image) userObj.image = image;

            const newUser = await new User(userObj).save();
            return { ...newUser._doc, _id: newUser._id.toString() };
        } catch (error) {
            error.data = { server: "Something went wrong while creating a user" };
            error.code = 500;
            throw error;
        }
    },
};
