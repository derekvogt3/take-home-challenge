import express, {Request, Response} from 'express'
import Event from '../models/Event'
import cities from '../data/cities'
import * as turf from '@turf/turf'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const events = await Event.find()
    res.json(events)
  } catch (err) {
    res.json({message: err})
  }
})

router.get('/explore/:cityId/', async (req: Request, res: Response) => {
  try {
    let events: Event[]

    //if the url paramaters is near, get the locations using the "near" query parameter, else find by the cityid tag

    if (req.params.cityId === 'near') {
      events = await Event.find({
        location: {
          $near: {
            $maxDistance: 100000,
            $geometry: {
              type: 'Point',
              coordinates: [req.query.lng, req.query.lat],
            },
          },
        },
        startUtc: {
          $gte: req.query.startdate,
          $lt: req.query.enddate,
        },
      })
    } else {
      events = await Event.find({
        cityId: req.params.cityId,
        startUtc: {
          $gte: req.query.startdate,
          $lt: req.query.enddate,
        },
      }).exec()
    }

    res.json(events)
  } catch (err) {
    res.json({message: err})
  }
})

router.post('/', (req: Request, res: Response) => {
  var event = new Event({
    timezone: req.body.timezone,
    name: req.body.name,
    startUtc: req.body.startUtc,
    // endUtc listed in docs, but not in any of the database items provided
    // endUtc: req.body.endUtc,
    venueName: req.body.venueName,
    location: req.body.location,
    flyer: req.body.flyer,
    url: req.body.url,
    groupName: req.body.groupName,
    groupAvi: req.body.groupAvi,
    cityId: null,
  })

  //gets the coordinates of the event

  var pt = turf.point(event.location.coordinates)

  //gets the polygons for each city
  cities.forEach(city => {
    //each city has neighborhoods, so continue to parse the geoJSON file to get the polygons within the neighborhood
    city.coordinates.features.forEach((feature: {geometry: any}) => {
      //each neighborhood has multiple polygons, so continue to check out each polygon within the neighborhood array
      feature.geometry.coordinates.forEach((polygon: any) => {
        var poly = turf.polygon(polygon)
        //checks to see if the location of the event is
        if (turf.booleanPointInPolygon(pt, poly)) {
          event.cityId = city.id
        }
      })
    })
  })

  event.save().then((data: any) => res.json(data))
})

router.get('/:eventId', async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.eventId)

    res.json(event)
  } catch (err) {
    res.json(err)
  }
})

export default router
