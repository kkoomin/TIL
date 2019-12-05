# IT Service and Security -> ing

### What is Secure Coding?

The practice of developing computer software in a way that guards against the accidental introduction of security vulnerabilities.

### The three most crucial components of security 보안의 3요소

**CIA** (Confidentiality 기밀성, Integrity 무결성, availability 가용성)

### Software Development Life Cycle (SDLC)

1. Requirement gathering and analysis
2. Design
3. Implement / Coding
4. Testing
5. Deployment
6. Maintenance

- 기획/분석(요구실행) -> 설계 -> 구현 -> 시험 -> 이행 -> 운영/유지보수
- As the development of IoT, 'Security by Design' is getting more and more important.
- 'Security by Design' : Software has been designed from the foundation to be secure. Free of vulnerabilities. (= 보안 내재화)
- 'Supply-chain security' : efforts to enhance the security of the supply chain or value chain, the transport and logistics system for the world's cargo. (= 공급망 보안)

기획 - 이행 단계 : 각 단계마다 보안을 고려 = 정보보호 사전점검
분석 - 구현 : SW 개발 보안 (안전행정부에서 진행)
이행 이후 ~ : ISMS-P / 이행 이후 규칙대로 운영되고 있는지 체크

### HTTP (HyperText Transfer Protocol)

- HTML 문서를 네트워크를 통해서 전달 받기 위한 통신 규약
- Request - Response (요청 - 응답 구조) (Client/browser - server)
- Connectionless = stateless ()= 상태관리 / 연결관리를 하지 않는다)
  - There is no link between two requests being successively carried out on the same connection.
  - Sessionless 와 유사

연결 시 : 3 way handshaking(합의) (SYN - SYN/ACK - ACK) => 브라우저에서 먼저 요청

연결 해제시 : 4 way handshaking (FIN - FIN/ACK - FIN(서버가 보냄) - FIN/ACK)

### Cookie 🍪

- *Stateless*의 한계를 보완하기 위해 나온 개념
- 비연속성을 극복하기 위해 서버가 클라이언트에게 남기는 자취. (쿠키라는 이름은 헨델과 그레텔 동화에서 따왔음)
- a small piece of data that a server sends to the user’s web browser
- 쉽게 노출되고 위조/변조 될 수 있는 취약성이 있음.

### Proxy

- 중계인, 대리인. 클라이언트와 서버의 요청과 응답을 중계하는 역할을 함. 1) Caching 2) Monitering 가능 -> 통제 가능
- 나가는 요청 / 들어오는 응답을 일시적으로 멈추는 기능이 있음 (= intercept, trap을 건다, tampering한다)
- Proxy를 쓰기 위해서는 *1. Local Proxy가 실행*되어야 한다.

Fiddler, Paros, Burp suite ...
