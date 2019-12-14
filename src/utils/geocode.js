const request = require('request')

const geocode = (address , callback)=>{
    const mapUrl = "http://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoic3VyeWF0aGFrdXIiLCJhIjoiY2s0MmlrNWw4MDByeDNvcWlnNjVtdTB4cSJ9.h-LmBXtas-hmpMWIcwHJ7w"

 request({url: mapUrl, json: true} , (error , response)=>{
      
       if(error){
           callback("Sorry, You are not connected to internet" , undefined)
       } else if(response.body.features.length === 0){
           callback("No Places Found Matching your query" , undefined)
       } else {
        const data = {
            latitude : response.body.features[0].center[1],
            longitude : response.body.features[0].center[0],
            location : response.body.features[0].place_name
        }
        callback(undefined , data)
    }
 })

}

module.exports = geocode