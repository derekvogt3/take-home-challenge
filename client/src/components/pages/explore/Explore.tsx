import React from 'react'
import {useSearchParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import EventCard from './EventCard'
import {Event} from 'components/common/types'
import {Link} from 'react-router-dom'

export default function Explore() {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState<Event[]>(new Array<Event>())
  const [week, setWeek] = useState(searchParams.get('t') === 'week' ? true : false)

  //get the start and end date for the time period week vs day, this is to set a date for the time query which will send as a url query
  const startDate = new Date()
  startDate.setHours(0, 0, 0, 0)
  const endDate = new Date()

  if (week) {
    endDate.setDate(startDate.getDate() + 7)
  }
  endDate.setHours(23, 59, 59, 999)

  function toggleWeek(week: boolean) {
    setWeek(week)
    //to have the same url impact as on the current website, change the url, this does not trigger a re-render
    window.history.replaceState(
      null,
      '',
      `explore?c=popular&t=${week ? 'week' : 'today'}&p=1&city=${searchParams.get('city')}`,
    )
  }

  //if city is set to near, fetch with latitue and longitudte
  function fetchNear() {
    if ('geolocation' in navigator) {
      console.log('geolodation here')
      navigator.geolocation.getCurrentPosition(async pos => {
        const lng = pos.coords.longitude
        const lat = pos.coords.latitude
        const res = await fetch(
          `${process.env.API_URL}events/explore/${searchParams.get(
            'city',
          )}/?startdate=${startDate.toISOString()}&enddate=${endDate.toISOString()}&lat=${lat}&lng=${lng}`,
        )
        const data = await res.json()
        setEvents(data)
        setLoading(false)
      })
    } else {
      console.log('GeoLocation Not Available')
      setLoading(false)
    }
  }

  async function fetchCity() {
    //if city is null, don't make the request
    if (searchParams.get('city') === '') {
      setLoading(false)
    } else {
      const res = await fetch(
        `${process.env.API_URL}events/explore/${searchParams.get(
          'city',
        )}/?startdate=${startDate.toISOString()}&enddate=${endDate.toISOString()}`,
      )
      const data = await res.json()
      console.log(data)
      setEvents(data)
      setLoading(false)
    }
  }

  useEffect(() => {
    function fetchEvents() {
      const isNear = searchParams.get('city') === 'near'

      try {
        if (isNear) {
          fetchNear()
        } else {
          fetchCity()
        }
      } catch (err) {
        console.log('error', err)
      }
    }

    fetchEvents()
    //when week vs day changes, make a fetch request with the updated parameters
  }, [week])

  const eventsToInclude = !loading ? events.map(event => <EventCard key={event._id} event={event} />) : <></>

  return (
    <>
      <div className='Explore'>
        <video
          autoPlay
          muted
          loop
          className='Explore-video'
          src='https://posh-b2.s3.us-east-2.amazonaws.com/meta+(1).mp4'>
          Video
        </video>
        <div className='Explore-cover'>
          <video
            autoPlay
            muted
            loop
            className='Explore-cover-video'
            src='https://posh-b2.s3.us-east-2.amazonaws.com/meta+(1).mp4'>
            Video
          </video>
        </div>
        <div className='Explore-body'>
          <div className='Explore-body-main'>
            <div className='Explore-body-main-nav'>
              <div className='Explore-body-main-nav-right'>
                <div className={week ? 'selected' : ''} onClick={() => toggleWeek(true)}>
                  This Week
                </div>
                <div className={week ? '' : 'selected'} onClick={() => toggleWeek(false)}>
                  Today
                </div>
              </div>
            </div>
            <div className='Explore-body-main-results'>{eventsToInclude}</div>
          </div>
        </div>
      </div>
      <Link to='/'>
        <img
          src='https://posh-b2.s3.us-east-2.amazonaws.com/left-arrow-in-circular-button-black-symbol.svg'
          className='Explore-back'></img>
      </Link>
      <div className='ExploreLoader fadeOut noPointer'>
        <canvas
          width='1064'
          height='830'
          style={{zIndex: 2, position: 'absolute', pointerEvents: 'none', inset: '0px'}}></canvas>
      </div>
      <div className={loading ? 'ExploreLoader-inner' : 'ExploreLoader-inner loading-fade-out'}>
        <div className='ExploreLoader-text '>Finding the best events for you...</div>
        <div className='ExploreLoader-loadBar '>
          <div></div>
        </div>
      </div>
    </>
  )
}
