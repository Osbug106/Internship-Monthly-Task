const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        maxLength: 20,
        trim: true,
        validate(value) {
            const regex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
            return regex.test(value);
        },
    },
    first_name: {
        type: String,
        minLength: 3,
        maxLength: 20,
        trim: true,
    },
    last_name: {
        type: String,
        minLength: 3,
        maxLength: 20,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email not valid.. !");
            }
        },
    },
    password: {
        type: String,
        validate(value) {
            const regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^/&*~=+-_])[a-zA-Z0-9!@#$%^/&*~=+-_]{8,}$/;
            return regex.test(value);
        },
    },
    business_name: {
        type: String,
    },
});

const catalogSchema = mongoose.Schema({
    userId: {
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    },
    products: {
        type: Number,
    },
    categoryLink: {
        type: String,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogs",
    },
});

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const Users = mongoose.model("user", userSchema);
const Catalogs = mongoose.model("catalog", catalogSchema);

module.exports = {
    Users,
    Catalogs,
};