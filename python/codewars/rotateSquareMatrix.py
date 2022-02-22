# https://www.codewars.com/kata/53fe3578d5679bf04900093f/train/python
# from teNtris - transpose, then reverse either row or column depending on rotation direction

matrix1 = [[1, 2], [3, 4]]
matrix2 = [[1, 2, 3], [4,5,6], [7,8,9]]
matrix3 = [[1, 2, 3], [4,5,6], [7,8,9]]
matrix4 = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
# length = len(matrix2)
# print(length / 2 )
# print(length // 2 )


def reverse_in_place(array):
    length = len(array)
    for i in range(length // 2):
        val = array[i]
        reverseI = length - 1 - i
        array[i] = array[reverseI]
        array[reverseI] = val

# Not in place:
def transposeWithMap(matrix):
    return list(map(list,zip(*matrix)))

def transposeInPlace(matrix):
    length = len(matrix)
    for n in range(length-1):
        for m in range(n+1, length):
            if 0:
                print_matrix(matrix)
            if 0:
                print('n',n)
                print('m',m)
                print(matrix[n][m])
                print(matrix[m][n])
            store = matrix[n][m]
            matrix[n][m] = matrix[m][n]
            matrix[m][n] = store

def rotate_in_place(matrix):
    transposeInPlace(matrix)
    length = len(matrix)
    for i in range(length):
        reverse_in_place(matrix[i])
    
    return matrix

def print_matrix(matrix=[]):
    for i in range(len(matrix)):
        print(matrix[i])


# print_matrix(matrix1)
# print('rotate')
# rotate_in_place(matrix1)
# print_matrix(matrix1)



# print('\n\nmatrix 2')
# print_matrix(matrix2)
# print('rotate')
# rotate_in_place(matrix2)
# print_matrix(matrix2)

# print('\n\nMATRIX 3')
# print_matrix(matrix3)
# print('transpose')
# print_matrix(transposeWithMap(matrix3))
# print('transpose in place')
# transposeInPlace(matrix3)
# print_matrix(matrix3)



# print('\n\nMATRIX 4')
# print_matrix(matrix4)
# print('transpose')
# print_matrix(transposeWithMap(matrix4))
# print('transpose in place')
# transposeInPlace(matrix4)
# print_matrix(matrix4)


def matrix_maker(lenN,lenM=0):
    matrix = []
    if not lenM:
        lenM = lenN
    count=0
    for n in range(lenN):
        matrix.append([])
        for m in range(lenM):
            count+=1
            matrix[n].append(count)
    
    return matrix

# print_matrix(rotate_in_place(matrix_maker(100)))

def rotate_with_map(matrix):
    matrix = transposeWithMap(matrix)
    length = len(matrix)
    for i in range(length):
        reverse_in_place(matrix[i])
    
    return matrix

def rotate_in_place_fast(matrix):
    for r, row in enumerate(zip(*matrix)):
        matrix[r] = list(reversed(row))
    return matrix


mega_matrix_1 = matrix_maker(1000)
mega_matrix_2 = matrix_maker(5000)
mega_matrix_3 = matrix_maker(10000)

import time

def timer(function, arg):
    start_time = time.time()
    function(arg)
    print("--- %s seconds ---" % (time.time() - start_time))

print('matrix 1000')
timer(rotate_in_place, mega_matrix_1) # 0.076 seconds
timer(rotate_with_map, mega_matrix_1) # 0.056 seconds
timer(rotate_in_place_fast, mega_matrix_1) # 0.015 seconds

print('matrix 5000')
timer(rotate_in_place, mega_matrix_2)
timer(rotate_with_map, mega_matrix_2)
timer(rotate_in_place_fast, mega_matrix_2)

print('matrix 10000')
timer(rotate_in_place, mega_matrix_3) # 17.21 seconds
timer(rotate_with_map, mega_matrix_3) # 5.46 seconds
timer(rotate_in_place_fast, mega_matrix_3) # 3.22 seconds