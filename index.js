const express = require('express');
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJSDocs = YAML.load('./api.yaml')

const app = express()
app.use(express.json())
app.use('/api/docs',swaggerUI.serve,swaggerUI.setup(swaggerJSDocs))
app.get('/string',(req,res)=>{
    res.status(200).send("This is a String")
})

app.get('/user',(req,res)=>{
    res.status(200).send({
        id: 1,
        name: "Anuj Trehan"
    })
})

let users = [{
    id: 1,
    name: "Anuj Trehan"
},{
    id: 2,
    name: "Gunjan Trehan"
},{
    id: 3,
    name: "Arjun Trehan"
}]

app.get('/users',(req,res)=>{
    res.status(200).send(users)
})

app.get('/user/:id',(req,res)=>{
    const obj = users.find(x=> x.id===parseInt(req.params.id))
    res.status(200).send(obj)
})

app.post('/create',(req,res)=>{
    const body = req.body
    users.push(body)
    res.status(200).send(users)
})

app.get('/userQuery',(req,res)=>{
    const obj = users.find(x=> x.id===parseInt(req.query.id))
    res.status(200).send(obj)
})
app.listen(5001,()=>{console.log('UP & running')})