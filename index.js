require('dotenv').config()
const express = require('express');
const app = express();
const port = 4000;
const Gpio = require('onoff').Gpio; // Gpio class
const greenLED = new Gpio(17, 'out'); 
const redLED = new Gpio(27, 'out'); 

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
greenLED.writeSync(0);
redLED.writeSync(1);
client.on('connect', function () {
  client.subscribe('OUTLET_NR_'+process.env.OUTLETID, function (err) {

  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  const buffer = JSON.stringify(JSON.parse(JSON.parse(message.toString())));
  //const buffer2 = JSON.parse(buffer);
  //const buffer3 = JSON.parse(buffer2);
  if(buffer.isConnected){
    greenLED.writeSync(1);
    redLED.writeSync(0);
}
else{
    greenLED.writeSync(0);
    redLED.writeSync(1);
}
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})