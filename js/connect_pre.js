const fs = require('fs')
var path = require('path');
var file = path.join(__dirname,"../files/devices.json")

window.readdevices = function ()
{
    try
    {
        return '{"return":0,"data":'+fs.readFileSync(file)+'}'   
    }  
    catch(err)
    {
        console.log(err.message)
        return '{"return":1,"message":"'+ err.message.replace(/\\/g, "\\\\")+'"}'
    }
}
