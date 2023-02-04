async function pullidea(){
    return await bridge.getRandomIdea();
}
function populate(){
    pullidea().then((idea) => {
        var name = document.getElementById("name");
        var description = document.getElementById("desc");
        name.value = idea.title;
        if(!idea.description){
            description.value = "No description provided";
        }
        else{
            description.value = idea.description;
        }
    });
}
async function add(name, desc){
    await bridge.insertIdea(name, desc);
}
function savePrompt(){
    var name = document.getElementById("name").value;
    var description = document.getElementById("desc").value;
    var Cleanedname = name.replace("'", "").replace('"', "");
    Cleaneddescription = description.replace("'", "").replace('"', "");
    add(Cleanedname, Cleaneddescription);
}