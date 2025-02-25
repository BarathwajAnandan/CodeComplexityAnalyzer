(function ()
{
    // Create a container for both buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.style.position = "fixed";
    buttonContainer.style.bottom = "20px";
    buttonContainer.style.right = "20px";
    buttonContainer.style.zIndex = "10000";
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "5px";  // Space between buttons
    
    // Create toggle button (moved from result div)
    const toggleButton = document.createElement("button");
    toggleButton.innerHTML = "−";  // Minus sign
    toggleButton.style.padding = "10px";
    toggleButton.style.border = "none";
    toggleButton.style.backgroundColor = "#f0f0f0";
    toggleButton.style.borderRadius = "4px";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.color = "#666";
    toggleButton.style.width = "40px";
    toggleButton.style.fontSize = "16px";
    toggleButton.style.display = "none";  // Initially hidden

    // Create analyze button
    const analyzeButton = document.createElement("button");
    analyzeButton.textContent = "Analyze Code";
    analyzeButton.style.padding = "10px";
    analyzeButton.style.backgroundColor = "#2cbb5d";  // LeetCode green
    analyzeButton.style.color = "white";
    analyzeButton.style.border = "none";
    analyzeButton.style.borderRadius = "4px";
    analyzeButton.style.cursor = "pointer";

    // Add buttons to container
    buttonContainer.appendChild(toggleButton);
    buttonContainer.appendChild(analyzeButton);
    document.body.appendChild(buttonContainer);

    // Create a result div with better styling
    const resultDiv = document.createElement("div");
    resultDiv.style.position = "fixed";
    resultDiv.style.bottom = "60px";
    resultDiv.style.right = "20px";
    resultDiv.style.padding = "15px";
    resultDiv.style.background = "white";
    resultDiv.style.border = "1px solid #e8e8e8";
    resultDiv.style.borderRadius = "8px";
    resultDiv.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
    resultDiv.style.zIndex = "10000";
    resultDiv.style.display = "none";
    resultDiv.style.width = "300px";
    resultDiv.style.maxHeight = "400px";
    resultDiv.style.overflowY = "auto";
    document.body.appendChild(resultDiv);

    let isMinimized = false;

    // Toggle minimize/maximize
    toggleButton.addEventListener("click", () => {
        if (isMinimized) {
            resultDiv.style.display = "block";
            toggleButton.innerHTML = "−";  // Minus sign
        } else {
            resultDiv.style.display = "none";
            toggleButton.innerHTML = "+";  // Plus sign
        }
        isMinimized = !isMinimized;
    });

    // Add hover effects
    toggleButton.addEventListener('mouseover', () => {
        toggleButton.style.backgroundColor = "#e0e0e0";
    });
    toggleButton.addEventListener('mouseout', () => {
        toggleButton.style.backgroundColor = "#f0f0f0";
    });

    // Add retry functionality
    async function analyzeWithRetry(code, maxRetries = 2) 
    {
        let retryCount = 0;
        
        async function attempt() 
        {
            return new Promise((resolve) => {
                chrome.runtime.sendMessage({ code: code }, resolve);
            });
        }

        while (retryCount <= maxRetries) 
        {
            try 
            {
                if (retryCount > 0) 
                {
                    resultDiv.innerHTML = `
                        <div style="margin-bottom: 10px; font-weight: bold;">Retrying analysis... (Attempt ${retryCount + 1}/${maxRetries + 1})</div>
                        <div style="color: #666;">Please wait...</div>
                    `;
                }

                const response = await attempt();
                console.log(`Attempt ${retryCount + 1} response:`, response.result);
                
                const jsonResponse = JSON.parse(response.result);
                if (jsonResponse.choices && jsonResponse.choices[0]) 
                {
                    const analysisText = jsonResponse.choices[0].message.content;
                    const analysis = JSON.parse(analysisText);
                    
                    // If we get here, parsing succeeded
                    resultDiv.innerHTML = `
                        <div style="font-family: monospace; line-height: 1.5;">
                            <div style="margin-bottom: 15px;">
                                <span style="color: #2cbb5d; font-weight: bold;">Time Complexity: </span>
                                <span style="font-size: 16px; color: #1a1a1a; font-weight: bold;">${analysis.complexity.time || 'Not specified'}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <span style="color: #2cbb5d; font-weight: bold;">Space Complexity: </span>
                                <span style="font-size: 16px; color: #1a1a1a; font-weight: bold;">${analysis.complexity.space || 'Not specified'}</span>
                            </div>
                            <div style="border-top: 1px solid #e8e8e8; padding-top: 10px; margin-top: 10px;">
                                <span style="color: #666;">Explanation:</span>
                                <div style="margin-top: 5px; color: #1a1a1a;">
                                    ${analysis.explanation || 'No explanation provided'}
                                </div>
                            </div>
                        </div>
                    `;
                    return; // Success, exit retry loop
                } 
                else 
                {
                    throw new Error("Unexpected response format");
                }
            } 
            catch (e) 
            {
                console.error(`Attempt ${retryCount + 1} failed:`, e);
                retryCount++;
                
                if (retryCount > maxRetries) 
                {
                    resultDiv.innerHTML = `
                        <div style="color: #ff4444; margin-bottom: 10px;">
                            Analysis failed after ${maxRetries + 1} attempts
                        </div>
                        <div style="color: #666; font-size: 12px;">
                            Last error: ${e.message}
                            ${e.details ? `
                                <div style="margin-top: 8px; padding: 8px; background: #f5f5f5; border-radius: 4px; white-space: pre-wrap;">
                                    ${e.details.response ? `Response: ${e.details.response}` : ''}
                                    ${e.details.type ? `Error type: ${e.details.type}` : ''}
                                    ${e.details.message ? `Details: ${e.details.message}` : ''}
                                </div>
                            ` : ''}
                        </div>
                    `;
                }
                else 
                {
                    resultDiv.innerHTML = `
                        <div style="margin-bottom: 10px; font-weight: bold;">
                            Retrying analysis... (Attempt ${retryCount + 1}/${maxRetries + 1})
                        </div>
                        <div style="color: #666;">
                            Previous attempt failed: ${e.message}
                            ${e.details ? `
                                <div style="margin-top: 8px; font-size: 12px; color: #ff4444;">
                                    ${e.details.message || e.details.type || ''}
                                </div>
                            ` : ''}
                        </div>
                    `;
                    // Wait 1 second before retrying
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        }
    }

    // Update click handler to use retry mechanism
    analyzeButton.addEventListener("click", async function ()
    {
        const editorElement = document.querySelector('.monaco-editor');
        if (!editorElement) 
        {
            alert("Could not find code editor. Please make sure you're on a LeetCode problem page.");
            return;
        }

        let code = '';
        const codeLines = editorElement.querySelectorAll('.view-line');
        if (codeLines.length > 0) 
        {
            code = Array.from(codeLines).map(line => line.textContent).join('\n');
        }

        if (!code) 
        {
            alert("No code found in editor. Please write some code first.");
            return;
        }

        resultDiv.style.display = "block";
        toggleButton.style.display = "block";
        isMinimized = false;
        toggleButton.innerHTML = "−";

        resultDiv.innerHTML = `
            <div style="margin-bottom: 10px; font-weight: bold;">Analyzing code...</div>
            <div style="color: #666;">Please wait while we analyze the complexity...</div>
        `;

        await analyzeWithRetry(code);
    });
})(); 