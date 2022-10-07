export interface Event {
  _id: string
  timezone: string
  name: string
  startUtc: string
  venueName: string
  location: {
    coordinates: [number]
    type: string
  }
  flyer: string
  url: string
  groupName: string
  groupAvi: string
  cityId: string
}

export interface City {
  id: string
  emoji: string
  name: string
  coordinates: any
}
