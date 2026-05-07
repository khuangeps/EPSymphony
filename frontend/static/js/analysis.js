// debugging
alert("analysis.js loaded");
console.log("analysis.js loaded")

let osmd;
let measurePositions = [];
let totalMeasures = 0;
let animationId = null;
let startTime = null;
let BPM = 120;
let beatsPerMeasure = 4;

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

async function loadUploadedScore() {
    const fileInput = document.getElementById("fileInput");

    if (!fileInput.isDefaultNamespace.length) {
        alert("please upload a musicXML file.");
        return;
    }

    const file = fileInput.files[0];

    const container = document.getElementById("score-container");

    container.innerHTML = "";

    osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay(container, {
        autoResize: true,
        backend: "svg"
    });

    await osmd.load(file);
    osmd.render();

    extractMeasurePositions();

    console.log("measure positions:", measurePositions);
}

loadScore();

function startPolling() {
    console.log("Start button clicked");
    startMicrophoneSync();
}

function nextPage() {
    if (osmd) osmd.next();
}

function prevPage() {
    if (osmd) osmd.previous();
}

function scrollToMeasure(measureNumber) {
    const container = document.getElementById("score-container");

    // will fix later
    const scrollAmount = measureNumber * 100;
    container.scrollTop = scrollAmount;

    document.getElementById("measureDisplay").innerText =
        "current measure: " + measureNumber;
}

async function startMicrophoneSync() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new AudioContext();
    const mic = audioContext.createMediaStreamSource(stream);

    const analyser = audioContext.createAnalyser();
    mic.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function analyzeAudio() {
        analyser.getByteFrequencyData(dataArray);

        // VERY BASIC "activity detection"
        let volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

        if (volume > 50) {
            currentMeasure++;
            scrollToMeasure(currentMeasure);
        }

        requestAnimationFrame(analyzeAudio);
    }

    analyzeAudio();
}

async function analyze() {
    const res = await fetch("/analyze", { method: "POST", body: formData });
    const data = await res.json();

    window.sessionData = data;
}

async function loadSession() {
    const res = await fetch("/session");
    const data = await res.json();

    window.sessionData = data;
}