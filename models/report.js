const mongoose = require("mongoose")

const Schema = mongoose.Schema

const artcleSchema = new Schema(
  {
    name: {
      type: String, required: true,
    },
    healthnum: {
      type: Number, required: true,
    },
    gender: {
      type: String, required: true,
    },
    age: {
      type: Number, required: true,
    },
    contact: {
      type: Number, required: true,
    },
    email: {
      type: String, required: true,
    },
    county: {
      type: String, required: true,
    },
    s01: {
      type: Boolean, required: true,
    },
    s02: {
      type: Boolean, required: true,
    },
    s03: {
      type: Boolean, required: true,
    },
    s04: {
      type: Boolean, required: true,
    },
    s05: {
      type: Boolean, required: true,
    },
    s06: {
      type: Boolean, required: true,
    },
    s07: {
      type: Boolean, required: true,
    },
    s08: {
      type: Boolean, required: true,
    },
    s09: {
      type: Boolean, required: true,
    },
    s10: {
      type: Boolean, required: true,
    },
    s11: {
      type: Boolean, required: true,
    },
    s12: {
      type: Boolean, required: true,
    },
    s13: {
      type: Boolean, required: true,
    },
    q1: {
      type: Boolean, required: true,
    },
    q2: {
      type: Boolean, required: true,
    },
    q3: {
      type: String, required: true,
    },
    reportdate: {
      type: Date, required: true,
    }
  }
)

module.exports = mongoose.model("data", artcleSchema, "data")