module.exports = function resetPasswordTemplate({ name, tempPassword }) {
  return `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 480px; margin: auto; padding: 24px; background: #ffffff; color: #333; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <h2 style="margin-bottom: 12px; color: #2c3e50;">🔐 Reset Your Password</h2>
      
      <p style="margin: 0 0 12px;">Hi <strong>${name}</strong>,</p>
      
      <p style="margin: 0 0 12px;">👋 We received a request to reset your password. Use the temporary password below to log in:</p>
      
      <div style="font-size: 20px; font-weight: bold; background: #f4f4f4; padding: 12px; text-align: center; border-radius: 6px; letter-spacing: 1px; margin: 16px 0;">
        🔑 ${tempPassword}
      </div>
      
      <p style="margin: 0 0 12px;">🛡️ For your security, please update your password after logging in.</p>
      
      <p style="margin: 24px 0 0; font-size: 14px; color: #777;">❓ Didn’t request this? Just ignore this email or contact support.</p>
    </div>
  `;
};
