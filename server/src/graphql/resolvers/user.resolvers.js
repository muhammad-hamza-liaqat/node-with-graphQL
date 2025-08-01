const { v4: uuidv4 } = require("uuid");

const User = require("../../models/user.model");
const UserWallet = require("../../models/userWallet.model");
const { hashPassword } = require("../../utils/bcrypt");
const sendEmail = require("../../utils/email/sendEmail");
const { isAuthenticated } = require("../../middleware/auth");

module.exports = {
  Query: {
    getUserProfile: isAuthenticated(async (_, __, { req }) => {
      const user = await User.findById(req?.user?._id).populate("wallet");
      if (!user) {
        throw new Error("No such user exists");
      }
      return user;
    }),
  },

  Mutation: {
    // requestResetPassword Api
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

    // updateUserProfile Api
    updateUserName: isAuthenticated(async (_, { name }, { req }) => {
      const userId = req?.user?._id;
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("no such user exist");
      }
      user.name = name;
      await user.save();
      return {
        message: "User updated successfully",
        user,
      };
    }),

    deleteUser: isAuthenticated(async (_, args, { req }) => {
      const userId = req?.user?._id;
      // console.log(userId);
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("no such user exist!");
      }
      if (user?.wallet) {
        await UserWallet.findByIdAndDelete(user.wallet);
      }
      await User.findByIdAndDelete(userId);
      return {
        // success: true,
        message: "User deleted successfully!",
      };
    }),
  },
};
