async function getInfo(name){
    return await bridge.fetchByName(name);
}
async function getEnv(){
    res = await bridge.fetchE();
    return res;
}


function populate(){
      var parameters = location.search.substring(1).split("&");
  
      var temp = parameters[0].split("=");
      PName = temp[1];
      getInfo(PName).then((res) => {
        for (let row of res) {
            headline.innerText = row.PName;
            headline.setAttribute("pnr", row.PNr);
            var desc = document.getElementById('desc');
            desc.innerText = row.Desc;
            var location = document.getElementById('location');
            if(row.Location == "" || row.Location == null){
                location.innerText = "No Local Installation";
            }
            else{
                location.innerText = row.Location;
                location.onclick = function() {
                    bridge.openUrl(row.Location);
                }
            }   
            var env = document.getElementById('env');
            env.setAttribute("envID", row.EnvID);
            env.innerText = row.EName;
            var state = document.getElementById('stat');
            state.innerText = row.status;
            var host = document.getElementById('host');
            if(row.Url == "" || row.Url == null){
                host.innerText = "No Backup Host";
            }
            else{
                host.innerText = row.Url;
                host.onclick = function() {
                    bridge.openUrl(row.Url);
                }
            }

            var ename = document.getElementById('ename');
            ename.placeholder = row.PName;
            var edesc = document.getElementById('edesc');
            edesc.placeholder = row.Desc;
            var elocation = document.getElementById('elocation');
            if(row.Location == "" || row.Location == null){
                elocation.placeholder = "No Local Installation";
            }
            else{
                elocation.placeholder = row.Location;
            }
            let select = document.getElementById('eenv');
            getEnv().then((res) => {
                for (let raw of res) {
                    var element = document.createElement("option");
                    element.textContent = raw.EName;
                    element.value = raw.ID; 
                    if(row.EnvID == raw.ID){
                        element.selected = true;
                    }
                    select.appendChild(element);
                }
            });
            var estate = document.getElementById('estat');
            for(var i = 0; i < estate.options.length; i++){
                if(estate.options[i].value == row.status){
                    estate.options[i].selected = true;
                }
            }

            var ehost = document.getElementById('ehost');
            if(row.Url == "" || row.Url == null){
                ehost.placeholder = "No Backup Host";
            }
            else{
                ehost.placeholder = row.Url;
            }
        }
    });
}

function editMode(){
    var info = document.getElementById('info');
    console.log(info);
    var edit = document.getElementById('editDiv');
    console.log(edit);
    info.style.display = "none";
    edit.style.display = "block";
}

function update(){
    var ename = document.getElementById('ename').value || document.getElementById('ename').placeholder;
    var edesc = document.getElementById('edesc').value || document.getElementById('edesc').placeholder;
    var elocation = document.getElementById('elocation').value || document.getElementById('elocation').placeholder;
    var eenv = document.getElementById('eenv').value;
    var estate = document.getElementById('estat').value || document.getElementById('estat').placeholder;
    var ehost = document.getElementById('ehost').value || document.getElementById('ehost').placeholder;
    var headline = document.getElementById('headline');
    var pnr = headline.getAttribute("pnr");
    if(elocation == "No Local Installation" || elocation == "null"){
        elocation = "";
    }
    if(ehost == "No Backup Host"){
        ehost = "";
    }
    elocation = elocation.replace(/\\/g, '/');
    updateP(ename, edesc, elocation, eenv, estate, ehost, pnr);
    location.href = "../project-view/projectDetails.html?name="+ename;
}

async function updateP(ename, edesc, elocation, eenv, estate, ehost, pnr){
    await bridge.updateProject(ename, edesc, eenv, elocation, ehost, estate, pnr);
}
