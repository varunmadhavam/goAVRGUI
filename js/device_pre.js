const fs = require('fs')
var path = require('path');
var validator = require('validator');
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
        return true
    }
    catch(err)
    {
        close.log(err.message)
        return false
    }
}

window.inputValidate = function(type,value)
{
    switch(type)
    {
        case "devname":
            return validator.isAlphanumeric(value)
            break
        case "devip":
            return validator.isIP(value)
            break
        case "devport":
            return validator.isPort(value)
        default:
            return false
    }
}