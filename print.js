/* =========================================================
   B.TECH Credit Assessment Tool — print.js
   Professional print/PDF export
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

  const initialLimitText = r.decision !== "rejected" && r.initialLimit != null ? formatCurrency(r.initialLimit) : "—";
  const termText = r.term ? (r.term.type === "upTo" ? t("upTo", { n: r.term.n }) : t("between", { a: r.term.a, b: r.term.b })) : "—";

  function semanticFamily(key) {
    const map = {
      expExcellentPaymentHistory: "paymentHistoryPositive",
      expGoodPaymentHistory: "paymentHistoryPositive",
      expRequestWithinCapacity: "requestCapacity",
      expRequestExceedsCapacity: "requestCapacity",
    };
    return map[key] || key;
  }

  function dedupeByPriorityAndMeaning(expl) {
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
    return { drivers: uniq(expl.drivers), weaknesses: uniq(expl.weaknesses), strengths: uniq(expl.strengths) };
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

  const decisionColors = { approved: "#1E8E5A", conditional: "#D98C0F", rejected: "#C73E3E" };
  const decisionColor = decisionColors[r.decision] || "#2D5C8C";

  const printBtnLabel = isRtl ? "🖨️ طباعة / حفظ PDF" : "🖨️ Print / Save as PDF";
  const printHeaderTitle = isRtl
    ? "نظام تقييم منح ائتمان للعملاء الجدد - شركة بي تك للتجارة والتوزيع"
    : "New Customer Credit Grant Assessment System - B.TECH for Trading & Distribution";
  const printFooterCredit = isRtl
    ? "إعداد وتصميم: حسين ابو العزايم - قطاع التخطيط والتحليل المالي"
    : "Prepared and Designed by: Hussein Abo Elazaim - Financial Planning & Analysis Sector";

  const html = `<!DOCTYPE html>
<html lang="${state.lang}" dir="${dir}">
<head>
  <meta charset="UTF-8"/>
  <title>${t("resultsTitle")} — B.TECH</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Tajawal:wght@400;600;700;800&display=swap" rel="stylesheet"/>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @page { 
      size: A4 landscape; 
      margin: 8mm 8mm 18mm 8mm;
    }
    
    html, body { 
      margin: 0; 
      padding: 0;
    }
    
    body {
      font-family: ${fontFamily};
      background: #fff;
      color: #1B2430;
      font-size: 11px;
      direction: ${dir};
      padding: 0;
      line-height: 1.3;
    }

    .main {
      padding: 12px 16px 0;
    }

    .header {
      position: relative;
      overflow: hidden;
      background: radial-gradient(circle at 8% 10%, rgba(242, 201, 76, 0.24), transparent 34%), radial-gradient(circle at 92% 0%, rgba(240, 138, 43, 0.24), transparent 30%), linear-gradient(135deg, #344B2A 0%, #4F6F3F 100%);
      color: #fff;
      padding: 10px 14px;
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 8px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      page-break-after: avoid;
      page-break-inside: avoid;
      direction: ${dir};
    }
    
    .header::before {
      content: "";
      position: absolute;
      inset-inline-start: 0;
      top: 0;
      width: 5px;
      height: 100%;
      background: linear-gradient(180deg, #F2C94C 0%, #E67A22 100%);
    }
    
    .header-title { font-size: 13px; font-weight: 800; line-height: 1.25; position: relative; z-index: 1; }
    .header-kicker { font-family: Inter, sans-serif; font-size: 7px; font-weight: 800; letter-spacing: .1em; opacity: .72; margin-bottom: 3px; position: relative; z-index: 1; }
    .header-mark { display: flex; align-items: center; justify-content: center; width: 50px; height: 30px; border: 1px solid rgba(255,255,255,.48); border-radius: 6px; font-family: Inter, sans-serif; font-size: 11px; font-weight: 800; letter-spacing: .05em; position: relative; z-index: 1; }

    .meta-row {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      background: #F7F9FB;
      border: 1px solid #E3E8EF;
      border-radius: 6px;
      padding: 6px 10px;
      margin-bottom: 8px;
      direction: ${dir};
      page-break-inside: avoid;
    }
    .meta-item { display: flex; flex-direction: column; gap: 1px; }
    .meta-label { font-size: 8px; font-weight: 700; color: #6B7785; text-transform: uppercase; letter-spacing: 0.03em; }
    .meta-value { font-size: 11px; font-weight: 700; color: #0F2A4A; }

    .scores-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin-bottom: 8px;
      page-break-inside: avoid;
    }

    .score-tile {
      background: #F7F9FB;
      border: 1px solid #E3E8EF;
      border-radius: 6px;
      padding: 8px 10px;
      min-height: auto;
      direction: ${dir};
      page-break-inside: avoid;
    }
    .score-tile-label { font-size: 8px; font-weight: 700; color: #6B7785; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.03em; line-height: 1.2; }
    .score-tile-value { font-size: 12px; font-weight: 800; color: #0F2A4A; line-height: 1.2; word-break: break-word; }

    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 9px;
      font-weight: 700;
    }

    .rule-note {
      margin: 0 0 8px;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid #EAD9AE;
      background: #FFF9E7;
      color: #7A6220;
      font-size: 8px;
      line-height: 1.4;
      font-weight: 600;
      direction: ${dir};
      text-align: ${dir === "rtl" ? "right" : "left"};
      page-break-inside: avoid;
    }

    .explanation-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      margin-bottom: 10px;
      page-break-inside: avoid;
    }
    
    .exp-block {
      background: #F7F9FB;
      border: 1px solid #E3E8EF;
      border-radius: 6px;
      padding: 8px;
      direction: ${dir};
      page-break-inside: avoid;
    }
    
    .exp-heading {
      font-size: 8px;
      font-weight: 700;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 4px;
      ${dir === "rtl" ? "flex-direction: row-reverse;" : ""}
    }
    .exp-heading::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .exp-good { color: #1E8E5A; } .exp-good::before { background: #1E8E5A; }
    .exp-bad  { color: #C73E3E; } .exp-bad::before  { background: #C73E3E; }
    .exp-warn { color: #D98C0F; } .exp-warn::before { background: #D98C0F; }

    ul { list-style: none; }
    ul li {
      font-size: 8px;
      color: #1B2430;
      line-height: 1.3;
      padding-inline-start: 8px;
      position: relative;
      margin-bottom: 2px;
      text-align: ${dir === "rtl" ? "right" : "left"};
      direction: ${dir};
    }
    ul li::before {
      content: "";
      position: absolute;
      inset-inline-start: 0;
      top: 0.4em;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #6B7785;
    }

    .footer-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      font-size: 8px;
      color: #6B7785;
      text-align: ${dir === "rtl" ? "right" : "left"};
      border-top: 1px solid #DFE8D9;
      padding: 6px 0;
      line-height: 1.4;
      direction: ${dir};
      ${dir === "rtl" ? "flex-direction: row-reverse;" : ""}
      margin-top: 10px;
      page-break-inside: avoid;
    }
    
    .footer-credit { font-weight: 700; color: #66745F; white-space: nowrap; }
    .footer-disclaimer { max-width: 55%; }

    .print-bar { text-align: center; padding: 15px 0; }
    .print-btn {
      background: #0F2A4A;
      color: #fff;
      border: none;
      border-radius: 999px;
      padding: 10px 30px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      font-family: ${fontFamily};
    }

    @media (max-width: 900px) {
      .scores-grid { grid-template-columns: repeat(2, 1fr); }
      .explanation-grid { grid-template-columns: 1fr; }
    }

    @media print {
      .print-bar { display: none !important; }
      body { border: none; }
    }
  </style>
</head>
<body>

  <div class="main">
    <div class="header">
      <div>
        <div class="header-kicker">B.TECH | CREDIT ASSESSMENT</div>
        <div class="header-title">${printHeaderTitle}</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;direction:${dir}">
        <div style="text-align:${dir === "rtl" ? "right" : "left"}">
          <div style="font-size:7px;opacity:0.75">${t("resultAssessmentDate")}</div>
          <div style="font-size:10px;font-weight:700">${assessmentDate}</div>
        </div>
        <div class="header-mark">B.TECH</div>
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

    <div class="footer-section">
      <span class="footer-credit">${printFooterCredit}</span>
      <span class="footer-disclaimer">${t("footerNote")}</span>
    </div>
  </div>

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
      alert(isRtl ? "تم حظر النافذة المنبثقة." : "Popup was blocked.");
      return;
    }

    setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
  } catch (err) {
    console.error("Print failed:", err);
  }
}


/* ----------------------- DIRECT PDF DOWNLOAD ----------------------- */

