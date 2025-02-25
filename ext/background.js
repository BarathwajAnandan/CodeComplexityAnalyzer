chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>
{
    if (!message.code) 
    {
        console.error("No code received in message");
        sendResponse({ error: "No code provided" });
        return true;
    }

    // Get API key, endpoint and model from storage
    chrome.storage.sync.get(['apiKey', 'apiEndpoint', 'model'], function(items) 
    {
        const API_KEY = items.apiKey;
        const BASE_URL = items.apiEndpoint || "https://api.sambanova.ai/v1";
        const MODEL = items.model || "Meta-Llama-3.1-8B-Instruct";  // fallback model
        
        if (!API_KEY) 
        {
            console.error("No API key found in storage");
            sendResponse({ error: "Please set your API key in the extension options" });
            return;
        }

        console.log("Background: Using API endpoint:", BASE_URL);
        console.log("Background: Using model:", MODEL);
        console.log("Background: Received code to analyze");

        fetch(`${BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    {
                        role: "user",
                        content: `As an algorithm complexity analyzer, analyze the following code and provide the analysis in JSON format.

Important guidelines:
- Be precise with nested loops, recursion, and hash table operations
- Consider amortized complexity where applicable
- For hash tables, mention if you're assuming average case O(1) operations
- For space complexity, calculate auxiliary space used by the algorithm, not including input size

Code to analyze:
${message.code}

- Only return the JSON response, nothing else
Format your response EXACTLY as this JSON structure:
{
    "complexity": {
        "time": "O(n)",
        "space": "O(1)"
    },
    "explanation": "Brief technical explanation of why these complexities are accurate"
}

if code is incomplete, return this JSON structure:
{
    "complexity": {
        "time": "None",
        "space": "None"
    },
    "explanation": "Code is incomplete"
}

`
                    }
                ]
            })
        })
        .then(async response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
            }
            const text = await response.text();
            console.log('Raw Response:', text);
            
            try {
                // Try parsing the response to verify it's valid JSON
                JSON.parse(text);
                sendResponse({ result: text });
            } catch (parseError) {
                sendResponse({ 
                    error: "Invalid JSON response", 
                    details: {
                        message: parseError.message,
                        response: text
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            sendResponse({ 
                error: error.message,
                details: {
                    type: error.name,
                    stack: error.stack
                }
            });
        });
    });

    return true;
}); 