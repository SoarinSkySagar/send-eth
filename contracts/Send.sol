// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.20;

contract Send {

    event Sent(address _sender, address _receiver, uint _amount, uint _uid);

    struct Tx {
        address sender;
        address reciever;
        uint value;
        uint uid;
    }

    mapping (uint => Tx) transactions;
    mapping (address => uint[]) accountSentUId;
    mapping (address => uint[]) accountReceivedUId;

    function generateUid(address _sender, address _receiver) internal view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(block.timestamp, _sender, _receiver)));
        return rand % 10000000;
    }

    function send(address _receiver) public payable returns (uint) {
        if (msg.value != 0) {
            payable(_receiver).transfer(msg.value);
            uint uid = generateUid(msg.sender, _receiver);
            transactions[uid] = Tx(msg.sender, _receiver, msg.value, uid);
            accountSentUId[msg.sender].push(uid);
            accountReceivedUId[_receiver].push(uid);
            emit Sent(msg.sender, _receiver, msg.value, uid);
            return uid;
        } else {
            return 0;
        }
    }

    function getTxDetails(uint _uid) public view returns (Tx memory) {
        return transactions[_uid];
    }

    function getAllTxDetails(address _address) public view returns (Tx[] memory) {
        uint[] memory txs = getAllTransactions(_address);
        Tx[] memory txDetails = new Tx[](txs.length);

        for (uint i = 0; i < txs.length; i++) {
            txDetails[i] = transactions[txs[i]];
        }

        return txDetails;
    }

    function getAllTransactions(address _account) public view returns (uint[] memory) {
        uint[] memory txs = new uint[](accountSentUId[_account].length + accountReceivedUId[_account].length);
        
        for (uint i = 0; i < accountSentUId[_account].length; i++) {
            txs[i] = accountSentUId[_account][i];
        }

        for (uint j = 0; j < accountReceivedUId[_account].length; j++) {
            txs[accountSentUId[_account].length + j] = accountReceivedUId[_account][j];
        }

        return txs;
    }
}