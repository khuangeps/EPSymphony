def beats_to_measures(beat_times, beats_per_measure=4):
    return beat_times[::beats_per_measure]