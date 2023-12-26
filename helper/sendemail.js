const nodemailer=require("nodemailer")
// const dotenv=require('dotenv')
//  dotenv.config();

 const {SMTP_MAIL,SMTP_PASS}=process.env;
//  console.log('smtp mmail',SMTP_MAIL);

 const sendMail = async (email, mailsubject, content) => {
    try {
      const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: '587',
        secure: false,
        requireTLS: true,
        auth: {
          user: SMTP_MAIL,
          pass: SMTP_PASS,
        },
      });
  
      const mailOptions = {
        from: SMTP_MAIL,
        to: email,
        subject: mailsubject,
        html: content,
      };
  
      const info = await transport.sendMail(mailOptions);
      console.log('Mail sent successfully:');
      return info;
    } catch (error) {
      console.error('Error sending mail:', error);
      throw error; // Rethrow the error for handling in the calling function
    }
  };
  
  module.exports = sendMail;
  