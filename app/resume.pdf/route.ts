import type { NextRequest } from "next/server"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

function wrapText(text: string, maxChars: number) {
  const words = text.split(" ")
  const lines: string[] = []
  let line = ""
  for (const w of words) {
    if ((line + (line ? " " : "") + w).length > maxChars) {
      if (line) lines.push(line)
      line = w
    } else {
      line = line ? line + " " + w : w
    }
  }
  if (line) lines.push(line)
  return lines
}

export async function GET(_req: NextRequest) {
  const pdf = await PDFDocument.create()
  let page = pdf.addPage([612, 792]) // US Letter
  const margin = 50
  let y = 792 - margin

  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const fontSizeTitle = 18
  const fontSizeSection = 13
  const fontSizeBody = 11
  const lineGap = 16
  const maxChars = 95

  const drawTitle = (txt: string) => {
    page.drawText(txt, { x: margin, y, size: fontSizeTitle, font: fontBold, color: rgb(0.1, 0.1, 0.12) })
    y -= lineGap + 4
  }

  const drawLine = (txt: string, bold = false, size = fontSizeBody) => {
    const lines = wrapText(txt, maxChars)
    for (const l of lines) {
      if (y < margin + 40) {
        page = pdf.addPage([612, 792])
        y = 792 - margin
      }
      page.drawText(l, { x: margin, y, size, font: bold ? fontBold : font, color: rgb(0.12, 0.12, 0.14) })
      y -= lineGap
    }
  }

  const drawSection = (label: string) => {
    y -= 6
    page.drawText(label.toUpperCase(), {
      x: margin,
      y,
      size: fontSizeSection,
      font: fontBold,
      color: rgb(0.08, 0.08, 0.1),
    })
    y -= lineGap
  }

  // Header
  drawTitle("Sounak Sarkar")
  drawLine("Email: hrick3130@gmail.com | Phone: 8881184644")
  drawLine("Profiles: LeetCode | GitHub | LinkedIn")
  y -= 4
  drawLine("Final Year B.Tech (CSE - AIML)")

  // Education
  drawSection("Education")
  drawLine("Future Campus School, Kolkata — AISSE CBSE Class X (Mar 2019 - Mar 2020) | Percentage: 77%")
  drawLine("Future Campus School, Kolkata — Science Stream CBSE Class XII (Mar 2021 - Mar 2022) | Percentage: 80.4%")
  drawLine(
    "Dr. Sudhir Chandra Sur Institute of Technology, Kolkata — B.Tech in CSE (AIML) (Oct — Present) | CGPA: 7.7 till 6th sem",
  )

  // Skills
  drawSection("Skills")
  drawLine("Programming Languages: Python, SQL")
  drawLine("Libraries/Frameworks: NumPy, Pandas, Scikit-Learn, Matplotlib, XGBoost, Ensemble")
  drawLine(
    "Tools/Platforms: Git, VS Code, PyCharm, Spyder, Jupyter Notebook, Git Codespaces, Replit, API, OpenAI, Kaggle, Orchid, GitHub, Streamlit, Render",
  )
  drawLine("Databases: MySQL")
  drawLine(
    "Core Subjects: Data Structures & Algorithms, DBMS, Machine Learning, Artificial Intelligence, Object Oriented Programming",
  )
  drawLine(
    "Soft Skills: Teamwork & Collaboration, Analytical Thinking, Decision-making, Fast Learner, Punctuality, Leadership",
  )

  // Projects
  drawSection("Projects / Open-Source")
  drawLine("Breast Cancer Detection using XGBoost Classifier | Link", true)
  drawLine("• Built a supervised ML pipeline on the Wisconsin Breast Cancer Dataset (malignant vs. benign).")
  drawLine("• Optimized XGBoost (~95%+ accuracy), outperforming baseline models (ANN, SVM, Random Forest).")
  drawLine("• Achieved high recall (~95%), prioritizing low false negatives for screening reliability.")
  drawLine("• End-to-end preprocessing: missing values, feature selection, hyperparameter tuning.")

  drawLine("Heart Disease Prediction using Random Forest Classifier | Link", true)
  drawLine("• Trained Random Forest to predict heart disease probability from medical features.")
  drawLine("• Performed preprocessing & feature engineering; test size 0.3; achieved 98% model accuracy.")
  drawLine("• Conducted EDA with Matplotlib to identify key patterns and correlations.")
  drawLine("• Built an interactive Streamlit dashboard and deployed to Streamlit Cloud.")

  // Certifications
  drawSection("Certifications")
  drawLine("• Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate – Oracle (Issued Aug 2025)")
  drawLine("• GenAI Powered Data Analytics Job Simulation – Tata Forage (Issued Aug 2025)")

  const bytes = await pdf.save()
  return new Response(bytes, {
    headers: {
      "Content-Type": "application/pdf",
      // inline so it previews; users can save from the viewer
      "Content-Disposition": 'inline; filename="Sounak-Sarkar-Resume.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  })
}
