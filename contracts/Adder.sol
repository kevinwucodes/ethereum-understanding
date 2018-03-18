pragma solidity ^0.4.20;

contract Adder {
  uint result;

  event ResultEvent (
    uint result,
    string name
  );

  //new constructor
  function Adder() public {
    result = 1234;
  }

  function addNumbers(uint a, uint b) public {
    result = a + b;
    ResultEvent(result, 'hello there');
  }

  function getResult() constant public returns (uint) {
    return result;
  }
}
