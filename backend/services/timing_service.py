def beats_to_measures(beat_times, beats_per_measure=4):
    return beat_times[::beats_per_measure]

def scroll_time(): #return time in seconds for how long we should be on each page
    return