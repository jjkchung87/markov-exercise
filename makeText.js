/** Command-line tool to generate Markov text. */
const {MarkovMachine} = require('./markov')
const fs = require('fs')
const axios = require('axios')
const sanitize = require('sanitize-html')

function readText(path){
    fs.readFile(path,'utf-8',(err,data) => {
        if(err){
            console.error(`unable to read ${path}: Error: ${err}`)
            process.exit(1)
        }
        const mm = new MarkovMachine(data)
        console.log(mm.makeText())
    })
}

async function readHTML(path){
    try{
        const res = await axios.get(path)
        const options = {
            allowedTags: [], // Strip all tags
            allowedAttributes: {}, // No attributes allowed
          };
        const sanitized = sanitize(res.data, options)
        const mm = new MarkovMachine(sanitized)
        console.log(mm.makeText())
    } catch(err) {
        console.error(`unable to read ${path}: Error: ${err}`)
        process.exit(1)
    }
}

function textOrHTML(type, path) {
    if (type === "file") {
        readText(path)
    } else {
        readHTML(path)
    }
}

const argv = process.argv

textOrHTML(argv[2],argv[3])