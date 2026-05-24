import { useEffect, useMemo, useState } from 'react'
import './App.css'

const contacts = [
  { label: 'Email', value: 'e2hua@uwaterloo.ca', href: 'mailto:e2hua@uwaterloo.ca' },
  { label: 'Phone', value: '+1 (548) 384-6680', href: 'tel:+15483846680' },
  { label: 'LinkedIn', value: 'Eason Hua', href: 'https://www.linkedin.com/in/eason-hua' },
  {
    label: 'GitHub',
    value: 'yichunhua37-glitch',
    href: 'https://github.com/yichunhua37-glitch',
  },
]

const routes = [
  { path: '/', label: 'Home' },
  { path: '/activities', label: 'About' },
  { path: '/experience', label: 'Resume' },
  { path: '/projects', label: 'Projects' },
  { path: '/photos', label: 'Photos' },
  { path: '/contact', label: 'Contact' },
]

const photoFiles = [
  '08c71892eba4aba48e44d1b7bbff2658.jpg',
  '00a861f2aa307e5c26014a210f265489.jpg',
  '100c634cdbf7de11bed031117b37e74f.jpg',
  '1115dd33d007a46d6096fd8b95f2c9db.jpg',
  '11b850ed761c3f92cb24646554bac4bc.jpg',
  '11cd1962792df5f05703523778c2628f.jpg',
  '14902adb886ee1dee0ef7b553d6906cc.jpg',
  '18df32e53cdf95fbf7ad879f53ff6be0.jpg',
  '1c2366611a0a845891eee0183681c2a7.jpg',
  '20a8a3ff44e57f601f24fd4d5b5b278f.jpg',
  '2acdbd71314a5a71520ce8e94c8450f7.jpg',
  '3caf46a9880e96b3acd5229aeb27a69b.jpg',
  '46cc979b950ec7082a93c92d6a0ce6bd.jpg',
  '47971ebea8aeb542572b831365d73c2a.jpg',
  '4b403cc1a5bc451f94acef37e9098c67.jpg',
  '4b9c74c71f6c9f28e0aa4e05945afb3e.jpg',
  '50fa11f878a59660fcbc895d639367d6.jpg',
  '61b5dd8a7c90b646383c554761e2cfd9.jpg',
  '63b30c45d92575badd9566c32a95a84f.jpg',
  '64494e3c7cc5e6dd9afef37d99e01f88.jpg',
  '677c69d47c7e0ad2839cac699f49b831.jpg',
  '6bfd906ffacc8985e7025a6c2dc55354.jpg',
  '70116833725fe2d95480a660c9a4f749.jpg',
  '736575805042b2502408f1c540ebf79d.jpg',
  '7eaedf6e622b5615feeeff716e49f838.jpg',
  '843be885f2e44b75c19933fa77c24953.jpg',
  '847b8166d4c1b0e0680aa56b235c5ab9.jpg',
  '8508f422dad2eb669742f50bea59b091.jpg',
  '899d070be86255f1f75dd27c996a335e.jpg',
  '956aee4f3eac8b5e770b72e0ed218f68.jpg',
  '9599e2e20d376b3ec183b2b4348ab240.jpg',
  '96f097225ff7fc8cfee271556db3bd54.jpg',
  '9936ea21b95a82f083ff7faf633f7e72.jpg',
  'a36c114de50f7730bbe6e1423f02a171.jpg',
  'a55d974665cd68a3fbdd976c3a04ccc4.jpg',
  'a8251b463f0a64c415820d66f6fb981b.jpg',
  'b08d8f683937484024be43ca48a21e71.jpg',
  'b1be9b16ad517e18b25a90078b6eb87d.jpg',
  'b7b4b8f6bb9938d71a713c539cf0b448.jpg',
  'bf59e1505e06f9de4f6fdcb9de8e5eba.jpg',
  'c15cc57debbe58a9a3a7b2b8c491c008.jpg',
  'c4937ccd745c843640577b9c161413a6.jpg',
  'c49eebf7909b19ea1267c7c94787ca73.jpg',
  'c5cd458f47c1b414124249a0f5af7d5a.jpg',
  'c6cedb703b1bf595da02bc7632689fb6.jpg',
  'ca054a5cf6f7232b5f820f589d9a49ae.jpg',
  'cc286ca0d593579cff483def38435e07.jpg',
  'd41033cc9c7ef59b88d43c9dd0a516ca.jpg',
  'da821a40a51ae887650b4075f301307d.jpg',
  'f63a29727690df251ea061a955ff73d9.jpg',
  'f6e9e4d4aa10bee4c9c3a441aaa525e8.jpg',
  'f7d188090a39a6af98db4d2f206774a9.jpg',
  'fa629d875476b328c597b4983cc875f5.jpg',
]

