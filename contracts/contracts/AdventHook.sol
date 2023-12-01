// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@unlock-protocol/contracts/dist/PublicLock/IPublicLockV13.sol";
import "./IERC20.sol";
// import "hardhat/console.sol";

error TOO_EARLY(uint day);
error MISSING_PREVIOUS_DAY(uint day);
error BAD_DAY(uint day);
error NOT_ALLOWED();

contract AdventHookNext {
    event Random(
        address indexed player,
        uint indexed random,
        string indexed prize
    );

    uint public start;
    mapping(address => uint) public dayByLock;
    mapping(uint => address) public lockByDay;
    mapping(uint => uint) public maxNumberOfWinnersByDay;
    mapping(uint => uint[]) public winnersByDay;

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

        if (day == 0) {
            revert BAD_DAY(day);
        }

        // Check that we are not too early!
        if (block.timestamp < start + (day - 1) * 1 days) {
            revert TOO_EARLY(day);
        }

        // Check if the user has the previous day!
        if (day > 1) {
            if (IPublicLockV13(lockByDay[day - 1]).balanceOf(recipient) < 1) {
                revert MISSING_PREVIOUS_DAY(day - 1);
            }
        }

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
        uint day = dayByLock[msg.sender];
        if (day == 0) {
            revert BAD_DAY(day);
        }
        if (maxNumberOfWinnersByDay[day] > 0) {
            if (winnersByDay[day].length < maxNumberOfWinnersByDay[day]) {
                // Ok let's see if we have a winner!
                // If we do, save it!
            }
        }
    }

    function setMaxNumberOfWinners(uint day, uint maxNumberOfWinners) external {
        address lock = lockByDay[day];
        if (!IPublicLockV13(lock).isLockManager(msg.sender)) {
            revert NOT_ALLOWED();
        }
        maxNumberOfWinnersByDay[day] = maxNumberOfWinners;
    }
}
