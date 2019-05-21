const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/53d1413c0cd953ee944cfe4e369d0556/' + latitude + ',' + longitude +'?lang=nb&units=si'

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' det er nå ' + body.currently.temperature + ' grader. Det er  ' + body.currently.precipProbability + '% sjangse for regn.')
        }
    })
}

module.exports = forecast