async function getAll(){
    res = await bridge.fetchAll();
    return res;
}
let table = document.getElementById('projectTable');
getAll().then((res) => {
    for (let row of res) {
        table.insertRow();
        let r = table.rows[table.rows.length - 1];
        let cell1 = r.insertCell();
        let cell2 = r.insertCell();
        let cell3 = r.insertCell();
        let cell4 = r.insertCell();
        let cell5 = r.insertCell();
        let cell6 = r.insertCell();
        cell1.innerHTML = row.PName;
        cell2.innerHTML = row.Desc;
        cell3.innerHTML = row.EName;
        cell4.innerHTML = row.Location;
        cell5.innerHTML = row.status;
        cell6.innerHTML = "<button class='RmButton' onclick='DeleteProject()'>X</button>";
    }
});

//remove project from db
function DeleteProject() {
    let table = document.getElementById('projectTable');
    let row = table.rows.length - 1;
    table.deleteRow(row);
    //trigger DB delete
    //refresh table
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