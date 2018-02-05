pragma solidity ^0.4.0;

contract Adder {
  uint result;

  event ResultEvent (
    uint result,
    string name
  );

  function addNumbers(uint a, uint b) public {
    result = a + b;
    ResultEvent(result, 'hello there');
  }

  function getResult() constant public returns (uint) {
    return result;
  }
}
