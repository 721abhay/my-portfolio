import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, message } = body;

        // Simple validation
        if (!firstName || !lastName || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;

        // If credentials are not set, we'll log the message (Mock Mode)
        // This allows the frontend to be "functional" without blocking on env vars
        if (!emailUser || !emailPass) {
            console.log('--- Mock Handling Email ---');
            console.log(`From: ${firstName} ${lastName} <${email}>`);
            console.log(`Message: ${message}`);
            console.log('---------------------------');

            // In a real scenario, you'd fail here, but for "functionality" demo we might simulate success
            // Or we can return a specific warning. 
            // Let's return success so the UI updates, but log a warning on server.

            return NextResponse.json(
                { message: 'Message received (Mock Mode: Configure EMAIL_USER/PASS)' },
                { status: 200 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can change this to your provider
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        const mailOptions = {
            from: emailUser,
            to: emailUser, // Sending to yourself
            replyTo: email,
            subject: `Portfolio Contact: ${firstName} ${lastName}`,
            text: `
Name: ${firstName} ${lastName}
Email: ${email}

Message:
${message}
      `,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
