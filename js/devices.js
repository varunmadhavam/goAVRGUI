var obj = readDevices()
pupulateHTML(obj)

function readDevices()
{
    return JSON.parse(readdevices())
}

function pupulateHTML(obj)
{
    var html=""
    var devicesHTML=document.getElementById("devices")
    if(obj.return!=0)
        {
            console.log("Error while reading goAVR devices\n"+obj.message)
            html='<div class="row">&nbsp;</div><div class="row odd"><div class="empty">No goAVR Device Registered</div></div>'
        }
    else
        {
            if(obj.data.devices.length==0)
            {
                html='<div class="row">&nbsp;</div><div class="row odd"><div class="empty">No goAVR Device Registered</div></div>'
            }
            else
            {
                var i=0
                obj.data.devices.forEach(device => {
                html+='<div class="row '+oddoreven(i)+'">\
                <div class="devname">'+device.name+'</div>\
                <div class="ip">'+device.ip+'</div>\
                <div class="port">'+device.port+'</div>\
                <div class="edit"><i onclick="setDefault('+i+')" aria-hidden="true" class="'+isDefault(device.default)+'" title="Set Default"></i></div>\
                <div class="delete"><i onclick="removeDevice('+i+')" aria-hidden="true" class="fas fa-trash" title="Delete"></i></div>\
                </div>'
                i++
                });
                
            }
        }
    devicesHTML.innerHTML=html;
}

function oddoreven(i)
{
    if(i%2==0)
        return "even"
    else
        return "odd"
}

function isDefault(no)
{
    if(no==1)
        return "fas fa-check-circle"
    else
        return "far fa-circle"
}

function removeDevice(no)
{
    hideError()
    obj.data.devices.splice(no,1)
    pupulateHTML(obj)
    if(!writedevice(JSON.stringify(obj.data)))
    {
        console.log("failed to write")
    }
}

function setDefault(no)
{
   var i=0
   obj.data.devices.forEach(device => {
       if(i==no)
            device.default=1
       else
            device.default=0
      i++;
   });
   
   if(!writedevice(JSON.stringify(obj.data)))
        {
            displayError("Write to File failed. Check Logs.")
            obj=readDevices()
        }
    pupulateHTML(obj)
}

function addDevice()
{
    hideError()
    html='<div class="addnewdev">\
    <input onclick="hideError()" class="newdevname" type="text" id="newdevname" name="newdevname" placeholder="Name">\
    <input onclick="hideError()" class="newdevip" type="text" id="newdevip" name="newdevip" placeholder="IP">\
    <input onclick="hideError()" class="newdevport" type="text" id="newdevport" name="newdevport" placeholder="Port">\
    <div class="newdevdiscard"><i onclick="discardnewDevice()" aria-hidden="true" class="fas fa-trash" title="Discard"></i></div>\
    <div class="newdevwrite"><i onclick="writeDevice()" aria-hidden="true" class="fas fa-plus-circle" title="Add"></i></div>\
    </dev>'
    document.getElementById("adddevice").innerHTML=html;
}

function discardnewDevice()
{
    hideError()
    document.getElementById("adddevice").innerHTML='<a href="#" class="adddevicebutton" onclick="addDevice()">Add New Device</a>';
}

function displaynewdevButton()
{
    hideError()
    document.getElementById("adddevice").innerHTML='<a href="#" class="adddevicebutton" onclick="addDevice()">Add New Device</a>';
}

function writeDevice()
{
    var devname=document.getElementById("newdevname").value;
    var devip=document.getElementById("newdevip").value;
    var devport=document.getElementById("newdevport").value;
    if(!inputValidate("devname",devname))
    {
        displayError("Invalid device name. Should be Alphanumeric.")
    }
    else if(!inputValidate("devip",devip))
    {
        displayError("Value entered is not a valid IP.")
    }
    else if(!inputValidate("devport",devport))
    {
        displayError("Value entered is not a valid port.")
    }
    else
    {
        var newdev='{"name":"'+devname+'","ip":"'+devip+'","port":"'+devport+'","default":0}';
        newdev=JSON.parse(newdev)
        obj.data.devices.push(newdev)
        displaynewdevButton()
        if(!writedevice(JSON.stringify(obj.data)))
        {
            displayError("Write to File failed. Check Logs.")
            obj=readDevices()
        }
        pupulateHTML(obj)
    }
   
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