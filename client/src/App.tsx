import React from 'react'

import './assets/stylesheets/styles.scss'
import '../src/assets/webfonts/Nunito/Nunito-Black.ttf'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from 'components/pages/landing/Landing'
import Explore from 'components/pages/explore/Explore'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='explore' element={<Explore />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
