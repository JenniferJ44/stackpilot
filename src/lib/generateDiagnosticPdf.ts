import type { GuidedAnswers, GuidedRecommendation } from './guidedScoring';
import type { MaturityResult } from './maturityScoring';
import type { Estimation, RoadmapStep } from '@/data/resultConfig';

export type DiagnosticPdfParams = {
  answers: GuidedAnswers;
  recommendation: GuidedRecommendation;
  maturity: MaturityResult;
  estimation: Estimation;
  roadmap: RoadmapStep[];
};

type RGB = [number, number, number];

const safe = (v: unknown, fallback = 'Non renseigne'): string =>
  v === null || v === undefined || v === '' ? fallback : String(v);

export async function generateDiagnosticPdf({
  answers,
  recommendation: rec,
  maturity,
  estimation,
  roadmap,
}: DiagnosticPdfParams): Promise<void> {
  const { default: JsPDF } = await import('jspdf');
  const { applyPlugin } = await import('jspdf-autotable');
  applyPlugin(JsPDF as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc: any = new (JsPDF as any)({ unit: 'mm', format: 'a4' });

  const PW = 210, PH = 297, M = 20, CW = 170;

  const C: Record<string, RGB> = {
    indigo:    [99, 102, 241],
    indigo700: [67, 56, 202],
    indigo50:  [238, 242, 255],
    violet:    [109, 40, 217],
    indigo200: [199, 210, 254],
    indigo300: [165, 180, 252],
    white:     [255, 255, 255],
    s900:      [15, 23, 42],
    s700:      [51, 65, 85],
    s500:      [100, 116, 139],
    s400:      [148, 163, 184],
    s200:      [226, 232, 240],
    s50:       [248, 250, 252],
    emerald:   [16, 185, 129],
    green700:  [21, 128, 61],
    amber:     [245, 158, 11],
    amber700:  [180, 83, 9],
    red:       [239, 68, 68],
  };

  let y = 0;

  const chk = (h: number) => {
    if (y + h > PH - 20) { doc.addPage(); y = M; }
  };

  const secHdr = (title: string) => {
    chk(16);
    doc.setFillColor(...C.indigo);
    doc.roundedRect(M, y, CW, 9, 1.5, 1.5, 'F');
    doc.setTextColor(...C.white);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(title, M + 4, y + 6.2);
    y += 13;
    doc.setTextColor(...C.s700);
    doc.setFont('helvetica', 'normal');
  };

  const para = (text: string, size = 9.5, style: 'normal' | 'bold' = 'normal', color = C.s700) => {
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines: string[] = doc.splitTextToSize(safe(text), CW);
    const lh = size * 0.45;
    chk(lines.length * lh + 3);
    doc.text(lines, M, y);
    y += lines.length * lh + 3;
  };

  const blt = (text: string, color: RGB = C.s700) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...color);
    const lines: string[] = doc.splitTextToSize(safe(text), CW - 7);
    chk(lines.length * 4.5 + 2);
    doc.setFillColor(...C.indigo);
    doc.circle(M + 1.5, y - 1.2, 0.9, 'F');
    doc.text(lines, M + 5, y);
    y += lines.length * 4.5 + 2;
  };

  const syncY = (gap = 6) => {
    y = (doc.lastAutoTable?.finalY ?? y) + gap;
  };

  // ═══════════════════════════════════════
  // PAGE DE COUVERTURE
  // ═══════════════════════════════════════

  doc.setFillColor(...C.indigo);
  doc.rect(0, 0, PW, 88, 'F');

  // Decorative circles
  doc.setFillColor(...C.violet);
  doc.circle(185, 14, 30, 'F');
  doc.setFillColor(79, 70, 229);
  doc.circle(192, 58, 20, 'F');
  doc.setFillColor(...C.indigo);
  doc.circle(178, 47, 12, 'F');

  // StackPilot tag
  doc.setTextColor(...C.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('STACKPILOT', M, 18);

  // Main title
  doc.setFontSize(27);
  doc.text('Diagnostic', M, 33);
  doc.text('StackPilot', M, 47);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(...C.indigo200);
  doc.text('Synthese de votre projet no-code / automatisation', M, 62);

  // Date
  const dateStr = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  doc.setFontSize(8);
  doc.setTextColor(...C.indigo300);
  doc.text(`Genere le ${dateStr}`, M, 74);

  // ─── 2×2 info boxes
  y = 100;
  const bW = (CW - 4) / 2;
  const bH = 24;

  const stackValue = rec.techStack.map((t) => t.name).join(' + ') || 'A definir';
  const boxes: { label: string; value: string }[] = [
    { label: 'Type de projet',     value: safe(answers.projectCategory) },
    { label: 'Score de maturite',  value: `${maturity.global}/100 — ${maturity.label}` },
    { label: 'Stack recommandee',  value: stackValue },
    { label: 'Objectif principal', value: safe(answers.mainObjective) },
  ];

  boxes.forEach((box, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const bx = M + col * (bW + 4);
    const by = y + row * (bH + 4);
    doc.setFillColor(...C.s50);
    doc.setDrawColor(...C.s200);
    doc.setLineWidth(0.3);
    doc.roundedRect(bx, by, bW, bH, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...C.s500);
    doc.text(box.label.toUpperCase(), bx + 4, by + 7.5);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...C.s900);
    const vl: string[] = doc.splitTextToSize(box.value, bW - 8);
    doc.text(vl.slice(0, 2), bx + 4, by + 15);
  });

  y += 2 * (bH + 4) + 6;

  // ─── Description box
  const descTxt = 'Ce document synthetise les recommandations generees a partir de vos reponses au diagnostic StackPilot.';
  const dlines: string[] = doc.splitTextToSize(descTxt, CW - 10);
  const dBoxH = dlines.length * 5 + 14;
  doc.setFillColor(...C.indigo50);
  doc.setDrawColor(...C.indigo);
  doc.setLineWidth(0.5);
  doc.roundedRect(M, y, CW, dBoxH, 2.5, 2.5, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C.indigo700);
  doc.text(dlines, M + 5, y + 8);

  // ═══════════════════════════════════════
  // PAGES DE CONTENU
  // ═══════════════════════════════════════
  doc.addPage();
  y = M;

  // ── 1. Synthèse du besoin
  secHdr('1. Synthese du besoin');
  para(rec.reformulation);
  y += 4;

  // ── 2. Score de maturité
  secHdr('2. Score de maturite projet');

  const scoreRGB: RGB =
    maturity.global >= 75 ? C.emerald :
    maturity.global >= 55 ? C.indigo :
    maturity.global >= 35 ? C.amber :
    C.red;

  chk(22);
  doc.setFillColor(...C.s50);
  doc.roundedRect(M, y, CW, 18, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...scoreRGB);
  doc.text(`${maturity.global}/100`, M + 4, y + 12);
  doc.setFontSize(10);
  doc.setTextColor(...C.s900);
  doc.text(maturity.label, M + 34, y + 8.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...C.s500);
  const interpL: string[] = doc.splitTextToSize(maturity.interpretation, CW - 38);
  doc.text(interpL.slice(0, 2), M + 34, y + 14.5);
  y += 22;

  doc.autoTable({
    startY: y,
    margin: { left: M, right: M },
    head: [['Dimension', 'Score', 'Observations']],
    body: maturity.subScores.map((s) => [s.label, `${s.score}/100`, s.description]),
    headStyles: { fillColor: C.indigo, textColor: C.white, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 8.5, textColor: C.s700 },
    alternateRowStyles: { fillColor: C.s50 },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: 'bold' },
      1: { cellWidth: 22, halign: 'center' },
      2: { cellWidth: 98 },
    },
    theme: 'plain',
    styles: { cellPadding: 3, lineColor: C.s200, lineWidth: 0.2 },
  });
  syncY();

  // ── 3. Stack recommandée
  secHdr('3. Stack recommandee');

  rec.techStack.forEach((tech) => {
    chk(20);
    const badgeRGB: RGB = tech.necessity === 'primary' ? C.indigo :
      tech.necessity === 'secondary' ? C.s500 : C.s400;
    const badge = tech.necessity === 'primary' ? 'Principal' :
      tech.necessity === 'secondary' ? 'Secondaire' : 'Optionnel';

    doc.setFillColor(...C.s50);
    doc.setDrawColor(...C.s200);
    doc.setLineWidth(0.2);
    doc.roundedRect(M, y, CW, 15, 2, 2, 'FD');
    doc.setFillColor(...badgeRGB);
    doc.roundedRect(M + 3, y + 4, 24, 5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...C.white);
    doc.text(badge, M + 5, y + 7.5);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...C.s900);
    doc.text(tech.name, M + 30, y + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...C.s500);
    const roleL: string[] = doc.splitTextToSize(tech.role, CW - 34);
    doc.text(roleL.slice(0, 1), M + 30, y + 13);
    y += 18;
  });

  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...C.s700);
  chk(6); doc.text('Pourquoi cette architecture :', M, y); y += 5;
  para(rec.rationale, 9);
  y += 4;

  // ── 4. Stack alternative
  if (rec.alternativeRecommendation?.shouldDisplay) {
    const alt = rec.alternativeRecommendation;
    secHdr('4. Stack alternative a considerer');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...C.s900);
    chk(6); doc.text(safe(alt.stackName), M, y); y += 6;
    if (alt.tools?.length > 0) para(`Outils : ${alt.tools.join(', ')}`, 9, 'normal', C.s500);
    if (alt.whenPreferable) {
      para('Quand la preferer :', 9, 'bold', C.s700);
      para(alt.whenPreferable, 9);
    }
    if (alt.advantages?.length > 0) {
      para('Avantages :', 9, 'bold', C.green700);
      alt.advantages.forEach((a) => blt(a, C.green700));
    }
    if (alt.limits?.length > 0) {
      para('Limites :', 9, 'bold', C.amber700);
      alt.limits.forEach((l) => blt(l, C.amber700));
    }
    if (alt.relevanceNote) para(alt.relevanceNote, 8.5, 'normal', C.s500);
    y += 4;
  }

  // ── 5. MVP
  secHdr('5. MVP — A garder en V1');
  rec.mvpKeep.forEach((item) => blt(item, C.green700));
  y += 4;

  // ── 6. Phase 2
  if (rec.mvpDefer?.length > 0) {
    secHdr('6. A reporter en phase 2');
    rec.mvpDefer.forEach((item) => blt(item));
    y += 4;
  }

  // ── 7. Roadmap
  secHdr('7. Roadmap recommandee');
  doc.autoTable({
    startY: y,
    margin: { left: M, right: M },
    head: [['Phase', 'Etape', 'Duree', 'Elements cles']],
    body: roadmap.map((s) => [s.phase, s.title, s.duration, s.items.join('\n')]),
    headStyles: { fillColor: C.indigo, textColor: C.white, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 8.5, textColor: C.s700, valign: 'top' },
    alternateRowStyles: { fillColor: C.s50 },
    columnStyles: {
      0: { cellWidth: 14, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 44, fontStyle: 'bold' },
      2: { cellWidth: 28 },
      3: { cellWidth: 84 },
    },
    theme: 'plain',
    styles: { cellPadding: 3.5, lineColor: C.s200, lineWidth: 0.2 },
  });
  syncY();

  // ── 8. Estimation indicative
  secHdr('8. Estimation indicative');
  doc.autoTable({
    startY: y,
    margin: { left: M, right: M },
    head: [['Bloc de travail', 'Estimation']],
    body: estimation.blocks.map((b) => [b.label, b.range]),
    foot: [['Total estime', estimation.total]],
    headStyles: { fillColor: C.indigo, textColor: C.white, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 9, textColor: C.s700 },
    footStyles: { fillColor: C.indigo50, textColor: C.indigo700, fontStyle: 'bold', fontSize: 10 },
    alternateRowStyles: { fillColor: C.s50 },
    columnStyles: {
      0: { cellWidth: 130 },
      1: { cellWidth: 40, halign: 'right', fontStyle: 'bold' },
    },
    theme: 'plain',
    styles: { cellPadding: 3.5, lineColor: C.s200, lineWidth: 0.2 },
  });
  syncY(4);

  para(
    'Cette estimation est indicative. Elle devra etre confirmee apres echange, selon les outils deja en place, les acces disponibles, le niveau de complexite et les cas particuliers a gerer.',
    8, 'normal', C.s400
  );
  y += 4;

  // ── 9. Questions à clarifier
  if (rec.clarifyingQuestions?.length > 0) {
    secHdr('9. Questions a clarifier');
    rec.clarifyingQuestions.forEach((q) => blt(q));
    y += 4;
  }

  // ── 10. Prochaine étape
  const pt1Lines: string[] = doc.splitTextToSize(
    "Pour transformer ce diagnostic en plan d'action concret, l'etape suivante consiste a clarifier le perimetre MVP, verifier les outils deja disponibles et estimer precisement les workflows a construire.",
    CW - 10
  );
  const pt2Lines: string[] = doc.splitTextToSize(
    'Vous pouvez contacter StackPilot pour transformer ce diagnostic en devis ou en atelier de cadrage.',
    CW - 10
  );
  const nsH = (pt1Lines.length + pt2Lines.length) * 5 + 22;
  chk(nsH + 4);
  doc.setFillColor(...C.indigo50);
  doc.setDrawColor(...C.indigo);
  doc.setLineWidth(0.5);
  doc.roundedRect(M, y, CW, nsH, 3, 3, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...C.indigo);
  doc.text('10. Prochaine etape conseillee', M + 5, y + 9);
  let ty = y + 16;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C.indigo700);
  doc.text(pt1Lines, M + 5, ty);
  ty += pt1Lines.length * 5 + 3;
  doc.setFont('helvetica', 'bold');
  doc.text(pt2Lines, M + 5, ty);
  y += nsH + 8;

  // ═══════════════════════════════════════
  // FOOTER SUR CHAQUE PAGE
  // ═══════════════════════════════════════
  const totalPages: number = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(...C.s200);
    doc.setLineWidth(0.3);
    doc.line(M, PH - 14, PW - M, PH - 14);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...C.s400);
    doc.text(
      'StackPilot — Product Builder No-Code — Automatisation, outils internes, Bubble, Airtable, Make, Notion, Salesforce',
      M, PH - 8.5
    );
    doc.text(`Page ${p}/${totalPages}`, PW - M, PH - 8.5, { align: 'right' });
  }

  // ─── Téléchargement
  const today = new Date().toISOString().split('T')[0];
  const cat = safe(answers.projectCategory, 'projet').toLowerCase().replace(/[\s/]+/g, '-');
  doc.save(`diagnostic-stackpilot-${cat}-${today}.pdf`);
}
