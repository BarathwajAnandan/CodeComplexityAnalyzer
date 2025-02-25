document.addEventListener('DOMContentLoaded', function() 
{
    // Check if we're on LeetCode
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
    {
        const statusDiv = document.getElementById('status');
        const currentUrl = tabs[0].url;
        
        if (currentUrl.includes('leetcode.com/problems/') || currentUrl.includes('neetcode.io/problems/')) 
        {
            statusDiv.className = 'status active';
            statusDiv.textContent = '✓ Ready to analyze! Look for the "Analyze Complexity" button on the page.';
        }
        else 
        {
            statusDiv.className = 'status inactive';
            statusDiv.textContent = '× Please navigate to a LeetCode problem page to use this extension.';
        }
    });

    // Setup options button
    document.getElementById('openOptions').addEventListener('click', function() 
    {
        chrome.runtime.openOptionsPage();
    });
}); 