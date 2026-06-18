/*

import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { fullname, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // smtp.gmail.com
      port: process.env.EMAIL_PORT, // 465
      secure: true, // use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // send to your Gmail inbox
      subject: `New Contact Message from ${fullname}`,
      text: `Name: ${fullname}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Email send error:", error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

*/

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const data = await req.json();
    
    // Validate required fields
    if (!data.fullname && !data.name) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }
    if (!data.email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }
    if (!data.message) {
      return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '465', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    // Check if SMTP credentials are configured
    if (!user || !pass) {
      console.error('SMTP credentials not configured');
      return NextResponse.json({ 
        success: false, 
        error: 'Email service not configured. Please set SMTP environment variables.' 
      }, { status: 500 });
    }

    console.log('Creating transporter with:', { host, port, user: user ? '***' : 'none' });

    const transporter = nodemailer.createTransport({
      host: host || 'smtp.gmail.com',
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    // Verify connection
    await transporter.verify();
    console.log('SMTP connection verified');

    const from = data.email;
    const to = process.env.EMAIL_TO || user;

    const mailOptions = {
      from: `"Portfolio Contact" <${user}>`,
      to,
      replyTo: from,
      subject: `Portfolio Contact: ${data.fullname || data.name}`,
      text: `Name: ${data.fullname || data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.fullname || data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('Email send error:', err);
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}
