var chip
var baseurl
var obj=readDevices()
listdevices(obj)


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
                console.log("empty list")
            }
            else
            {
                obj.data.devices.forEach(device => {
                    html+='<option value="'+i+'" '+isDefault(i)+'>'+device.name+'</option>'
                    i++
                    });
                document.getElementById("selecteddevice").innerHTML=html;
            }
    }
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

function buildurlbase()
{
    var e = document.getElementById("selecteddevice");
    var selected = e.options[e.selectedIndex].value;
    baseurl='http://'+obj.data.devices[selected].ip+':'+obj.data.devices[selected].port
}

function connect()
{
    hideError()
    buildurlbase()
    document.getElementById("button").disabled=true
    var http = new XMLHttpRequest()
    http.open("GET",baseurl+'/connect')
    http.send()
    http.onreadystatechange=function()
    {
        if(this.readyState==4)
        {
            if(this.status==200)
            {
                var respObj=JSON.parse(http.responseText)
                if (respObj.return==0)
                {
                    chip=respObj.deviceid
                    setdevice()
                }
                else
                {
                    console.log(respObj.message)
                    displayError("An error occured. Please check logs")
                }
            }
            else
            {
                console.log("error status : "+this.status)
                displayError("An error occured. Please check logs")
            }
        document.getElementById("button").disabled=false
        }
    }
}

function setdevice()
{
 chipObj = JSON.parse(readchips())
 chipObj.data.chips.forEach(chp =>{
     if( chp.signature == chip)
        {
            var http = new XMLHttpRequest()
            http.open("POST", baseurl+'/setdevice');
            http.setRequestHeader("Content-Type", "application/json");
            http.send(JSON.stringify(chp))
            http.onreadystatechange = function()
            {
                if(this.readyState==4)
                {
                    if(this.status==200)
                    {
                        var respObj=JSON.parse(http.responseText)
                        if (respObj.return==0)
                        {
                            loadAapp()
                        }
                        else
                        {
                            console.log(respObj.message)
                            displayError("An error occured. Please check logs")
                        }
                    }
                    else
                    {
                        console.log("error status : "+this.status)
                        displayError("An error occured. Please check logs")
                    }
                }
               
            }
        }
 });
}

async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}

async function loadAapp()
{
    const contentDiv = document.getElementById("container");
    contentDiv.innerHTML = await fetchHtmlAsText("html/home.html");
}

function isDefault(i)
{
    if(obj.data.devices[i].default==1)
        return "selected"
    else
        return ""
}