const photoPaths = photoFiles.map((fileName) => `/my%20photos/${fileName}`)

const pianoVideos = [
  {
    description: "A piano practice clip of Joe Hisaishi's Castle in the Sky.",
    src: '/piano/ed4100e1d05fba9a8c699ab3f809a0c1.mp4',
    title: 'Castle in the Sky - Joe Hisaishi',
  },
  {
    description: 'A piano practice clip of Just Want to Say.',
    src: '/piano/eb9da8645c6ebdb93794db63bacd1833.mp4',
    title: 'Just Want to Say',
  },
  {
    description: "A piano practice clip of Tony Ann's Rain.",
    src: '/piano/6c5f11edc5363b5439085f7d480bceef.mp4',
    title: 'Rain - Tony Ann',
  },
]

const resumeSkills = [
  {
    group: 'Languages',
    items: [
      'Python',
      'JavaScript',
      'HTML',
      'CSS',
      'SQL',
      'C',
      'C++',
      'C#',
      'Racket',
      'VBA',
      'LabVIEW SDK',
    ],
  },
  {
    group: 'Web, Backend & Data',
    items: [
      'React',
      'Vite',
      'Flask',
      'Supabase',
      'WordPress',
    ],
  },
  {
    group: 'Tools, Platforms & Creative',
    items: [
      'n8n',
      'Figma',
      'Git',
      'Blender',
      'Spine',
      'Adobe Premiere Pro',
      'Adobe Animate',
      'Photoshop',
    ],
  },
]

const skillLogoMap = {
  Blender: '/skill-logos/blender.svg',
  C: '/skill-logos/c.svg',
  'C#': '/skill-logos/csharp.svg',
  'C++': '/skill-logos/cplusplus.svg',
  CSS: '/skill-logos/css.svg',
  Figma: '/skill-logos/figma.svg',
  Flask: '/skill-logos/flask.svg',
  Git: '/skill-logos/git.svg',
  HTML: '/skill-logos/html.svg',
  JavaScript: '/skill-logos/javascript.svg',
  'LabVIEW SDK': '/skill-logos/labview.svg',
  n8n: '/skill-logos/n8n.svg',
  Python: '/skill-logos/python.svg',
  Racket: '/skill-logos/racket.svg',
  React: '/skill-logos/react.svg',
  SQL: '/skill-logos/sqldeveloper.svg',
  Supabase: '/skill-logos/supabase.svg',
  Spine: '/logo/spine_logo_dark.png',
  VBA: '/skill-logos/visualbasic.svg',
  Vite: '/skill-logos/vite.svg',
  WordPress: '/skill-logos/wordpress.svg',
  Photoshop: '/skill-logos/photoshop-devicon.svg',
  'Adobe Animate': '/skill-logos/adobe-animate.svg',
  'Adobe Premiere Pro': '/skill-logos/premierepro.svg',
}

function SkillBadge({ skill }) {
  const logo = skillLogoMap[skill]

  return (
    <span className={logo ? 'skill-badge has-logo' : 'skill-badge'}>
      {logo && <img alt="" src={logo} />}
      {skill}
    </span>
  )
}

