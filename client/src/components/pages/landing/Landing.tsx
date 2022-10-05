import React from 'react'
import Confetti from 'react-confetti'
import useWindowSize from 'hooks/useWindowSize'
import {useEffect} from 'react'

const cities = ['🗽 New York', '🌴 Miami', '☀️ Los Angeles']

export default function Landing() {
  const {width, height} = useWindowSize()
  useEffect(() => {
    fetch('/v1/events')
      .then(res => console.log(res))
      .then(data => console.log(data))
  }, [])
  return (
    <>
      <Confetti width={width} height={height} wind={0.04} colors={['#FFCC00', '#E0B400']} />
      <div className='CitySelector'>
        <div>
          <div className='CitySelector-prompt'>Where are you looking for experiences?</div>

          <div className='CitySelector-cities'>
            {cities.map(city => {
              return (
                <div key={city} className='gold'>
                  {city}
                </div>
              )
            })}
            <div className='blue'>📍 Near Me</div>
          </div>
        </div>
      </div>
    </>
  )
}
