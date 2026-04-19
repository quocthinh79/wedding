import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type RsvpPayload = {
  name?: string;
  email?: string;
  attendance?: string;
  guests?: string;
  dietaryRestrictions?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RsvpPayload;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        {
          success: false,
          message: 'Thiếu cấu hình email trên máy chủ.',
        },
        { status: 500 },
      );
    }

    const {
      name = '',
      email = process.env.EMAIL_USER,
      attendance = '',
      guests = '1',
      dietaryRestrictions = '',
      message = '',
    } = body;

    body.email = email.trim() || process.env.EMAIL_USER;

    if (!name.trim()) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập họ và tên.' },
        { status: 400 },
      );
    }

    if (!body.email.trim()) {
      return NextResponse.json(
        { success: false, message: 'Email không hợp lệ.' },
        { status: 400 },
      );
    }

    if (!attendance.trim()) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng chọn trạng thái tham dự.' },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const attendanceLabel =
      attendance === 'yes' ? 'Có tham dự' : 'Không thể tham dự';

    const text = [
      'Co RSVP moi tu thiep cuoi:',
      '',
      `Ho va ten: ${name}`,
      `Email: ${email}`,
      `Trang thai: ${attendanceLabel}`,
      `So luong khach: ${attendance === 'yes' ? guests : '0'}`,
      `Ghi chu them: ${dietaryRestrictions || 'Khong co'}`,
      `Loi chuc: ${message || 'Khong co'}`,
    ].join('\n');

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
        <h2 style="margin-bottom: 16px;">RSVP moi tu thiep cuoi</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px 0; font-weight: 700;">Ho va ten:</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Email:</td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Trang thai:</td><td>${attendanceLabel}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">So luong khach:</td><td>${attendance === 'yes' ? escapeHtml(guests) : '0'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Ghi chu them:</td><td>${escapeHtml(dietaryRestrictions || 'Khong co')}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Loi chuc:</td><td>${escapeHtml(message || 'Khong co')}</td></tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `RSVP moi - ${name}`,
      text,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send RSVP email:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Không thể gửi email lúc này. Vui lòng thử lại sau.',
      },
      { status: 500 },
    );
  }
}

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
