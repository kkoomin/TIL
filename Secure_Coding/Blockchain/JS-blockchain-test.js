/* sha256 hash */
const sha256 = require("sha256");

/*블록체인 객체 정의*/
function Blockchain() {
  this.difficulty = 4; // <--- 난이도 목표를 숫자로 변경
  this.chain = [];
  this.pendingTransactions = [];

  /* 제네시스 블록 생성 */
  this.createNewBlock(0, 0, 0);
}

/*블록체인 생성 함수 정의*/

Blockchain.prototype.createNewBlock = function(previousBlockHash, nonce, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transaction: this.pendingTransactions,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousBlockHash
  };

  this.pendingTransactions = [];
  this.chain.push(newBlock);

  return newBlock;
};

const jscoin = new Blockchain();

// 마지막 블록을 반환하는 함수를 정의
Blockchain.prototype.getLastBlock = function() {
  return this.chain[this.chain.length - 1];
};

//transaction을 정의하는 함수
Blockchain.prototype.createNewTransaction = function(
  sender,
  recipient,
  amount
) {
  const newTransaction = {
    sender: sender,
    recipient: recipient,
    amount: amount
  };

  this.pendingTransactions.push(newTransaction);

  return;
};

/* 블록 해쉬값을 구하는 함수 정의*/
Blockchain.prototype.hashBlock = function(
  previousBlockHash,
  currentBlockData,
  nonce
) {
  const data =
    previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(data);

  return hash;
};

/* 난이도를 체크하는 함수 */
Blockchain.prototype.checkDifficulty = function(hash) {
  let head = hash.substring(0, this.difficulty);
  return (head.match(/0/g) || []).length == this.difficulty;
};

/* 작업증명 코드를 추가 */
Blockchain.prototype.pow = function(previousBlockHash, currentBlockData) {
  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while (!this.checkDifficulty(hash)) {
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  }
  return nonce;
};

/* test code */
const previousBlockHash = "previousBlockHash";
const currentBlockData = [
  { sender: "a", recipient: "b", amount: 100 },
  { sender: "c", recipient: "d", amount: 200 },
  { sender: "e", recipient: "f", amount: 300 }
];

const nonce = jscoin.pow(previousBlockHash, currentBlockData);
console.log(nonce);

const hash = jscoin.hashBlock(previousBlockHash, currentBlockData, nonce);
console.log(hash);
