import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function generateSlug(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let slug = ''
    for (let i = 0; i < length; i++) {
      slug += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return slug
  }

 async function handleShorten() {
  setError(null)
  setShortUrl(null)

  if (!url) {
    setError('Por favor, insira uma URL válida.')
    return
  }

  try {
    const res = await fetch("http://localhost:4000/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Erro")

    setShortUrl(data.shortUrl)
  } catch (err: any) {
    setError(err.message)
  }
}

  

  return (
    <>
      <main>
        <div className='area-url'>
          <div className="header">
            <h2>Encurtador de URL</h2>
          </div>

          <div className="area">
            <input
              type="url"
              placeholder='Coloque aqui sua URL'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={handleShorten}>Encurtar</button>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {shortUrl && (
            <div className="resultado">
              <p>Sua URL encurtada:</p>
              <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default App
