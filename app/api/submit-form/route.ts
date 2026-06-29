import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // 1. Frontend se ye fields aani chahiye
    const { name, contact, message } = await request.json();

    // 2. Validation: check karo ki field khali na ho
    if (!name || !contact) {
      return NextResponse.json({ message: 'Name and Contact are required.' }, { status: 400 });
    }
console.log("Checking Credentials:", process.env.GMAIL_USER, process.env.GMAIL_PASS ? "Password Loaded" : "Password Missing");
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      return NextResponse.json({ message: 'Server configuration missing.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // .env.local mein apna App Password check kar lena
      },
    });

    const mailOptions = {
      from: `"Callback Request" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New Callback Request: ${name}`,
      html: `
        <div style="padding: 20px; font-family: sans-serif; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #8b5cf6;">New Callback Request Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Contact Info:</strong> ${contact}</p>
          <p><strong>Message:</strong> ${message || 'No message provided'}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Email Error:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}