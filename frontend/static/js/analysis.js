async function analyze() {
    const res = await fetch("/analyze", { method: "POST", body: formData });
    const data = await res.json();

    window.sessionData = data;
}
