function mainmenuselector(type){
    var nodes = document.getElementById('headingmain').getElementsByTagName("div");
    for(var i=0; i<nodes.length; i++) {
        nodes[i].style.borderBottom ="none";
    }
    switch(type){
        case "chipinfo" :
                    document.getElementById('mainchipinfo').style.borderBottom = "2px solid black"
                    break;
        case "read" :
                    document.getElementById('mainread').style.borderBottom = "2px solid black"
                    break;
        case "write" :
                    document.getElementById('mainwrite').style.borderBottom = "2px solid black"
                    break;
        case "tools" :
                    document.getElementById('maintools').style.borderBottom = "2px solid black"
                    break;
        default:
                    break;
    }
}