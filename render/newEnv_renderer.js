async function create(){
    console.log("create");
    var form = document.getElementById('form');
    var formdata = new FormData(form);
    var formentry = Object.fromEntries(formdata);
    await bridge.insertE(formentry.name, formentry.com);
}