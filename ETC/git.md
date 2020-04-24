# 코드 관리 도구

## GIT

### (1) SCM (Source Code Management)

- how? 버전을 통해 관리 (Version Control System)
- by what? 디렉토리 중심 (Repository)

### (2) 코드 관리를 위한 기본 명령어

1. `git init`

- .git 폴더 생성: git 관련 데이터들이 저장된 폴더
- (master) 프롬프트
- 깃 지우는 간단한 방법 (.git 폴더 지우기) rm -rf .git/

2. `git status`

- 현재 git 저장소(repo)의 상태를 확인

3. `git add [파일명 / 폴더명]`

- Staging area에 파일 추가 (스냅샷 찍기 전에 사진대 위에 올려놓는 것이라 생각하면 됨)

4. `git commit -m [메세지]`

- 스냅샷 저장 (저장할만한 중요한 버전일 때, 새로운 버전을 생성)

5. `git log`

- 현재까지의 저장된 버전을 조회
- commit [해쉬 넘버] (HEAD -> MASTER)
- `git log --oneline` <- 보기 편함

6. `git checkout [저장된 해시값]`

- 저장된 해시값의 과거 상태로 돌아감
- `git checkout master` <- 다시 현재로 복구

7. `git stash`

- 임시 저장소
- `git stash list`로 저장된 리스트를 보고 `git stash pop`으로 다시 불러옴

### (3) 원격 저장소 관련 명령어

1. `git remote`

- 현재 설정된 모든 원격 저장소에 관한 정보 조회
- `git remove --verbose` : 정보를 자세하게 볼 때 (혹은 -v)
- `git remote add [저장소의 별명] [저장소의 주소]` : 새 원격 저장소를 만들때 (별명을 origin으로 하는 건 첫번째 원격 저장소를 만들때의 관습)

2. `git push [저장소의 별명] [브랜치의 이름]`

- 관습적으로 `git push origin master`를 사용해버릇함

3. `git clone [저장소 주소] ([디렉토리 이름])`

### (4) Branch

❗️"브랜치는 일회용!" 재활용 하지 말자! => 더 이상 쓰이지 않는 브랜치는 항상 정리 필요

1. `git branch`

- 현재 브랜치 조회

2. `git branch [브랜치 명]`

- 새로운 브랜치 생성

3. `git checkout [브랜치 명]`

- 해당 브랜치로 이동

4. `git merge [(합칠)브랜치 명]`

- ❗️master에서 test를 병합할 때, `git checkout master` 로 마스터로 이동 먼저 하고, `git merge test`

5. `git branch -d [(삭제할)브랜치 명]` / `git branch -D [브랜치 명]`

- 브랜치 삭제하기
- "-d" : 이미 병합된 브랜치를 삭제할 경우 (soft deletion)
- "-D" : 병합되지 않은 브랜치를 삭제할 경우 (hard deletion)

### (5) Merge 시나리오

1. Fast-forward Merge
2. Auto-Merge
3. Merge Conflict

- `git commit -m "Resolve conflict"`로 충돌난 것을 표시해줌

# 협업 도구

### (1) Push & Pull 모델

- Synchronous 작업
- 해당 프로젝트에 대한 push 권한이 있어야함 (공동 작업자로 초대)

### (2) Fork & Pull Request 모델

- Pull은 꼭! master branch에서 땡겨오기!!! prompt에 (master) 인거 확인하고 pull 하기

### (3) Shared Repository & PR (branch) 모델

# 배포 도구

## Github Pages

- Static hosting
- 메인 github page로는 repo 생성시 이름을 `[id].github.io`로 세팅한다.
- 그 외의 프로젝트는 해당 git repo의 settings 에 들어가서 github pages - branch 선택 - 주소는 `[id].github.io` 혹은 `github.io/[repo name]`으로 세팅된다.
- 'gh-pages' branch를 만들어서 페이지 배포용 코드를 따로 관리할 수 있다.

## Heroku
