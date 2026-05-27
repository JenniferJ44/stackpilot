import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildNotificationHtml(name: string, email: string, subject: string, message: string, date: string) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 24px 28px; border-radius: 12px 12px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 18px; font-weight: 700;">
          📩 Nouveau message depuis StackPilot
        </h2>
      </div>
      <div style="background: #f8fafc; padding: 28px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-size: 13px; width: 80px; vertical-align: top;">Nom</td>
            <td style="padding: 6px 0; font-weight: 600; font-size: 14px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-size: 13px; vertical-align: top;">Email</td>
            <td style="padding: 6px 0; font-size: 14px;">
              <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-size: 13px; vertical-align: top;">Sujet</td>
            <td style="padding: 6px 0; font-size: 14px;">${subject || '(non renseigné)'}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-size: 13px; vertical-align: top;">Date</td>
            <td style="padding: 6px 0; font-size: 13px; color: #64748b;">${date}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="margin: 0 0 10px; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
        <div style="white-space: pre-wrap; color: #334155; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6;">${message}</div>
      </div>
    </div>
  `.trim();
}

function buildConfirmationHtml(name: string) {
  const firstName = name.split(' ')[0] || '';
  const greeting = firstName ? `Bonjour ${firstName},` : 'Bonjour,';
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 24px 28px; border-radius: 12px 12px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 18px; font-weight: 700;">StackPilot — Votre message a bien été reçu</h2>
      </div>
      <div style="background: #f8fafc; padding: 28px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <p style="margin: 0 0 16px; font-size: 15px;">${greeting}</p>
        <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.7; color: #334155;">
          Merci pour votre message. Je l'ai bien reçu et je vais le traiter au plus vite.
          Je reviendrai vers vous rapidement pour échanger sur votre projet, votre besoin
          d'automatisation ou votre idée d'outil.
        </p>
        <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.7; color: #334155;">
          À très bientôt,
        </p>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
          <p style="margin: 0 0 4px; font-weight: 700; font-size: 14px;">Jennifer Jaulin</p>
          <p style="margin: 0 0 12px; color: #64748b; font-size: 13px;">Product Builder No-Code · StackPilot</p>
          <p style="margin: 0 0 4px; font-size: 13px;">
            <a href="https://www.linkedin.com/in/jennifer-jaulin-64b872116/" style="color: #4f46e5; text-decoration: none;">LinkedIn</a>
            &nbsp;·&nbsp;
            <a href="https://www.malt.fr/profile/jenniferjaulin" style="color: #4f46e5; text-decoration: none;">Malt</a>
          </p>
        </div>
      </div>
    </div>
  `.trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
    }

    const { name, email, subject, message } = body as Record<string, string>;

    // ── Validation ──────────────────────────────────────────────────────────
    if (!name?.trim()) {
      return NextResponse.json({ error: 'Le nom est requis.' }, { status: 400 });
    }
    if (!email?.trim() || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 });
    }
    if (!message?.trim()) {
      return NextResponse.json({ error: 'Le message est requis.' }, { status: 400 });
    }

    // ── Config ──────────────────────────────────────────────────────────────
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL;
    // In dev, fallback to Resend sandbox sender; in production, require CONTACT_FROM_EMAIL.
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ||
      (process.env.NODE_ENV !== 'production' ? 'onboarding@resend.dev' : null);

    if (!apiKey) {
      console.error('[contact] RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Service email non configuré.' }, { status: 500 });
    }
    if (!toEmail) {
      console.error('[contact] CONTACT_EMAIL is not set');
      return NextResponse.json({ error: 'Service email non configuré.' }, { status: 500 });
    }
    if (!fromEmail) {
      console.error('[contact] CONTACT_FROM_EMAIL is not set (required in production)');
      return NextResponse.json({ error: 'Service email non configuré.' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanSubject = subject?.trim() || '';
    const cleanMessage = message.trim();
    const date = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

    // ── Send notification to me ─────────────────────────────────────────────
    const { error: notifError } = await resend.emails.send({
      from: `StackPilot Contact <${fromEmail}>`,
      to: [toEmail],
      replyTo: cleanEmail,
      subject: `Nouveau message depuis StackPilot : ${cleanSubject || '(sans sujet)'} — ${cleanName}`,
      html: buildNotificationHtml(cleanName, cleanEmail, cleanSubject, cleanMessage, date),
    });

    if (notifError) {
      console.error('[contact] Failed to send notification email:', notifError);
      return NextResponse.json({ error: "L'envoi de l'email a échoué. Veuillez réessayer." }, { status: 500 });
    }

    // ── Send confirmation to visitor ────────────────────────────────────────
    const { error: confirmError } = await resend.emails.send({
      from: `Jennifer Jaulin · StackPilot <${fromEmail}>`,
      to: [cleanEmail],
      subject: 'Votre message a bien été reçu – StackPilot',
      html: buildConfirmationHtml(cleanName),
    });

    if (confirmError) {
      // Non-blocking: the main notification went through, so we still succeed.
      console.error('[contact] Failed to send confirmation email to visitor:', confirmError);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json({ error: 'Erreur serveur inattendue.' }, { status: 500 });
  }
}
