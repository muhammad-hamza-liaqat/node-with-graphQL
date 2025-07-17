const { v4: uuidv4 } = require("uuid");

const User = require("../../models/user.model");
const { hashPassword } = require("../../utils/bcrypt");
const sendEmail = require("../../utils/email/sendEmail");
const { isAuthenticated } = require("../../middleware/auth");

module.exports = {
  Query: {
    getUserProfile: isAuthenticated(async (_, __, { req }) => {
      console.log(req.user)
      const user = await User.findById(req?.user?._id).populate("wallet");
      if (!user) {
        throw new Error("No such user exists");
      }
      return user;
    }),
  },

  Mutation: {
    requestResetPassword: async (_, { email }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("No such user exists!");
      }

      const tempPassword = [...Array(2)].reduce(
        (p) =>
          p.slice(0, (i = Math.floor(Math.random() * (p.length + 1)))) +
          "!@#$%^&*".charAt(Math.floor(Math.random() * 8)) +
          p.slice(i),
        uuidv4()
      );

      const hashTempPassword = await hashPassword(tempPassword);
      user.password = hashTempPassword;
      await user.save();

      await sendEmail({
        to: user.email,
        subject: "Reset Password - Your Temporary Password for Login",
        templateName: "resetPasswordTemplate",
        templateData: {
          name: user.name,
          tempPassword,
        },
      });

      return { message: "Temporary password sent to your email." };
    },
  },
};
