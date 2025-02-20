console.log("✅ Content script loaded!");

chrome.runtime.onMessage.addListener((message) => {
    if (message.command === "autofill") {
        console.log(`🔄 Autofill triggered with ${message.option}`);
        chrome.storage.sync.get(["formDataSets"], (result) => {
            const formDataSets = result.formDataSets || {};
            const formData = formDataSets[message.option];

            if (!formData) {
                console.warn("❌ No form data found for:", message.option);
                return;
            }

            populateForm(formData);
        });
    }
});

function populateForm(formData) {
    Object.keys(formData).forEach(key => {
        let input = document.querySelector(`#mdlForVerificationTicket input[name='${key}'], #mdlForVerificationTicket textarea[name='${key}']`);
        if (input) {
            input.value = formData[key];
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });

    console.log("✅ Form autofilled with selected set!");
}
    