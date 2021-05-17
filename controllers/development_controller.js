// Imports
const connector = require('../connector')


// AddNewData
exports.addnewdata = function (req, res) {

    let newconnection = new connector()
    newconnection.connect().then(()=>{
        
        var promises = []
        const num = parseInt(req.params.num);
        
        for (let i = 0; i < num; i++) {            
            promises.push(newconnection.addData());
        }
        Promise.all(promises)
        
        newconnection.close();
        
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ response: `${num}` }, null, 3));
    }).catch(err=>console.log("error: ", err))
};