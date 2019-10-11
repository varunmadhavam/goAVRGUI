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
        return '{"return":1,"message":"'+ err.message.replace(/\\/g, "\\\\")+'"}'
    }
}

window.writedevice = function(data)
{
    fs.writeFileSync(file,data)
    try
    {
        return '{"return":0,"message":"Write Succeeded"}'
    }
    catch(err)
    {
        return '{"return":1,"message":"'+ err.message.replace(/\\/g, "\\\\")+'"}'
    }
}