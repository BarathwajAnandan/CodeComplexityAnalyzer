# LeetCode Complexity Analyzer

## Overview
Ever struggled to grasp the time and space complexity of your code? The LeetCode Complexity Analyzer is here to change that.

The **LeetCode Complexity Analyzer** is a Chrome extension designed to help developers and programmers understand the time and space complexity of their code solutions on LeetCode and NeetCode. This extension automatically analyzes your code submissions, providing instant feedback to enhance your understanding of algorithm efficiency.

## Demo

Check out the extension in action: [YouTube Demo](https://www.youtube.com/watch?v=SMwNzgm5uH8&ab_channel=BarathwajAnandan)

## Key Features

*   **Instant Complexity Analysis:** Get real-time insights into the time and space complexity of your code as you write.
*   **Seamless Integration:** Easily accessible "Analyze Code" button integrated into the LeetCode and NeetCode interfaces.
*   **Detailed Explanations:** Receive clear explanations of the complexity analysis, helping you learn and improve your coding skills.
*   **Multi-Language Support:** Analyze code written in various programming languages supported by LeetCode and NeetCode.
*   **Powered by Sambanova Systems API (Free):** Leverages a powerful API for accurate and reliable complexity analysis.


## LeetCode Complexity Analyzer - Chrome Extension (Coming Soon!) - If you don't want to wait, go ahead and install it using the instructions below!

This extension will soon be published in the Google Chrome Web Store! Stay tuned for updates. It helps you analyze the time and space complexity of your LeetCode and NeetCode solutions directly within your browser.


## Manual Installation

1.  **Download the Extension:** Download the extension files from [https://github.com/BarathwajAnandan/CodeComplexityAnalyzer.git](https://github.com/BarathwajAnandan/CodeComplexityAnalyzer.git) or 
2. git clone https://github.com/BarathwajAnandan/CodeComplexityAnalyzer.git
3.  **Open Chrome Extensions Page:** In Chrome, navigate to `chrome://extensions`.
4.  **Enable Developer Mode:** Toggle the "Developer mode" switch in the top right corner of the page.
5.  **Load Unpacked:** Click the "Load unpacked" button and select the directory where you extracted the extension files.
6.  **Install the Extension:** The LeetCode Complexity Analyzer extension should now be installed in your Chrome browser.

## Setup

1.  **Get Your Sambanova API Key:**
    *   Visit [https://cloud.sambanova.ai/apis](https://cloud.sambanova.ai/apis) to create an account and obtain your API key.
    *   Sambanova offers a free $5 credit upon signup, which is typically sufficient for extensive use. Every call to the API costs less than 0.001 credit.
2.  **Enter Your API Key:**
    *   Right-click on the extension icon in the Chrome toolbar.
    *   Select "Options" or "Open Settings".
    *   Paste your Sambanova API key into the provided field.
    *   Click "Save" or "Apply" to save your settings.
    * Feel free to experiment with other models but the default one is optimal.

## Usage

1.  **Navigate to LeetCode or NeetCode:** Go to a LeetCode or NeetCode problem page with a code editor.
2.  **Write Your Code:** Write your code solution in the online code editor.
3.  **Analyze Your Code:** Click the "Analyze Code" yellow button located near the "Submit" button.
4.  **View the Results:** The extension will display the time and space complexity analysis results directly on the page, along with a brief explanation.

## Troubleshooting

*   **Extension Not Working:**
    *   Make sure you have correctly installed the extension and enabled it in Chrome.
    *   Verify that you have entered a valid Sambanova API key in the extension settings.
    *   Ensure that you are on a LeetCode or NeetCode problem page with a code editor.
    *   Check the Chrome Developer Console (right-click on the page, select "Inspect", and go to the "Console" tab) for any error messages.
*   **Incorrect Complexity Analysis:**
    *   The complexity analysis is performed by the Sambanova API, so occasional inaccuracies may occur.
    *   Ensure that your code is valid and complete before analyzing.
    *   If you encounter persistent issues, please report them so I can fix it for you!

## Permissions

The LeetCode Complexity Analyzer extension requires the following permissions:

*   **`activeTab`:** Grants temporary access to the currently active tab when the user clicks the "Analyze Code" button.
*   **`storage`:** Allows the extension to store the user's Sambanova API key locally.
*   **`scripting`:** Enables the extension to inject content scripts and interact with LeetCode and NeetCode web pages.
*   **`https://leetcode.com/*` and `https://neetcode.io/*`:** Host permissions for accessing LeetCode and NeetCode problem pages.

## Privacy

*   This extension uses the Sambanova Systems API to analyze code complexity.
*   User code snippets are sent to Sambanova's servers for analysis.
*   The extension stores the Sambanova API key locally in the browser's storage.
*   The extension developers do not collect any other personal user data.
*   Please refer to the Sambanova Systems privacy policy for details on their data handling practices


## Contributing

If you would like to contribute to the development of the LeetCode Complexity Analyzer extension, please follow these steps:

1.  Fork the repository on GitHub.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, descriptive commit messages.
4.  Submit a pull request to the main branch.

# Star this project! ⭐

If you found this extension helpful, please consider starring the project. It helps to show your support and makes the project more visible to others!

## Acknowledgements

*   Powered by the Sambanova Systems API.
*   Thanks to LeetCode and NeetCode for providing excellent platforms for practicing coding skills.
