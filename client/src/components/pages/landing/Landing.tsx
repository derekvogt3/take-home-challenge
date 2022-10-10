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
        const res = await fetch(`${process.env.API_URL}cities`)
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
            <Cities cities={cities} loading={loading} />
          </div>
        </div>
      </div>
    </>
  )
}

interface CitiesProps {
  loading: boolean
  cities: City[]
}

function Cities({loading, cities}: CitiesProps) {
  if (loading) {
    return <></>
  }

  return (
    <>
      {cities.map(city => {
        return (
          <Link to={`explore?c=popular&t=week&p=1&city=${city.id}`} key={city.id} className='gold'>
            {city.emoji + ' ' + city.name}
          </Link>
        )
      })}
      <Link to={`explore?c=popular&t=week&p=1&city=near`} className='blue'>
        📍 Near Me
      </Link>
    </>
  )
}
