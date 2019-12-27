# Docker

### 참고자료

[PYRASIS.COM: 가장 빨리 만나는 Docker - 목차](http://www.pyrasis.com/docker.html)  
[만들면서 이해하는 도커(Docker) 이미지의 구조](https://www.44bits.io/ko/post/how-docker-image-work)

### Apache2 웹 서버 설치하고 로컬에 있는 hello.html 파일을 컨테이너의 /var/www/html 디렉터리로 복사

1. 작업 디렉터리 생성 및 이동

```
root@server:~/docker# cd ~
root@server:~# mkdir webserver
root@server:~# cd webserver
root@server:~/webserver#
```

2. Dockerfile과 hello.html 파일을 생성

```
root@server:~/webserver# gedit Dockerfile

> Dockerfile
	FROM ubuntu
	RUN apt-get update
	RUN apt-get install apache2 -y
	ADD hello.html /var/www/html/
	WORKDIR /var/www/html
	RUN [ “/bin/bash”, “-c”, “echo hello2 >> hello2.html” ]
	EXPOSE 80
	CMD apachectl -DFOREGROUND
>

root@server:~/webserver# echo hello >> hello.html
root@server:~/webserver# ls hello.html
hello.html
root@server:~/webserver# cat hello.html
hello

```

    * docker build 과정에서 Dockerfile은 명령어를 해석하는데, 사용자의 입력이 필요한 명령어는 오류로 취급. 그렇기 때문에 -y 옵션을 넣어서 설치해줘야 한다.
    * ADD : host의 file 또는 dir를 이미지 내부로 복사하는 것. COPY와 비슷하지만, COPY는 host의 local 파일만 복사 할 수 있음. ADD는 host의 local 파일 뿐 아니라 원격지(외부 URL 또는 tar파일) 파일도 복사 할 수 있음. (tar 파일인 경우 압축을 해제해서 복사)
    일반적으로 COPY 사용을 권장.
    * WORKDIR : 작업 디렉터리 (work directory). cd 명령어와 동일. 명령어를 실행할 위치를 지정.
    * [ ] 형식의 인자 : JSON 배열 형식 -> 쉘을 실행하지 않음을 의미
    [ ] 없는 RUN command 형식은 /bin/sh -c command 형식으로 실행됨.
    [ ]가 들어가면 해당 인자 자체를 실행.
    * EXPOSE : 이미지에서 노출할 포트를 설정.
    * CMD : 컨테이너가 실행될 때마다 실행할 명령어. (반드시 한 번만 사용가능)
    * echo : 뒤에 나오는 것을 console 출력

3. Dockerfile을 이용하여 이미지를 생성

```
root@server:~/webserver# docker build -t myimage .

root@server:~/webserver# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
myimage             latest              ab650abb6c03        20 seconds ago      188MB
recommanded         latest              bcced2167831        About an hour ago   64.2MB
falloc100m          latest              ec1e71d12a3c        About an hour ago   169MB

```

    * . : 현재 디렉터리에 생성.

4. 생성된 이미지로 컨테이너 실행
   `root@server:~/webserver# docker run -d -P —name myserver myimage`
   _ -P : host의 빈 포트를 컨테이너에 EXPOSE된 포트로 매핑.
   Publish all exposed ports to random ports
   _ 실행 중 혹은 존재하는 컨테이너와 동일한 이름으로 실행 할 경우, 에러가 발생. (Conflict)

5. 포트 확인

```
root@server:~/webserver# docker container ls (혹은 ps)

CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                   NAMES
ec22d28a7e0e        myimage             “/bin/sh -c ‘apach…”   3 minutes ago       Up 3 minutes        0.0.0.0:32777->80/tcp   myserver

root@server:~/webserver# docker port myserver

80/tcp -> 0.0.0.0:32777
```

6. 웹 서버 접속 확인
   브라우저에서 -> `localhost:32768/hello.html` `localhost:32768/hello2.html`

7. 컨테이너 중지 및 상태 확인, 재실행

```
root@server:~/webserver# docker container stop myserver
myserver

root@server:~/webserver# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES

root@server:~/webserver# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                        PORTS               NAMES
ec22d28a7e0e        myimage             “/bin/sh -c ‘apach…”   29 minutes ago      Exited (137) 29 seconds ago                       myserver
8c4f9e337753        golang              “/bin/bash”              2 days ago          Exited (100) 2 days ago                           zealous_newton

root@server:~/webserver# docker container start myserver

```

cf. 실행 중인 모든 컨테이너를 중지
`docker container stop $(docker container ls -q)`

8. 컨테이너 삭제
   - 해당 컨테이너를 중지 후 삭제해야함.
   - `docker container rm <container_name>`

cf. 모든 컨테이너 삭제 (실행 중 or not)
`docker container rm -f $(docker container ls -aq)`
