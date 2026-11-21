import { onSettled } from 'solid-js'
import { render } from '@solidjs/web'
import '@fontsource/geist/latin-400.css'
import '@fontsource/geist/latin-600.css'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource/ibm-plex-mono/latin-400.css'
import { Specimen, RingStudy } from './solid/Artwork'
import Footer, { FooterContent } from './solid/Footer'
import Missing from './solid/Missing'
import { connectScrolling, scrollArtwork } from './motion'
import './style.css'

const repository = 'https://github.com/Alok-mad98/hive'
const missing = document.body.dataset.page === 'missing' || !['/', '/index.html'].includes(location.pathname)

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
  let hero!: HTMLElement
  onSettled(() => {
    const stopParallax = scrollArtwork(hero)
    const stopScrolling = connectScrolling()
    return () => { stopParallax(); stopScrolling() }
  })
  return (
    <main id="content">
      <section class="hero site-width" ref={hero} aria-labelledby="intro-title">
        <div class="hero-copy">
          <p class="eyebrow"><span class="honey-dot" aria-hidden="true" /> Open-source agent harness</p>
          <h1 id="intro-title">Many models.<br /><span>One Hive.</span></h1>
          <p class="intro">A cloud-native workspace for AI agents. Bring your models together in one Windows app.</p>
          <div class="hero-actions">
            <a class="github-link" href={repository}>View on GitHub <Arrow /></a>
            <a class="windows-link" href="#windows">Windows preview <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <Specimen />
      </section>
      <section class="release" id="windows" aria-labelledby="release-heading">
        <RingStudy />
        <div class="release-inner site-width">
          <div class="release-copy">
            <p class="eyebrow"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" fill="currentColor"><path d="M0 0h7v7H0zM9 0h7v7H9zM0 9h7v7H0zM9 9h7v7H9z"/></svg> Windows desktop</p>
            <h2 id="release-heading">Windows<br />preview</h2>
            <p class="availability"><span class="honey-dot" aria-hidden="true" />Coming soon</p>
          </div>
        </div>
      </section>
    </main>
  )
}

function App() {
  return <>
    <div data-stretchy-page>
      <a class="skip" href={missing ? '#missing-content' : '#content'}>Skip to content</a>
      <Header />
      {missing ? <div id="missing-content"><Missing /></div> : <Landing />}
      <FooterContent />
    </div>
    <Footer />
  </>
}

render(() => <App />, document.getElementById('root')!)
