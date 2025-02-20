document.getElementById("option1").addEventListener("click", () => {
    console.log('option1 is clicked');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { command: "autofill", option: "option1" });
    });
});

document.getElementById("option2").addEventListener("click", () => {
    console.log('option2 is clicked');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { command: "autofill", option: "option2" });
    });
});