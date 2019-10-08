var obj = JSON.parse(readdevices())
var html=""
if(obj.return!=0)
{
    console.log("Error while reading goAVR devices\n"+obj.message)
    html='<div class="row">&nbsp;</div><div class="row odd"><div class="empty">No goAVR Device Registered</div></div>'
    document.getElementById("devices").innerHTML=html;
}
else
{
obj.data.devices.forEach(device => {
    html+='<div class="row '+oddoreven()+'">\
    <div class="devname">'+device.name+'</div>\
    <div class="ip">'+device.ip+'</div>\
    <div class="port">'+device.port+'</div>\
    <div class="edit"><i aria-hidden="true" class="fa fa-bars" title="Edit"></i></div>\
    <div class="delete"><i aria-hidden="true" class="fas fa-trash" title="Delete"></i></div>\
    </div>'
});
document.getElementById("devices").innerHTML=html;
}

var odd=1;
function oddoreven()
{
    if(odd==1)
    {
        odd=0;
        return "odd"
    }
    else
    {
        odd=1;
        return "even"
    }
}