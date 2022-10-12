import mongoose from 'mongoose'
const {Schema} = mongoose

const eventSchema = new Schema({
  timezone: String,
  name: String,
  startUtc: Date,
  // endUtc listed in docs, but not in any of the database items provided
  // endUtc: Date,
  venueName: String,
  location: {
    coordinates: {type: [Number]},
    type: {type: String},
  },
  flyer: String,
  url: String,
  groupName: String,
  groupAvi: String,
  cityId: String,
})

eventSchema.index({location: '2dsphere'})

const Event = mongoose.model('Events', eventSchema)

export default Event