const experience = [
  {
    role: 'Technical Marketing Intern',
    type: 'Full-Stack & Automation',
    company: 'Emerson Test & Measurement, formerly National Instruments',
    location: 'Shanghai, China',
    date: 'Aug 2025 - Mar 2026',
    summary:
      'At Emerson Test & Measurement, I worked at the intersection of full-stack development, automation, and technical marketing. My work focused on turning internal engineering and business workflows into usable software systems, especially around NI hardware configuration, performance calculation, data accessibility, and content automation.',
    bullets: [
      'Designed and implemented a full-stack internal system that helped users configure NI hardware systems through an interactive workflow instead of relying on scattered manual references.',
      'Built backend logic for real-time performance computation, including power estimation and compatibility checks, so users could validate a configuration while making decisions.',
      'Created backend data pipelines for software revenue and service analysis, making internal datasets easier to organize, query, and evaluate.',
      'Designed relational data models and integrated Supabase to support structured storage, more reliable querying, and cleaner backend data handling.',
      'Developed an internal forum module to support knowledge sharing between internal users, improving visibility of technical discussions and cross-team collaboration.',
      'Built AI-powered automation workflows with n8n and Python for subtitle translation, reducing repetitive manual work in official NI video content production.',
      'Connected automation pipelines with existing data workflows so repeated operational tasks could be handled more consistently and efficiently.',
      'Co-developed user-facing technical documentation with engineers in Figma, focusing on clarity, usability, and better communication of technical material.',
      'Supported planning and execution for large-scale technical events such as NI Days, helping coordinate technical content, materials, and event preparation.',
    ],
  },
  {
    role: 'Product Manager Assistant',
    type: 'Part-time',
    company: 'Shanghai Yuanmou Medical Technology Co., Ltd.',
    location: 'Shanghai, China',
    date: 'Jan 2026 - Apr 2026',
    summary:
      'In this part-time role, I supported product and operations work by designing structured systems for client tracking, project management, and sales follow-up. The main goal was to make business workflows more visible and easier to manage through a CRM-style internal system.',
    bullets: [
      'Designed and implemented a CRM and project management system that allowed the team to track clients, projects, tasks, and progress in a more structured way.',
      'Modeled relational data structures for clients, projects, tasks, and workflow status, improving how information was connected and maintained.',
      'Built automation pipelines for task reminders and milestone tracking, reducing the need for repeated manual coordination between team members.',
      'Implemented rule-based triggers, including stalled deal alerts, so the team could respond faster when sales or project workflows stopped moving.',
      'Developed dashboards for monitoring client leads, project value, and operational progress, giving the team a clearer view of priorities and performance.',
    ],
  },
  {
    role: 'Web Developer',
    type: 'Part-time, Full-Stack',
    company: 'IS Canada',
    location: 'Remote',
    date: 'Jan 2026 - Present',
    summary:
      'As a part-time full-stack web developer, I worked on a company website that combined a React frontend with WordPress content management. The project focused on making the site easier for users to access, easier for administrators to update, and more capable of handling form-based business workflows.',
    bullets: [
      'Built a full-stack company website using React and WordPress, improving both the visitor experience and the maintainability of the site.',
      'Implemented authentication and login functionality so users could securely access features and content tied to their own account or workflow.',
      'Created a questionnaire system that could collect user input, process submissions automatically, and deliver results through email, reducing manual handling.',
      'Integrated WordPress as a CMS so non-technical users could update website content without needing to edit code directly.',
      'Designed flexible content update mechanisms to make the website easier to adapt as business needs, copy, and page structures changed.',
    ],
  },
  {
    role: 'Piano Instructor',
    type: 'Part-time',
    company: 'Self-employed',
    location: '',
    date: 'Jan 2026 - Apr 2026',
    summary:
      'I taught beginner-level piano lessons in English, focusing on helping students build confidence with basic technique, reading, rhythm, and consistent practice habits.',
    bullets: [
      'Prepared personalized lesson plans based on each student’s pace, helping them work through basic piano technique, music reading, and beginner repertoire.',
      'Explained musical concepts in English and adjusted my teaching style to make lessons approachable for students with different learning needs.',
    ],
  },
]

const projects = [
  {
    title: 'Helldivers 2 Readiness Platform',
    date: 'Aug 2025 - Present',
    tools: 'React, JavaScript, CSS, community workflows',
    text:
      'Built and maintained https://www.wearehelldivers.xyz/, a Helldivers 2 project focused on operational readiness content. I was responsible for training-oriented preparedness modules, a small forum for player collaboration, and wiki-style knowledge organization for missions, loadouts, and team coordination.',
    url: 'https://www.wearehelldivers.xyz/',
  },
  {
    title: '3D Animation - Atomic Hybridization',
    date: 'Sep 2023 - Jan 2024',
    tools: 'Blender, Adobe Premiere Pro',
    text:
      'Created a 3D animation explaining atomic hybridization by modeling molecular structures in Blender and editing the final video in Premiere Pro for clarity and visual engagement.',
  },
  {
    title: '2D Animation - Chemical Reaction',
    date: 'Feb 2024 - Jul 2024',
    tools: 'Blender, Adobe Premiere Pro',
    text:
      'Designed and produced a 2D educational animation demonstrating a chemical reaction, using Blender for scene creation and Premiere Pro for editing and final production.',
  },
  {
    title: '3D Modeling',
    date: 'Jan 2021 - Present',
    tools: 'Blender, 3D Printer',
    text:
      'Self-taught Blender to create 3D models for animation and 3D printing, developing hands-on experience in modeling, texturing, rigging, and exporting for production.',
  },
]

