chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received in content script:", request);
  
    if (request.action === "fetchProblemName") {
      const problemNameElement = document.querySelector(".problem-statement .header .title");
      const problemName = problemNameElement ? problemNameElement.innerText.trim() : "Not Found"; 
      sendResponse({ problemName });
    } 

    if(request.action === "fetchProblemId") {
        const URL = window.location.href;
        sendResponse({URL})
    }

    if(chrome.runtime.lastError)
        sendResponse(null);
    return false;
});
  