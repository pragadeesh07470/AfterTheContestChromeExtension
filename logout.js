document.addEventListener("DOMContentLoaded" , ()=>{
    document.getElementById("logout").addEventListener("click" , ()=>{
        const msg = document.getElementById("msg")
        chrome.storage.sync.remove("token" , ()=>{
            if(chrome.runtime.lastError) console.log("SOmething wrong in deleting token");
            else msg.innerHTML =  "Done You're logged out"
        })
    })
})