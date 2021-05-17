// Imports
var MongoClient = require('mongodb').MongoClient;

var url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.dyilf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;


class connector {
    constructor(){
        this.dbo = null
        this.result = []
        this.db = null        
    }

    connect(){
        var self = this
        return new Promise((resolve,reject)=>{ 

            MongoClient.connect(url, function(err, db) {            
                if (err) reject(err);
                self.db = db
                self.dbo = db.db("covidreportapi"); 
                resolve(self.dbo)            
            });
            this.dbo = self.dbo
            this.db = self.db
        })
    }

    close(){
        this.db.close();
    }

    addData(num){
        var self = this
        return new Promise((resolve,reject)=>{
            
            const nameA = ["John", "Mary", "Tomas", "Elen", "Tommy", "Ana", "Dave", "Olivia", "Tyler", "Victoria"]
            const name2A = ["Doe", "Jr", "Charles", "Michael", "Janet", "Smith", "Miller", "Wood", "Green", "Taylor"]            
            const countyA = [
                "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra", "Évora", "Faro",
                "Guarda", "Leiria", "Lisboa", "Portoalegre", "Porto", "Santarém", "Setubal", "Viana do Castelo",
                "Vila Real", "Viseu"
            ]
            const vacineA = ["No", "(Yes) BioNTech, Pfizer", "(Yes) Johnson & Johnson", "(Yes) Moderna", "(Yes) Oxford, AstraZeneca"]
            const genderA = ["Male", "Female"]

            function rdm (){return Math.floor(Math.random() * 9);}
            function rdm2 (n){return Math.floor(Math.random() * n);}

            const dataname = nameA[rdm()] + " " + name2A[rdm()]

            const datahealthnum = Math.floor(Math.random() * 1000000000)

            const datagender = genderA[Math.floor(Math.random() + 0.5)]
            
            const dataage = Math.floor(Math.random() * 90) + 1

            const datacontact = Math.floor(Math.random() * 1000000000)

            const dataemail = dataname.replace(' ','_') +"@mail.com"
            
            const datacounty = countyA[Math.floor(Math.random() * 17)]

            let datavacine = vacineA[Math.floor(Math.random() * 5)]

            let yeardata = this.randomIntFromInterval(2020,2021)
            let monthdata = this.randomIntFromInterval(1,12)
            let daydata

            if (monthdata == 1 || 3 || 5 || 7 || 9 || 11) {
                daydata = this.randomIntFromInterval(1,31)
            } else if (monthdata == 4 || 6 || 8 || 10 || 12) {
                daydata = this.randomIntFromInterval(1,30)
            } else if (monthdata == 2) {
                daydata = this.randomIntFromInterval(1,29)
            }

            let hourdata = this.randomIntFromInterval(1,24)
            let minutedata = this.randomIntFromInterval(1,60)
            

            self.dbo.collection("data").insertOne({
                name:dataname,
                healthnum:datahealthnum,
                gender:datagender,
                age:dataage,
                contact:datacontact,
                email:dataemail,
                county:datacounty,
                s01:Math.random() > 0.5,
                s02:Math.random() > 0.5,
                s03:Math.random() > 0.5,
                s04:Math.random() > 0.5,
                s05:Math.random() > 0.5,
                s06:Math.random() > 0.5,
                s07:Math.random() > 0.5,
                s08:Math.random() > 0.5,
                s09:Math.random() > 0.5,
                s10:Math.random() > 0.5,
                s11:Math.random() > 0.5,
                s12:Math.random() > 0.5,
                s13:Math.random() > 0.5,
                q1:Math.random() > 0.5,
                q2:Math.random() > 0.5,
                q3:datavacine,
                reportdate: new Date(yeardata,monthdata,daydata,hourdata,minutedata)
            }).then(resolve())
        })
    }

