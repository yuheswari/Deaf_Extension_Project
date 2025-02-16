console.log("📡 Content script loaded!");

if (window.location.hostname.includes("youtube.com")) {
    console.log("🎥 YouTube detected, checking for subtitles...");

    // Example: Detect subtitles (Extend this to fetch real subtitles)
    let captions = document.querySelector("track[kind='captions']");
    if (captions) {
        console.log("✅ Subtitles available!");
    } else {
        console.log("⚠️ No subtitles found.");
    }
}
