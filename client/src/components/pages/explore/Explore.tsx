import React from 'react'
import {useSearchParams} from 'react-router-dom'
import {useState} from 'react'

export default function Explore() {
  const [searchParams] = useSearchParams()
  const [time, setTime] = useState(searchParams.get('t'))
  // const [city, setCity] = useState(searchParams.get('city'))
  const [loading, setLoading] = useState(true)

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
                <div className='selected'>This Week</div>
                <div className=''>Today</div>
              </div>
            </div>
            <div className='Explore-body-main-results'>
              <div
                className='EventCard'
                style={{
                  backgroundImage:
                    'url("https://postreact.s3.us-east-2.amazonaws.com/images/e5f977a6-4d0a-4f8c-815a-a9174eb97f13.jpg")',
                }}></div>
              <div
                className='EventCard'
                style={{
                  backgroundImage:
                    'url("https://postreact.s3.us-east-2.amazonaws.com/images/e5f977a6-4d0a-4f8c-815a-a9174eb97f13.jpg")',
                }}></div>
              <div
                className='EventCard'
                style={{
                  backgroundImage:
                    'url("https://postreact.s3.us-east-2.amazonaws.com/images/e5f977a6-4d0a-4f8c-815a-a9174eb97f13.jpg")',
                }}></div>
              <div
                className='EventCard'
                style={{
                  backgroundImage:
                    'url("https://postreact.s3.us-east-2.amazonaws.com/images/e5f977a6-4d0a-4f8c-815a-a9174eb97f13.jpg")',
                }}></div>
              <div
                className='EventCard'
                style={{
                  backgroundImage:
                    'url("https://postreact.s3.us-east-2.amazonaws.com/images/e5f977a6-4d0a-4f8c-815a-a9174eb97f13.jpg")',
                }}></div>
              <div
                className='EventCard'
                style={{
                  backgroundImage:
                    'url("https://postreact.s3.us-east-2.amazonaws.com/images/e5f977a6-4d0a-4f8c-815a-a9174eb97f13.jpg")',
                }}></div>
              <div
                className='EventCard'
                style={{
                  backgroundImage:
                    'url("https://postreact.s3.us-east-2.amazonaws.com/images/e5f977a6-4d0a-4f8c-815a-a9174eb97f13.jpg")',
                }}></div>
              <div
                className='EventCard'
                style={{
                  backgroundImage:
                    'url("https://postreact.s3.us-east-2.amazonaws.com/images/e5f977a6-4d0a-4f8c-815a-a9174eb97f13.jpg")',
                }}></div>
              <div
                className='EventCard'
                style={{
                  backgroundImage:
                    'url("https://postreact.s3.us-east-2.amazonaws.com/images/e5f977a6-4d0a-4f8c-815a-a9174eb97f13.jpg")',
                }}></div>
            </div>
          </div>
        </div>
      </div>
      <img
        src='https://posh-b2.s3.us-east-2.amazonaws.com/left-arrow-in-circular-button-black-symbol.svg'
        className='Explore-back'
        onClick={() => setLoading(false)}></img>
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
