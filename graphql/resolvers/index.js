// Imports
const Report = require("../../models/report")


// Reports
module.exports = {
  reports: async () => {
    try {
      const reportsFetched = await Report.find()
      return reportsFetched.map(report => {
        return {
          ...report._doc,
          _id: report.id,
          reportdate: new Date(report._doc.reportdate).toISOString(),
        }
      })
    } catch (error) {
      throw error
    }
},

// Creating a new Report
  createReport: async args => {
    try {
      const { name, healthnum, gender, age, contact, email, county, s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, s11, s12, s13, q1, q2, q3} = args.report
      const report = new Report({
        name, healthnum, gender, age, contact, email,  county, s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, s11, s12, s13, q1, q2, q3, reportdate: new Date()
      })
      const newReport = await report.save()
      return { ...newReport._doc, _id: newReport.id }
    } catch (error) {
      throw error
    }
  },
}