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
        console.log("🔑 Login requested...");
        authenticate();
        sendResponse({ success: true, message: "Login initiated." });

    } else if (request.action === "translate_video") {
        console.log("📥 Received video URL:", request.videoUrl);

        if (!request.videoUrl) {
            console.error("⚠️ No video URL provided!");
            sendResponse({ success: false, message: "No video URL provided!" });
            return;
        }

        // Simulated translation process (Replace with actual AI translation logic)
        let fakeTranslation = `👐 Sign language translation available for: ${request.videoUrl}`;

        // Send structured response
        sendResponse({ success: true, message: fakeTranslation, url: request.videoUrl });

        console.log("✅ Translation response sent.");
    }
});
