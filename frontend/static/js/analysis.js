alert("analysis.js loaded");
console.log("analysis.js loaded")

window.osmd = null; //to avoid conflict with let osmd
let currentMeasure = 1;

function getMeasuresByPage() {
    const pages = window.osmd.GraphicSheet.MusicPages;
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

    window.osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay(container, {
        autoResize: true,
        backend: "svg"
    });

    await window.osmd.load("../static/music/MozartPianoSonata.mxl");
    window.osmd.render();

    console.log(window.osmd.GraphicSheet);
    console.log(window.osmd.GraphicSheet.MusicPages);

    const pages = getMeasuresByPage();
    console.log(pages);
}

loadScore();
async function analyze() {
    const res = await fetch("/analyze", { method: "POST", body: formData });
    const data = await res.json();

    window.sessionData = data;
}
