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

    function startPolling() {
        console.log("Start button clicked");
    }
}

loadScore();
