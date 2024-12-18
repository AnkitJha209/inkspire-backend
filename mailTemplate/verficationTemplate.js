export const verificationTemplate = (otp) => {
    return `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background-color: #4c4fdd;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
      margin: 10px 0;
    }
    .otp {
      display: inline-block;
      font-size: 20px;
      font-weight: bold;
      color: #4c4fdd;
      background-color: #f4f8ff;
      padding: 10px 20px;
      border-radius: 4px;
      margin: 20px 0;
    }
    .footer {
      background-color: #f9f9f9;
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #888888;
    }
    .footer a {
      color: #4c4fdd;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>InkSpire</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Thank you for signing up for InkSpire! To complete your registration, please use the OTP below:</p>
      <div class="otp">${otp}</div>
      <p>This OTP is valid for the next 5 minutes. If you did not request this, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 InkSpire. All rights reserved.</p>
      <p>Need help? <a href="mailto:professionalaj209@gmail.com">Contact Support</a></p>
    </div>
  </div>
</body>
</html>
`
}