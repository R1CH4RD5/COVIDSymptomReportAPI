// Imports
const connector = require('../connector')
var json2html = require('node-json2html');


// GetAllReports
exports.getallreports = function (req, res) {
    if(!req.headers.cookie) {
        res.json({notice: "You need to be logged in."})
    } else {
        let newconnection = new connector()
        newconnection.connect().then(()=>{
    
            newconnection.getAll().then(result=>{
    
                res.setHeader('Content-Type', 'text/html',"charset=UTF-8");
    
                var data = {
                    result
                }
                var transform2 = [
                    {"<>": "tr","html": [
                        {"<>": "td","html": "${_id}"}, 
                            {"<>": "td","html": "${name}"}, 
                            {"<>": "td","html": "${healthnum}"}, 
                            {"<>": "td","html": "${gender}"}, 
                            {"<>": "td","html": "${age}"}, 
                            {"<>": "td","html": "${contact}"}, 
                            {"<>": "td","html": "${email}"}, 
                            {"<>": "td","html": "${county}"}, 
                            {"<>": "td","html": "${s01}"}, 
                            {"<>": "td","html": "${s02}"}, 
                            {"<>": "td","html": "${s03}"}, 
                            {"<>": "td","html": "${s04}"}, 
                            {"<>": "td","html": "${s05}"}, 
                            {"<>": "td","html": "${s06}"}, 
                            {"<>": "td","html": "${s07}"}, 
                            {"<>": "td","html": "${s08}"}, 
                            {"<>": "td","html": "${s09}"}, 
                            {"<>": "td","html": "${s10}"}, 
                            {"<>": "td","html": "${s11}"}, 
                            {"<>": "td","html": "${s12}"}, 
                            {"<>": "td","html": "${s13}"}, 
                            {"<>": "td","html": "${q1}"}, 
                            {"<>": "td","html": "${q2}"}, 
                            {"<>": "td","html": "${q3}"}, 
                            {"<>": "td","html": "${reportdate}"}
                    ]
                }];
                var transform = [
                    {"<>": "style","html": "table,th,td {border: 1px solid black;border-collapse: collapse;}th {text-align: left;}"}, 
                    {"<>": "table","style": "width:100%","html": [
                        {"<>": "thead","html": [
                            {"<>": "tr","html": [
                                {"<>": "th","id": "0","html": "ID"}, 
                                {"<>": "th","id": "1","html": "Name"}, 
                                {"<>": "th","id": "2","html": "Health Number"}, 
                                {"<>": "th","id": "3","html": "Gender"}, 
                                {"<>": "th","id": "4","html": "Age"}, 
                                {"<>": "th","id": "5","html": "Contact"}, 
                                {"<>": "th","id": "6","html": "Email"}, 
                                {"<>": "th","id": "7","html": "County"}, 
                                {"<>": "th","id": "8","html": "S1"}, 
                                {"<>": "th","id": "9","html": "S2"}, 
                                {"<>": "th","id": "9","html": "S3"}, 
                                {"<>": "th","id": "10","html": "S4"}, 
                                {"<>": "th","id": "11","html": "S5"}, 
                                {"<>": "th","id": "12","html": "S6"}, 
                                {"<>": "th","id": "13","html": "S7"}, 
                                {"<>": "th","id": "14","html": "S8"}, 
                                {"<>": "th","id": "15","html": "S9"}, 
                                {"<>": "th","id": "16","html": "S10"}, 
                                {"<>": "th","id": "17","html": "S11"}, 
                                {"<>": "th","id": "18","html": "S12"}, 
                                {"<>": "th","id": "19","html": "S13"}, 
                                {"<>": "th","id": "20","html": "Q1"}, 
                                {"<>": "th","id": "21","html": "Q2"}, 
                                {"<>": "th","id": "22","html": "Q3"}, 
                                {"<>": "th","id": "23","html": "Report Date"}
                            ]
                        }, {
                            "<>": "tbody",
                            "id": "json-body",
                            "html": function(obj) {
                                return (json2html.transform(obj.result, transform2));
                            }
                        }, ]
                    }, ]
                }];
                var html = json2html.transform(data, transform);
    
                res.end(html);
                
                newconnection.close();
                
            }).catch(err=>console.log("error: ", err))
        }).catch(err=>console.log("error: ", err))
    }
};

// ReportsCount
exports.reportscount = function (req, res) {
    if(!req.headers.cookie) {
        res.json({notice: "You need to be logged in."})
    } else {
        let newconnection = new connector()
        newconnection.connect().then(()=>{

            newconnection.getReportsCount().then(result=>{
                
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ result }, null, 3));
                newconnection.close();
                
            }).catch(err=>console.log("error: ", err))
        }).catch(err=>console.log("error: ", err))
    }
};

