async function getN(){
    res = await bridge.fetchNotes();
    return res;
}

getN().then((res) => {
    let table = document.getElementById('notetable');
    table.insertRow();
    for (let row of res) {
      
      table.insertRow();
      let r = table.rows[table.rows.length - 1];
      let cell1 = r.insertCell();
      cell1.innerHTML = "<u><b onclick='viewNote(event)' style='height: 10px;'>"+row.Title+"</b></u>";
      let cell2 = r.insertCell();
      cell2.innerHTML = "<button class='RmButton' onclick='DeleteNote(event)' pnr='"+row.NNr+"'>X</button>";
    }
    
});

function viewNote (event) {
    location.href = "noteDetails.html?name="+event.target.innerHTML+"&mode=Edit";
  }
function makeNote (event) {
    location.href = "noteDetails.html?name=NewNote&mode=New";
}

function DeleteNote(e) {
  button = e.target;
  pnr = button.getAttribute("pnr");
  //trigger DB delete
  //refresh table
  killNote(pnr);
  location.href = "../note-view/notes.html";
}
async function killNote(nr){
await bridge.deleteNote(nr);
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