# Markdown Syntax

> Markdown is a way to style text on the web.  
> https://www.markdownguide.org/basic-syntax/  
> https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf

## Headers

    # h1
    ## h2
    ### h3
    #### h4
    ##### h5
    ###### h6

## Emphasis

    *italic*                _italic_
    **bold**                __bold__
    ***bold and italic***   ___bold and italic___

## Blockquotes

    > Lucas said, "On va faire minute par minute." This is the quote.
    > (This makes a blank line)
    > And also there is
    >> this nested blockquote line.

    Blockquote can contain any other Markdown syntax.

## Lists

    1. Unordered (* or + or -)
        * UO 1
        + UO 2
            - UO 2-1
    2. Ordered (number)
        1. O 1
        2. O 2

## Images

    ![Alt Text](url)
    ex) ![Snow Queen](/image/elsa.png)

    [![linked image](/image/dir/image.png)](Link website address)

## Links

    [Text](url)

    I want to go to google[1]
    [1]: www.google.com "Google website"
    ^ This line with linked address and optional title would be hidden.

    Also, you can write
        I want to go to [google][1]
    to make [google] as a standard url link.

## Backslash Escapes

    \* this is not gonna be an italic sentence *\

    Markdown provides backslash escapes for the following characters:
    \ backslash             ` backtick
    * asterisk              _ underscore
    {} curly braces         [] square brackets
    () parentheses          # hash mark
    + plus sign             - minus sign (hyphen)
    . dot                   ! exclamation mar

## Username @MENTIONS

    Typing an @ symbol, followed by a username, will notify that person or team to come and view the comment.

## Issue References

    Any number that refers to an Issue or Pull Request will be automatically converted into a link.

    #1
    github-flavored-markdown#1
    defunkt/github-flavored-markdown#1

## Fenced Code Blocks

    `Single line code block`

    ```This is multiple line code block```

    ```JavaScript This is JS code block```
    ^ Add an optional language identifier and get syntax highlighting.

## Horizontal Rules

    Just write these three ones

    ***
    ---
    ___
