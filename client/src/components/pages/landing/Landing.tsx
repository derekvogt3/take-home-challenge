import React from 'react'
import Confetti from 'react-confetti'
import useWindowSize from 'hooks/useWindowSize'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {City} from 'components/common/types'

export default function Landing() {
  const {width, height} = useWindowSize()
  const [loading, setLoading] = useState(true)
  const [cities, setCities] = useState<City[]>(new Array<City>())

  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch('http://localhost:4000/cities')
        const cities = await res.json()
        setCities(cities)
        setLoading(false)
      } catch (err) {
        console.log('error', err)
      }
    }

    fetchCities()
  }, [])
  return (
    <>
      <Confetti width={width} height={height} wind={0.04} colors={['#FFCC00', '#E0B400']} />
      <div className='CitySelector'>
        <div>
          <div className='CitySelector-prompt'>Where are you looking for experiences?</div>

          <div className='CitySelector-cities'>
            {!loading ? (
              cities.map(city => {
                return (
                  <Link to={`explore?c=popular&t=week&p=1&city=${city.id}`} key={city.id} className='gold'>
                    {city.emoji + ' ' + city.name}
                  </Link>
                )
              })
            ) : (
              <></>
            )}

            {!loading ? (
              <Link to={`explore?c=popular&t=week&p=1&city=near`} className='blue'>
                📍 Near Me
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
