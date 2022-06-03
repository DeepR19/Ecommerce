const nodeMailer = require("nodemailer");
    
const sendEmail = async(options)=>{
        
    // transporter is used to send email via gmail 
    const transpoter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: process.env.SMTP_SERVICE,
        auth:{
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });
    
    // body of the mail
    // all details of the mail
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to : options.email,
        subject: options.subject,
        text: options.message
    };
    
    // here we add details to gmail 
    // what we have to send in the mail
    await transpoter.sendMail(mailOptions)
};

module.exports = sendEmail





// const sib = require("sib-api-v3-sdk");

// const client = sib.ApiClient.instance;
// const apiKey = client.authentications['api-key']
// apiKey.apiKey= process.env.API_KEY

//     const tranEmailApi = new sib.TransactionalEmailsApi();

//     const sender = {
//         email: 'ecomm.res19@gmail.com'
//     }

//     const receivers =[
//         {
//             email: "chauhandeep5432@gmail.com"
//         }
//     ]

//     tranEmailApi.sendTransacEmail({
//         sender,
//         to: receivers,
//         subject: "DEPAK/34",
//         textContent: "HELLO HELLO..."
//     }).then(()=>{
//         console.log("yes")
//     }).catch(err=>{
//         console.log(err);
//     })
   
// }