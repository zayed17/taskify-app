import nodemailer from 'nodemailer';


interface EmailOptions {
  to: string; 
  subject: string; 
  text: string; 
  html?: string; 
}


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, 
  },
});

/**
 * @description Sends an email using Nodemailer.
 * @param options - Email options (to, subject, text, html).
 * @returns A promise that resolves when the email is sent.
 */
const sendEmail = async (options: EmailOptions) => {
  try {

    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export default sendEmail;