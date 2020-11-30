const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: String,
        username: String,
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "/assets/profile/default.png",
        },
    },
    { timestamps: true }
);

mongoose.model("user", userSchema);