// GenderCount
exports.gendercount = function (req, res) {
    if(!req.headers.cookie) {
        res.json({notice: "You need to be logged in."})
    } else {
        let newconnection = new connector()
        newconnection.connect().then(()=>{

            const gender = req.params.gender;

            newconnection.getGenderCount(gender).then(result=>{
                
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ result }, null, 3));
                newconnection.close();
                
            }).catch(err=>console.log("error: ", err))
        }).catch(err=>console.log("error: ", err))
    }
};

// VacineGenderCount
exports.vacinegendercount = function (req, res) {
    if(!req.headers.cookie) {
        res.json({notice: "You need to be logged in."})
    } else {
        let newconnection = new connector()
        newconnection.connect().then(()=>{

            newconnection.getVacineGenderCount().then(result=>{
                
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ result }, null, 3));
                newconnection.close();
                
            }).catch(err=>console.log("error: ", err))
        }).catch(err=>console.log("error: ", err))
    }
};

// AgeRangeCount
exports.agerangecount = function (req, res) {
    if(!req.headers.cookie) {
        res.json({notice: "You need to be logged in."})
    } else {
        let newconnection = new connector()
        newconnection.connect().then(()=>{

            newconnection.getAgeRangeCount().then(result=>{
                
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ result }, null, 3));
                newconnection.close();
                
            }).catch(err=>console.log("error: ", err))
        }).catch(err=>console.log("error: ", err))
    }
};

// CustomAgeRangeCount
exports.costumagerangecount = function (req, res) {
    if(!req.headers.cookie) {
        res.json({notice: "You need to be logged in."})
    } else {
        let newconnection = new connector()
        newconnection.connect().then(()=>{

            const a = req.params.begin;
            const b = req.params.end;

            newconnection.getCustomAgeRangeCount(a,b).then(result=>{
                
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ result }, null, 3));
                newconnection.close();
                
            }).catch(err=>console.log("error: ", err))
        }).catch(err=>console.log("error: ", err))
    }
};

// VacineCount
exports.vacinecount = function (req, res) {
    if(!req.headers.cookie) {
        res.json({notice: "You need to be logged in."})
    } else {
        let newconnection = new connector()
        newconnection.connect().then(()=>{

            newconnection.getVacineCount().then(result=>{
                
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ result }, null, 3));
                newconnection.close();
                
            }).catch(err=>console.log("error: ", err))
        }).catch(err=>console.log("error: ", err))
    }
};

// ChronologicalCount
exports.chronologicalcount = function (req, res) {
    if(!req.headers.cookie) {
        res.json({notice: "You need to be logged in."})
    } else {
        let newconnection = new connector()
        newconnection.connect().then(()=>{

            newconnection.getChronologicalCount().then(result=>{
                
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ result }, null, 3));
                newconnection.close();
                
            }).catch(err=>console.log("error: ", err))
        }).catch(err=>console.log("error: ", err))
    }
};

// CustomChronologicalReport
exports.customchronologicalreport = function (req, res) {
    if(!req.headers.cookie) {
        res.json({notice: "You need to be logged in."})
    } else {
        let newconnection = new connector()
        newconnection.connect().then(()=>{

            const a = req.params.bdate;
            const b = req.params.btime;
            const c = req.params.edate;
            const d = req.params.etime;

            newconnection.CustomChronologicalReport(a,b,c,d).then(result=>{
                
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ result }, null, 3));
                newconnection.close();
                
            }).catch(err=>console.log("error: ", err))
        }).catch(err=>console.log("error: ", err))
    }
};

// ReinfectionCount
exports.reinfectioncount = function (req, res) {
    if(!req.headers.cookie) {
        res.json({notice: "You need to be logged in."})
    } else {
        let newconnection = new connector()
        newconnection.connect().then(()=>{

            newconnection.getReinfectionCount().then(result=>{
                
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ result }, null, 3));
                newconnection.close();
                
            }).catch(err=>console.log("error: ", err))
        }).catch(err=>console.log("error: ", err))
    }
};

// SymptomRatio
exports.symptomratio = function (req, res) {
    if(!req.headers.cookie) {
        res.json({notice: "You need to be logged in."})
    } else {
        let newconnection = new connector()
        newconnection.connect().then(()=>{

            const symptom = req.params.symptom;

            newconnection.SymptomRatio(symptom).then(result=>{

                switch (result.length) {
                    case 1:
                        // so ha quem tenha ou so quem n tenha
                        res.json({ symptom: symptom, result: [{had_symptom: result[0]._id.result, count: result[0].count,percentage: result[0].percentage}]});
                        break;
                    case 2:
                        // ha ambos
                        res.json({ symptom: symptom, result: [{had_symptom: result[1]._id.result, count: result[1].count,percentage: result[1].percentage},
                            {had_symptom: result[0]._id.result, count: result[0].count,percentage: result[0].percentage}]});
                        break;
                
                    default:
                        // n ha casos
                        res.json({symptom: symptom, result: "no data"})
                        break;
                }

                
                newconnection.close();
                
            }).catch(err=>console.log("error: ", err))
        }).catch(err=>console.log("error: ", err))
    }
};

