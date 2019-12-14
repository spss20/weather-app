const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicHtml = path.join(__dirname , '../public')
const partialPath = path.join(__dirname , '../partials')

app.use(express.static(publicHtml))

app.set('view engine' , 'hbs')

hbs.registerPartials(partialPath)

app.get('/help' , (req , res)=>{
    res.render('help' , {
        title : 'Surya Pratap Singh Sikarwar',
        body : 'A very Talented Programmer'
    })
})

app.get('/about' , (req , res)=>{
    res.render('about' , {
        title : 'About Page',
        body : 'About the fucking world'
    })
})

app.get('' , (req , res) => {
    res.render('index' , {
        title: 'Weather',
        body : 'Created By Surya'
    })
})

app.get('/help/*' , (req , res) => {
    res.render('404' , {
        title : 'Help Page Not Found',
        body: 'You are lost in Space'
    })
})

app.get('/weather' , (req , res) => {
    if(req.query.address){
        geocode(req.query.address , (error , body)=>{
            if(error){
                return res.send({
                    status: '404 error',
                    error: error
                })
            } else {
        
                forecast(body.latitude, body.longitude, (error, data) => {
                    if(error){
                        return res.send({
                            status: '404 error',
                            error: error
                        })
                    } else {
                          return res.send({
                              forecast : data,
                              location: body.location
                          })
                    }
                  })
        
            }
        })
        
    } else {
     res.send('You need to enter address to know weather info')
    }
})


app.get('*' , (req , res) => {
    res.render('404' , {
        title : '404 Not Found',
        body : 'You are lost in Universe'
    })
})
app.listen(80 , () => {
    console.log('Listening to port 3000')
})


