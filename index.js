// Imports
let express = require('express');
let mongoose = require('mongoose');
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
let rt_development = require("./routes/development_route");
let rt_report = require("./routes/reports_route");
var { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require("./graphql/schema")
const graphqlResolvers = require("./graphql/resolvers")

// Server port
var port = process.env.PORT || 1337;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "COVIDSymptomReportAPI",
            version: "1.0.0",
            description: "created and developed by José Costa and Dylan Pinto, Q12021.<br><br> \n" +
            "<p>As a <i>Distributed Systems 2020–21</i> Class project, <b>COVIDSymptomAPI</b> is a idea that as " + 
            "the objective to give to any citizen the opportunity to create a Report when suspected to have " +
            "symptoms related to <b>SARS-CoV-2</b>. This idea, was developed considering a scenario where " +
            "a medical team would use this API as a resource for response / supervision / analysis and " +
            "acknowledgement regarding the COVID Symptoms situations related.</p>" + 
            "<p>The report consists of answering several questions as:<br></p>" + 
            "<p><b><i>- Personal information:</i></b><br>" + 
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>string</b> name]</font> <b>Name</b> <font color=\"Gray\">(name of the person that the report is related)</font>,<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>number</b> healthnum]</font> <b>Health Number</b> <font color=\"Gray\">(user number national health service)</font>,<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>string</b> gender]</font> <b>Gender</b> <font color=\"Gray\">(gender of the person that the report is related)</font>,<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>number</b> age]</font> <b>Age</b> <font color=\"Gray\">(age of the person that the report is related)</font>,<br>" + 
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>number</b> contact]</font> <b>Contact</b> <font color=\"Gray\">(contact of the person that the report is related)</font>,<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>string</b> email]</font> <b>E-mail</b> <font color=\"Gray\">(e-mail of the person that the report is related)</font>,<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>string</b> county]</font> <b>County</b> <font color=\"Gray\">(city where the person that the report is related live)</font>,<br><p>" +
            "<p><b><i>- Mild Symptoms:</i></b><br>" + 
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>boolean</b> s1]</font> Muscle tension and pain,<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>boolean</b> s2]</font> Sore throat,<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>boolean</b> s3]</font> Diarrhea,<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>boolean</b> s4]</font> Conjunctivitis,<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>boolean</b> s5]</font> Headache,<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>boolean</b> s6]</font> Loss of taste or smell<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>boolean</b> s7]</font> Skin irritation or discoloration of fingers or toes,<br>" +            
            "<p><b><i>- Less Comum Symptoms:</i></b><br>" + 
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>boolean</b> s8]</font> Fever,<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>boolean</b> s9]</font> Dry cough,<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>boolean</b> s10]</font> Tiredness,<br>" +
            "<p><b><i>- Severe Symptoms:</i></b><br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>boolean</b> s11]</font> Breathing difficulty or shortness of breath,<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>boolean</b> s12]</font> Pressure or chest pain,<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>boolean</b> s13]</font> Loss of speech or motor ability,<br>" + 
            "<p><b><i>- Other:</i></b><br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>boolean</b> q1]</font> Have you been in contact with someone infected?,<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>boolean</b> q2]</font> Have you been infected before?,<br>" +
            "&nbsp&nbsp&nbsp&nbsp> <font face=\"courier\"color=\"blue\">[<b>string</b> q3]</font> Have you been vaccinated? If yes, with witch vaccine?<br>"
            
            
        },
        servers: [
            {
                url: "http://localhost:1337",
            },
        ],        
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

let app = express();

// Use API routes in app
app.use('/covidreportapi', rt_development)
app.use('/covidreportapi', rt_report)
app.use('/covidreportapi', swaggerUI.serve, swaggerUI.setup(specs))


app.use(express.json());

  app.use('/graphql', graphqlHTTP({
    schema:graphqlSchema,
    rootValue:graphqlResolvers,
    graphiql: true
}))

app.get("/", (req, res) => {
    res.send("<html>"+
                "<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"></head>" +
                "<body style=\"font-family: Arial;margin: 0;\">" +
                    "<div style=\"height:25%;text-align:center;position:absolute;left:30%;top:20%\" class=\"content\">" +
                        "<h1 style=\"text-align:center;padding:80px;padding-bottom:10px;padding-top:10px;text-align: center;background: #1abc9c;color: white;font-size: 50px;\"><p>COVIDSymptomReportAPI</p></h1>" +
                        "<h2>Pick your preferred interface:</h2><br>" +
                        "<p><a href=\"https://covidsymptomreportapi.azurewebsites.net/covidreportapi\"><img src=\"https://cavedweller92.files.wordpress.com/2019/07/swagger-logo-horizontal.png\" height=\"100\" class=\"image\"></a>" +
                        "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + 
                        "<a href=\"https://covidsymptomreportapi.azurewebsites.net/graphql\"><img src=\"https://www.pngitem.com/pimgs/m/385-3850895_graphql-logo-svg-hd-png-download.png\" height=\"100\" class=\"image\"></a></p>" +
                        "<br><p>Created and developed by:</p>" +                        
                        "<h3>José Costa (R1CH4RD5) & Dylan Pinto</h3>" +
                    "</div>" +
                "</body>" +
            "</html>");
});

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.dyilf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options2 = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(uri, options2)

// Start server
app.listen(port, function() {
    console.log("Server running with the port: "+ port);
});