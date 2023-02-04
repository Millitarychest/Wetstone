

async function getAll(){
    res = await bridge.fetchAll();
    return res;
}

getAll().then((res) => {
    for (let row of res) {
      let table = document.getElementById('projectTable');
      table.insertRow();
      let r = table.rows[table.rows.length - 1];
      let cell1 = r.insertCell();
      let cell2 = r.insertCell();
      let cell3 = r.insertCell();
      let cell4 = r.insertCell();
      let cell5 = r.insertCell();
      let cell6 = r.insertCell();
      cell1.innerHTML = "<u><b onclick='viewDetails(event)'>"+row.PName+"</b></u>";
      cell2.innerHTML = row.Desc;
      cell3.innerHTML = row.EName;
      cell4.innerHTML = row.Location;
      cell5.innerHTML = row.status;
      cell6.innerHTML = "<button class='RmButton' onclick='DeleteProject(event)' pnr='"+row.PNr+"'>&#128465</button><button class='startButton' onclick='startProject(event)' pnr='"+row.PNr+"'>&#9654</button><button class='pullButton' onclick='cloneProject(event)' pnr='"+row.PNr+"'>&#8659</button>";
    }
});
async function resolveName(name){
  return await bridge.fetchByName(name);
}
async function execProject(path, command){
  return await bridge.execProject(path, command);
}

function startProject(e) {
    button = e.target;
    pnr = button.getAttribute("pnr");
    
    //get start command
    //get location
    //execute command at location if location is not null
    
    resolveName(button.parentNode.parentNode.cells[0].innerText).then((res) => {
        if(res[0].Location != null){
          let com = res[0].Command.replace("<%Name%>",res[0].PName);
          execProject(res[0].Location, com);
        }
    });

}

async function pull(path, url){
  return await bridge.cloneProject(path, url);
}

function cloneProject(e){
  button = e.target;
  pnr = button.getAttribute("pnr");

  resolveName(button.parentNode.parentNode.cells[0].innerText).then((res) => {
      if(res[0].Location != null && res[0].Location != ""){
        //alert Project already exists on local
      
      }
      else{
        //prompt for location
        //clone to location
        //update location in db
        prompt("Where should the Project be cloned to?").then((resp) => {
          if(resp != null && resp != ""){
            pull(resp, res[0].Url).then((stat) => {
              alert(stat);
            }).catch((err) => {
              alert(err);
            });
          }
        });
        //pullProject();
      }
  });    

}
async function prompt(label){
  return await bridge.promptForLocation(label);
}

function viewDetails (event) {
  location.href = "../project-view/projectDetails.html?name="+event.target.innerHTML;
}

//remove project from db
function DeleteProject(e) {
    button = e.target;
    pnr = button.getAttribute("pnr");
    //trigger DB delete
    //refresh table
    killProject(pnr);
    location.href = "../project-view/project.html";
}
async function killProject(nr){
  await bridge.deleteProject(nr);
}


//function for Search
function search() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchIn");
    filter = input.value.toUpperCase();
    table = document.getElementById("projectTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

//sort table
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("projectTable");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}