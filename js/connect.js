listdevices(readDevices())

function listdevices(obj)
{
    var html=""
    var i=0;
    if(obj.return!=0)
        {
            displayError("An error occured. Check Logs")
            console.log("Error while reading goAVR devices\n"+obj.message)
        }
    else
    {
        if(obj.data.devices.length==0)
            {
                displayError("An error occured. Check Logs")
                console.log("empty list")
            }
            else
            {
                obj.data.devices.forEach(device => {
                    html+='<option value="'+i+'">'+device.name+'</option>'
                    });
            }
    }
    document.getElementById("selecteddevice").innerHTML=html;
}

function readDevices()
{
    return JSON.parse(readdevices())
}

function displayError(message)
{
    var errorDIV=document.getElementById("message")
    errorDIV.innerHTML=message;
    errorDIV.style.display="block"
}

function hideError()
{
    var errorDIV=document.getElementById("message")
    errorDIV.style.display="none"
}