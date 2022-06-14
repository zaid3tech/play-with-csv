const csv = require('csv-parser')
const fs = require('fs')
const results = []
let county = {}
let line = {}
let output = {}

fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        processData(results)
        saveOutput()
    });

function processData(data) {
    for (i = 0; i < data.length; i++) {
        //check if exist for county
        if (county[data[i].county] == undefined) {
            let countyObj = {}
            let tivObj = {
                "tiv_2012": parseFloat(data[i].tiv_2012)
            }
            countyObj = tivObj
            county[data[i].county] = countyObj
        } else {
            county[data[i].county].tiv_2012 += parseFloat(data[i].tiv_2012)
        }
        //check if exist for line 
        if (line[data[i].line] == undefined) {
            let lineObj = {}
            let tivObj = {
                "tiv_2012": parseFloat(data[i].tiv_2012)
            }
            lineObj = tivObj
            line[data[i].line] = lineObj
        } else {
            line[data[i].line].tiv_2012 += parseFloat(data[i].tiv_2012)
        }
    }
    output.county = county
    output.line = line
}

function saveOutput() {
    fs.writeFile("output.json", JSON.stringify(output, null, 4), function (err) {
        if (err) throw err;
        console.log('complete');
    });
}