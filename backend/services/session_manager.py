# to-do list feature
# manages practice session (start stop etc.)
# write + read storage files

from services.sheet_parser import parse_sheet_with_timing
from services.audio_analysis import analyze_audio

def create_session(audio_path, sheet_path):
    beat_times = analyze_audio(audio_path)

    measures, tempo = parse_sheet_with_timing(sheet_path)

    measure_times = [m["time_seconds"] for m in measures]

    session_data = {
        "audio_file": audio_path,
        "sheet_file": sheet_path,
        "beat_times": beat_times,
        "measure_times": measure_times,
        "tempo": tempo
    }

    return session_data