require('dotenv').config()


const express = require('express')
const cors = require('cors')
const db = require('./DB/connection')
const server = express()
const contact = require('./Model/Contact')

server.use(cors())
server.use(express.json())

const PORT = process.env.PORT || 4000

server.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
})

server.post('/send-contact',async(req,res)=>{
    try {
        const {username,email,message} = req.body
        const contacts = new contact({username,email,message})
        await contacts.save()
        res.status(200).send(contacts)
    } catch (error) {
        res.status(402).send("Fill All Fields")
    }

})

server.get('/get-details',async(req,res)=>{
    try {
        const allDetails = await contact.find()
        res.status(200).send(allDetails)
    } catch (error) {
        res.status(404).send("error")
    }
})