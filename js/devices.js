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
    console.log(writedevice(JSON.stringify(obj.data)))
}

function editDevice(no)
{

}

function addDevice()
{
    var html=""
    var devicesbuttonHTML=document.getElementById("adddevice")
    html='<div class="addnewdev"><div class="newdevname"><input type="text" name="devname"></div>\
    <div class="newdevip"><input type="text" name="devip"></div>\
    <div class="newdevport"><input type="text" name="port"></div>\
    <div class="newdevdiscard"><i onclick="discardnewDevice()" aria-hidden="true" class="fa fa-bars" title="Discard"></i></div>\
    <div class="newdevwrite"><i onclick="writeDevice()" aria-hidden="true" class="fas fa-trash" title="Add"></i></div>\
    </dev>'

}