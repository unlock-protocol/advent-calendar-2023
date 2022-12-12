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
      address, /* from */
      address, /* recipient */
      address, /* referrer */
      bytes calldata, /* data */
      uint256, /* minKeyPrice */
      uint256 /* pricePaid */
  ) external {
    uint lock = dayByLock[msg.sender];
    if (lock == 12) {
      IERC20 usdc = IERC20(0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174);
      uint balance = usdc.balanceOf(address(this));
      if(balance >= 1000000 && tokenId > 1) {
        address user = IPublicLock(msg.sender).ownerOf(tokenId-1);
        usdc.transfer(user, 1000000);
      }
    }
  }

}