// NewReport
exports.newreport = function (req, res) {
    if(!req.headers.cookie) {
        res.json({notice: "You need to be logged in."})
    } else {
        let newconnection = new connector()
        newconnection.connect().then(()=>{

            const a = req.params.name;
            const b = req.params.healthnum;
            const c = req.params.gender;
            const d = req.params.age;
            const e = req.params.contact;
            const f = req.params.email;
            const g = req.params.county;
            const h = req.params.s01 === "true";
            const i = req.params.s02 === "true";
            const j = req.params.s03 === "true";
            const k = req.params.s04 === "true";
            const l = req.params.s05 === "true";
            const m = req.params.s06 === "true";
            const n = req.params.s07 === "true";
            const o = req.params.s08 === "true";
            const p = req.params.s09 === "true";
            const q = req.params.s10 === "true";
            const r = req.params.s11 === "true";
            const s = req.params.s12 === "true";
            const t = req.params.s13 === "true";
            const u = req.params.q1 === "true";
            const v = req.params.q2 === "true";
            const w = req.params.q3;

            newconnection.postNewReport(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w).then(result=>{
                
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ result }, null, 3));
                newconnection.close();
                
            }).catch(err=>console.log("error: ", err))
        }).catch(err=>console.log("error: ", err))
    }
};

// Overview
exports.overview = function (req, res) {
    if(!req.headers.cookie) {
        res.json({notice: "You need to be logged in."})
    } else {    
        let newconnection = new connector()
        newconnection.connect().then(()=>{
            res.header("Content-Type","text/html","charset=UTF-8");

            // ReportsCount
            newconnection.getReportsCount().then(result=>{
                //res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify({ "---> Total of Reports": result }, null, 1));
                //newconnection.close();
                
            }).catch(err=>console.log("error: ", err))

            // AgeRangeCount
            newconnection.getAgeRangeCount().then(result=>{
                res.write("\n")
                res.write(JSON.stringify({ "---> Age Range": result }, null, 1));
                //newconnection.close();
                
            }).catch(err=>console.log("error: ", err))

            // VacineCount
            newconnection.getVacineCount().then(result=>{
                res.write("\n")
                res.write(JSON.stringify({ "---> Vaccine Count": result }, null, 1));
                //newconnection.close();
                
            }).catch(err=>console.log("error: ", err))

            // ChronologicalCount
            newconnection.getChronologicalCount().then(result=>{
                res.write("\n")
                res.write(JSON.stringify({ "---> Chronological Count": result }, null, 1));
                //newconnection.close();
                
            }).catch(err=>console.log("error: ", err))

            // ReinfectionCount
            newconnection.getReinfectionCount().then(result=>{
                res.write("\n")
                res.write(JSON.stringify({ "---> Reinfection Count": result }, null, 1));
                //newconnection.close();
                
            }).catch(err=>console.log("error: ", err))

            // VacineGenderCount
            newconnection.getVacineGenderCount().then(result=>{
                res.write("\n")
                res.write(JSON.stringify({ result }, null, 1));
                
            }).catch(err=>console.log("error: ", err))


            let symsA = ["01- Muscle tension and pain","02- Sore throat"]

            for(let i = 0; i < 2; i++){
                newconnection.SymptomRatio(symsA[i]).then(result=>{
                    res.write("\n")
                    res.write(JSON.stringify({ result }, null, 1));
                    //newconnection.close();
                    
                }).catch(err=>console.log("error: ", err))
            }
            
            /*let symptom = "01- Muscle tension and pain";
            
            newconnection.SymptomRatio(symptom).then(result=>{
                res.write("\n")
                res.write(JSON.stringify({ "---> 01- Muscle tension and pain": result }, null, 1));
                //newconnection.close();
                
            }).catch(err=>console.log("error: ", err))*/

            let symptom = "02- Sore throat";
            
            newconnection.SymptomRatio(symptom).then(result=>{
                res.write("\n")
                res.end(JSON.stringify({ "---> 02- Sore throat": result }, null, 1));
                //newconnection.close();
                
            }).catch(err=>console.log("error: ", err))
            
        }).catch(err=>console.log("error: ", err))
    }
    
};