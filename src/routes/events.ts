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

  var pt = turf.point(event.location.coordinates)

  cities.forEach(city => {
    city.coordinates.features.forEach((feature: {geometry: any}) => {
      feature.geometry.coordinates.forEach((polygon: any) => {
        var poly = turf.polygon(polygon)
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
