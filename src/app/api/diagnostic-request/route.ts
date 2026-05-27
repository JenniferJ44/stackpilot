import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// ── Helpers ──────────────────────────────────────────────────────────────────

function line(label: string, value: string | null | undefined): string {
  return value ? `${label} : ${value}\n` : '';
}

function buildNotificationHtml(
  contact: Record<string, string | null>,
  orig: Record<string, unknown> | undefined,
  edited: Record<string, string> | undefined,
  date: string,
): string {
  const origRec = orig?.recommendation as Record<string, unknown> | undefined;
  const techStack = origRec?.techStack as Array<{ name: string; role: string; necessity: string }> | undefined;
  const altRec = origRec?.alternativeRecommendation as Record<string, unknown> | null | undefined;
  const stackNames = techStack?.map((t) => t.name).join(', ') ?? '';
  const stackDetails = techStack
    ? techStack.map((t) => `<li><strong>${t.name}</strong> [${t.necessity}] — ${t.role}</li>`).join('')
    : '';

  const altBlock =
    altRec && (altRec.shouldDisplay as boolean)
      ? `<tr><td style="padding:4px 0;color:#64748b;font-size:13px;vertical-align:top;width:120px;">Stack alternative</td><td style="padding:4px 0;font-size:13px;">${altRec.stackName as string} — ${altRec.whenPreferable as string}</td></tr>`
      : '';

  const editedBlock = edited
    ? `
      <h3 style="color:#4f46e5;font-size:14px;margin:20px 0 8px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">Résumé édité par le visiteur</h3>
      <table style="width:100%;border-collapse:collapse;">
        ${edited.needSummary ? `<tr><td style="padding:4px 0;color:#64748b;font-size:13px;width:120px;vertical-align:top;">Besoin résumé</td><td style="padding:4px 0;font-size:13px;">${edited.needSummary}</td></tr>` : ''}
        ${edited.recommendedStack ? `<tr><td style="padding:4px 0;color:#64748b;font-size:13px;vertical-align:top;">Stack</td><td style="padding:4px 0;font-size:13px;">${edited.recommendedStack}</td></tr>` : ''}
        ${edited.mvp ? `<tr><td style="padding:4px 0;color:#64748b;font-size:13px;vertical-align:top;">MVP</td><td style="padding:4px 0;font-size:13px;white-space:pre-line;">${edited.mvp}</td></tr>` : ''}
        ${edited.estimatedDuration ? `<tr><td style="padding:4px 0;color:#64748b;font-size:13px;vertical-align:top;">Durée</td><td style="padding:4px 0;font-size:13px;">${edited.estimatedDuration}</td></tr>` : ''}
        ${edited.risks ? `<tr><td style="padding:4px 0;color:#64748b;font-size:13px;vertical-align:top;">Vigilances</td><td style="padding:4px 0;font-size:13px;white-space:pre-line;">${edited.risks}</td></tr>` : ''}
        ${edited.additionalProjectDetails ? `<tr><td style="padding:4px 0;color:#64748b;font-size:13px;vertical-align:top;">Compléments</td><td style="padding:4px 0;font-size:13px;">${edited.additionalProjectDetails}</td></tr>` : ''}
      </table>`
    : '';

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;color:#1e293b;">
      <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:24px 28px;border-radius:12px 12px 0 0;">
        <h2 style="color:white;margin:0;font-size:18px;font-weight:700;">📋 Nouveau diagnostic StackPilot</h2>
        <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:13px;">${date}</p>
      </div>
      <div style="background:#f8fafc;padding:28px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">

        <h3 style="color:#4f46e5;font-size:14px;margin:0 0 8px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">Contact</h3>
        <table style="width:100%;border-collapse:collapse;margin-bottom:4px;">
          <tr><td style="padding:4px 0;color:#64748b;font-size:13px;width:120px;">Prénom / Nom</td><td style="padding:4px 0;font-weight:600;font-size:13px;">${contact.firstName ?? ''} ${contact.lastName ?? ''}</td></tr>
          <tr><td style="padding:4px 0;color:#64748b;font-size:13px;">Email</td><td style="padding:4px 0;font-size:13px;"><a href="mailto:${contact.email}" style="color:#4f46e5;">${contact.email}</a></td></tr>
          ${contact.phone ? `<tr><td style="padding:4px 0;color:#64748b;font-size:13px;">Téléphone</td><td style="padding:4px 0;font-size:13px;">${contact.phone}</td></tr>` : ''}
          ${contact.company ? `<tr><td style="padding:4px 0;color:#64748b;font-size:13px;">Entreprise</td><td style="padding:4px 0;font-size:13px;">${contact.company}</td></tr>` : ''}
          ${contact.message ? `<tr><td style="padding:4px 0;color:#64748b;font-size:13px;vertical-align:top;">Message</td><td style="padding:4px 0;font-size:13px;">${contact.message}</td></tr>` : ''}
        </table>

        ${origRec ? `
        <h3 style="color:#4f46e5;font-size:14px;margin:20px 0 8px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">Diagnostic original</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${origRec.reformulation ? `<tr><td style="padding:4px 0;color:#64748b;font-size:13px;width:120px;vertical-align:top;">Besoin résumé</td><td style="padding:4px 0;font-size:13px;">${origRec.reformulation as string}</td></tr>` : ''}
          ${stackNames ? `<tr><td style="padding:4px 0;color:#64748b;font-size:13px;vertical-align:top;">Stack</td><td style="padding:4px 0;font-size:13px;font-weight:600;">${stackNames}</td></tr>` : ''}
          ${origRec.estimatedDuration ? `<tr><td style="padding:4px 0;color:#64748b;font-size:13px;">Durée</td><td style="padding:4px 0;font-size:13px;">${origRec.estimatedDuration as string}</td></tr>` : ''}
          ${altBlock}
        </table>
        ${stackDetails ? `<ul style="margin:8px 0 0 0;padding-left:18px;font-size:13px;color:#334155;">${stackDetails}</ul>` : ''}
        ` : ''}

        ${editedBlock}
      </div>
    </div>
  `.trim();
}

function buildConfirmationHtml(firstName: string): string {
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
      <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:24px 28px;border-radius:12px 12px 0 0;">
        <h2 style="color:white;margin:0;font-size:18px;font-weight:700;">Votre diagnostic StackPilot a bien été reçu</h2>
      </div>
      <div style="background:#f8fafc;padding:28px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
        <p style="margin:0 0 16px;font-size:15px;">Bonjour ${firstName ? firstName + ',' : ','}</p>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#334155;">
          Merci d'avoir complété le diagnostic StackPilot.
        </p>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#334155;">
          J'ai bien reçu vos réponses et je vais les examiner rapidement. Je reviendrai vers vous
          pour échanger sur votre projet, vos besoins et les solutions no-code ou automatisations
          les plus adaptées.
        </p>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#334155;">
          Si vous souhaitez prendre directement rendez-vous, vous pouvez réserver un créneau ici :
          <br><a href="https://calendly.com/jenniferjaulin/30min" style="color:#4f46e5;">https://calendly.com/jenniferjaulin/30min</a>
        </p>
        <p style="margin:0 0 24px;font-size:14px;color:#334155;">À très bientôt,</p>
        <div style="border-top:1px solid #e2e8f0;padding-top:20px;">
          <p style="margin:0 0 4px;font-weight:700;font-size:14px;">Jennifer Jaulin</p>
          <p style="margin:0 0 12px;color:#64748b;font-size:13px;">Product Builder No-Code · StackPilot</p>
          <p style="margin:0;font-size:13px;">
            <a href="https://www.linkedin.com/in/jennifer-jaulin-64b872116/" style="color:#4f46e5;text-decoration:none;">LinkedIn</a>
            &nbsp;·&nbsp;
            <a href="https://www.malt.fr/profile/jenniferjaulin" style="color:#4f46e5;text-decoration:none;">Malt</a>
          </p>
        </div>
      </div>
    </div>
  `.trim();
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
    }

    const { contact, diagnosticOriginal, diagnosticEdited, metadata } = body as {
      contact?: Record<string, string | null>;
      diagnosticOriginal?: Record<string, unknown>;
      diagnosticEdited?: Record<string, string>;
      metadata?: Record<string, string>;
    };

    // ── Validation ──────────────────────────────────────────────────────────
    if (!contact?.email || !contact?.firstName || !contact?.lastName) {
      return NextResponse.json({ error: 'Champs obligatoires manquants (prénom, nom, email).' }, { status: 400 });
    }

    // ── Config ──────────────────────────────────────────────────────────────
    const apiKey = process.env.RESEND_API_KEY;
    // Prefer CONTACT_* vars (same as contact form), fallback to DIAGNOSTIC_* for backward compat
    const toEmail = process.env.CONTACT_EMAIL ?? process.env.DIAGNOSTIC_TO_EMAIL;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ??
      process.env.DIAGNOSTIC_FROM_EMAIL ??
      (process.env.NODE_ENV !== 'production' ? 'onboarding@resend.dev' : null);

    if (!apiKey) {
      console.error('[diagnostic-request] RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Service email non configuré.' }, { status: 500 });
    }
    if (!toEmail) {
      console.error('[diagnostic-request] No destination email configured (CONTACT_EMAIL or DIAGNOSTIC_TO_EMAIL)');
      return NextResponse.json({ error: 'Service email non configuré.' }, { status: 500 });
    }
    if (!fromEmail) {
      console.error('[diagnostic-request] No sender email configured (CONTACT_FROM_EMAIL or DIAGNOSTIC_FROM_EMAIL)');
      return NextResponse.json({ error: 'Service email non configuré.' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const visitorEmail = contact.email!.trim().toLowerCase();
    const firstName = contact.firstName?.trim() ?? '';
    const lastName = contact.lastName?.trim() ?? '';
    const date = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
    const subjectName = [firstName, lastName].filter(Boolean).join(' ') || visitorEmail;

    // ── Send notification to me ─────────────────────────────────────────────
    const { error: notifError } = await resend.emails.send({
      from: `StackPilot Diagnostic <${fromEmail}>`,
      to: [toEmail],
      replyTo: visitorEmail,
      subject: `Nouveau diagnostic StackPilot – ${subjectName}`,
      html: buildNotificationHtml(
        contact as Record<string, string | null>,
        diagnosticOriginal,
        diagnosticEdited,
        date,
      ),
    });

    if (notifError) {
      console.error('[diagnostic-request] Failed to send notification email:', notifError);
      return NextResponse.json({ error: "L'envoi du diagnostic a échoué. Veuillez réessayer." }, { status: 500 });
    }

    console.log(`[diagnostic-request] Notification envoyée à ${toEmail}`);

    // ── Send confirmation to visitor ────────────────────────────────────────
    const { error: confirmError } = await resend.emails.send({
      from: `Jennifer Jaulin · StackPilot <${fromEmail}>`,
      to: [visitorEmail],
      subject: 'Votre diagnostic StackPilot a bien été reçu',
      html: buildConfirmationHtml(firstName),
    });

    if (confirmError) {
      console.error('[diagnostic-request] Failed to send confirmation to visitor:', confirmError);
      // Non-blocking: show success anyway since main email went through
    } else {
      console.log(`[diagnostic-request] Confirmation envoyée à ${visitorEmail}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[diagnostic-request] Unexpected error:', err);
    return NextResponse.json({ error: 'Erreur serveur inattendue.' }, { status: 500 });
  }
}
