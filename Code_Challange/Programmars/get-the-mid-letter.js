/*

https://programmers.co.kr/learn/courses/30/lessons/12903

문제 설명
단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.

제한사항
s는 길이가 1 이상, 100이하인 스트링입니다.

*/

// MY SOLUTION

function solution(s) {
  if (s.length % 2 == 0) {
    return s[s.length / 2 - 1] + s[s.length / 2];
  } else {
    return s[(s.length - 1) / 2];
  }
}

// OTHER SOLUTION

function solution(s) {
  return s.substr(Math.ceil(s.length / 2) - 1, s.length % 2 === 0 ? 2 : 1);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr
// The substr() method returns a portion of the string, starting at the specified index and extending for a given number of characters afterward.
// str.substr(start[, length])
// ternary operator => condition ? exprIfTrue : exprIfFalse
