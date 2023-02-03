async function getValues(){
    res = await bridge.fetchPreview();
    return res;
}
async function getN(){
    res = await bridge.fetchNotes();
    return res;
}

getValues().then((res) => {
    if(res.length >= 1){
        dName.innerText = res[0].PName;
        dDesc.innerText = res[0].Desc;
    }
    if(res.length >= 2){
        pName.innerText = res[1].PName;
        pDesc.innerText = res[1].Desc;
    }
    if(res.length >= 3){
        p1Name.innerText = res[2].PName;
        p1Desc.innerText = res[2].Desc;
    }
    if(res.length >= 4){
        p2Name.innerText = res[3].PName;
        p2Desc.innerText = res[3].Desc;
    }
});

getN().then((res) => {
    let table = document.getElementById('notetable');
    table.insertRow();
    let ro = table.rows[table.rows.length - 1];
    let cell = ro.insertCell();
    cell.innerHTML = "<u><b onclick='makeNote(event)'style='color:#ffffff'>New Note</b><u>";
    for (let row of res) {
      
      table.insertRow();
      let r = table.rows[table.rows.length - 1];
      let cell1 = r.insertCell();
      cell1.innerHTML = "<u><b onclick='viewNote(event)'>"+row.Title+"</b></u>";
    }
    
});

function viewNote (event) {
  location.href = "./note-view/noteDetails.html?name="+event.target.innerHTML+"&mode=Edit";
}
function makeNote (event) {
    location.href = "./note-view/noteDetails.html?name="+event.target.innerHTML+"&mode=New";
}