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