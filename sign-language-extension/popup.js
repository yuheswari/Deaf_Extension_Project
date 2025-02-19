document.addEventListener("DOMContentLoaded", function () {
    console.log("📄 Popup loaded!");

    document.getElementById("translateButton").addEventListener("click", function () {
        const videoUrl = document.getElementById("videoUrlInput").value; 

        if (videoUrl) {
            console.log("📤 Sending video URL to background script:", videoUrl);

            chrome.runtime.sendMessage({ action: "translate_video", videoUrl: videoUrl }, (response) => {
                console.log("📥 Response from background:", response);

                const responseElement = document.getElementById("responseMessage");

                if (response && response.success) {
                    responseElement.innerHTML = `👐 <strong>Sign language translation for:</strong><br> 
                    <a href="${videoUrl}" target="_blank">${videoUrl}</a>`;
                    responseElement.style.color = "green";
                } else {
                    responseElement.innerText = "❌ Error: No response received!";
                    responseElement.style.color = "red";
                }
            });
        } else {
            console.log("⚠️ No video URL provided!");
        }
    });

    document.getElementById("loginButton").addEventListener("click", function () {
        console.log("🔑 Requesting authentication...");
        chrome.runtime.sendMessage({ action: "login" });
    });
});
