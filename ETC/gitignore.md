# .gitignore

> The .gitignore file is a text file that tells Git which files or folders to ignore in a project.  
> https://git-scm.com/docs/gitignore  
> https://guide.freecodecamp.org/git/gitignore/

### Rules of .gitignore

```
# Ignore Mac system files
.DS_store

# Ignore node_modules folder
node_modules

# Ignore all text files
*.txt

# Ignore files related to API keys
.env

# Ignore SASS config files
.sass-cache
```

```Octocat Rule
# Compiled source #
###################
*.com
*.class
*.dll
*.exe
*.o
*.so

# Packages #
############
# it's better to unpack these files and commit the raw source
# git has its own built in compression methods
*.7z
*.dmg
*.gz
*.iso
*.jar
*.rar
*.tar
*.zip

# Logs and databases #
######################
*.log
*.sql
*.sqlite

# OS generated files #
######################
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
```

- `.gitignore` file is located in the root folder of the project

### .gitignore not working?

- If you already have a file checked in, and you want to ignore it, **Git will not ignore the file if you add a rule later.** In those cases, you must untrack the file first, by running the following command in your terminal:

  `$ git rm --cached FILENAME`
