console.log("✅ Content script loaded!");

chrome.runtime.onMessage.addListener((message) => {
    if (message.command === "autofill") {
        console.log(`🔄 Autofill triggered with ${message.option}`);
        populateForm(message.option);
    }
});

function populateForm(option) {
    const formDataSets = {
        option1: {
            "initial_assessment_summary": "Database update",
            "root_cause": "Abno si PINING!",
            "resolution_procedure": "Go to SystemOne Shit then fixed it motherfucker PINING!",
            "material_used": "Computer ko syempre",
            "remarks": "remarks ko lang to",
        },
        option2: {
            "initial_assessment_summary": "Server Restart",
            "root_cause": "Power outage",
            "resolution_procedure": "Restarted the server and checked logs",
            "material_used": "None",
            "remarks": "Issue resolved after restart",
        }
    };

    const formData = formDataSets[option];
    if (!formData) return;

    Object.keys(formData).forEach(key => {
        let input = document.querySelector(`#mdlForVerificationTicket input[name='${key}'], #mdlForVerificationTicket textarea[name='${key}']`);
        if (input) {
            input.value = formData[key];
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });

    console.log("✅ Form autofilled!");
}