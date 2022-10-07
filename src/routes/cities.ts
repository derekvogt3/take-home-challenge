import express, {Request, Response} from 'express'
import cities from '../data/cities'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  const citiesFormatted = cities.map(city => {
    const obj = {
      id: city.id,
      emoji: city.emoji,
      name: city.name,
    }
    return obj
  })

  res.json(citiesFormatted)
})

export default router
