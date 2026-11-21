import { onSettled } from 'solid-js'
import { render } from '@solidjs/web'
import '@fontsource/geist/latin-400.css'
import '@fontsource/geist/latin-600.css'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource/ibm-plex-mono/latin-400.css'
import { AgentCrew, Mascot, StoryField, RingStudy } from './solid/Artwork'
import CursorBees from './solid/CursorBees'
import Narration from './solid/Narration'
import Footer, { FooterContent } from './solid/Footer'
import Missing from './solid/Missing'
import { connectScrolling, connectStory } from './motion'
import './style.css'

const repository = 'https://github.com/Alok-mad98/hive'
const missing = document.body.dataset.page === 'missing' || !['/', '/index.html'].includes(location.pathname)
document.body.dataset.page = missing ? 'missing' : 'landing'

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M6 5h13v13" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
}

function Header() {
  return (
    <header class="masthead">
      <nav aria-label="Main navigation" class="site-width">
        <a class="brand" href="/" aria-label="Hive home"><img src="/hive.svg" width="39" height="39" alt="" />Hive</a>
        <div class="site-nav">
          <a href={missing ? '/#windows' : '#windows'}>Windows</a>
          <a href={repository}>GitHub <Arrow /></a>
        </div>
      </nav>
    </header>
  )
}

function Landing() {
  let story!: HTMLElement
  onSettled(() => {
    const stopStory = connectStory(story)
    const stopScrolling = connectScrolling()
    return () => {
      stopStory()
      stopScrolling()
    }
  })
  return (
    <main id="content" class="story" ref={story}>
      <section class="chapter chapter-intro site-width" aria-labelledby="intro-title">
        <div class="chapter-copy">
          <p class="chapter-label"><span aria-hidden="true" /> A multi-model agent harness</p>
          <h1 id="intro-title" aria-label="One brief. Many agents.">
            <Narration text="One brief." mode="letter" /><br />
            <em><Narration text="Many agents." mode="letter" delay={.42} /></em>
          </h1>
          <p class="chapter-description"><Narration text="Hive is a cloud-native workspace for AI agents on Windows." mode="word" delay={.8} /></p>
        </div>
        <Mascot />
        <p class="scroll-note" aria-hidden="true"><span>↓</span> Scroll to explore</p>
      </section>
      <section class="chapter chapter-agents site-width" aria-labelledby="agents-heading">
        <div class="chapter-copy">
          <p class="chapter-label">Parallel execution</p>
          <h2 id="agents-heading" aria-label="Work moves in parallel.">
            <Narration text="Work moves" mode="letter" /><br />
            <Narration text="in parallel." mode="letter" delay={.21} />
          </h2>
          <p class="chapter-description"><Narration text="Hive is designed for at least ten agents working at once in each session. Give each a role and a piece of the brief." mode="word" delay={.46} /></p>
        </div>
        <AgentCrew />
      </section>
      <section class="chapter chapter-memory site-width" aria-labelledby="memory-heading">
        <div class="chapter-copy">
          <p class="chapter-label">Shared session memory</p>
          <h2 id="memory-heading" aria-label="Keep the team in context.">
            <Narration text="Keep the team" mode="letter" /><br />
            <Narration text="in context." mode="letter" delay={.21} />
          </h2>
          <p class="chapter-description"><Narration text="Agents share the same session memory. Research, decisions, and handoffs stay available as the work progresses." mode="word" delay={.46} /></p>
        </div>
        <div class="memory-orbits" aria-hidden="true"><i /><i /><i /></div>
      </section>
      <section class="chapter chapter-template site-width" aria-labelledby="templates-heading">
        <div class="chapter-copy">
          <p class="chapter-label">Reusable templates</p>
          <h2 id="templates-heading" aria-label="Save the playbook.">
            <Narration text="Save the" mode="letter" /><br />
            <Narration text="playbook." mode="letter" delay={.21} />
          </h2>
          <p class="chapter-description"><Narration text="Save a plan or a completed session as a template. Start the next hackathon with the same roles and handoffs already set up." mode="word" delay={.46} /></p>
        </div>
        <figure class="template-example">
          <figcaption>Hackathon template</figcaption>
          <ol>
            <li>Research</li><li>Build</li><li>Design</li><li>Review and fix</li>
          </ol>
        </figure>
      </section>
      <section class="chapter chapter-release site-width" id="windows" aria-labelledby="release-heading">
        <RingStudy />
        <div class="chapter-copy">
          <p class="chapter-label">Windows desktop</p>
          <h2 id="release-heading" aria-label="Windows preview.">
            <Narration text="Windows" mode="letter" /><br />
            <Narration text="preview." mode="letter" delay={.21} />
          </h2>
          <p class="chapter-description release-status"><Narration text="Coming soon." mode="word" delay={.46} /></p>
          <a class="github-link" href={repository}>View on GitHub <Arrow /></a>
        </div>
      </section>
    </main>
  )
}

function App() {
  return <>
    {!missing && <StoryField />}
    <div data-stretchy-page>
      <a class="skip" href={missing ? '#missing-content' : '#content'}>Skip to content</a>
      <Header />
      {missing ? <div id="missing-content"><Missing /></div> : <Landing />}
      <FooterContent />
    </div>
    <Footer />
    {!missing && <CursorBees />}
  </>
}

render(() => <App />, document.getElementById('root')!)
