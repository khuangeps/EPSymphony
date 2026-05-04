let osmd;
let currentMeasure = 1;

async function loadScore() {
    const container = document.getElementById("score-container");

    osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay(container, {
        autoResize: true,
        backend: "svg"
    });

    await osmd.load("../static/music/MozartPianoSonata.mxl");
    osmd.render();
}

function startPolling() {
    console.log("Start button clicked");
}

loadScore();
async function analyze() {
    const res = await fetch("/analyze", { method: "POST", body: formData });
    const data = await res.json();

    window.sessionData = data;
}
