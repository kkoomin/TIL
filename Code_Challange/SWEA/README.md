# SWEA (SW Expert Academy)

https://swexpertacademy.com/main/code/problem/problemList.do

```
### 사이트 포멧 외에서 풀 때, 테스트 케이스 셀프로 돌려서 확인하는 방법

import sys
sys.stdin = open('input.text')

N = int(input()) ------> input은 한 줄씩 읽어옴
```

### 입출력

1. 입력

```
# 입력 받기: input의 자료형은 항상 str

N = input()

# 1개의 숫자 입력 받기

N = int(input())

# 2개의 숫자

# 8 3 => '8 3' => ['8', ' ', '3']

N = int(input())

print(N)
```

```
# split을 통한 방식

N = input().split(' ')
A, B = N
print(A+B)
8 3
83
```

```
# map() 방식

# arr = ['1','2','3','4']

# arr.map(num => Number(num))

N = input().split(' ')

# ['8', '3']

numbers = list(map(int, N))

# 변수 a, b <= [8, 3]

a, b = numbers
print(a+b)
8 3
11

```

```
# input 2개 이상의 숫자로 받는 공식

# '8 3'

a, b = list(map(int, input().split()))

# '1 2 3 4 5'

a, b, c, d, e = list(map(int, input().split()))
```

2. 출력

```
# 줄바꿈 없이 print()

# 기본값 print('#', end='\n')

print('#', end='')
```
