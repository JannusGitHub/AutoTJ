chrome.commands.onCommand.addListener((command, tab) => {
    // console.log('command ', command);
    // console.log('tab ', tab);
    if (command === "trigger_autofill") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
        }).then(() => {
            console.log("✅ content.js injected!");
            chrome.tabs.sendMessage(tab.id, { command: "trigger_autofill" });
        }).catch((error) => {
            console.error("❌ Failed to inject content.js:", error);
        });
    }
});