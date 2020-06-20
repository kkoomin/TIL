import sys
sys.stdin = open('2070_input.txt')

N = int(input()) # input은 한 줄씩 읽어옴

for i in range(N):
    a, b = list(map(int, input().split()))
    sign = ""
    if a > b:
        sign = ">"
    elif a < b:
        sign = "<"
    else: 
        sign = "="

    print(f"#{i+1} {sign}")    
