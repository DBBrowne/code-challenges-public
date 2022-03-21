def counts(teamA, teamB):
    matchedScores = []

    for scoreB in teamB:
        matches = 0
        for scoreA in teamA:
            if scoreB>=scoreA:
                matches+=1
        matchedScores.append(matches)
    
    return matchedScores

def countsFast(teamA, teamB):
    _teamB = teamB.copy()
    _teamB.sort()
    teamA.sort()

    length_A = len(teamA)
    cache = {0:0}
    previous_A_index = 0
    # print(teamA, teamB, _teamB)

    for index, scoreB in enumerate(_teamB):
        if 0 == index:
            cached_value = 0
        else:
            cached_value = cache[_teamB[index-1]]
        current_matches = cached_value
        
        while (
            previous_A_index < length_A and
            teamA[previous_A_index] <= scoreB
            ):
            current_matches += 1
            previous_A_index += 1
        cache[scoreB] = current_matches
    
    for index, score in enumerate(teamB):
        teamB[index] = cache[score]

    return teamB

def countsFaster(teamA, teamB):
    _teamB = teamB.copy()
    _teamB.sort()
    teamA.sort()

    length_A = len(teamA)
    cache = {}
    previous_A_index = 0
    current_matches = 0
    # print(teamA, teamB, _teamB)

    for index, scoreB in enumerate(_teamB):
        while (
            previous_A_index < length_A and
            teamA[previous_A_index] <= scoreB
            ):
            current_matches += 1
            previous_A_index += 1
        cache[scoreB] = current_matches
    
    for index, score in enumerate(teamB):
        teamB[index] = cache[score]

    return teamB


# ************************************************
# **** Testing
import random
import time

# * Assert
output = counts([3,2,1], [2,4])
assert output == [2,3]

output = countsFast([3,2,1], [2,4])
# print(output)
assert output == [2,3]

output = countsFaster([3,2,1], [2,4])
# print(output)
assert output == [2,3]

# * Timings
def timer(function, arg1, arg2):
    start_time = time.time()
    function(arg1, arg2)
    print("--- %s ms ---" % ((time.time() - start_time)*1000))

max_score = 1e9
def scores_generator(size):
    matrix = []

    for n in range(size):
        matrix.append(
            random.randint(0, max_score)
        )

    return matrix

teamA = scores_generator(1000)
teamB = scores_generator(1000)
print('1k')
timer(counts, teamA, teamB) 
timer(countsFast, teamA, teamB) 

teamA = scores_generator(10000)
teamB = scores_generator(10000)
print('10k')
timer(counts, teamA, teamB) 
timer(countsFast, teamA, teamB) 

print('100k')
teamA = scores_generator(100000)
teamB = scores_generator(100000)
timer(countsFast, teamA, teamB) # 63 ms

print('1m')
teamA = scores_generator(1000000)
teamB = scores_generator(1000000)

timer(countsFast, teamA, teamB) # 940 ms
print('10m')
teamA = scores_generator(10000000)
teamB = scores_generator(10000000)

timer(countsFast, teamA, teamB) # 10660 ms
print('100k')
teamA = scores_generator(100000)
teamB = scores_generator(100000)

timer(countsFaster, teamA, teamB) # 63 ms
print('1m')
teamA = scores_generator(1000000)
teamB = scores_generator(1000000)

timer(countsFaster, teamA, teamB) # 940 ms
print('10m')
teamA = scores_generator(10000000)
teamB = scores_generator(10000000)
timer(countsFaster, teamA, teamB) # 10660 ms