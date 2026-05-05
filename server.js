import { createServer } from 'node:http'
import { existsSync, readFileSync } from 'node:fs'

const PORT = Number(process.env.PORT ?? 3001)
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions'
const MODEL = 'deepseek-v4-flash'

function loadLocalEnv() {
  if (!existsSync('.env')) return

  const lines = readFileSync('.env', 'utf8').split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separatorIndex = trimmed.indexOf('=')
    if (separatorIndex === -1) continue

    const key = trimmed.slice(0, separatorIndex).trim()
    const value = trimmed.slice(separatorIndex + 1).trim()

    if (key && !process.env[key]) {
      process.env[key] = value.replace(/^["']|["']$/g, '')
    }
  }
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = ''

    request.on('data', (chunk) => {
      body += chunk
      if (body.length > 20_000) {
        reject(new Error('Request body is too large'))
        request.destroy()
      }
    })

    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        reject(new Error('Request body must be valid JSON'))
      }
    })

    request.on('error', reject)
  })
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  })
  response.end(JSON.stringify(data))
}

function buildSystemPrompt() {
  return `
You are Ask Eason AI, the portfolio assistant on Eason Hua's personal website.
Answer as a concise, helpful assistant who knows Eason's resume and project background.

Profile:
- Eason Hua studies Bachelor of Mathematics at the University of Waterloo, expected April 2029.
- He focuses on full-stack development, automation workflows, internal tools, technical communication, and creative technical projects.
- Core tools include React, JavaScript, HTML, CSS, Flask, Supabase, SQL, Python, n8n, Figma, WordPress, Blender, and Adobe Premiere Pro.

Experience:
- Technical Marketing Intern at Emerson Test & Measurement, formerly National Instruments, Shanghai, Aug 2025 to Mar 2026. Work included a full-stack internal NI hardware configuration system, backend performance computation, power estimation, compatibility checks, data pipelines for software revenue and service analysis, relational data models, Supabase integration, an internal forum module, n8n and Python subtitle automation, documentation work in Figma, and event support for NI Days.
- Product Manager Assistant at Shanghai Yuanmou Medical Technology, Jan 2026 to Apr 2026. Work included CRM and project management systems, relational workflow data models, automation pipelines for reminders and milestones, stalled deal alerts, and dashboards for leads and project value.
- Web Developer at IS Canada, remote, Jan 2026 to present. Work included a React and WordPress company website, authentication, login, questionnaire automation, email delivery, CMS integration, and flexible content updates.
- Piano Instructor, self-employed, Jan 2026 to Apr 2026. Taught beginner piano lessons in English with personalized lesson plans.

Projects and activities:
- 3D animation for atomic hybridization using Blender and Adobe Premiere Pro.
- 2D animation for chemical reaction visualization.
- 3D modeling for animation and 3D printing.
- Teaching volunteer, engineering club member, chemistry club vice leader, and AI club vice leader.

Rules:
- If a visitor asks about Eason, answer based on the information above.
- If the answer is not in this information, say that the site does not include that detail.
- Do not invent private details, grades beyond what is shown, or unavailable links.
`.trim()
}

async function handleChat(request, response) {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    sendJson(response, 500, {
      error: 'DeepSeek API key is not configured.',
    })
    return
  }

  const body = await readJsonBody(request)
  const message = String(body.message ?? '').trim()

  if (!message) {
    sendJson(response, 400, { error: 'Message is required.' })
    return
  }

  const deepseekResponse = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      max_tokens: 650,
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        { role: 'user', content: message },
      ],
      model: MODEL,
      stream: false,
    }),
  })

  const data = await deepseekResponse.json()

  if (!deepseekResponse.ok) {
    sendJson(response, deepseekResponse.status, {
      error: data.error?.message ?? 'DeepSeek API request failed.',
    })
    return
  }

  sendJson(response, 200, {
    reply: data.choices?.[0]?.message?.content ?? 'No response returned.',
  })
}

loadLocalEnv()

createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {})
    return
  }

  if (request.method === 'POST' && request.url === '/api/chat') {
    try {
      await handleChat(request, response)
    } catch (error) {
      sendJson(response, 500, {
        error: error instanceof Error ? error.message : 'Unexpected server error.',
      })
    }
    return
  }

  sendJson(response, 404, { error: 'Not found.' })
}).listen(PORT, () => {
  console.log(`Ask Eason API server running on http://localhost:${PORT}`)
})
