const request = require('request')

const forecast = (latitude, longitude , callback)=>{

const url = 'https://api.darksky.net/forecast/6de82875c368cd12f946f2f997314d88/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

request({url: url , json: true} , (error , response)=>{

        if(error){
            callback("Network Problem" , undefined)
        } else if(response.body.error){
            callback("No weather information found" , undefined)
        } else {
            const forecast = response.body.daily.data[0].summary + '  It is currently ' + response.body.currently.temperature
            callback(undefined , forecast)
        }


})
}

module.exports = forecast