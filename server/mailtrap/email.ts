import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./htmlEmail";
import { client,sender } from "./mailtrap";

export const sendVerificationEmail = async (email:string,verificationToken:string)=>{
    const recipients = [{email}];
    try {
        const res = await client.send({
            from:sender,
            to:recipients,
            subject:"Verify Your Email",
            html:htmlContent.replace("{verificationToken}",verificationToken),
            category:"Email Verification"
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send email verification");
    }
}

export const sendWelecomeEmail = async (email:string,name:string)=>{
    const recipient = [{email}];
    try {
        const res = await client.send({
            from:sender,
            to:recipient,
            subject:"Welcome to Sharan Hotels",
            html:generateWelcomeEmailHtml(name),
            template_variables:{
                company_info_name:"Sharan Hotels",
                name:name
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send welcome email");
    }
}
export const sendPasswordResetEmail = async(email:string,resetURL:string)=>{
    const recipient = [{email}]
    const htmlContent = generatePasswordResetEmailHtml(resetURL)
    try {
        const res = await client.send({
            from:sender,
            to:recipient,
            subject:'Reset your password',
            html:htmlContent,
            category:"Reset Password"
        });
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send Reset Email");
    }
}

export const sendResetSuccessEmail = async (email:string)=>{
    const recipient = [{email}]
    const htmlContent = generateResetSuccessEmailHtml()
    try {
        const res = await client.send({
            from:sender,
            to:recipient,
            subject:"Password Reset Successully",
            html:htmlContent,
            category:"Password Reset"
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to Send Reset Success Email");
    }
}