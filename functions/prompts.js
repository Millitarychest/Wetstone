async function getRandomIdea() {
    const got = await import('got');
    try{
        const response = await got.got('https://what-to-code.com/api/ideas/random').json();
        return response;
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = {getRandomIdea}
