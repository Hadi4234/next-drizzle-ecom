'use server';
import getBaseURL from '@/lib/base-url';
import nodemail from 'nodemailer';

const domain = getBaseURL();
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const transporter = nodemail.createTransport({
    host: 'mail.teamrabbil.com',
    port: 25,
    secure: false,
    auth: { user: 'info@teamrabbil.com', pass: '~sR4[bhaC[Qs' },
    tls: { rejectUnauthorized: false },
  });
  let MailOption = {
    from: 'Next Ecommerce <info@teamrabbil.com>',
    to: email,
    subject: 'Verify Email',
    text: `<p>Click to <a href='${confirmLink}'>confirm your email</a></p>`,
  };
  return await transporter.sendMail(MailOption);
};

export const sendTwoFactorTokenByEmail = async (
  email: string,
  token: string
) => {
  const transporter = nodemail.createTransport({
    host: 'mail.teamrabbil.com',
    port: 25,
    secure: false,
    auth: { user: 'info@teamrabbil.com', pass: '~sR4[bhaC[Qs' },
    tls: { rejectUnauthorized: false },
  });
  let MailOption = {
    from: 'Next Ecommerce <info@teamrabbil.com>',
    to: email,
    subject: 'Verify Email',
    text: `<p>Your Confirmation Code: ${token}</p>`,
  };
  return await transporter.sendMail(MailOption);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const transporter = nodemail.createTransport({
    host: 'mail.teamrabbil.com',
    port: 25,
    secure: false,
    auth: { user: 'info@teamrabbil.com', pass: '~sR4[bhaC[Qs' },
    tls: { rejectUnauthorized: false },
  });
  let MailOption = {
    from: 'Next Ecommerce <info@teamrabbil.com>',
    to: email,
    subject: 'Verify Email',
    text: `<p>Your Confirmation Code: ${token}</p>`,
  };
  return await transporter.sendMail(MailOption);
};
