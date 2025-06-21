const addContents = async function(contentObject){
    try{
        let url = "http://localhost:8080/content/post";
        let token = await getFromSyncStorage("token");
        token = token.token;
        let response = await fetch(url,{
            method:'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(contentObject)
        });
        if(response.status != 200)  return false;
        response  = await response.json();
        return response.message;
    }catch(e){
        console.log(e)
        return false;
    }
}

function getFromSyncStorage(key) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(key, (result) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve(result);
      });
    });
}

function getFromStorage(key) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key, (result) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve(result);
      });
    });
}
  

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("submit").addEventListener("click", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const content = document.getElementById("text").value;
        const result = await getFromStorage("URL");
        const URL = result.URL;  

        const msg = document.getElementById("msg");
        let res = await addContents({
            forContentId: URL,
            title: title,
            text: content
        });

        if (res) {
            msg.innerHTML = "Successfully added";
        } else {
            msg.innerHTML = "Login through options page";
        }
    });
});

