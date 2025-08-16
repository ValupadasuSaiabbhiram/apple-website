// Add this at the top of your App.jsx
import React from 'react';
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Highlights from './components/Highlights.jsx'

const App = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
    </main>
  )
}

export default App