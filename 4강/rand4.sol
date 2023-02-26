// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

/**
 * Day 4. Base Code for Practice 
 */
contract FundRaising {
		
		uint public constant MINIMUM_AMOUNT = 1e16;  //10^16
		uint public fundRaisingCloses;  //모금 종료 시각  시간이 아닌 '시각'
		address public beneficiary;  //모금 수령자
        address[] funders;  //펀딩한 사람들, 대괄호 안에 수자 안 적으면 동적 배열이 되는 것이고 숫자를 적으면 그 크기만큼의 배열(정적 배열)이 되는 것이다.

    constructor (uint _duration, address _beneficiary) {
        //현재 블록의 유닉스 타임스탬프 값 +     _duration은 단위가 초이다.
        fundRaisingCloses = block.timestamp + _duration;
		beneficiary = _beneficiary;
    }

		//fund() 요구사항 
		//1. MINIMUM_AMOUNT 이상으로만 모금에 참여할 수 있다.
		//2. 모금 종료시각 이전에만 참여할 수 있다. -> 종료상태에 모금하면 거부된다.
		//3. 모금이 완료되면 모금자를 저장한다.
		//유효성 체크함수 
		
    function fund() public payable{  //모금 함수
		require(msg.value >= MINIMUM_AMOUNT, "MINIMUM AMOUNT: 0.01 ether");
		require(block.timestamp <= fundRaisingCloses, "FUND RAISING CLOSED");  // -> require에서 에러 메시지가 뜨는 시점이 true 일대인지, false일때인지 찾아봐야한다.

        address funder = msg.sender;
        funders.push(funder);
    }

    // cuurentcollection 요구사항
    // 1. 현재까지 모금된 금액을 누구나 확인할 수 있다.
    function currentCollection() public view returns(uint256) {  //현재 모금액 보는 함수
        return address(this).balance;
    }

    // withdraw 요구사항
    // 1. 지정된 수령자만 호출할 수 있다.
    // 2. 모금 종료 이후에만 호줄할 수 있다.
    // 3. 수령자에게 컨트랙트가 보유한 이더를 송금한다.

    // function withdraw() public payable {  //모금액 수령 함수
    //    require(msg.sender == beneficiary);
    //    require(block.timestamp > fundRaisingCloses);
    // }

    modifier onlyBeneficiary() {
        require(msg.sender == beneficiary);
        _;
    }

    modifier onlyAfterFundCloses() {
        require(block.timestamp > fundRaisingCloses, "FUND RAISING OPENED");
        _;
    }

    function withdraw() public payable onlyBeneficiary onlyAfterFundCloses {  //모금액 수령 함수
    //    require(block.timestamp > fundRaisingCloses, "FUND RAISING OPENED");
       payable(msg.sender).transfer(address(this).balance);
    }

    mapping(address => uint) fundLog;

    function selectRandomFunder() public view returns(address, uint){
        uint randNonce = 0;
        uint fundersLength = funders.length;
        uint random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % fundersLength;
        address randFunder = funders[random];
        return (randFunder, fundLog[randFunder]); // 랜덤한 기부자, 해당 기부자의 총 기부금액 반환
    }

}