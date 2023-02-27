var web3;

/**
 * 실습 환경에 맞는 값 할당
 */
const SEPOLIA_URL = "https://sepolia.infura.io/v3/"; // infura의 나의 프로젝트에서 sepolia 주소 따옴
const CA = "0x8d2bAEC63383dF6c4c5521B4Bf401a622AeC6694"; // Contract Address => remix에서 내가 deploy한 contract의 주소
const STORAGE_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "num",
        "type": "uint256"
      }
    ],
    "name": "store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "number",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]; // ABI는 etherScan에서 CA로 검색으로 나온 Contract ABI => remix에서 아님

const privateKey =
  "2e534e34d9a4ea11fc35573efbbc334014ac3c2566ea2be412f746202aa27413";
var sender;
var senderAddress;
var storageContract;

/**
 * TODO:
 * web3 객체 만들기
 */

window.addEventListener("load", () => {
  if (typeof web3 !== "undefined") {
    window.web3 = new Web3(web3.currentProvider);
    alert("web3 injected");
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider(SEPOLIA_URL));
  }
  startApp();
});

/**
 * TODO:
 * 계정 정보 생성 및 초기 값 세팅
 */
function startApp() {
  // 1. 계정 정보
  sender = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
  web3.eth.accounts.wallet.add(sender);
  web3.eth.defaultAccount = sender.address;
  senderAddress = web3.eth.defaultAccount;
  // 2. storage 컨트랙트 인스턴스
  storageContract = new web3.eth.Contract(STORAGE_ABI, CA);
  // 3. 화면에 초기 값 세팅
  document.getElementById("contractAddr").innerHTML = CA;
  document.getElementById("accountAddr").innerHTML = senderAddress;
  web3.eth.getBlockNumber().then((blockNumber) => {
    document.getElementById("lastBlock").innerHTML = blockNumber;
  });
}

/**
 * TODO:
 * retrieve() 함수 호출 후 화면에 결과 표시
 */
function retrieve() {
  storageContract.methods
    .retrieve()
    .call({ from: senderAddress })
    .then(console.log)
    .catch((err) => console.log(err));
}

/**
 * TODO:
 * store() 함수 호출 후 화면에 결과 표시
 */
function store() {
  storageContract.methods
    .store(web3.utils.toHex(document.getElementById("newValue").value))
    .send({
      from: senderAddress,
      gas: web3.utils.toHex(30000000),
    })
    .then((result) => {
      console.log(web3.utils.toHex(document.getElementById("newValue").value));
      console.log(typeof(web3.utils.toHex(document.getElementById("newValue").value)));
      console.log(result);
        document.getElementById("txHash").innerHTML = result.transactionHash;
    });
        
}
