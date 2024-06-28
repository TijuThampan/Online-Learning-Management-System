import User from '../models/userModel.js';
import createError from '../utils/error.js';
import sendMail from '../utils/sendMail.js';

export const contactUs = async (req, res, next) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return next(createError(400, "All input fields are required"));
    }

    const subject = `You received a new message from ${name}`;
    const replySubject = `Thank you for contacting us, ${name}!`;
    const replyText = `
        <h3>Hi ${name},</h3>
        <p>Thank you for reaching out. We have received your message and will get back to you as soon as possible.</p>
        <br>
        Best regards,
        Your Support Team
    `;
    const textMessage = `
        <h3>New Contact Request</h3>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong> ${message}</p>
    `;

    try {
        await sendMail(email, process.env.GMAIL_ID, subject, textMessage);
        await sendMail(process.env.GMAIL_ID, email, replySubject, replyText);
        res.status(200).json({
            success: true,
            message: "Message sent successfully, and auto-reply confirmed."
        });
    } catch (error) {
        next(createError(500, error.message || "Failed to send email"));
    }
};

export const userStats = async (req, res, next) => {
    try {
        const stats = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ 'subscription.status': 'active' })
        ]);

        res.status(200).json({
            success: true,
            message: 'User statistics fetched successfully',
            totalUsers: stats[0],
            activeSubscriptions: stats[1]
        });
    } catch (error) {
        next(createError(500, error.message || "Failed to fetch user statistics"));
    }
};
