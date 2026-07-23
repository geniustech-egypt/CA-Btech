/* =========================================================
   B.TECH Credit Assessment Tool — print.js
   Professional print/PDF export
   - Cross-list dedup by priority
   - Semantic de-dup (same meaning family)
   - Caps explanation item counts
   - Shows requested/approved/initial credit limits
   ========================================================= */

function printAssessmentWindow(state, t, formatCurrency, capitalize) {
  const r = state.result;
  if (!r) return;

  const isRtl = state.lang === "ar";
  const dir = isRtl ? "rtl" : "ltr";
  const fontFamily = isRtl ? "Tajawal, sans-serif" : "Inter, sans-serif";

  const customerNameKey = state.customerType === "sme" ? "companyName" : "customerName";
  const customerName = state.values[customerNameKey] || "—";
  const assessmentDate = new Date().toLocaleDateString(
    isRtl ? "ar-EG" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const decisionText = t("decision" + capitalize(r.decision));

  const requestedLimitText = r.requestedLimit != null ? formatCurrency(r.requestedLimit) : "—";

  let approvedLimitText = "—";
  if (r.decision !== "rejected") {
    if (r.approvedLimitMax != null && r.approvedLimitMax > r.approvedLimit) {
      approvedLimitText = `${formatCurrency(r.approvedLimit)} — ${formatCurrency(r.approvedLimitMax)}`;
    } else {
      approvedLimitText = formatCurrency(r.approvedLimit);
    }
  }

  const initialLimitText =
    r.decision !== "rejected" && r.initialLimit != null ? formatCurrency(r.initialLimit) : "—";

  const termText = r.term
    ? (r.term.type === "upTo"
        ? t("upTo", { n: r.term.n })
        : t("between", { a: r.term.a, b: r.term.b }))
    : "—";

  // ---------- Explanation cleanup ----------
  function semanticFamily(key) {
    const map = {
      // payment history family (keep best one by order of insertion/priority)
      expExcellentPaymentHistory: "paymentHistoryPositive",
      expGoodPaymentHistory: "paymentHistoryPositive",

      // request/capacity family (if both somehow appear, keep first by priority)
      expRequestWithinCapacity: "requestCapacity",
      expRequestExceedsCapacity: "requestCapacity",
    };
    return map[key] || key;
  }

  function dedupeByPriorityAndMeaning(expl) {
    // Priority: drivers > weaknesses > strengths
    const usedExact = new Set();
    const usedFamily = new Set();

    const uniq = (arr) => {
      const out = [];
      (arr || []).forEach((k) => {
        const fam = semanticFamily(k);
        if (!usedExact.has(k) && !usedFamily.has(fam)) {
          usedExact.add(k);
          usedFamily.add(fam);
          out.push(k);
        }
      });
      return out;
    };

    const drivers = uniq(expl.drivers);
    const weaknesses = uniq(expl.weaknesses);
    const strengths = uniq(expl.strengths);

    return { strengths, weaknesses, drivers };
  }

  function capExplanationItems(expl, limits = { strengths: 5, weaknesses: 5, drivers: 4 }) {
    return {
      strengths: (expl.strengths || []).slice(0, limits.strengths),
      weaknesses: (expl.weaknesses || []).slice(0, limits.weaknesses),
      drivers: (expl.drivers || []).slice(0, limits.drivers),
    };
  }

  const cleanedExplanation = capExplanationItems(
    dedupeByPriorityAndMeaning(r.explanation || { strengths: [], weaknesses: [], drivers: [] })
  );

  function renderList(items) {
    if (!items || !items.length) {
      return `<li style="color:#6B7785;font-style:italic">${t("noneIdentified")}</li>`;
    }
    return items.map((k) => `<li>${t(k)}</li>`).join("");
  }

  const gradeColors = { A: "#1E8E5A", B: "#2D8C5C", C: "#D98C0F", D: "#C73E3E" };
  const decisionColors = { approved: "#1E8E5A", conditional: "#D98C0F", rejected: "#C73E3E" };
  const gradeColor = gradeColors[r.grade] || "#2D5C8C";
  const decisionColor = decisionColors[r.decision] || "#2D5C8C";

  const printBtnLabel = isRtl ? "🖨️ طباعة / حفظ PDF" : "🖨️ Print / Save as PDF";

  const html = `<!DOCTYPE html>
<html lang="${state.lang}" dir="${dir}">
<head>
  <meta charset="UTF-8"/>
  <title>${t("resultsTitle")} — B.TECH</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Tajawal:wght@400;600;700;800&display=swap" rel="stylesheet"/>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @page { size: A4; margin: 12mm; }

    body {
      font-family: ${fontFamily};
      background: #fff;
      color: #1B2430;
      padding: 28px 36px;
      font-size: 13px;
      direction: ${dir};
    }

    .header {
      background: #0F2A4A;
      color: #fff;
      padding: 16px 22px;
      border-radius: 10px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
    }
    .header-title { font-size: 17px; font-weight: 800; }
    .header-sub   { font-size: 11px; opacity: 0.78; margin-top: 3px; }

    .meta-row {
      display: flex;
      gap: 22px;
      flex-wrap: wrap;
      background: #F7F9FB;
      border: 1px solid #E3E8EF;
      border-radius: 8px;
      padding: 10px 16px;
      margin-bottom: 16px;
    }
    .meta-item { display: flex; flex-direction: column; gap: 2px; }
    .meta-label {
      font-size: 10px; font-weight: 700; color: #6B7785;
      text-transform: uppercase; letter-spacing: 0.04em;
    }
    .meta-value { font-size: 13px; font-weight: 700; color: #0F2A4A; }

    .scores-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 14px;
    }

    .score-tile {
      background: #F7F9FB;
      border: 1px solid #E3E8EF;
      border-radius: 8px;
      padding: 12px 14px;
      min-height: 84px;
    }
    .score-tile-label {
      font-size: 9px; font-weight: 700; color: #6B7785;
      text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.04em;
      line-height: 1.35;
    }
    .score-tile-value {
      font-size: 14px;
      font-weight: 800;
      color: #0F2A4A;
      line-height: 1.4;
      word-break: break-word;
    }

    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
    }

    .rule-note {
      margin: 0 0 16px;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid #EAD9AE;
      background: #FFF9E7;
      color: #7A6220;
      font-size: 10px;
      line-height: 1.55;
      font-weight: 600;
    }

    .explanation-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 20px;
    }
    .exp-block {
      background: #F7F9FB;
      border: 1px solid #E3E8EF;
      border-radius: 8px;
      padding: 12px;
    }
    .exp-heading {
      font-size: 10px;
      font-weight: 700;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .exp-heading::before {
      content: "";
      width: 7px;
      height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .exp-good { color: #1E8E5A; } .exp-good::before { background: #1E8E5A; }
    .exp-bad  { color: #C73E3E; } .exp-bad::before  { background: #C73E3E; }
    .exp-warn { color: #D98C0F; } .exp-warn::before { background: #D98C0F; }

    ul { list-style: none; padding: 0; }
    ul li {
      font-size: 10px;
      color: #1B2430;
      line-height: 1.5;
      padding-inline-start: 10px;
      position: relative;
      margin-bottom: 4px;
    }
    ul li::before {
      content: "";
      position: absolute;
      inset-inline-start: 0;
      top: 0.5em;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #6B7785;
    }

    .footer-note {
      font-size: 9px;
      color: #6B7785;
      text-align: center;
      border-top: 1px solid #E3E8EF;
      padding-top: 12px;
      line-height: 1.6;
    }

    .print-bar { text-align: center; padding: 20px 0 8px; }
    .print-btn {
      background: #0F2A4A;
      color: #fff;
      border: none;
      border-radius: 999px;
      padding: 13px 40px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      font-family: ${fontFamily};
      transition: background 0.2s;
    }
    .print-btn:hover { background: #173A60; }
    .print-btn:active { transform: scale(0.97); }

    @media (max-width: 900px) {
      .scores-grid { grid-template-columns: repeat(2, 1fr); }
      .explanation-grid { grid-template-columns: 1fr; }
    }

    @media print {
      .print-bar { display: none !important; }
    }
  </style>
</head>
<body>

  <div class="header">
    <div>
      <div class="header-title">B.TECH Credit Assessment</div>
      <div class="header-sub">${t("appSubtitle")}</div>
    </div>
    <div style="text-align:end">
      <div style="font-size:10px;opacity:0.75">${t("resultAssessmentDate")}</div>
      <div style="font-size:12px;font-weight:700">${assessmentDate}</div>
    </div>
  </div>

  <div class="meta-row">
    <div class="meta-item">
      <span class="meta-label">${t("resultCustomer")}</span>
      <span class="meta-value">${customerName}</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">${t("creditScore")}</span>
      <span class="meta-value">${r.score} / 100</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">${t("riskGrade")}</span>
      <span class="meta-value">${t("grade" + r.grade)}</span>
    </div>
  </div>

  <div class="scores-grid">
    <div class="score-tile">
      <div class="score-tile-label">${t("finalDecision")}</div>
      <span class="badge" style="background:${decisionColor}22;color:${decisionColor}">${decisionText}</span>
    </div>
    <div class="score-tile">
      <div class="score-tile-label">${t("requestedLimitDisplay")}</div>
      <div class="score-tile-value">${requestedLimitText}</div>
    </div>
    <div class="score-tile">
      <div class="score-tile-label">${t("approvedLimitDisplay")}</div>
      <div class="score-tile-value">${approvedLimitText}</div>
    </div>
    <div class="score-tile">
      <div class="score-tile-label">${t("initialLimitDisplay")}</div>
      <div class="score-tile-value">${initialLimitText}</div>
    </div>
  </div>

  ${r.decision !== "rejected" ? `<div class="rule-note">${t("initialLimitRuleNote")}</div>` : ""}

  <div class="scores-grid" style="margin-top:0">
    <div class="score-tile" style="grid-column: span 4;">
      <div class="score-tile-label">${t("recommendedTerm")}</div>
      <div class="score-tile-value">${termText}</div>
    </div>
  </div>

  <div class="explanation-grid">
    <div class="exp-block">
      <div class="exp-heading exp-good">${t("strengths")}</div>
      <ul>${renderList(cleanedExplanation.strengths)}</ul>
    </div>
    <div class="exp-block">
      <div class="exp-heading exp-bad">${t("weaknesses")}</div>
      <ul>${renderList(cleanedExplanation.weaknesses)}</ul>
    </div>
    <div class="exp-block">
      <div class="exp-heading exp-warn">${t("riskDrivers")}</div>
      <ul>${renderList(cleanedExplanation.drivers)}</ul>
    </div>
  </div>

  <div class="footer-note">${t("footerNote")}</div>

  <div class="print-bar">
    <button class="print-btn" onclick="window.print()">
      ${printBtnLabel}
    </button>
  </div>

</body>
</html>`;

  try {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);
    const newTab = window.open(blobUrl, "_blank");

    if (!newTab) {
      URL.revokeObjectURL(blobUrl);
      alert(
        isRtl
          ? "تم حظر النافذة المنبثقة. يرجى السماح بالنوافذ المنبثقة لهذا الموقع ثم المحاولة مرة أخرى."
          : "Popup was blocked. Please allow popups for this site and try again."
      );
      return;
    }

    setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
  } catch (err) {
    console.error("Print failed:", err);
    alert(
      isRtl
        ? "حدث خطأ أثناء تجهيز الطباعة. يرجى المحاولة مرة أخرى."
        : "Something went wrong while preparing the print. Please try again."
    );
  }
}