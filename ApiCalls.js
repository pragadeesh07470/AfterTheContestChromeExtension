export const getContents = async function(problemId){
    try{
        const response = await fetch("http://localhost:8080/content/get?id="+problemId);
        const object = await response.json();
        return object.body;
    }catch(e){
        return e;
    }
}
