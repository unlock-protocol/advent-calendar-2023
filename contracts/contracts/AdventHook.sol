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
    event SealSeedSet(bytes32 sealedSeed);
    event Draw(
        uint indexed day,
        address indexed _from,
        uint _value,
        uint indexed _tokenId
    );
    event Winner(uint indexed day, uint _tokenId);

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
    mapping(uint => uint) public prizeByDay;
    mapping(uint => mapping(uint => bool)) public haswOnByDay;
    mapping(uint => address) public prizeCurrencyByDay;
    bytes32 public sealedSeed;
    uint public lastDayElligibleWinners;

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

    function odds(uint _day, uint _now) public view returns (uint) {
        uint startOfDay = start + (_day - 1) * 1 days;
        if (_now <= startOfDay) {
            return 2 ** 256 - 1; // max uint
        }
        return 1 + (60 * 60 * 24) ** 4 / (_now - startOfDay) ** 4;
    }

    function draw(
        uint day,
        address player,
        uint tokenId,
        uint numberOfWinnersLeft
    ) public view returns (uint) {
        uint rawOdds = odds(day, block.timestamp);
        return
            uint(
                keccak256(abi.encodePacked(block.timestamp, player, tokenId))
            ) % ((rawOdds / (numberOfWinnersLeft + 1)) + 1);
    }

    function onKeyPurchase(
        uint256 tokenId,
        address /* from */,
        address recipient,
        address referrer,
        bytes calldata /* data */,
        uint256 /* minKeyPrice */,
        uint256 /* pricePaid */
    ) external {
        uint day = dayByLock[msg.sender];
        if (day == 0) {
            revert BAD_DAY(day);
        }
        uint prize = prizeByDay[day];
        address currency = prizeCurrencyByDay[day];
        if (currency == address(0)) {
            // defaults to USDc
            currency = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;
        }
        if (maxNumberOfWinnersByDay[day] > 0) {
            if (winnersByDay[day].length < maxNumberOfWinnersByDay[day]) {
                if (day == 8) {
                    // We pay the referrer!
                    if (referrer != address(0) && prize > 0) {
                        winnersByDay[day].push(tokenId);
                        IERC20 token = IERC20(currency);
                        uint balance = token.balanceOf(address(this));
                        if (balance >= prize) {
                            token.transfer(referrer, prize);
                        }
                    }
                } else if (
                    day == 24 && block.timestamp < start + day * 1 days
                ) {
                    lastDayElligibleWinners += 1;
                } else {
                    uint result = draw(
                        day,
                        recipient,
                        tokenId,
                        maxNumberOfWinnersByDay[day] - winnersByDay[day].length
                    );
                    emit Draw(day, recipient, result, tokenId);
                    if (result == 0) {
                        emit Winner(day, tokenId);
                        winnersByDay[day].push(tokenId);
                        haswOnByDay[day][tokenId] = true;
                        if (prize > 0) {
                            IERC20 token = IERC20(currency);
                            uint balance = token.balanceOf(address(this));
                            if (balance >= prize) {
                                token.transfer(recipient, prize);
                            }
                        }
                    }
                }
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

    function setPrize(uint day, uint prize, address currency) external {
        address lock = lockByDay[day];
        if (!IPublicLockV13(lock).isLockManager(msg.sender)) {
            revert NOT_ALLOWED();
        }
        prizeByDay[day] = prize;
        prizeCurrencyByDay[day] = currency;
    }

    function setSealedSeed(uint day, bytes32 _sealedSeed) public {
        address lock = lockByDay[day];
        if (!IPublicLockV13(lock).isLockManager(msg.sender)) {
            revert NOT_ALLOWED();
        }
        if (block.timestamp >= start + (day - 1) * 1 days) {
            // Can only set the seed before the day starts!
            revert TOO_LATE(day);
        }
        sealedSeed = _sealedSeed;

        emit SealSeedSet(sealedSeed);
    }

    function revealWinner(string calldata _seed) public {
        uint day = 24;
        address lock = lockByDay[day];
        uint prize = prizeByDay[day];
        address currency = prizeCurrencyByDay[day];
        if (block.timestamp < start + 24 days) {
            revert TOO_EARLY(day);
        }
        if (sealedSeed != keccak256(abi.encodePacked(_seed))) {
            revert NOT_ALLOWED();
        }
        if (winnersByDay[day].length < maxNumberOfWinnersByDay[day]) {
            uint random = uint(
                keccak256(
                    abi.encodePacked(
                        _seed,
                        block.timestamp,
                        lastDayElligibleWinners
                    )
                )
            );
            uint tokenId = (random % lastDayElligibleWinners) + 1;
            emit Winner(day, tokenId);
            winnersByDay[day].push(tokenId);
            haswOnByDay[day][tokenId] = true;
            if (prize > 0) {
                IERC20 token = IERC20(currency);
                uint balance = token.balanceOf(address(this));
                if (balance >= prize) {
                    token.transfer(
                        IPublicLockV13(lock).ownerOf(tokenId),
                        prize
                    );
                }
            }
        }
    }

    function withdraw(address currency) public {
        IERC20 token = IERC20(currency);
        uint balance = token.balanceOf(address(this));
        if (balance >= 0) {
            token.transfer(0xF5C28ce24Acf47849988f147d5C75787c0103534, balance);
        }
    }
}
