import laPath from '../data/los-angeles'
import miamiPath from '../data/miami'
import nycPath from '../data/new-york-city-boroughs'

const cities = [
  {
    id: 'nyc',
    emoji: '🗽',
    name: 'New York',
    coordinates: nycPath,
  },
  {
    id: 'la',
    emoji: '☀️',
    name: 'Los Angeles',
    coordinates: laPath,
  },
  {
    id: 'mia',
    emoji: '🌴',
    name: 'Miami',
    coordinates: miamiPath,
  },
]

export default cities
