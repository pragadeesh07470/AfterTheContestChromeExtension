const getContents = async function(problemId){
    try{
        let url = `http://localhost:8080/content/get?forContentId=${problemId}`
        const response = await fetch(url);
        const object = await response.json();
        return object;
    }catch(e){
        return e;
    }
}


const handleLoad = function() {
    const nameElement = document.getElementById("problem_name");
    const problemIdElement = document.getElementById("problem_id");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "fetchProblemName" }, (response) => {
            nameElement.innerHTML = response.problemName;
        });
    });


    chrome.tabs.query({active : true , currentWindow: true} , (tabs) =>{
        chrome.tabs.sendMessage(tabs[0].id , {action : "fetchProblemId"} , async (response) =>{
            let URL = response.URL;
            chrome.storage.local.set({URL:URL});
            problemIdElement.innerHTML = URL;
            const solutions = await getContents(URL);
            const div = document.getElementById("solutions");
            if(solutions.length == 0){
                const p = document.createElement("p");
                p.innerHTML = "There are no solutions for this problem"
                div.appendChild(p);
            }else{
                for(let i= 0; i< solutions.length ; i++){
                    const sol = document.createElement("div");
                    const h3 = document.createElement("h3");
                    h3.innerText = solutions[i].title;
                    const by = document.createElement("p");
                    by.innerText = "By " + solutions[i].username;
                    const text = document.createElement("p");
                    text.innerText = solutions[i].text;

                    sol.appendChild(h3);
                    sol.appendChild(by);
                    sol.appendChild(text);
                    div.appendChild(sol);
                }
            }
        })
    })
    
}

document.addEventListener("DOMContentLoaded", handleLoad);

