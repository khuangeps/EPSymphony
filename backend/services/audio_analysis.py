# has bpm; no UI
import librosa
import numpy as np
# y, sr = librosa.load("C:/Users/sverma28/OneDrive - Eastside Preparatory School/Documents/GitHub/EPSymphonySuhani/WAV_file_sample.wav")
filename = librosa.example("nutcracker")
y, sr = librosa.load(filename)
beat_sums = []
total_sum = 0
tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
beat_times = librosa.frames_to_time(beats, sr=sr)
beat_intervals = np.diff(beat_times)
for i in range(len(beat_intervals) - 1):
    total_sum += beat_intervals[i]
    beat_sums.append(float(total_sum))
print(beat_sums)
#get the BPM at each beat: librosa gives one average BPM we divide this to get BPM over itme
BPM_at_beat = 60 / beat_intervals

#Now, find how consistant the musician is
mean_tempo = np.mean(BPM_at_beat)
print(mean_tempo)