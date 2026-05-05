alert("analysis.js loaded");
console.log("analysis.js loaded")

let osmd;
let currentMeasure = 1;

function getMeasuresByPage() {
    const pages = osmd.GraphicSheet.MusicPages;
    const result = [];

    pages.forEach((page, pageIndex) => {
        const measureNumbers = new Set();

        page.MusicSystems.forEach(system => {
            system.GraphicalMeasures.forEach(measureList => {
                measureList.forEach(gm => {
                    const num = gm.parentSourceMeasure?.measureNumber;
                    if (num !== undefined) {
                        measureNumbers.add(num);
                    }
                });
            });
        });

        result.push({
            page: pageIndex + 1,
            measures: Array.from(measureNumbers)
        });
    });

    return result;
}

async function loadScore() {
    const container = document.getElementById("score-container");

    osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay(container, {
        autoResize: true,
        backend: "svg"
    });

    await osmd.load("../static/music/MozartPianoSonata.mxl");
    osmd.render();

    console.log(osmd.GraphicSheet);
    console.log(osmd.GraphicSheet.MusicPages);

    const pages = getMeasuresByPage();
    console.log(pages);
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