const activities = [
  {
    title: 'Teaching Volunteer',
    meta: 'Wuxi, China',
    bullets: [
      'Taught environmental science to primary school students and algebra enrichment to middle school students.',
      'Introduced middle school students to basic Python programming.',
      'Adapted lessons for different age groups and supported student learning in STEM subjects.',
    ],
  },
  {
    title: 'Engineering Club Member',
    meta: 'High school',
    bullets: [
      'Participated in robotics design and coding projects.',
      'Collaborated on hardware and software integration.',
    ],
  },
  {
    title: 'Chemistry Club - Vice Leader',
    meta: 'High school',
    bullets: [
      'Led technology-based demonstrations using tools and visualizations to explore chemical concepts.',
    ],
  },
  {
    title: 'AI Club - Vice Leader',
    meta: 'High school',
    bullets: [
      'Taught peers how to run and write Python code for AI-related projects.',
      'Organized coding workshops for students interested in AI.',
    ],
  },
]

function useRoute() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (nextPath) => {
    if (nextPath === window.location.pathname) return
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return [path, navigate]
}

function Nav({ currentPath, onNavigate }) {
  return (
    <nav className="nav" aria-label="Primary navigation">
      <a className="brand-link" href="/" onClick={(event) => {
        event.preventDefault()
        onNavigate('/')
      }}>
        Eason Hua
      </a>
      <div className="nav-links">
        {routes.map((route) => (
          <a
            aria-current={currentPath === route.path ? 'page' : undefined}
            href={route.path}
            key={route.path}
            onClick={(event) => {
              event.preventDefault()
              onNavigate(route.path)
            }}
          >
            {route.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

function PageHeader({ eyebrow, title, intro }) {
  return (
    <header className="page-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{intro}</p>
    </header>
  )
}

function HomePage({ onNavigate }) {
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content:
        "Ask me about Eason's work experience, technical projects, Waterloo coursework, or full-stack skills.",
    },
  ])
  const [isSending, setIsSending] = useState(false)
  const [chatError, setChatError] = useState('')
  const [featuredPhotoIndex, setFeaturedPhotoIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFeaturedPhotoIndex((currentIndex) => (currentIndex + 1) % photoPaths.length)
    }, 3200)

    return () => window.clearInterval(timer)
  }, [])

  const sendChatMessage = async (event) => {
    event.preventDefault()

    const message = chatInput.trim()
    if (!message || isSending) return

    setChatInput('')
    setChatError('')
    setIsSending(true)
    setChatMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', content: message },
    ])

    try {
      const response = await fetch('/api/chat', {
        body: JSON.stringify({ message }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const contentType = response.headers.get('content-type') ?? ''
      let data = null

      if (contentType.includes('application/json')) {
        data = await response.json()
      } else {
        const rawText = await response.text()
        throw new Error(
          rawText.includes('<!doctype') || rawText.includes('<html')
            ? 'Ask Eason AI backend is not available in this environment. Start the API server or deploy an API route.'
            : 'Ask Eason AI returned an unexpected response format.',
        )
      }

      if (!response.ok) {
        throw new Error(data.error ?? 'Ask Eason AI is unavailable.')
      }

      setChatMessages((currentMessages) => [
        ...currentMessages,
        { role: 'assistant', content: data.reply },
      ])
    } catch (error) {
      setChatError(error instanceof Error ? error.message : 'Ask Eason AI is unavailable.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="home-dashboard">
      <section className="home-intro-card">
        <div className="corner-frame" aria-hidden="true"></div>
        <div className="avatar-mark" aria-label="Eason Hua profile photo"></div>
        <div className="intro-links" aria-label="Profile links">
          <a href="https://www.linkedin.com/in/eason-hua" target="_blank" rel="noreferrer">
            in
          </a>
          <a href="https://github.com/yichunhua37-glitch" target="_blank" rel="noreferrer">
            gh
          </a>
          <a href="mailto:e2hua@uwaterloo.ca">@</a>
        </div>
        <p className="home-kicker">Bachelor of Mathematics / University of Waterloo</p>
        <h1>Hey, I am Eason Hua.</h1>
        <p>
          I am a Waterloo mathematics student building full-stack systems,
          automation workflows, and data-driven internal tools. My experience
          includes NI hardware configuration systems at Emerson, CRM and project
          management automation, and React plus WordPress web development.
        </p>
      </section>

      <aside className="home-resume-card">
        <div className="resume-preview" aria-hidden="true">
          <div className="resume-preview-header"></div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div>
          <p className="home-kicker">Current Resume</p>
          <h2>Resume PDF and web profile</h2>
          <p className="resume-card-copy">
            View my current resume, download the PDF, or browse the expanded
            website version with more project and experience details.
          </p>
          <div className="resume-actions">
            <a className="button primary" href="/resume/Resume_2B.pdf" target="_blank" rel="noreferrer">
              View PDF
            </a>
            <a className="button ghost" download href="/resume/Resume_2B.pdf">
              Download
            </a>
            <button className="button text-button" onClick={() => onNavigate('/experience')}>
              Web resume
            </button>
          </div>
        </div>
      </aside>

      <section className="home-feature-card feature-work">
        <div
          aria-hidden="true"
          className="home-feature-card-media"
          style={{ backgroundImage: `url("${photoPaths[featuredPhotoIndex]}")` }}
        ></div>
        <p className="home-kicker">Photo Archive</p>
        <h2>Moments from my past</h2>
        <p>
          A small visual collection of places, people, school life, travel, and
          everyday scenes that shaped my story outside the resume.
        </p>
        <button className="button ghost" onClick={() => onNavigate('/photos')}>
          View photos
        </button>
      </section>

      <section className="home-ai-card">
        <p className="home-kicker">Ask Eason AI</p>
        <h2>Portfolio assistant</h2>
        <div className="chat-window">
          {chatMessages.map((message, index) => (
            <div className={`chat-bubble ${message.role}`} key={`${message.role}-${index}`}>
              {message.content}
            </div>
          ))}
          {isSending && <div className="chat-bubble assistant">Thinking...</div>}
        </div>
        {chatError && <p className="chat-error">{chatError}</p>}
        <form className="chat-input" onSubmit={sendChatMessage}>
          <input
            aria-label="Ask Eason AI"
            onChange={(event) => setChatInput(event.target.value)}
            placeholder="Ask something about Eason..."
            value={chatInput}
          />
          <button disabled={isSending || !chatInput.trim()} type="submit">
            Send
          </button>
        </form>
      </section>

      <div className="home-mini-grid">
        <section className="home-mini-card location-card">
          <iframe
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=250%20Phillip%20St%2C%20Waterloo%2C%20ON&output=embed"
            title="Google Map showing 250 Phillip St, Waterloo"
          ></iframe>
          <p className="home-kicker">Current Base</p>
          <h2>Location</h2>
          <p>250 Phillip St, Waterloo, ON</p>
          <a className="button ghost" href="https://maps.google.com/?q=250%20Phillip%20St%2C%20Waterloo%2C%20ON" target="_blank" rel="noreferrer">
            Open Map
          </a>
        </section>

        <section className="home-mini-card education-card-home">
          <p className="home-kicker">Current Study</p>
          <h2>Education</h2>
          <p>University of Waterloo - Bachelor of Mathematics</p>
          <a className="button ghost" href="https://uwaterloo.ca/math/" target="_blank" rel="noreferrer">
            Waterloo Math
          </a>
        </section>
      </div>
    </div>
  )
}

function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="Experience"
        intro="Internship work across full-stack internal systems, automation, data processing, and technical content."
      />
      <section className="section">
        <div className="section-title">
          <span>Education</span>
          <h2>Educational Background</h2>
        </div>
        <article className="panel resume-education-card">
          <div>
            <h3>University of Waterloo</h3>
            <p>Bachelor of Mathematics</p>
            <p className="muted">
              Current academic term: 2B. Relevant coursework includes Calculus,
              Linear Algebra, Algebra, and Designing Functional Programs.
            </p>
          </div>
          <div className="resume-education-meta">
            <strong>Expected Apr 2029</strong>
            <span>Waterloo, ON</span>
          </div>
        </article>

        <div className="section-title resume-skills-heading">
          <span>Skills</span>
          <h2>Technical Toolkit</h2>
        </div>
        <div className="resume-skills-grid">
          {resumeSkills.map((skillGroup) => (
            <article className="panel resume-skill-card" key={skillGroup.group}>
              <h3>{skillGroup.group}</h3>
              <p>{skillGroup.items.join(', ')}</p>
              <div className="skill-marquee" aria-label={`${skillGroup.group} skills`}>
                <div className="skill-marquee-track">
                  {[
                    ...skillGroup.items,
                    ...skillGroup.items,
                    ...skillGroup.items,
                    ...skillGroup.items,
                  ].map((skill, index) => (
                    <SkillBadge key={`${skill}-${index}`} skill={skill} />
                  ))}
                </div>
              </div>
              <div className="skill-static-list">
                {skillGroup.items.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="section-title resume-experience-heading">
          <span>Work</span>
          <h2>Experience</h2>
        </div>
        <div className="experience-list">
          {experience.map((item) => (
            <article className="experience-item" key={item.role}>
              <div className="experience-meta">
                <span>{item.date}</span>
                {item.location && <p>{item.location}</p>}
              </div>
              <div className="panel experience-panel">
                <div className="experience-heading">
                  <div>
                    <h3>{item.role}</h3>
                    <span>{item.type}</span>
                    <p>{item.company}</p>
                  </div>
                </div>

                <p className="experience-summary">{item.summary}</p>
                <ul className="experience-bullets">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Projects"
        intro="Selected creative and technical projects from animation, modeling, STEM visualization, and production workflows."
      />
      <section className="section">
        <div className="project-grid">
          {projects.map((project) => (
            <article className="panel project-panel" key={project.title}>
              <div className="project-heading">
                <h3>{project.title}</h3>
                <span>{project.date}</span>
              </div>
              <p className="tools">Tools: {project.tools}</p>
              <p>{project.text}</p>
              {project.url && (
                <p className="project-link">
                  <a href={project.url} rel="noreferrer" target="_blank">
                    {project.url}
                  </a>
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function PhotosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Photo Archive"
        title="Moments from my past"
        intro="A visual archive from public/my photos: school life, travel, daily scenes, and memories outside the resume."
      />
      <section className="section">
        <div className="photo-grid">
          {photoPaths.map((photoPath, index) => (
            <figure className="photo-tile" key={photoPath}>
              <img alt={`Eason Hua photo archive ${index + 1}`} loading="lazy" src={photoPath} />
            </figure>
          ))}
        </div>
      </section>
    </>
  )
}

function ActivitiesPage() {
  const [activePianoVideo, setActivePianoVideo] = useState(0)
  const currentPianoVideo = pianoVideos[activePianoVideo]
  const previousPianoVideo =
    pianoVideos[activePianoVideo === 0 ? pianoVideos.length - 1 : activePianoVideo - 1]
  const nextPianoVideo =
    pianoVideos[activePianoVideo === pianoVideos.length - 1 ? 0 : activePianoVideo + 1]

  const showPreviousPianoVideo = () => {
    setActivePianoVideo((currentIndex) =>
      currentIndex === 0 ? pianoVideos.length - 1 : currentIndex - 1,
    )
  }

  const showNextPianoVideo = () => {
    setActivePianoVideo((currentIndex) =>
      currentIndex === pianoVideos.length - 1 ? 0 : currentIndex + 1,
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About Eason"
        intro="A Waterloo mathematics student building practical full-stack systems, automation workflows, and technical tools."
      />
      <section className="section">
        <div className="about-layout">
          <article className="panel about-panel">
            <p className="about-lead">
              I am a Bachelor of Mathematics student at the University of
              Waterloo, currently back on campus for my 2B academic term.
            </p>
            <p>
              My interests sit at the intersection of full-stack development,
              automation, data workflows, and practical software systems that
              make complex processes easier for people to use.
            </p>
            <p>
              During my internship at Emerson Test & Measurement, formerly
              National Instruments, I worked on full-stack and automation-focused
              internal tools for technical and business workflows. I designed and
              implemented an internal system for configuring NI hardware, built
              backend logic for real-time performance computation and
              compatibility checks, and created backend data pipelines for
              software revenue and service analysis.
            </p>
            <p>
              I also have part-time experience across product and web
              development, including CRM workflows, project management
              automation, React and WordPress websites, authentication,
              questionnaire automation, email delivery, and CMS integration.
            </p>
            <p>
              Outside software, I enjoy creative technical work such as 3D
              modeling, animation, STEM visualization, and piano. I like tools
              that make abstract ideas easier to understand and workflows that
              help people move faster without losing clarity.
            </p>
          </article>

          <aside className="about-facts">
            <article className="panel fact-card">
              <span>Current</span>
              <strong>2B academic term at Waterloo</strong>
            </article>
            <article className="panel fact-card">
              <span>Focus</span>
              <strong>Full-stack systems and automation</strong>
            </article>
            <article className="panel fact-card">
              <span>Creative</span>
              <strong>3D animation, STEM visuals, piano</strong>
            </article>
          </aside>
        </div>

        <div className="section-title about-activities-title">
          <span>Piano</span>
          <h2>Practice Notes</h2>
        </div>
        <div className="piano-stage" aria-label="Piano practice video carousel">
          <button
            aria-label="Previous piano video"
            className="piano-nav previous"
            onClick={showPreviousPianoVideo}
          >
            Prev
          </button>
          <div className="piano-stack">
            <article className="piano-card preview left" aria-hidden="true">
              <video muted preload="metadata" src={previousPianoVideo.src}>
                <track kind="captions" />
              </video>
            </article>
            <article className="piano-card preview right" aria-hidden="true">
              <video muted preload="metadata" src={nextPianoVideo.src}>
                <track kind="captions" />
              </video>
            </article>
            <article className="piano-card active" key={currentPianoVideo.src}>
              <video controls preload="metadata" src={currentPianoVideo.src}>
                <track kind="captions" />
              </video>
              <div className="piano-card-body">
                <span>
                  {activePianoVideo + 1} / {pianoVideos.length}
                </span>
                <h3>{currentPianoVideo.title}</h3>
                <p>{currentPianoVideo.description}</p>
              </div>
            </article>
          </div>
          <button
            aria-label="Next piano video"
            className="piano-nav next"
            onClick={showNextPianoVideo}
          >
            Next
          </button>
          <div className="piano-thumbs" aria-label="Piano video selector">
            {pianoVideos.map((video, index) => (
              <button
                aria-label={`Show ${video.title}`}
                aria-pressed={activePianoVideo === index}
                key={video.src}
                onClick={() => setActivePianoVideo(index)}
              >
                <video muted preload="metadata" src={video.src}>
                <track kind="captions" />
              </video>
              </button>
            ))}
          </div>
        </div>

        <div className="section-title about-activities-title">
          <span>More</span>
          <h2>Activities</h2>
        </div>
        <div className="activity-grid">
          {activities.map((activity) => (
            <article className="panel activity-panel" key={activity.title}>
              <div className="activity-heading">
                <h3>{activity.title}</h3>
                <span>{activity.meta}</span>
              </div>
              <ul>
                {activity.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's connect."
        intro="Reach out for internships, collaborations, technical projects, or portfolio discussions."
      />
      <section className="section">
        <div className="contact-grid">
          {contacts.map((contact) => (
            <a
              href={contact.href}
              key={contact.label}
              rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
            >
              <span>{contact.label}</span>
              {contact.value}
            </a>
          ))}
        </div>
      </section>
    </>
  )
}

function NotFoundPage({ onNavigate }) {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <button className="button primary" onClick={() => onNavigate('/')}>
        Back home
      </button>
    </section>
  )
}

function App() {
  const [path, navigate] = useRoute()
  const currentRoute = useMemo(
    () => routes.find((route) => route.path === path) ?? null,
    [path],
  )

  return (
    <main>
      <Nav currentPath={currentRoute?.path ?? path} onNavigate={navigate} />
      {path === '/' && <HomePage onNavigate={navigate} />}
      {path === '/experience' && <ExperiencePage />}
      {path === '/projects' && <ProjectsPage />}
      {path === '/photos' && <PhotosPage />}
      {path === '/activities' && <ActivitiesPage />}
      {path === '/contact' && <ContactPage />}
      {!currentRoute && <NotFoundPage onNavigate={navigate} />}
    </main>
  )
}

export default App
