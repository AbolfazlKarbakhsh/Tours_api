const nodeMailer = require('nodemailer')

const sendMail = options => {
  // create a transporter 
    const transporter = nodeMailer.createTransport({
      service:'Gmail',
      auth:{
        user:process.env.EMAIL_USERNAME,
        pass:process.env.EMAIL_PASSWORD
      }
    })
  // define the email options 

  // actually end email
}