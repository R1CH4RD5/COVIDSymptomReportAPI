// Imports
const { buildSchema } = require("graphql")


module.exports = buildSchema(`

  input ReportInput {
    name: String!
    healthnum: Int!
    gender: String!
    age: Int!
    contact: Int!
    email: String!
    county: String!
    s01: Boolean!
    s02: Boolean!
    s03: Boolean!
    s04: Boolean!
    s05: Boolean!
    s06: Boolean!
    s07: Boolean!
    s08: Boolean!
    s09: Boolean!
    s10: Boolean!
    s11: Boolean!
    s12: Boolean!
    s13: Boolean!
    q1: Boolean!
    q2: Boolean!
    q3: String!
  }

  type Report {
    _id: ID!
    name: String!
    healthnum: Int!
    gender: String!
    age: Int!
    contact: Int!
    email: String!
    county: String!
    s01: Boolean!
    s02: Boolean!
    s03: Boolean!
    s04: Boolean!
    s05: Boolean!
    s06: Boolean!
    s07: Boolean!
    s08: Boolean!
    s09: Boolean!
    s10: Boolean!
    s11: Boolean!
    s12: Boolean!
    s13: Boolean!
    q1: Boolean!
    q2: Boolean!
    q3: String!
    reportdate: String!
  }

  type Query {
    reports:[Report!]
  }

  type Mutation {
    createReport(report:ReportInput): Report
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)