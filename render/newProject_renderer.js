async function getEnv(){
    res = await bridge.fetchE();
    return res;
}
let select = document.getElementById('EnvSelect');

getEnv().then((res) => {
    for (let row of res) {
        var element = document.createElement("option");
        element.textContent = row.EName;
        element.value = row.ID; 
        select.appendChild(element);
    }
});
async function create(){
    console.log("create");
    var form = document.getElementById('form');
    var formdata = new FormData(form);
    var formentry = Object.fromEntries(formdata);
    await bridge.insertP(formentry.name, formentry.description, formentry.enviroment, formentry.location, formentry.url, formentry.status);
}
