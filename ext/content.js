(function ()
{
    // Function to find the Run button or other UI elements and position our buttons next to it
    function positionButtons()
    {
        // First try to find the Run button with id
        const runButton = document.querySelector('#run-button');
        
        // If Run button is found, position next to it
        if (runButton) 
        {
            return positionNextToElement(runButton, true); // true = insert before
        }
        
        // Try to find the Submit button
        const submitButton = document.querySelector('span.text-sm.font-medium');
        
        // If Submit button is found, position next to its parent button
        if (submitButton && submitButton.textContent.trim() === 'Submit') 
        {
            // Find the parent button that contains the Submit text
            let parentButton = submitButton;
            // Go up the DOM tree to find the button element
            while (parentButton && parentButton.tagName !== 'BUTTON' && parentButton.parentElement) 
            {
                parentButton = parentButton.parentElement;
            }
            
            if (parentButton && parentButton.tagName === 'BUTTON') 
            {
                return positionNextToElement(parentButton, false); // false = insert after (to the right)
            }
        }
        
        // Try to find the play icon SVG
        const playIcon = document.querySelector('svg.fa-play');
        
        // If play icon is found, position next to its parent button
        if (playIcon) 
        {
            // Find the parent button that contains the play icon
            let parentButton = playIcon;
            // Go up the DOM tree to find the button element
            while (parentButton && parentButton.tagName !== 'BUTTON' && parentButton.parentElement) 
            {
                parentButton = parentButton.parentElement;
            }
            
            if (parentButton && parentButton.tagName === 'BUTTON') 
            {
                return positionNextToElement(parentButton, false); // false = insert after
            }
        }
        
        // If Run button not found, try to find the sticky note SVG as fallback
        const stickyNoteSvg = document.querySelector('svg.fa-note-sticky');
        
        // If sticky note SVG is found, position next to it
        if (stickyNoteSvg) 
        {
            // Find a suitable parent element to insert our buttons
            let targetElement = stickyNoteSvg;
            // Go up to find a suitable container (often 2-3 levels up from the SVG)
            for (let i = 0; i < 3 && targetElement.parentElement; i++) 
            {
                targetElement = targetElement.parentElement;
            }
            
            return positionNextToElement(targetElement, false); // false = insert after
        }
        
        return false; // No suitable elements found
    }
    
    // Function to position buttons next to a target element
    function positionNextToElement(targetElement, insertBefore)
    {
        // Create a container for both buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.style.display = "inline-flex";
        buttonContainer.style.gap = "5px";  // Space between buttons
        buttonContainer.style.marginRight = "10px";
        buttonContainer.style.marginLeft = "10px";
        buttonContainer.style.zIndex = "10000";
        buttonContainer.style.verticalAlign = "middle";
        buttonContainer.style.alignItems = "center";  // Center items vertically
        buttonContainer.style.height = "100%";        // Match height of parent
        
        // Check if this is a button with the Submit text
        const isSubmitButton = targetElement.querySelector('span.text-sm.font-medium') !== null;
        
        // Check if this is a button with a play icon (uncomment and fix)
        const hasPlayIcon = targetElement.querySelector('svg.fa-play') !== null;
        
        console.log("isSubmitButton", isSubmitButton, "hasPlayIcon", hasPlayIcon);
        
        // Apply styling for modern UI buttons (both Submit and Run)
        if (isSubmitButton || hasPlayIcon) {
            buttonContainer.style.display = "inline-flex";
            buttonContainer.style.alignItems = "center";
            buttonContainer.style.verticalAlign = "middle";
            buttonContainer.style.margin = "5px 5px";
            // Add some negative margin-top to move it up slightly
            buttonContainer.style.marginTop = "-2px";
        }
        
        // Create toggle button (moved from result div)
        const toggleButton = document.createElement("button");
        toggleButton.innerHTML = "−";  // Minus sign
        toggleButton.style.padding = "5px 10px";
        toggleButton.style.border = "none";
        toggleButton.style.backgroundColor = "#f0f0f0";
        toggleButton.style.borderRadius = "4px";
        toggleButton.style.cursor = "pointer";
        toggleButton.style.color = "#666";
        toggleButton.style.width = "40px";
        toggleButton.style.fontSize = "16px";
        toggleButton.style.display = "none";  // Initially hidden
        toggleButton.style.height = "2rem";  // Match Run button height

        // Create analyze button
        const analyzeButton = document.createElement("button");
        analyzeButton.textContent = "Analyze Code";
        analyzeButton.style.padding = "5px 10px";
        // Make button yellow in all cases
        analyzeButton.style.backgroundColor = "#f7df1e";  // Sticky note yellow
        analyzeButton.style.color = "black";  // Better contrast with yellow
        analyzeButton.style.border = "1px solid #e6d000";  // Slight border for definition
        analyzeButton.style.borderRadius = "4px";
        analyzeButton.style.cursor = "pointer";
        
        // Adjust button styling based on which element we're next to
        if (isSubmitButton || hasPlayIcon) {
            // Match the modern button styling
            analyzeButton.style.height = "32px";
            analyzeButton.style.fontSize = "14px";
            analyzeButton.style.fontWeight = "500";
            analyzeButton.style.display = "inline-flex";
            analyzeButton.style.alignItems = "center";
            analyzeButton.style.justifyContent = "center";
            analyzeButton.style.verticalAlign = "middle";
        } else {
            // Default styling for other placements
            analyzeButton.style.height = "2rem";
            analyzeButton.style.fontSize = "15px";
        }

        // Add buttons to container
        buttonContainer.appendChild(toggleButton);
        buttonContainer.appendChild(analyzeButton);
        
        // Insert our button container relative to the target element
        if (insertBefore) 
        {
            targetElement.parentNode.insertBefore(buttonContainer, targetElement);
        } 
        else 
        {
            if (targetElement.nextSibling) 
            {
                targetElement.parentNode.insertBefore(buttonContainer, targetElement.nextSibling);
            } 
            else 
            {
                targetElement.parentNode.appendChild(buttonContainer);
            }
        }
        
        // Create a result div with better styling
        const resultDiv = document.createElement("div");
        resultDiv.style.position = "fixed";
        resultDiv.style.bottom = "60px";
        resultDiv.style.left = "50%";
        resultDiv.style.transform = "translateX(-50%)";
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
        toggleButton.addEventListener("click", () => 
        {
            if (isMinimized) 
            {
                resultDiv.style.display = "block";
                toggleButton.innerHTML = "−";  // Minus sign
            } 
            else 
            {
                resultDiv.style.display = "none";
                toggleButton.innerHTML = "+";  // Plus sign
            }
            isMinimized = !isMinimized;
        });

        // Add hover effects
        toggleButton.addEventListener('mouseover', () => 
        {
            toggleButton.style.backgroundColor = "#e0e0e0";
        });
        toggleButton.addEventListener('mouseout', () => 
        {
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
        
        return true; // Successfully positioned
    }
    
    // Try to position buttons immediately
    if (!positionButtons()) 
    {
        // If elements aren't found immediately, try again after a short delay
        // to allow for dynamic page loading
        setTimeout(() => 
        {
            if (!positionButtons()) 
            {
                console.log("Could not find suitable elements to position Analyze button");
                // Fall back to the original fixed position if we can't find suitable elements
                // Create a container for both buttons
                const buttonContainer = document.createElement("div");
                buttonContainer.style.position = "fixed";
                buttonContainer.style.bottom = "20px";
                buttonContainer.style.left = "50%";
                buttonContainer.style.transform = "translateX(-50%)";
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
                analyzeButton.style.backgroundColor = "#f7df1e";  // Sticky note yellow
                analyzeButton.style.color = "black";
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
                resultDiv.style.left = "50%";
                resultDiv.style.transform = "translateX(-50%)";
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
            }
        }, 2000);
    }
})(); 