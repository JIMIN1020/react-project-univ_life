# 대학 생활 기록 웹사이트 프로젝트

대학 생활 전반에 관한 내용을 기록하고 관리할 수 있는 웹사이트.

<br/>

## Rules

### 프로젝트 관련

- `Pages` 폴더에 각 페이지 파일 생성하여 사용
- `Page.js` 파일은 현재 디자인 만들어 놓은 템플릿이니 가져다 사용하면 됨
- `Components` 폴더는 UI 구성하는 컴포넌트들 분리해놓은 곳 (페이지별 폴더 만들어서 넣기)
- `Components` 폴더에 'IndexBox.js', 'Profile.js'는 공통적인 컴포넌트라 밖에 두었음

### Github 관련

- 각 페이지 소단위 기능 별로 issue 작성 (assignees에 본인 등록)
- 작성한 issue id와 내용 이용하여 브랜치 생성 후 작업 (ex. id가 `1`이고 작업 내용이 `UI디자인`이고, 성적 페이지 작업이면 브랜치 이름은 `1-성적_UI디자인`과 같은 식으로!)
- pull request 할 때 issue id 명시 (id가 `1`이면 `#1`과 같이)

<br/>

## 협업 방법

### 시작 전 세팅

1. [github] - 개발 진행할 repository fork

2. [로컬] - fork 한 repository를 로컬로 clone

3. [로컬] - remote 명령어를 통해서 upstream 생성

4. [로컬] - remote(원격지)의 origin, upstream 확인

<br/>

### 작업 flow

1. [github] - 개발 프로젝트 내 작업할 issue 생성

2. [로컬] 작업 브랜치 생성 (issue id 활용)

3. [로컬] 작업 브랜치 내에서 작업 후 커밋 생성

4. [로컬] 내 repository(origin)로 push

5. [github] pull request 생성 (issue id와 함께 작업 내용 작성하기)

6. [github] 코드 리뷰 후 merge

7. [로컬] upstream의 master 브랜치로부터 pull 진행

   → 로컬 저장소 최신화

8. [로컬] 로컬 코드를 origin의 master 브랜치에 push 진행

   → 원격 저장소 최신화
