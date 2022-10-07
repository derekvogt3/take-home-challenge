import React from 'react'
import {Event} from 'components/common/types'

interface IProps {
  event: Event
}

const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export default function EventCard({event}: IProps) {
  function getCurrentDay() {
    const today = new Date()
    const day = new Date(event.startUtc)
    if (today.toDateString() === day.toDateString()) {
      return 'TODAY'
    }
    return dayOfWeek[day.getDay()]
  }

  return (
    <div
      className='EventCard'
      style={{
        backgroundImage: `url("${event.flyer}")`,
      }}>
      <div className='EventCard-filter'></div>
      <div className='EventCard-info'>
        <div className='EventCard-date'>
          <div className='EventCard-dotw'>{getCurrentDay()}</div>
        </div>
        <div>
          <div className='EventCard-name'>{event.name}</div>
          <div className='EventCard-location'>{event.venueName}</div>
        </div>
      </div>
      <img className='EventCard-organizer' src={`${event.groupAvi}`} />
    </div>
  )
}
