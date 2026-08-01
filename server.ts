import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI client safely
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. AI features will use rule-based fallback responses.");
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      appName: "Zila AI Toolkit",
      version: "1.0.0",
      aiAvailable: !!process.env.GEMINI_API_KEY,
      timestamp: new Date().toISOString(),
    });
  });

  // SEO: Dynamic Robots.txt Endpoint
  app.get(["/robots.txt", "/api/seo/robots.txt"], (req, res) => {
    res.type("text/plain");
    res.send(
      `User-agent: *\nAllow: /\nSitemap: https://toolkit.zilatech.africa/sitemap.xml\n\n# Directives for AI Crawlers\nUser-agent: GPTBot\nAllow: /\nUser-agent: ChatGPT-User\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: Google-Extended\nAllow: /`
    );
  });

  // SEO: Dynamic Sitemap.xml Endpoint
  app.get(["/sitemap.xml", "/api/seo/sitemap.xml"], (req, res) => {
    res.type("application/xml");
    const today = new Date().toISOString().split("T")[0];
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://toolkit.zilatech.africa/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://toolkit.zilatech.africa/framework</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://toolkit.zilatech.africa/assessment/zila-demo</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://toolkit.zilatech.africa/assessment/greensteds</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
  });

  // AI Crawler JSON Schema API for AI models reading Zila Toolkit
  app.get("/api/seo/framework.json", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({
      frameworkName: "Zila AI Readiness & Transformation Framework (K–12)",
      organization: "Zila Tech",
      version: "1.0",
      dimensionsCount: 12,
      dimensions: [
        "AI Awareness",
        "AI Literacy & Practical Skills",
        "Classroom Pedagogy Integration",
        "Confidence & Self-Efficacy",
        "Ethical & Responsible AI Use",
        "AI in Assessment Practices",
        "Professional Learning & Development",
        "Innovation & Growth Mindset",
        "Digital Citizenship",
        "Leadership & Vision Support",
        "Infrastructure & Tool Access",
        "Future Educational Aspirations"
      ],
      scoringTiers: [
        { tier: "AI Aware / Novice", minScore: 0, maxScore: 39 },
        { tier: "AI Explorer / Emerging", minScore: 40, maxScore: 59 },
        { tier: "AI Practitioner / Competent", minScore: 60, maxScore: 74 },
        { tier: "AI Innovator / Advanced", minScore: 75, maxScore: 89 },
        { tier: "AI Champion / Strategic Leader", minScore: 90, maxScore: 100 }
      ],
      methodology: "Evidence-based multi-tier Likert-scale self-assessment aggregated into institutional maturity indices."
    });
  });

  // AI Endpoint: Deep Individual Teacher Assessment Analyzer
  app.post("/api/gemini/analyze-assessment", async (req, res) => {
    try {
      const { teacherName, schoolName, department, subject, totalScore, readinessLevel, dimensionScores } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          analysis: `Teacher ${teacherName || 'Participant'} from ${schoolName || 'K–12 School'} achieves an overall AI Readiness score of ${totalScore}/100, placing them at the "${readinessLevel}" stage. Top strengths include Classroom Integration and Ethical AI awareness. Recommended immediate action: Engage in hands-on AI Prompt Crafting workshops for formative assessment design.`,
          strengths: ["Strong awareness of ethical considerations in student work", "Proactive enthusiasm for trying AI tools in lesson planning"],
          growthAreas: ["Deeper fluency in customized assessment rubrics", "Integration with school digital infrastructure"],
          recommendedPathways: [
            "Module 1: Foundations of Ethical AI in K-12",
            "Module 2: Prompting for Differentiated Instruction",
            "Module 3: Designing AI-Resilient Performance Tasks"
          ],
          source: "rule-based"
        });
      }

      const prompt = `You are a Senior K–12 Educational AI Transformation Specialist at Zila Tech.
Analyze the following baseline AI readiness assessment data for a K–12 educator and produce a professional, encouraging, and highly actionable diagnostic report.

Educator Details:
- Name: ${teacherName || 'Anonymous Educator'}
- School: ${schoolName || 'K–12 Partner School'}
- Department: ${department || 'General Education'}
- Subject: ${subject || 'Multiple Disciplines'}
- Overall Score: ${totalScore}/100
- Readiness Level: ${readinessLevel}

Dimension Scores (out of 100):
${JSON.stringify(dimensionScores, null, 2)}

Provide a structured JSON response with:
1. "executiveSummary": A concise 2-sentence diagnostic assessment of where this teacher stands and their potential.
2. "keyStrengths": Array of 3 distinct strengths observed from their scores.
3. "priorityGrowthAreas": Array of 2 targeted growth opportunities.
4. "recommendedPathways": Array of 3 practical professional development learning modules suited for their tier.
5. "nextActionableStep": 1 immediate, high-impact action step they can do in their classroom this week.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json({
        ...parsed,
        source: "gemini-3.6-flash"
      });
    } catch (error: any) {
      console.error("Error in analyze-assessment:", error);
      res.status(500).json({ error: error.message || "Failed to generate AI analysis" });
    }
  });

  // AI Endpoint: School Executive & Board Summary Generator
  app.post("/api/gemini/executive-summary", async (req, res) => {
    try {
      const { schoolName, schoolCategory, responseCount, averageScore, departmentAverages, topStrengths, priorityGaps } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          summary: `${schoolName} has established an initial baseline across ${responseCount} participating educators with a school-wide average readiness score of ${averageScore}/100. Key strengths lie in faculty enthusiasm and ethical awareness, while strategic investments are needed in infrastructure alignment and standardized AI policy frameworks.`,
          boardRecommendations: [
            "Establish a School-wide AI Policy Committee involving department heads.",
            "Roll out Tier 1 AI Literacy Professional Development for all teaching staff.",
            "Perform an infrastructure and digital resource audit for classroom readiness."
          ],
          source: "rule-based"
        });
      }

      const prompt = `You are an Executive AI Advisor at Zila Tech providing a board-ready executive briefing for school leadership.

