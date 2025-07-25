import nodemailer from 'nodemailer';
import { EMAIL_CONFIG } from '../config/config.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_CONFIG.EMAIL_USER,
        pass: EMAIL_CONFIG.EMAIL_PASS
    }
});

export async function sendPasswordResetEmail(email, token) {
    const resetUrl = `http://localhost:8080/reset-password/${token}`;
    const mailOptions = {
        from: EMAIL_CONFIG.EMAIL_USER,
        to: email,
        subject: 'Recuperación de contraseña',
        html: `<p>Has solicitado restablecer tu contraseña.</p>
               <p>Haz clic en el siguiente enlace para restablecerla (válido por 1 hora):</p>
               <a href="${resetUrl}">${resetUrl}</a>`
    };
    await transporter.sendMail(mailOptions);
} 