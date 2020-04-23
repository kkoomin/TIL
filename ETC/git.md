# 코드 관리 도구

(1) SCM (Source Code Management)

- how? 버전을 통해 관리 (Version Control System)
- by what? 디렉토리 중심 (Repository)

(2) 코드 관리를 위한 기본 명령어

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
