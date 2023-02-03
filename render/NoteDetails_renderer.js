async function getInfo(name){
    return await bridge.fetchNotes(name);
}



function populate(){
      var parameters = location.search.substring(1).split("&");
  
      var temp = parameters[0].split("=");
      PName = temp[1];
      var mode = parameters[1].split("=")[1];
      if(mode == "Edit"){
        getInfo(PName).then((res) => {
            for (let row of res) {
                let nameBox = document.getElementById('name');
                nameBox.placeholder = row.Title;
                nameBox.value = row.Title;
                nameBox.setAttribute("nnr", row.NNr);
                let content = document.getElementById('content');
                content.innerText = row.Content;
            
            }
        });
    }else if(mode == "New"){
        let nameBox = document.getElementById('name');
        nameBox.placeholder = "New Note";
        nameBox.value = "New Note";

    }
}


function saveNote(){
    var parameters = location.search.substring(1).split("&");
    var mode = parameters[1].split("=")[1];
    var name = document.getElementById('name').value;
    var content = document.getElementById('content').value;
    var id = document.getElementById('name').getAttribute("nnr");
    if(mode == "Edit"){
        edNote(name, content, id);
    }
    else if(mode == "New"){
        inNote(name, content);
    }

    location.href = "./noteDetails.html?name="+name+"&mode=Edit";
}

async function inNote(name, content){
    await bridge.addNote(name, content);
}
async function edNote(name, content, id){
    await bridge.editNote(name, content, id);
}
