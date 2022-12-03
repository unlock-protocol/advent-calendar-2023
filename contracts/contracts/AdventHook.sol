// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@unlock-protocol/contracts/dist/PublicLock/IPublicLockV12.sol";
import "./BokkyPooBahsDateTimeLibrary.sol";
import "hardhat/console.sol";


error TOO_EARLY();
error MISSING_PREVIOUS_DAY();

contract AdventHook {
  using BokkyPooBahsDateTimeLibrary for uint;
  
  mapping(address => uint) public dayByLock;
  mapping(uint => address) public lockByDay;

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
    console.log('_________________________');

    if (year < 2022 || month < 12 || day < lock) {
      console.log('TOO EARLY!');
      console.log(year, month, day);
      console.log(lock);
      revert TOO_EARLY();
    }
    if (lock > 1 && IPublicLock(lockByDay[lock-1]).balanceOf(recipient) == 0) {
      console.log('MISSING PREVIOUS DAY!');
      console.log(lock);
      revert MISSING_PREVIOUS_DAY();
    }
    return 0; // Free for everyone!
  }

  function onKeyPurchase(
      uint256 tokenId,
      address, /* from */
      address, /* recipient */
      address, /* referrer */
      bytes calldata, /* data */
      uint256, /* minKeyPrice */
      uint256 /* pricePaid */
  ) external {
    // Do something if successful! Can we airdrop some cool things?
  }

}
