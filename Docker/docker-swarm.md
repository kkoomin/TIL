## Docker Swarm

[Docker Swarm을 이용한 쉽고 빠른 분산 서버 관리](https://subicura.com/2017/02/25/container-orchestration-with-docker-swarm.html)

- 도커 스웜과 도커 스웜 모드

  - 여러 대의 도커 서버를 하나의 클러스터로 만들어 컨테이너를 생성하는 기능
  - 도커 스웜 → 도커 1.6 버전 이후부터 사용
  - 에이전트 컨테이너가 필요하며 분산 코디네이터가 외부에 존재해야 함
  - 여러 대의 도커 서버를 하나의 지점에서 사용하도록 **단일 접근점**을 제공
  - 도커 스웜 모드 → 도커 1.12 버전 이후부터 사용
  - 에이전트가 도커 자체에 내장 (분산 코디네이터를 외부에 설치할 필요 없음)
  - **클러스터링 기능**에 초점

- 일반적인 클러스터 구성

  - 분산 코디네이터 - 각종 정보를 저장하고 동기화 → 클러스터에 영입할 새로운 서버의 발견, 클러스터의 각종 설정 저장, 데이터 동기화 등에 주로 사용
  - 매니저 - 클러스터 내의 서버를 관리하고 제어
  - 에이전트 - 각 서버를 제어

- 도커 스웜과 스웜 모드는 최소 3개 이상의 도커 서버를 필요로 함

- 도커 스웜 모드 → 매니저 노드와 워커 노드로 구성 (개별 서버들임)
  - 매니저 노드 : 워커 노드를 관리하기 위한 도커 노드
  - 워커 노드 : 실제 컨테이너가 생성되고 관리되는 도커 노드
  - 매니저 노드에도 컨테이너가 생성될 수 있음 = 매니저 노드는 기본적으로 워커 노드 역할을 포함
  - 매니저 노드는 반드시 1개 이상 존재해야 하며, 운영 환경에서는 다중화하는 것을 권장
  - 매니저 노드의 절반 이상에 장애가 발생하는 경우 복구를 위해 클러스터 운영을 중지하므로 매니저 노드는 홀수개로 구성하는 것이 효율적

## LAB 스웜 모드 환경 구성

#1 도커가 설치되어 있는 우분투 서버 3개 생성

#2 스웜 지원 여부 확인

```
root@server:~# docker --version
Docker version 17.05.0-ce, build 89658be ⇐ 버전이 1.12 이상

root@server:~# docker info | grep Swarm
Swarm: inactive ⇐
WARNING: No swap limit support
```

#3 각 서버의 이름을 아래와 같이 설정 및 가상머신 이름 변경

- Virtual Machine Settings - Options - Virtual machine name:
  swarm-manager
  swarm-worker1
  swarm-worker2
- 가상 머신 별로 호스트명 변경, 리부팅 후 확인

```
root@docker-manager:~# hostnamectl set-hostname swarm-manager
root@docker-manager:~# reboot
```

#4 가상머신 별 IP 확인
swarm-manager : 192.168.111.132
swarm-worker1 : 192.168.111.133
swarm-worker2 : 192.168.111.134

cf. VMware Network 가 내려갔을 때 확인할 것
VMware - Virtual Network Editor - Restore Defaults
혹은 호스트 머신의 인터넷을 disconnect했다가 다시 연결 시도

## 도커 스웜 모드의 클러스트를 구축

#1 매니저 역할의 서버에서 스웜 클러스트를 시작

```
root@swarm-manager:~# docker swarm init —advertise-addr <매니저 서버 ip주소>

Swarm initialized: current node (wjbpqvzbsmjheruavqo8h9gij) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join \
    —token SWMTKN-1-1ijy2o5balgzurh7dd68efv7304iofq3gzn6ijhqx3atxwyont-4f3n7u2beok42q25amqzc0f3e \
    192.168.111.100:2377

To add a manager to this swarm, run ‘docker swarm join-token manager’ and follow the instructions.
```

-> 새로운 워커 노드를 클러스터에 추가할 때 사용하는 비밀키(토큰)

#2 워커 노드를 추가

```
root@swarm-worker1:~# docker swarm join \
>     —token SWMTKN-1-1ijy2o5balgzurh7dd68efv7304iofq3gzn6ijhqx3atxwyont-4f3n7u2beok42q25amqzc0f3e \
>     192.168.111.100:2377

This node joined a swarm as a worker.

(-> 매니저 토큰을 복사-실행)
```

#3 도커 서버가 정상적으로 스웜 클러스트에 추가되었는지 확인

```
root@swarm-manager:~# docker node ls
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
259grsyue31k79abbsc1lmd3w     swarm-worker1       Ready               Active
sxluzr3bp2qexytxxyqxlsbb3     swarm-worker2       Ready               Active
wjbpqvzbsmjheruavqo8h9gij *   swarm-manager       Ready               Active              Leader
```

#4 토큰 확인 및 변경 방법

```
docker swarm join-token manager
(-> 매니저 토큰 확인)

docker swarm join-token --rotate manager
(-> 매니저 토큰 변경 후 재확인)
```

#5 노드 삭제 방법

```
root@swarm-worker1:~# docker swarm leave
(-> 노드에서 삭제)

root@swarm-manager:~# docker node rm swarm-worker1
(-> 매니저가 해당 worker를 노드에서 삭제)

root@swarm-manager:~# docker swarm leave --force
(-> 매니저가 강제로 노드를 떠남)
```

#6 노드의 역할을 변경

```
root@swarm-manager:~# docker node demote swarm-manager
(-> 매니저 노드를 워커 노드로 변경)
(-> 하지만 매니저가 한 명일 때는 바로 demote 불가능)

root@swarm-manager:~# docker node promote swarm-worker1
(-> 매니저에서 worker 노드의 promote를 실행할 수 있음)
```

## 서비스

[How services work | Docker Documentation](https://docs.docker.com/engine/swarm/how-swarm-mode-works/services/)

- 서비스 = 같은 이미지로 생성된 컨테이너의 집합
- 서비스 제어는 매니저 노드에서만 가능
- 복제 모드 서비스 : 정의한 리플리카의 개수만큼 컨테이너가 생성 (default)
- 글로벌 모드 서비스 : 모든 노드에 컨테이너를 생성 (--mode global 옵션으로 생성)
- nginx 웹 서버 서비스를 생성

#1 서비스 생성

```
root@swarm-manager:~# docker service create \
> —name myweb \
> --replicas 2 \
> -p 8080:80 \
> nginx

docker service ls
docker container ls (-> node 할당된 서버는 컨테이너 존재 확인 가능)
```

#2 nginx로 접속

```
http://SWARM_MANAGER_IP:8080/
http://SWARM_WORKER1_IP:8080/
http://SWARM_WORKER2_IP:8080/
```

⇒ 컨테이너 실행 여부와 관계 없이 접속을 확인
→ 각 호스트의 어느 노드로 접근하든 실행 중인 컨테이너로 접속이 가능 (노드 = 서버의 개념)
-> 스웜 모드는 라운드 로빈 방식으로 서비스 내에 접근할 컨테이너를 결정

- 서비스 장애 복구
  #1 매니저 노드에서 노드의 상태를 확인

```
root@swarm-manager:~# docker node ls
root@swarm-manager:~# docker service ls (service 리스트 확인)
root@swarm-manager:~# docker service ps myweb (task 확인)
```

#2 매니저 노드에서 실행 중인 컨테이너를 삭제

```
root@swarm-manager:~# docker container rm -f 627ed088437b

-> 후에 docker service ps myweb 을 확인해보면 복구된 것을 볼 수 있음.
```

- 서비스 롤링 업데이트

```
root@swarm-manager:~# docker service update —image nginx:1.11 myweb2

# docker service create \
 --replicas 4 \
 —name myweb3 \
 —update-delay 10s \
 —update-failure-action continue \
 nginx:1.10
(-> 업데이트 조건과 함께 서비스를 생성하기도 가능)
```

-> 업데이트 될 때, task 하나씩 순차적으로 업데이트가 이루어짐

- 서비스 롤백

```
root@swarm-manager:~# docker service rollback myweb2
(또는)
root@swarm-manager:~# docker service update —rollback myweb2
```

-> 이전 상태로 순차적 롤백이 이루어짐
