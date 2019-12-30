### Docker Swarm

- 도커 스웜과 도커 스웜 모드
  _ 여러 대의 도커 서버를 하나의 클러스터로 만들어 컨테이너를 생성하는 기능
  _ 도커 스웜 → 도커 1.6 버전 이후부터 사용
  _ 에이전트 컨테이너가 필요하며 분산 코디네이터가 외부에 존재해야 함
  _ 여러 대의 도커 서버를 하나의 지점에서 사용하도록 **단일 접근점**을 제공
  _ 도커 스웜 모드 → 도커 1.12 버전 이후부터 사용
  _ 에이전트가 도커 자체에 내장 (분산 코디네이터를 외부에 설치할 필요 없음) \* **클러스터링 기능**에 초점

- 일반적인 클러스터 구성
  _ 분산 코디네이터 - 각종 정보를 저장하고 동기화 → 클러스터에 영입할 새로운 서버의 발견, 클러스터의 각종 설정 저장, 데이터 동기화 등에 주로 사용
  _ 매니저 - 클러스터 내의 서버를 관리하고 제어 \* 에이전트 - 각 서버를 제어

- 도커 스웜과 스웜 모드는 최소 3개 이상의 도커 서버를 필요로 함

- 도커 스웜 모드 → 매니저 노드와 워커 노드로 구성 (개별 서버들임)
  _ 매니저 노드 : 워커 노드를 관리하기 위한 도커 노드
  _ 워커 노드 : 실제 컨테이너가 생성되고 관리되는 도커 노드
  _ 매니저 노드에도 컨테이너가 생성될 수 있음 = 매니저 노드는 기본적으로 워커 노드 역할을 포함
  _ 매니저 노드는 반드시 1개 이상 존재해야 하며, 운영 환경에서는 다중화하는 것을 권장 \* 매니저 노드의 절반 이상에 장애가 발생하는 경우 복구를 위해 클러스터 운영을 중지하므로 매니저 노드는 홀수개로 구성하는 것이 효율적

### LAB 스웜 모드 환경 구성

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

    * VMware Network 가 내려갔을 때 확인할 것

VMware - Virtual Network Editor - Restore Defaults
혹은 호스트 머신의 인터넷을 disconnect했다가 다시 연결 시도

### 도커 스웜 모드의 클러스트를 구축

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

⇐ 새로운 워커 노드를 클러스터에 추가할 때 사용하는 비밀키(토큰)

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
