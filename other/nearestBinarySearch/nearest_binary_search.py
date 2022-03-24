def counts(teamA, teamB):
    matchedScores = []

    for scoreB in teamB:
        matches = 0
        for scoreA in teamA:
            if scoreB>=scoreA:
                matches+=1
        matchedScores.append(matches)
    
    return matchedScores

def counts_sort_walk(teamA, teamB):
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

def counts_sort_walk_neater(teamA, teamB):
    _teamB = teamB.copy()
    _teamB.sort()
    teamA.sort()

    length_A = len(teamA)
    cache = {}
    previous_A_index = 0

    for scoreB in _teamB:
        # because teamA is sorted, the highest matching index = count of all lower values
        while (
            previous_A_index < length_A and
            teamA[previous_A_index] <= scoreB
            ):
            previous_A_index += 1
        cache[scoreB] = previous_A_index
    
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

output = counts_sort_walk([3,2,1], [2,4])
# print(output)
assert output == [2,3]

output = counts_sort_walk_neater([3,2,1], [2,4])
# print(output)
assert output == [2,3]

# * Timings
max_score = 1e9
max_length = 1e5

def timer(function, arg1, arg2):
    print(function.__name__)
    start_time = time.time()
    function(arg1, arg2)
    print("--- %s ms ---" % ((time.time() - start_time)*1000))

def scores_generator(size):
    matrix = []

    for n in range(size):
        matrix.append(
            random.randint(0, max_score)
        )

    return matrix

class test_case:
    def __init__ (self, inputs, refs):
        self.inputs = inputs
        self.refs = refs

bench = [
    [
        100_000, 
        100_000
    ],
    [
        1_000_000, 
        1_000_000
    ],
    [
        10_000_000, 
        10_000_000
    ],
    [
        random.randint(0, max_length), 
        random.randint(0, max_length)
    ],
    [
        random.randint(0, max_length), 
        random.randint(0, max_length)
    ]
]

functions = [
    counts_sort_walk,
    counts_sort_walk_neater
]

print('')
teamA = scores_generator(1000)
teamB = scores_generator(1000)
print('1k')
timer(counts, teamA, teamB) 
timer(counts_sort_walk_neater, teamA, teamB) 

print('')
teamA = scores_generator(10000)
teamB = scores_generator(10000)
print('10k')
timer(counts, teamA.copy(), teamB.copy()) 
timer(counts_sort_walk_neater, teamA.copy(), teamB.copy()) 


for case in bench:
    print()
    print(case)

    A = scores_generator(case[0])
    B = scores_generator(case[1])

    for fn in functions:
        timer(fn, A.copy(), B.copy())