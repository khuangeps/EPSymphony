# hosts everything
# routes, endpoints, user input 
# connects to frontend 

import request
import librosa

@app.route("/analyze", methods=["POST"])
def analyze():
    audio = request.files["audio"]
    pdf = request.files["pdf"]

    # save files
    audio_path = save_audio(audio)
    pdf_path = save_pdf(pdf)

    # analyze
    audio_data = analyze_audio(audio_path)
    measure_times = beats_to_measures(audio_data["beat_times"])

    positions = extract_staff_positions(pdf_path)

    session = {
        "beat_times": audio_data["beat_times"],
        "measure_times": measure_times,
        "measure_positions": positions
    }

    save_session(session)

    return jsonify(session)