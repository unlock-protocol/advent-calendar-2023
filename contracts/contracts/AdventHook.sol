// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@unlock-protocol/contracts/dist/PublicLock/IPublicLockV12.sol";
import "./BokkyPooBahsDateTimeLibrary.sol";
import "./IERC20.sol";
import "hardhat/console.sol";

error TOO_EARLY();
error MISSING_PREVIOUS_DAY();


contract AdventHook {
  using BokkyPooBahsDateTimeLibrary for uint;

  event Winner(address indexed winner, string indexed prize);
  event Random(address indexed player, uint indexed random, string indexed prize);

  mapping(address => uint) public dayByLock;
  mapping(uint => address) public lockByDay;

  address public winner1;
  address public winner2;
  address public winner3;

  constructor(address[] memory _locks) {
    for (uint j = 0; j < _locks.length; j++) {
      dayByLock[_locks[j]] = j + 1;
      lockByDay[j+1] = _locks[j];
    }
  }

  function keyPurchasePrice(
      address, /* buyer */
      address recipient, /* recipient */
      address, /* referrer */
      bytes memory /* data */
  ) external view returns (uint256 minKeyPrice) {
    uint year = BokkyPooBahsDateTimeLibrary.getYear(block.timestamp);
    uint month = BokkyPooBahsDateTimeLibrary.getMonth(block.timestamp);
    uint day = BokkyPooBahsDateTimeLibrary.getDay(block.timestamp);
    uint lock = dayByLock[msg.sender];

    // admin role
    if (recipient != 0x81Dd955D02D337DB81BA6c9C5F6213E647672052) {
      if (year < 2022 || month < 12 || day < lock) {
        revert TOO_EARLY();
      }
      if (lock > 1 && IPublicLock(lockByDay[lock-1]).balanceOf(recipient) == 0) {
        revert MISSING_PREVIOUS_DAY();
      }
    }

    return 0; // Free for everyone!
  }

  function onKeyPurchase(
      uint256 tokenId, /* tokenId */
      address from, /* from */
      address, /* recipient */
      address, /* referrer */
      bytes calldata, /* data */
      uint256, /* minKeyPrice */
      uint256 /* pricePaid */
  ) external {
    uint lock = dayByLock[msg.sender];
    // Check that this is called on the 24th only!
    if (lock != 24) {
      revert TOO_EARLY();
    }
    // We have 3 "prizes" to give!
    // First prize: one chance in 3000 
    if(winner1 == address(0x0)) {
      uint random = uint(keccak256(abi.encodePacked(block.timestamp + tokenId, from))) % 3000;
      emit Random(from, random, 'winner1');
      if (random == 1) {
        emit Winner(from, 'winner1');
        winner1 = from;
      }
    }
    // Second prize: one chance in 2000
    else if(winner2 == address(0x0)) {
      uint random = uint(keccak256(abi.encodePacked(block.timestamp + tokenId, from))) % 2000;
      emit Random(from, random, 'winner2');
      if (random == 1) {
        emit Winner(from, 'winner2');
        winner2 = from;
      }
    }
    // Third prize: one chance in 1000
    else if(winner3 == address(0x0)) {
      uint random = uint(keccak256(abi.encodePacked(block.timestamp + tokenId, from))) % 1000;
      emit Random(from, random, 'winner3');
      if (random == 1) {
        emit Winner(from, 'winner3');
        winner3 = from;
      }
    }
  }

}
