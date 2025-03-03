document.addEventListener("DOMContentLoaded", () => {
    loadFormSets(); 

    document.getElementById("saveFormSet").addEventListener("click", saveFormSet);
    document.getElementById("applyFormSet").addEventListener("click", applySelectedSet);
});

function loadFormSets() {
    chrome.storage.sync.get(["formDataSets"], (result) => {
        const formDataSets = result.formDataSets || {};
        const formSetDropdown = document.getElementById("formSetDropdown");
        const formSetsList = document.getElementById("formSetsList");

        formSetDropdown.innerHTML = "";
        formSetsList.innerHTML = "";

        Object.keys(formDataSets).forEach(title => {
            // Populate dropdown
            const option = document.createElement("option");
            option.value = title;
            option.textContent = title;
            formSetDropdown.appendChild(option);

            // Display in list with delete button
            const div = document.createElement("div");
            div.className = "option d-flex justify-content-between align-items-center border border-success p-2 mb-2";
            div.innerHTML = `
                <span>${title}</span>
                <span class="delete" data-key="${title}">Delete</span>
            `;
            div.querySelector(".delete").addEventListener("click", () => deleteFormSet(title));

            formSetsList.appendChild(div);
        });
    });
}

function saveFormSet() {
    const formSetTitle = document.getElementById("formSetTitle").value.trim();
    const formDataJson = document.getElementById("formDataJson").value.trim();

    if (!formSetTitle || !formDataJson) {
        alert("Please enter a valid form title and JSON datas.");
        return;
    }

    let formData;
    try {
        formData = JSON.parse(formDataJson);
    } catch (e) {
        alert("Invalid JSON format.");
        return;
    }

    chrome.storage.sync.get(["formDataSets"], (result) => {
        const formDataSets = result.formDataSets || {};
        formDataSets[formSetTitle] = formData; // Store form under title

        chrome.storage.sync.set({ formDataSets }, () => {
            loadFormSets();
            document.getElementById("formSetTitle").value = "";
            document.getElementById("formDataJson").value = "";
            alert("Form Data Saved!");
        });
    });
}

function deleteFormSet(title) {
    chrome.storage.sync.get(["formDataSets"], (result) => {
        const formDataSets = result.formDataSets || {};
        delete formDataSets[title];

        chrome.storage.sync.set({ formDataSets }, () => {
            loadFormSets();
            alert("Form Data Deleted!");
        });
    });
}

function applySelectedSet() {
    const selectedTitle = document.getElementById("formSetDropdown").value;

    if (!selectedTitle) {
        alert("Please select a form data set.");
        return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { command: "autofill", option: selectedTitle });
    });
}