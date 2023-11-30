// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@unlock-protocol/contracts/dist/PublicLock/IPublicLockV13.sol";
import "./IERC20.sol";
import "hardhat/console.sol";

error TOO_EARLY(uint day);
error MISSING_PREVIOUS_DAY(uint day);
error BAD_DAY(uint day);

contract AdventHook {
    event Random(
        address indexed player,
        uint indexed random,
        string indexed prize
    );

    uint public start;
    mapping(address => uint) public dayByLock;
    mapping(uint => address) public lockByDay;

    function initialize(address[] memory _locks, uint _start) external {
        for (uint j = 0; j < _locks.length; j++) {
            dayByLock[_locks[j]] = j + 1;
            lockByDay[j + 1] = _locks[j];
        }
        start = _start;
    }

    function keyPurchasePrice(
        address /* from */,
        address recipient,
        address /* referrer */,
        bytes calldata /*data*/
    ) external view returns (uint256 minKeyPrice) {
        uint day = dayByLock[msg.sender];
        console.log("IN THE HOOK!");
        if (day == 0) {
            revert BAD_DAY(day);
        }

        // Check that we are not too early!
        if (block.timestamp < start + (day - 1) * 1 days) {
            console.log("IN TOO_EARLY HOOK!");
            revert TOO_EARLY(day);
        }

        // Check if the user has the previous day!
        if (day > 1) {
            if (IPublicLockV13(lockByDay[day - 1]).balanceOf(recipient) < 1) {
                revert MISSING_PREVIOUS_DAY(day - 1);
            }
        }
        console.log("FINE!");

        return IPublicLockV13(msg.sender).keyPrice();
    }

    function onKeyPurchase(
        uint256 tokenId /* tokenId */,
        address from /* from */,
        address /* recipient */,
        address /* referrer */,
        bytes calldata /* data */,
        uint256 /* minKeyPrice */,
        uint256 /* pricePaid */
    ) external {
        // uint day = dayByLock[msg.sender];
        // // Check that this is called on the 24th only!
        // if (day != 24) {
        //     revert TOO_EARLY(day);
        // }
        // Winner!
    }
}
