document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById("submit").addEventListener("click" , async (e)=>{
        e.preventDefault();
        const username = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        const msg = document.getElementById("msg");
    
        msg.innerHTML = "Please wait ... "
        const URL = "http://localhost:8080/login"
    
        try{
            let res = await fetch(URL,{
                headers: {
                    "Content-Type": "application/json"
                },
                method:'POST',
                body : JSON.stringify({
                    username : username,
                    password : password
                })
            })
        
            res = await res.json();
            msg.innerHTML = res.message;
            chrome.storage.sync.set({token:res.token} , ()=>{
                if(chrome.runtime.lastError) msg.innerHTML = "Error";
            });
        }catch(e){
            msg.innerHTML = res.message;
        }
    })
})