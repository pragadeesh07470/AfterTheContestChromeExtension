document.addEventListener("DOMContentLoaded" , ()=>{
    document.getElementById("submit").addEventListener("click" , async (e) => {
        e.preventDefault();

        const username = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const msg = document.getElementById("msg");
        const URL = "http://localhost:8080/register"
        msg.innerHTML = "Please Wait ... "

        try{
            let res = await fetch(URL , {
                headers : {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({
                    username , email , password
                }),
                method : 'POST'
            })
    
            res = await res.json();
            msg.innerHTML = res.message;
        }catch(e){
            if(e.message) msg.innerHTML = e.message;
            else msg.innerHTML = "Error occurred"
        }
    })
})