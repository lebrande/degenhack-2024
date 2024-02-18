// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import {FlashLoanSimpleReceiverBase} from "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

import "./types.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract FixedStakeRate is FlashLoanSimpleReceiverBase {
    address public constant iporRouter = 0x16d104009964e694761C0bf09d7Be49B7E3C26fd;
    IAmmOpenSwapServiceStEth public immutable iporSwapService = IAmmOpenSwapServiceStEth(iporRouter);

    address public constant uniswapSwapRouterAddress =
        0xE592427A0AEce92De3Edee1F18E0157C05861564;
    ISwapRouter public immutable swapRouter =
        ISwapRouter(uniswapSwapRouterAddress);

    address payable owner;
    address constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address constant wstETH = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;
    uint24 constant MAX_LTV = 7850; // 4 decimals - 0.7850

    // Uniswap pool fee - 0.3%
    uint24 public constant poolFee = 3000;

    IERC20 public wEthToken = IERC20(WETH);
    IERC20 public wstEthToken = IERC20(wstETH);

    uint256 public dev_lastSwapWstEth;

    RiskIndicatorsInputs public riskIndicatorsInputs;

    constructor(
        address _addressProvider
    ) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider)) {
        owner = payable(msg.sender);
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        uint256 amountOwed = amount + premium;

        IERC20(asset).approve(address(POOL), amountOwed * 999);

        POOL.supply(asset, amount / 2, owner, 0);

        POOL.borrow(
            WETH,
            // amount * MAX_LTV / 10000,
            // temporary assume that we borrow just 50% amount
            (amount * 10) / 100,
            2,
            0,
            owner
        );

        dev_lastSwapWstEth = this.swapWEthToWstEth(
            IERC20(WETH).balanceOf(address(this))
        );

        uint256 leverage = 400 * 1e18;

        // for receiveFixed - short
        // uint256 acceptableFixedInterestRate = 0; 

        // for payFixed - long
        uint256 acceptableFixedInterestRate = 20 * 1e18; 

        IERC20(asset).approve(address(iporSwapService), amountOwed * 999);

        // iporSwapService.openSwapReceiveFixed28daysStEth(
        iporSwapService.openSwapPayFixed28daysStEth(
            owner,
            wstETH,
            1 ether,
            acceptableFixedInterestRate,
            leverage,
            riskIndicatorsInputs
        );

        return true;
    }

    function openPosition(
        uint256 _amount,
        RiskIndicatorsInputs calldata _riskIndicatorsInputs
    ) public {
        IERC20(wstETH).transferFrom(msg.sender, address(this), _amount);
        riskIndicatorsInputs = _riskIndicatorsInputs;

        address receiverAddress = address(this);
        address asset = wstETH;
        uint256 amount = _amount;
        bytes memory params = "";
        uint16 referralCode = 0;

        POOL.flashLoanSimple(
            receiverAddress,
            asset,
            amount,
            params,
            referralCode
        );
    }

    function getBalance(address _tokenAddress) external view returns (uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }

    function withdraw(address _tokenAddress) external onlyOwner {
        IERC20 token = IERC20(_tokenAddress);
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }

    receive() external payable {}

    function swapWEthToWstEth(
        uint256 amountIn
    ) external returns (uint256 amountOut) {
        wEthToken.approve(address(swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: WETH,
                tokenOut: wstETH,
                fee: poolFee,
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        amountOut = swapRouter.exactInputSingle(params);
    }

    function dev_revertSwap() external returns (uint256 amountOut) {
        wstEthToken.approve(address(swapRouter), dev_lastSwapWstEth * 999);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: wstETH,
                tokenOut: WETH,
                fee: poolFee,
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: dev_lastSwapWstEth,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        amountOut = swapRouter.exactInputSingle(params);
    }
}
