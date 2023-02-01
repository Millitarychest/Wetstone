async function getValues(){
    res = await bridge.fetchPreview();
    return res;
}

getValues().then((res) => {
    if(res.length >= 1){
        dName.innerText = res[0].PName;
        dDesc.innerText = res[0].Desc;
    }
    if(res.length >= 2){
        pName.innerText = `Electron`;
        pDesc.innerText = `v${bridge.electron()}`;
    }
    if(res.length >= 3){
        p1Name.innerText = `Node.js`;
        p1Desc.innerText = `v${bridge.node()}`;
    }
});