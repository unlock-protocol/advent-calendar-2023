// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@unlock-protocol/contracts/dist/PublicLock/IPublicLockV13.sol";
import "./IERC20.sol";
import "hardhat/console.sol";

error TOO_EARLY(uint day);
error TOO_LATE(uint day);
error MISSING_PREVIOUS_DAY(uint day);
error BAD_DAY(uint day);
error NOT_ALLOWED();

contract AdventHookNext {
    uint public start;
    mapping(address => uint) public dayByLock;
    mapping(uint => address) public lockByDay;
    mapping(uint => address[]) public winners; // winners by day, an array filled
    mapping(uint => uint) public winnerIndices; // index of the 1st winner by day

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
        uint256 tokenId,
        address /* from */,
        address recipient,
        address /* referrer */,
        bytes calldata /* data */,
        uint256 /* minKeyPrice */,
        uint256 /* pricePaid */
    ) external {
        uint day = dayByLock[msg.sender];
        if (day == 0) {
            revert BAD_DAY(day);
        }

        if (winnerIndices[day] == 0) {
            if (winners[day].length < 1) {
                winners[day][0] = recipient;
            } else {
                // add to winners array, at a random position!
                uint random = uint(
                    keccak256(
                        abi.encodePacked(block.timestamp, tokenId, recipient)
                    )
                ) % (winners[day].length + 1);
                address swappee = winners[day][random];
                winners[day][random] = recipient;
                winners[day].push(swappee);
            }

            // Set the winner... but only after the first day is over!
            if (block.timestamp > start + day * 1 days) {
                winnerIndices[day] =
                    uint(
                        keccak256(abi.encodePacked(block.timestamp, msg.sender))
                    ) %
                    (winners[day].length + 1);
            }
        }
    }
}