function downloadAssessmentPdf(state, t, formatCurrency, capitalize) {
  const isRtl = state.lang === "ar";
  const customerNameKey = state.customerType === "sme" ? "companyName" : "customerName";
  const customerName = state.values[customerNameKey] || "customer";
  const datePart = new Date().toISOString().slice(0, 10);
  const safeCustomerName = String(customerName).trim().replace(/[^\p{L}\p{N}_-]+/gu, "-").replace(/^-+|-+$/g, "") || "customer";
  const fileName = `credit-assessment-${safeCustomerName}-${datePart}.pdf`;
  const reportHeaderTitle = isRtl ? "نظام تقييم منح ائتمان للعملاء الجدد - شركة بي تك للتجارة والتوزيع" : "New Customer Credit Grant Assessment System - B.TECH for Trading & Distribution";
  const reportFooterCredit = isRtl ? "إعداد وتصميم: حسين ابو العزايم - قطاع التخطيط والتحليل المالي" : "Prepared and Designed by: Hussein Abo Elazaim - Financial Planning & Analysis Sector";

  if (typeof html2pdf !== "function") {
    alert(isRtl ? "تعذر تحميل مكوّن PDF." : "PDF component not loaded.");
    return;
  }

  const source = document.querySelector("#screen3 .results-card");
  if (!source) {
    alert(isRtl ? "لا توجد نتائج جاهزة للتصدير." : "No results ready.");
    return;
  }

  const downloadButton = document.getElementById("btnDownloadPdf");
  const originalLabel = downloadButton ? downloadButton.textContent : "";
  if (downloadButton) {
    downloadButton.disabled = true;
    downloadButton.textContent = isRtl ? "جارٍ تجهيز PDF…" : "Preparing PDF…";
  }

  const exportWidth = 1040;
  const staging = document.createElement("div");
  staging.className = "pdf-staging";
  staging.dir = isRtl ? "rtl" : "ltr";
  staging.lang = state.lang;
  staging.style.cssText = ["position: fixed", "left: 0", "top: 0", `width: ${exportWidth}px`, "background: #ffffff", "z-index: -1", "padding: 0", "margin: 0"].join(";");

  const report = source.cloneNode(true);
  report.dir = isRtl ? "rtl" : "ltr";
  report.style.direction = isRtl ? "rtl" : "ltr";
  report.style.width = `${exportWidth}px`;
  report.style.maxWidth = "none";
  report.style.boxSizing = "border-box";
  report.style.transform = "scale(0.74)";
  report.style.transformOrigin = "top left";
  report.classList.add("pdf-export-root", "pdf-landscape-export");
  if (isRtl) report.classList.add("pdf-arabic-export");

  const reportHeader = document.createElement("header");
  reportHeader.className = "pdf-report-header";
  reportHeader.dir = isRtl ? "rtl" : "ltr";
  reportHeader.innerHTML = `<div class="pdf-report-header-accent"></div><div class="pdf-report-header-copy"><div class="pdf-report-header-kicker">B.TECH | CREDIT ASSESSMENT</div><div class="pdf-report-header-title"></div></div><div class="pdf-report-header-mark">B.TECH</div>`;
  reportHeader.querySelector(".pdf-report-header-title").textContent = reportHeaderTitle;
  report.prepend(reportHeader);

  const reportFooter = document.createElement("footer");
  reportFooter.className = "pdf-report-footer";
  reportFooter.dir = isRtl ? "rtl" : "ltr";
  reportFooter.innerHTML = `<span class="pdf-report-footer-text"></span><span class="pdf-report-footer-page">B.TECH • CREDIT ASSESSMENT</span>`;
  reportFooter.querySelector(".pdf-report-footer-text").textContent = reportFooterCredit;
  report.appendChild(reportFooter);

  report.querySelectorAll(".screen-actions").forEach((element) => element.remove());
  report.querySelectorAll(".form-error-banner").forEach((element) => element.remove());

  const gaugeSvg = report.querySelector("#scoreGaugeSvg");
  if (gaugeSvg) {
    const gaugeFallback = document.createElement("div");
    gaugeFallback.className = "pdf-score-circle";
    gaugeFallback.setAttribute("aria-label", `${state.result?.score ?? 0} / 100`);
    const scoreValue = document.createElement("span");
    scoreValue.className = "pdf-score-value";
    scoreValue.textContent = String(state.result?.score ?? 0);
    const scoreMax = document.createElement("span");
    scoreMax.className = "pdf-score-max";
    scoreMax.textContent = "/ 100";
    gaugeFallback.append(scoreValue, scoreMax);
    gaugeSvg.replaceWith(gaugeFallback);
  }

  staging.appendChild(report);
  document.body.appendChild(staging);

  const options = {
    margin: [6, 6, 12, 6],
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff", logging: false, foreignObjectRendering: isRtl, windowWidth: exportWidth, x: 0, y: 0, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    pagebreak: { mode: ["css", "legacy"], avoid: [".results-meta", ".result-tile", ".explanation-block"] },
  };

  function removeTrailingBlankFragments(pdf) {
    while (pdf.getNumberOfPages() > 1) {
      const page = pdf.internal?.pages?.[pdf.getNumberOfPages()] || [];
      const imageHeights = page.map((line) => { const match = typeof line === "string" && line.match(/0 0 ([\d.]+) [\d.]+ [\d.]+ [\d.]+ cm/); return match ? Number(match[1]) : 0; }).filter((height) => height > 0);
      const maxImageHeight = imageHeights.length ? Math.max(...imageHeights) : 0;
      if (maxImageHeight > 1) break;
      pdf.deletePage(pdf.getNumberOfPages());
    }
  }

  html2pdf()
    .set(options)
    .from(report)
    .toCanvas()
    .toPdf()
    .get("pdf")
    .then((pdf) => {
      removeTrailingBlankFragments(pdf);
      pdf.save(fileName);
      staging.remove();
      if (downloadButton) {
        downloadButton.disabled = false;
        downloadButton.textContent = originalLabel;
      }
    })
    .catch((error) => {
      console.error("PDF download failed:", error);
      staging.remove();
      if (downloadButton) {
        downloadButton.disabled = false;
        downloadButton.textContent = originalLabel;
      }
    });
}

/* ----------------------- END DIRECT PDF DOWNLOAD ----------------------- */
