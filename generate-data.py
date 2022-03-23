import csv
import datetime
import time
import math
import random

# Generates a set of completion data [completed, mistakes, time] based on the given level number.
# Higher level = higher chance of failure
# Level 1 = always completed with 0 mistakes
# Level 2 = maximum 1 mistake
def rand_completion(level):
    completed = 1
    mistakes = 3

    # Decide whether the level was completed
    if level == 0 and random.randrange(0, 10) < 5:
        completed = 0
    elif (not level == 1) and random.randrange(0, 10) < level:
        completed = 0
    
    # Pick a number of mistakes
    if completed == 1:
        mistakes = 0 if level == 1 else random.randrange(0, 2 if level == 2 else 3)
    
    # Generate completion time
    time = 0
    if level == 1:
        # Level 1: 10-30 seconds
        time = random.randrange(10, 30)
    elif level == 2:
        # Level 2: 30 seconds - 2 minutes
        time = random.randrange(30, 120)
    elif level == 3:
        # Level 3: 2-5 minutes
        time = random.randrange(180, 300)
    elif level == 4:
        # Level 4: 5-10 minutes
        time = random.randrange(300, 600)
    elif level == 5:
        # Level 5: 10-20 minutes
        time = random.randrange(600, 1200)
    else:
        # Custom: 2-20 minutes
        time = random.randrange(120, 1200)

    return [completed, mistakes, time]

# Convert time in seconds to H:M:S format
def format_time(total_seconds):
    hours = math.floor(total_seconds / 3600)
    minutes = math.floor((total_seconds % 3600) / 60)
    seconds = math.floor(total_seconds % 60)

    return f"{hours}:{minutes:02d}:{seconds:02d}"

with open('data.csv', mode = 'w') as data:
    data_writer = csv.writer(data, delimiter = ',', quotechar = '"', quoting = csv.QUOTE_MINIMAL)
    data_writer.writerow(['entryTimestamp', 'levelNum', 'sortAlgorithm', 'levelCompleted', 'mistakesMade', 'levelTime'])
    for i in range(1000):
        level = random.randrange(0, 6)
        completion = rand_completion(level)
        timestamp = math.floor(time.time()) + random.randrange(-30000, 30000)
        data_writer.writerow([datetime.datetime.fromtimestamp(timestamp).isoformat(' '), level, "merge", completion[0], completion[1], format_time(completion[2])])