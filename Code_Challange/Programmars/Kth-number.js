/*

//https://www.welcomekakao.com/learn/courses/30/lessons/42748

문제 설명
배열 array의 i번째 숫자부터 j번째 숫자까지 자르고 정렬했을 때, k번째에 있는 수를 구하려 합니다.

예를 들어 array가 [1, 5, 2, 6, 3, 7, 4], i = 2, j = 5, k = 3이라면

array의 2번째부터 5번째까지 자르면 [5, 2, 6, 3]입니다.
1에서 나온 배열을 정렬하면 [2, 3, 5, 6]입니다.
2에서 나온 배열의 3번째 숫자는 5입니다.
배열 array, [i, j, k]를 원소로 가진 2차원 배열 commands가 매개변수로 주어질 때, commands의 모든 원소에 대해 앞서 설명한 연산을 적용했을 때 나온 결과를 배열에 담아 return 하도록 solution 함수를 작성해주세요.

제한사항
array의 길이는 1 이상 100 이하입니다.
array의 각 원소는 1 이상 100 이하입니다.
commands의 길이는 1 이상 50 이하입니다.
commands의 각 원소는 길이가 3입니다.

*/

// MY SOLUTION

function solution(array, commands) {
  let answer = [];
  commands.forEach(arr => {
    answer.push(
      array.slice(arr[0] - 1, arr[1]).sort((a, b) => a - b)[arr[2] - 1]
    );
  });
  return answer;
}

/* 
    POINT! sort() 함수는 UTF-16 code units order로 정렬. 숫자 sort할 땐 별도로 함수 넣어줘야 함.
    To compare numbers instead of strings, the compare function can simply subtract b from a.

    ex)
        let numbers = [4, 2, 5, 1, 3];
        numbers.sort((a, b) => a - b);

*/

// OTHER SOLUTION

function solution(array, commands) {
  return commands.map(v => {
    return array
      .slice(v[0] - 1, v[1])
      .sort((a, b) => a - b)
      .slice(v[2] - 1, v[2])[0];
  });
}

/* 

    map으로 별도의 answer array 생성없이 return 
    The map() method creates a new array with the results of calling a provided function on every element in the calling array.

*/
