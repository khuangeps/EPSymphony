let osmd;
let currentMeasure = 1;

async function loadScore() {
    const container = document.getElementById("score-container");

    osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay(container, {
        autoResize: true,
        backend: "svg"
    });

    await osmd.load("test.musicxml");
    osmd.render();
}

loadScore();
async function analyze() {
    const res = await fetch("/analyze", { method: "POST", body: formData });
    const data = await res.json();

    window.sessionData = data;
}
