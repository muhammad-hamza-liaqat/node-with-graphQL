const jwt = require("jsonwebtoken");

const User = require("../../models/user.model");
const { hashPassword, comparePassword } = require("../../utils/bcrypt");

module.exports = {
  Query: {
    getUsers: async () => {
      return await User.find();
    },
    getUserById: async (_, { id }) => {
      return await User.findById(id);
    },
  },

  Mutation: {
    // signup mutation
    signup: async (_, { input }) => {
      const { name, email, password } = input;

      const userExist = await User.findOne({ email });
      if (userExist) {
        throw new Error("User Already Exist");
      }
    //   console.log("bcrypts.js--->", process.env.SALT_ROUNDS);

      const hashedPassword = await hashPassword(password);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      return { message: "User registered successfully" };
    },

    // login mutation
    login: async (_, { input }) => {
      const { email, password } = input;
    //   console.log(
    //     "JWT--->",
    //     process.env.JWT_SECRET,
    //     process.env.JWT_EXPIRES_IN
    //   );
    //   console.log("bcrypts.js--->", process.env.SALT_ROUNDS);

      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid Email");
      }

      const passwordMatch = await comparePassword(password, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid Password");
      }

      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return {
        user,
        token,
      };
    },
  },
};
