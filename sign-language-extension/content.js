console.log("📡 Content script loaded!");

if (window.location.hostname.includes("youtube.com")) {
    console.log("🎥 YouTube detected, attempting to fetch subtitles...");

    function getSubtitles() {
        let tracks = document.querySelectorAll("track[kind='captions']");
        if (tracks.length > 0) {
            console.log("✅ Subtitles available!");
            let trackUrl = tracks[0].src; // Getting the first subtitle track URL

            fetch(trackUrl)
                .then(response => response.text())
                .then(subtitles => {
                    console.log("📜 Extracted Subtitles:", subtitles);

                    // Send subtitles to background script
                    chrome.runtime.sendMessage({
                        action: "process_subtitles",
                        subtitles: subtitles
                    });
                })
                .catch(error => console.error("❌ Error fetching subtitles:", error));
        } else {
            console.log("⚠️ No subtitles found.");
        }
    }

    // Run the function after a delay to ensure elements load
    setTimeout(getSubtitles, 3000);
}