    postNewReport(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w){
        var self = this
        return new Promise((resolve,reject)=>{

            var newObject = {
                name:a,
                healthnum:parseInt(b),
                gender:c,
                age:parseInt(d),
                contact:parseInt(e),
                email:f,
                county:g,
                s01:h,
                s02:i,
                s03:j,
                s04:k,
                s05:l,
                s06:m,
                s07:n,
                s08:o,
                s09:p,
                s10:q,
                s11:r,
                s12:s,
                s13:t,
                q1:u,
                q2:v,
                q3:w,
                reportdate: new Date()
            }

            self.dbo.collection("data").insertOne(newObject).then(resolve(newObject))
        })
    }

    NewUser(hash){
        var self = this
        return new Promise((resolve,reject)=>{

            var newObject = {
                hash: hash
            }

            self.dbo.collection("user").insertOne(newObject).then(resolve(newObject))
        })
    }

    getUsers(){
        var self = this
        return new Promise((resolve,reject)=>{

            self.dbo.collection("user").find({}).toArray(function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
        })
    }

    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getAll(){
        var self = this
        return new Promise((resolve,reject)=>{ 
            
            self.dbo.collection("data").find({}).toArray(function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
        })
    }

    getReportsCount(){
        var self = this
        return new Promise((resolve,reject)=>{ 

            self.dbo.collection("data").find({}).count(function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
        })
    }

    getGenderCount(gender){
        var self = this
        return new Promise((resolve,reject)=>{ 

            if (gender == "{gender}") {
                resolve("No type of gender selected. Please select a gender.")
            } else {
                var query = [{
                    $group: { 
                        _id : 1,
                        Count: {$sum: {$cond: [{$eq:["$gender", `${gender}`]}, 1, 0]}}
                    },
                },{$project: {_id:0}}];
    
                self.dbo.collection("data").aggregate(query).toArray(function(err, result) {
                    if (err) reject(err);
                    resolve(result);
                });
            }
        })
    }

    getVacineGenderCount(){
        var self = this
        return new Promise((resolve,reject)=>{ 

            var query = [                                        
                { $group: {
                    _id: {
                        gender: "$gender","q3": "$q3"
                    },
                    q3Count: { "$sum": 1 }
                }},
                { $group: {
                    _id: "$_id.gender",
                    q3s: { 
                        "$push": { 
                            "q3": "$_id.q3","count": "$q3Count"
                        },
                    },
                    count: { "$sum": "$q3Count" }
                }},
                { $sort: { "count": -1 } },
                { $limit: 5 },
                { $project: {
                    "q3s": { "$slice": [ "$q3s", 5 ] },"count": 1
                }}
            ];

            self.dbo.collection("data").aggregate(query).toArray(function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
        })
    }

    getAgeRangeCount(){
        var self = this
        return new Promise((resolve,reject)=>{

            var query = [                                        
                { "$group":{ 
                    _id : 1,
                    between00to24: { $sum: {$cond: [{ $and: [{ $gte: [ "$age", 0 ] },{ $lte: [ "$age", 24 ] }]},1,0]}},
                    between25to44: {$sum: {$cond: [{ $and: [{ $gte:  [ "$age", 25 ] },{ $lte: [ "$age", 44 ] }]},1,0]}},
                    between45to64: {$sum: {$cond: [{ $and: [{ $gte:  [ "$age", 45 ] },{ $lte: [ "$age", 65 ] }]},1,0]}},
                    between65to99: {$sum: {$cond: [{ $and: [{ $gte:  [ "$age", 65 ] },{ $lte: [ "$age", 100 ] }]},1,0]}}
                }}
            ,{$project: {_id:0}}];

            self.dbo.collection("data").aggregate(query).toArray(function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
        })
    }

    getCustomAgeRangeCount(a,b){
        var self = this
        return new Promise((resolve,reject)=>{ 

            const c = parseInt(a);
            const d = parseInt(b);

            var query = { age : { $gte :  c, $lte : d}}        

            self.dbo.collection("data").find(query).count(function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
        })
    }

    getVacineCount(){
        var self = this
        return new Promise((resolve,reject)=>{ 

            var query = [{
                $group: { 
                    _id : 1,
                    NotVacinated: {$sum: {$cond: [{$eq:["$q3", "No"]}, 1, 0]}},
                    BioNTechPfizer: {$sum: {$cond: [{$eq:["$q3", "(Yes) BioNTech, Pfizer"]}, 1, 0]}},
                    JohnsonJohnson: {$sum: {$cond: [{$eq:["$q3", "(Yes) Johnson & Johnson"]}, 1, 0]}},
                    Moderna: {$sum: {$cond: [{$eq:["$q3", "(Yes) Moderna"]}, 1, 0]}},
                    OxfordAstraZeneca: {$sum: {$cond: [{$eq:["$q3", "(Yes) Oxford, AstraZeneca"]}, 1, 0]}}
                },
            },{$project: {_id:0}}];

            self.dbo.collection("data").aggregate(query).toArray(function(err, result) {
                if (err) reject(err);
                resolve(result);
            });            
        })
    }

    getChronologicalCount(){
        var self = this
        return new Promise((resolve,reject)=>{ 

            var query = 
            [{
                $match: {
                    "reportdate": {
                        $gte: new Date(2019, 0, 0),
                        $lte: new Date(new Date().getFullYear() + 1,0,0)
                    }
                }
            }, {
                $group: {
                    _id: {
                        "year": { $year: "$reportdate" },
                        "month": { $month: "$reportdate" },
                        "day": { $dayOfMonth: "$reportdate" }
                    }, "count": { $sum: 1 }
                }
            },
            {"$sort":{"_id": -1}}
            ]

            self.dbo.collection("data").aggregate(query).toArray(function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
        })
    }

    CustomChronologicalReport(a,b,c,d){
        var self = this
        return new Promise((resolve,reject)=>{ 
            
            var datestring  = a+"T"+b+":00.000Z"
            var datestring2 = c+"T"+d+":00.000Z"

            if (new Date(datestring) < new Date(datestring2)) {
                var query = 
            [{
                $match: {
                    "reportdate": {
                        $gte: new Date(datestring),
                        $lte: new Date(datestring2)
                    }
                }
            }, {
                $group: {
                    _id: {
                        "year": { $year: "$reportdate" },
                        "month": { $month: "$reportdate" },
                        "day": { $dayOfMonth: "$reportdate" },
                        "hour": { $hour: "$reportdate" },
                        "minute": { $minute: "$reportdate"}
                    }, "count": { $sum: 1 }, "reports":{"$push":"$$ROOT"}
                }
            },
            {"$sort":{"_id": -1}}
            ]
            
            self.dbo.collection("data").aggregate(query).toArray(function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
            } else {
                resolve("The INITIAL DATE and TIME needs to be before than the FINAL DATE and TIME.")
            }
        })
    }

    getReinfectionCount(){
        var self = this
        return new Promise((resolve,reject)=>{ 

            var query = 
            [{
                $match : { q2 : true }
            }, {
                $group: {
                    _id: {
                        "year": { $year: "$reportdate" },
                        "month": { $month: "$reportdate" },
                        "day": { $dayOfMonth: "$reportdate" }
                    },
                     
                    "reinfected": { $sum: 1 }
                }
            },
            {"$sort":{"_id": -1}}
            ]

            self.dbo.collection("data").aggregate(query).toArray(function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
        })
    }

    SymptomRatio(symptom){
        var self = this
        return new Promise((resolve,reject)=>{ 

            var nums

            self.dbo.collection("data").find().count().then(function(result) {
                nums = result;

                let sym = symptom.substring(0, 2);

                var query = [
                    { $group:
                        { _id: {result:  `$s${sym}`}, "count": { "$sum": 1 }},
                    },
                    { $project: { 
                        "count": 1, 
                        "percentage": { 
                            "$concat": [ { "$substr": [ { "$multiply": [ { "$divide": [ "$count", {"$literal": nums }] }, 100 ] }, 0,2 ] }, "", "%" ]}
                        }
                }];
    
                self.dbo.collection("data").aggregate(query).toArray(function(err, result) {
                    if (err) reject(err);
                    resolve(result);
                }); 
            })
        })
    }
}
module.exports = connector;