School Context:
- Institution Name: ${schoolName}
- Category: ${schoolCategory}
- Total Assessments Completed: ${responseCount}
- Institutional AI Readiness Average: ${averageScore}/100
- Departmental Breakdown: ${JSON.stringify(departmentAverages)}
- Top Strengths: ${JSON.stringify(topStrengths)}
- Priority Gaps: ${JSON.stringify(priorityGaps)}

Generate a formal executive report JSON with:
1. "title": Document title for School Board / Principal.
2. "strategicNarrative": 2-paragraph high-level analysis of the school's AI maturity, institutional risk, and opportunity landscape.
3. "boardRecommendations": 4 concrete, phased strategic recommendations for leadership (Policy, PD, Infrastructure, Governance).
4. "budgetPriorityIndex": 3 areas where professional development or software budget will yield highest ROI.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      res.json({
        ...JSON.parse(response.text || "{}"),
        source: "gemini-3.6-flash"
      });
    } catch (error: any) {
      console.error("Error in executive-summary:", error);
      res.status(500).json({ error: error.message || "Failed to generate executive summary" });
    }
  });

  // AI Endpoint: Interactive K–12 AI Strategy Consultant Chat
  app.post("/api/gemini/consultant-chat", async (req, res) => {
    try {
      const { messages, schoolContext } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          reply: `[Zila AI Strategy Advisor - Offline Mode] Thank you for your question regarding ${schoolContext?.name || 'your school'}. Based on standard K–12 AI Transformation guidelines, we recommend starting with a clear Academic Integrity & Responsible Use policy before introducing AI tools in high-stakes assessments. How else can I assist your leadership team today?`
        });
      }

      const systemInstruction = `You are Zila AI Toolkit's expert K–12 Strategic Consultant.
You assist school leaders, department heads, and Zila Tech consultants with evidence-based guidance on:
- Formulating K–12 AI guidelines & academic integrity policies
- Designing faculty professional development roadmaps
- Differentiating instruction using Gemini and AI tools
- Managing parent and community communication regarding AI in schools
- Benchmarking progress against international standards (Cambridge, IB, CBC, US/UK K-12)

Keep responses professional, concise, structured with bullet points where appropriate, and actionable.
School Context: ${JSON.stringify(schoolContext || {})}`;

      const chatMessages = (messages || []).map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content || m.text || "" }]
      }));

      // Combine user query with system prompt
      const lastMessage = chatMessages[chatMessages.length - 1]?.parts[0]?.text || "Hello";

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: lastMessage,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({
        reply: response.text || "I am ready to assist with your school's AI transformation strategy."
      });
    } catch (error: any) {
      console.error("Error in consultant-chat:", error);
      res.status(500).json({ error: error.message || "Chat failed" });
    }
  });

  // Mount Vite middleware for development or serve dist static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Zila AI Toolkit server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
