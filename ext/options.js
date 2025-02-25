document.addEventListener("DOMContentLoaded", function ()
{
    var apiKeyInput = document.getElementById("apiKey");
    var apiEndpointInput = document.getElementById("apiEndpoint");
    var modelInput = document.getElementById("model");
    var saveButton = document.getElementById("save");

    // Load saved settings
    chrome.storage.sync.get(["apiKey", "apiEndpoint", "model"], function (items)
    {
        apiKeyInput.value = items.apiKey || "";
        apiEndpointInput.value = items.apiEndpoint || "https://api.sambanova.ai/v1";
        modelInput.value = items.model || "Qwen2.5-Coder-32B-Instruct";
    });

    // Save settings on click
    saveButton.addEventListener("click", function ()
    {
        chrome.storage.sync.set(
        {
            apiKey: apiKeyInput.value,
            apiEndpoint: apiEndpointInput.value,
            model: modelInput.value
        },
        function ()
        {
            alert("Options saved.");
        });
    });
}); 