type NarrationProps = {
  text: string
  mode: 'letter' | 'word'
  delay?: number
}

export default function Narration({ text, mode, delay = 0 }: NarrationProps) {
  const words = text.split(' ')
  const units = mode === 'letter' ? words.reduce((sum, word) => sum + Array.from(word).length, 0) : words.length
  let index = 0
  const timing = () => {
    const position = index++
    const start = mode === 'letter' ? 0.57 : 0.38
    return {
      '--reveal-at': (delay + start * position / Math.max(1, units - 1)).toFixed(3),
      '--intro-delay': `${Math.round(180 + delay * 540 + position * (mode === 'letter' ? 31 : 42))}ms`,
    }
  }

  return (
    <>
      <span class="screen-reader-text">{text}</span>
      <span class={`narration narration-mode-${mode}`} aria-hidden="true">
        {words.map((word, wordIndex) => (
          <>
            {wordIndex > 0 && <wbr />}
            {mode === 'letter' ? (
              <span class="narration-word">
                {Array.from(word).map(letter => <span class="narration-unit" style={timing()}>{letter}</span>)}
              </span>
            ) : <span class="narration-unit" style={timing()}>{word}</span>}
          </>
        ))}
      </span>
    </>
  )
}
