const { v4: uuidv4 } = require("uuid");

const User = require("../../models/user.model");
const { hashPassword } = require("../../utils/bcrypt");
const sendEmail = require("../../utils/email/sendEmail");

module.exports = {
  Mutation: {
    requestResetPassword: async (_, { email }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("No such user exist!");
      }
      // const tempPassword = uuidv4().slice(0, 8);
      const tempPassword = [...Array(2)].reduce(
        (p) =>
          p.slice(0, (i = Math.floor(Math.random() * (p.length + 1)))) +
          "!@#$%^&*".charAt(Math.floor(Math.random() * 8)) +
          p.slice(i),
        uuidv4()
      );
      // console.log("resetPassword----", tempPassword);
      const hashTempPassword = await hashPassword(tempPassword);
      user.password = hashTempPassword;
      await user.save();

      await sendEmail({
        to: user?.email,
        subject: "Reset Password - Your Temporary Password for Login",
        templateName: "resetPasswordTemplate",
        templateData: {
          name: user?.name,
          tempPassword,
        },
      });

      return { message: "Temporary password sent to your email." };
    },
  },
};
