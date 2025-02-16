chrome.runtime.onInstalled.addListener(() => {
    console.log("🚀 Extension Installed.");
});

function authenticate() {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
        if (chrome.runtime.lastError) {
            console.error("❌ Auth Error:", chrome.runtime.lastError);
        } else {
            console.log("🔑 OAuth Token:", token);
            fetchUserInfo(token);
        }
    });
}

function fetchUserInfo(token) {
    fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => console.log("👤 User Info:", data))
    .catch(error => console.error("⚠️ Error fetching user info:", error));
}

// Handle authentication & translation requests from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "login") {
        authenticate();
    } else if (request.action === "translate_video") {
        console.log("📥 Received video URL:", request.videoUrl);

        // Placeholder: Process the video URL (Implement AI translation here)
        let fakeTranslation = "👐 Sign language translation for: " + request.videoUrl;
        
        sendResponse({ success: true, message: fakeTranslation });
    }
});
