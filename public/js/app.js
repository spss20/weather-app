console.log('Git wokring fine')
const weatherForum = document.querySelector('form')
const input = document.querySelector('input')
const message1 = document.querySelector('#message_1')
const message2 = document.querySelector('#message_2')

weatherForum.addEventListener('submit' , (event) => {
      event.preventDefault()
      fetchWeather(input.value)
})

const fetchWeather = (location) => {

    const url = 'http://localhost/weather?address=' + encodeURIComponent(location)
    fetch(url).then((response) => {

        response.json().then((data) => {
            if(data.error){
                message1.textContent = data.error
                message2.textContent = ''
            } else{
                message1.textContent = data.forecast
                message2.textContent = data.location
            }
        })
 })

}