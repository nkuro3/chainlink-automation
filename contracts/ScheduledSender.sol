// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.19;

import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ScheduledSender is ERC20, AutomationCompatibleInterface {
	uint public lastTimeStamp;
	address public receiver;

	event Send();

	constructor(address _receiver) ERC20("Dummy Token", "DUMMY") {
		_mint(address(this), 1 ether);
		lastTimeStamp = block.timestamp;
		receiver = _receiver;
	}

	function mint(uint amount) external {
		_mint(address(this), amount);
	}

	function setReceiver(address _receiver) external {
		receiver = _receiver;
	}

	function _validate() internal view returns (bool) {
		uint balance = balanceOf(address(this));
		return block.timestamp > lastTimeStamp && balance >= 0.1 ether && receiver != address(0);
	}

	function checkUpkeep(bytes calldata /* unused */) external view returns (bool upkeepNeeded, bytes memory /* unused */) {
		upkeepNeeded = _validate();
	}

	function performUpkeep(bytes calldata /* unused */) external {
		// revalidationg is recommended
		send();
	}

	function send() public {
		require(_validate());
		lastTimeStamp = block.timestamp;
		transfer(receiver, 0.1 ether);

		emit Send();
	}
}
