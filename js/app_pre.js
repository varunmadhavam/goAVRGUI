const fs = require('fs')
var path = require('path');
const { remote } = require('electron')

var device_file = path.join(__dirname,"../files/devices.json")
var chip_file = path.join(__dirname,"../files/chips.json")

window.readdevices = function ()
{
    try
    {
        return '{"return":0,"data":'+fs.readFileSync(device_file)+'}'   
    }  
    catch(err)
    {
        console.log(err.message)
        return '{"return":1,"message":"'+ err.message.replace(/\\/g, "\\\\")+'"}'
    }
}

window.readchips = function ()
{ 
    try
    {
        return '{"return":0,"data":'+fs.readFileSync(chip_file)+'}'   
    }  
    catch(err)
    {
        console.log(err.message)
        return '{"return":1,"message":"'+ err.message.replace(/\\/g, "\\\\")+'"}'
    }
}
