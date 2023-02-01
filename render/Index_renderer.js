const dailyN = document.getElementById('dName');
const dailyD = document.getElementById('dDesc');
dailyN.innerText = `Chrome`;
dailyD.innerText = `v${bridge.chrome()}`;
pName.innerText = `Electron`;
pDesc.innerText = `v${bridge.electron()}`;
p1Name.innerText = `Node.js`;
p1Desc.innerText = `v${bridge.node()}`;

const func = async () => {
    const response = await bridge.ping()
    console.log(response) // prints out 'pong'
}
  
func()