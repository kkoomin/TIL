# SASS

### What is Sass and how does it work?

Sass is a CSS preprocessor, an extension of CSS that adds power and elegance to the basic language.

Sass Source Code —-—Sass Compiler—-> Compiled CSS code

### Main Sass Features

> Variables, Nesting, Operators, Partials and Imports, Mixins, functions, Extends, Control directives

1. Variables

- for reusable values such as colours, font-sizes, spacing, etc
- start with ‘\$’ (ex. `$color-primary: #f9ed69;`)

2. Nesting

- to nest selectors inside of one another, allowing us to write less code
- write inside of parent element CSS
- there is no limit of nesting
- `&` : to write the selector path up until last point

  ```css
  .navigation {
    list-style: none;

    li {
      display: inline-block;

      &:first-child {
        margin: 0;
      }
    }
  }
  /*
      li is already inside of .navigation
      &:first-child === li:first-child
  */
   .header__logo-box
      .header {
          &__logo-box {
              ...
          }
      }		-> 이런식으로 nesting 가능
  ```

3. Operators

- for mathematical operations right inside of CSS

4. Partials and imports

- to write CSS in different files and importing them all into one single file

  ```
  <STRUCTURE>

  [sass]
      [themes]
      [vendors]
      [components]
      [layout]
      [pages]
      [abstracts]
          _functions.scss
          _mixins.scss
          _variables.scss
      [base]
          _animations.scss
          _base.scss
          _typography.scssabstract
          _utilities.scss

  // partial file name starts with "_" (underscore)
  ```

  1. base
     - partial files
  2. abstracts
     - code that’s not going to output any css
  3. components
     - reusable, independent building blocks
  4. layout
     - for each piece of the global layout of the entire project
  5. pages
     - for the different pages in web application
  6. themes
     - when we have web apps with different visual themes
  7. vendors
     - where we can put 3rd party css
       (ex. bootstrap. icons, animation framework)

  - `@import "base/base";` : @import + sass partial files folder name
  - `main.scss` : At the end, this file only has all import declarations

5. Mixins

- to write reusable pieces of CSS code (huge variable with multiple lines of code)

  ```css
  @mixin clearfix {
    &::after {
      content: "";
      clear: both;
      display: table;
    }
  }

  /* 다른 element 안에서 사용할 때 */
  @include clearfix;

  /* mixin 이름 뒤에 argument도 붙일 수 있음  */
  @mixin style-link-text($color) {
    color: $color;
  }
  /* ... */
  @include style-link-text;
  ```

6. Functions

   - similar to mixins, with the difference that they produce a value that can than be used
   - not veeery practical

   `ex) background-color: darken($color-secondary, 15%);`

   ```css
   @function divide($a, $b) {
     @return $a / $b;
   }
   /* ... */
   margin: divide(60, 2) * 1px; // 30px
   ```

7. Extends

   - to make different selectors inherit declarations that are common to all of them.
   - use extends when the selectors or the elements that you are extending are actually pretty related to one another

   ```css
   %btn-placeholder {
     /* % = placeholder */
     padding: 10px;
     display: inline-block;
     text-align: center;
   }

   .btn-main {
     &:link {
       @extend %btn-placeholder;
       background-color: $color-secondary;
     }
   }
   ```

   - why not use mixin?

     - mixin은 {}블록 안의 코드가 element안으로 카피되지만, extend는 element( ex) `.btn-main:link`)가 `%btn-placeholder` 자리로 카피됨.

8. Control directives
   - for writing complex code using conditionals and loops (not covered in this course)

### Sass and SCSS syntax

Sassy CSS is better to read

### How to compile Sass

```json
/* Original package.json */
{
  "name": "natours",
  "version": "1.0.0",
  "description": "Landing page for natours",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "node-sass": "^4.12.0"
  },
  "dependencies": {}
}


/* Change "scripts" section */

"scripts": {
    "compile:sass": "node-sass sass/main.scss css/style.css -w"
},

/*
	* node-sass : dependencies
	* sass/main.scss : location of sass file
	* css/style.css : compile to this file
	* -w : keep 'w'atching the change of sass file
*/

/* In terminal */

	npm run compile:sass

	(but if you add '-w' flag, don't need to compile again and again)
```

## Ref.

> https://www.udemy.com/course/advanced-css-and-sass
