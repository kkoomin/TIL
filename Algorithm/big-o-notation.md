# Big O Notation

It allows us to talk formally about how the runtime of an algorithm grows as the inputs grow.

> O(n) = f(n) could be linear (f(n) = n)

> O(n^2) = f(n) could be quadratic (f(n) = n^2)

> O(1) = f(n) could be constant (f(n) = 1)

## Rules

1. Constants don't matter  
   ex) O(2n) = O(n) / O(500) = O(1) / O(13n^2) = O(n^2)

2. Smaller terms don't matter  
   ex) O(n+50) -> O(n)

3. Arithmetic operations are constant

4. Variable assignment is constant

5. Accessing elements in an array (by index) or object (by key) is constant

6. In a loop, the the complexity is the length of the loop **times** the complexity of whatever happens inside of the loop
