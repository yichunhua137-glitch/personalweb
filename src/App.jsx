import { useEffect, useMemo, useState } from 'react'
import './App.css'
import heroLayer from './assets/hero.png'

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
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Projects' },
  { path: '/activities', label: 'Activities' },
  { path: '/contact', label: 'Contact' },
]

const skills = [
  ['Programming', ['Python', 'C++', 'C/C#', 'SQL']],
  ['Web Development', ['React', 'JavaScript', 'HTML', 'CSS', 'Flask']],
  ['Systems & Tools', ['Supabase', 'n8n', 'Codex', 'Arduino']],
  ['Creative Tools', ['Blender', 'Adobe Premiere Pro', '3D printing']],
]

const highlights = [
  'Bachelor of Mathematics student at the University of Waterloo',
  'Full-stack internal tools, automation workflows, and data processing',
  'Experience with React, Flask, Supabase, Python, and n8n',
]

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

const awards = [
  '2022 Australian Kangaroo Mathematics Competition Gold Award',
  '2022-2023 National Academic Quiz Tournaments team competition: Year-8th',
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

function Section({ marker, title, children }) {
  return (
    <section className="section">
      <div className="section-title">
        <span>{marker}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function HomePage({ onNavigate }) {
  return (
    <>
      <header className="hero">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">University of Waterloo / Mathematics</p>
            <h1>Eason Hua</h1>
            <p className="intro">
              Computational mathematics student focused on practical full-stack
              systems, automation workflows, and technical communication.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="mailto:e2hua@uwaterloo.ca">
                Email me
              </a>
              <button className="button secondary" onClick={() => onNavigate('/experience')}>
                View resume
              </button>
            </div>
          </div>

          <aside className="resume-card" aria-label="Resume summary">
            <img src={heroLayer} alt="" />
            <div className="resume-card-content">
              <span className="card-label">Expected graduation</span>
              <strong>April 2029</strong>
              <span className="card-label">Core direction</span>
              <strong>Full-stack development and automation</strong>
            </div>
          </aside>
        </div>

        <div className="highlight-row">
          {highlights.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </header>

      <Section marker="01" title="Education">
        <div className="education-grid">
          <article className="panel education-panel">
            <div>
              <h3>University of Waterloo</h3>
              <p>Bachelor of Mathematics</p>
              <p className="muted">
                Core courses: Calculus, Linear Algebra, Algebra, Designing
                Functional Programs
              </p>
            </div>
            <span>Expected Apr 2029</span>
          </article>

          <article className="panel awards-panel">
            <h3>Awards</h3>
            <ul>
              {awards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      <Section marker="02" title="Skills">
        <div className="skills-grid">
          {skills.map(([group, items]) => (
            <article className="panel skill-panel" key={group}>
              <h3>{group}</h3>
              <div>
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
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
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function ActivitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Beyond coursework"
        title="Activities"
        intro="Teaching, clubs, workshops, and technical demonstrations that connect STEM learning with hands-on communication."
      />
      <section className="section">
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
      {path === '/activities' && <ActivitiesPage />}
      {path === '/contact' && <ContactPage />}
      {!currentRoute && <NotFoundPage onNavigate={navigate} />}
    </main>
  )
}

export default App
