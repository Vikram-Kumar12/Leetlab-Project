import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  var mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "LeetLab",
      link: "https://mailgen.js/", // your website URL
    },
  });

  var emailHtml = mailGenerator.generate(options.mailGenContent);
  var emailText = mailGenerator.generatePlaintext(options.mailGenContent);

  // nodemailer :-> send the email used nodemailer and mailtrap:
  // const sendMailFunction = async () => {
  //   const transporter = nodemailer.createTransport({
  //     host: process.env.MAILTRAP_SMTP_HOST,
  //     port: process.env.MAILTRAP_SMTP_PORT,
  //     secure: false, // true for port 465, false for other ports
  //     auth: {
  //       user: process.env.MAILTRAP_SMTP_USER,
  //       pass: process.env.MAILTRAP_SMTP_PASS,
  //     },
  //   });

  //   const mail = {
  //     from: `"LeetLab Support" <leetlab@gmail.com>`,
  //     to: options.email,
  //     subject: options.subject,
  //     text: emailText,
  //     html: emailHtml,
  //   };

  //   try {
  //     await transporter.sendMail(mail);
  //     console.log("Email sent Successfully!");
  //   } catch (error) {
  //     console.log("Error sending email in page 'mail.js' file :", error);
  //   }
  // };
  // sendMailFunction();


  // 2. ✅ Create Gmail SMTP transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // example: leetlab@gmail.com       
      pass: process.env.GMAIL_APP_PASSWORD, // 16-digit app password from Google
    },
  });
  // 3. Compose mail
  const mail = {
    from: `"LeetLab Support" <${process.env.GMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHtml,
  };
  // 4. Send the mail
  try {
    await transporter.sendMail(mail);
    console.log("✅ Email sent successfully to", options.email);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
//   console.log("Sending email to", options.email);
// console.log("SMTP user:", process.env.GMAIL_USER);
// const info = await transporter.sendMail(mail);
// console.log("Message ID:", info.messageId);
// console.log("Preview URL:", nodemailer.getTestMessageUrl(info));


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
