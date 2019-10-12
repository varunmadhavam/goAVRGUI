var filecont = readdevices()
var obj = JSON.parse(filecont)
pupulateHTML(obj)

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
                <div class="edit"><i onclick="editDevice('+i+')" aria-hidden="true" class="fa fa-bars" title="Edit"></i></div>\
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

function removeDevice(no)
{
    obj.data.devices.splice(no,1)
    pupulateHTML(obj)
    if(!writedevice(JSON.stringify(obj.data)))
    {
        console.log("failed to write")
    }
}

function editDevice(no)
{

}

function addDevice()
{
    var html=""
    var devicesbuttonHTML=document.getElementById("adddevice")
    html='<div class="addnewdev">\
    <input class="newdevname" type="text" id="newdevname" name="newdevname" placeholder="Name">\
    <input class="newdevip" type="text" id="newdevip" name="newdevip" placeholder="IP">\
    <input class="newdevport" type="text" id="newdevport" name="newdevport" placeholder="Port">\
    <div class="newdevdiscard"><i onclick="discardnewDevice()" aria-hidden="true" class="fas fa-trash" title="Discard"></i></div>\
    <div class="newdevwrite"><i onclick="writeDevice()" aria-hidden="true" class="fas fa-plus-circle" title="Add"></i></div>\
    </dev>'
    devicesbuttonHTML.innerHTML=html;
}

function discardnewDevice()
{
    html='<a href="#" class="adddevicebutton" onclick="addDevice()">Add New Device</a>'
    var devicesbuttonHTML=document.getElementById("adddevice")
    devicesbuttonHTML.innerHTML=html;
}

function displaynewdevButton()
{
    html='<a href="#" class="adddevicebutton" onclick="addDevice()">Add New Device</a>'
    var devicesbuttonHTML=document.getElementById("adddevice")
    devicesbuttonHTML.innerHTML=html;
}

function writeDevice()
{
    var devname=document.getElementById("newdevname").value;
    var devip=document.getElementById("newdevip").value;
    var devport=document.getElementById("newdevport").value;
    if(!inputValidate("devname",devname))
    {
        console.log("invalid name")
    }
    else if(!inputValidate("devip",devip))
    {
        console.log("invalid ip")
    }
    else if(!inputValidate("devport",devport))
    {
        console.log("invalid port")
    }
    else
    {
        var newdev='{"name":"'+devname+'","ip":"'+devip+'","port":"'+devport+'"}';
        newdev=JSON.parse(newdev)
        obj.data.devices.push(newdev)
        displaynewdevButton()
        pupulateHTML(obj)
        console.log()
        if(!writedevice(JSON.stringify(obj.data)))
        {
            console.log("write failed")
        }
    }
   
}