console.log("✅ Content script loaded!");

chrome.runtime.onMessage.addListener((message) => {
    if (message.command === "trigger_autofill") {
        console.log("🔄 Autofill triggered!");
        populateForm();
    }
});

function populateForm() {
    console.log("🔄 Auto-filling form...");
    const formData = {
        "initial_assessment_summary": "Database update",
        "root_cause": "Abno user",
        "resolution_procedure": "Go to SystemOne Shit then fixed it motherfucker",
        "material_used": "Computer ko syempre",
        "remarks": "remarks ko lang to",
    };

    Object.keys(formData).forEach(key => {
        let input = document.querySelector(`#mdlForVerificationTicket input[name='${key}'], #mdlForVerificationTicket textarea[name='${key}']`);
        if (input) {
            input.value = formData[key];
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });

    console.log("✅ Form autofilled!");
}