const express = require('express');
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')

const port = process.env.PORT || 8080

const app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use(cors())

app.get('/',(req,res)=>{
//   return  res.sendFile(__dirname+'/public')
    res.sendFile(__dirname+'/public/index.html')
})

app.get('/notes',(req,res)=>{
   
    res.sendFile(__dirname+'/public/notes.html')
})

app.route('/api/notes')
.get((req,res)=>{
    res.sendFile(__dirname + '/db/db.json')
})
.post((req,res)=>{
    console.log(req.body)
    let note = req.body

    fs.readFile('db/db.json',(err,data)=>{
      let db = JSON.parse(data)
      db.push(note)
      console.log(db)
      fs.writeFile('db/db.json',JSON.stringify(db),(err)=>console.log(err))
    })
    res.send(req.url)
})




app.listen(port)

console.log('Server started at http://localhost:' + port);
