import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  
  var mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task manager",
      link: "https://mailgen.js/",
    },
  });

  var emailHtml = mailGenerator.generate(options.mailGenContent);
  var emailText = mailGenerator.generatePlaintext(options.mailGenContent);

  // nodemailer :-> send the email
  const sendMailFunction = async () => {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });

    const mail = {
      from: "vikramkumar0120@gmail.com",
      to: options.email,
      subject: options.subject,
      text: emailText,
      html: emailHtml,
    };

    try {
      await transporter.sendMail(mail);
      console.log("Email sent Successfully!");
    } catch (error) {
      console.log("Error sending email in page 'mail.js' file :", error);
    }
  };
  sendMailFunction();
};

const emailVerificationMailGenContent = (name, verificationUrl) => {
  return {
    body: {
      name: name,
      intro: "Welcome to My_App! We're very excited to have you on board.",
      action: {
        instructions: "To get started with our App, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your email address",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordVerificationMailGenContent = (name, passwordResetUrl) => {
  return {
    body: {
      name: name,
      intro: "Welcome to My_App! We're very excited to have you on board.",
      action: {
        instructions: "Click the button below to reset your password:",
        button: {
          color: "#DC4D2F", // Optional action button color
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export {
  sendMail,
  emailVerificationMailGenContent,
  forgotPasswordVerificationMailGenContent,
};
