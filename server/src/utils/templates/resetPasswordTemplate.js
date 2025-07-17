module.exports = function resetPasswordTemplate({ name, tempPassword }) {
  return `
    <div style="font-family: Arial, sans-serif;">
      <h2>Password Reset</h2>
      <p>Hi ${name},</p>
      <p>You requested a password reset. Use this temporary password:</p>
      <p style="font-size: 20px; font-weight: bold;">${tempPassword}</p>
      <p>Use it to log in, and please change your password after logging in.</p>
    </div>
  `;
};
