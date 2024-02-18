// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);
    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

struct RiskIndicatorsInputs {
    /// @notice Maximum collateral ratio in general
    uint256 maxCollateralRatio;
    /// @notice Maximum collateral ratio for a given leg
    uint256 maxCollateralRatioPerLeg;
    /// @notice Maximum leverage for a given leg
    uint256 maxLeveragePerLeg;
    /// @notice Base Spread for a given leg (without demand part)
    int256 baseSpreadPerLeg;
    /// @notice Fixed rate cap
    uint256 fixedRateCapPerLeg;
    /// @notice Demand spread factor used to calculate demand spread
    uint256 demandSpreadFactor;
    /// @notice expiration date in seconds
    uint256 expiration;
    /// @notice signature of data (maxCollateralRatio, maxCollateralRatioPerLeg,maxLeveragePerLeg,baseSpreadPerLeg,fixedRateCapPerLeg,demandSpreadFactor,expiration,asset,tenor,direction)
    /// asset - address
    /// tenor - uint256
    /// direction - uint256
    bytes signature;
}

interface IAmmOpenSwapServiceStEth {
    /// @notice It opens a swap for stETH pay-fixed receive-floating with a tenor of 28 days.
    /// @param beneficiary address of the owner of the swap.
    /// @param inputAsset address of the entered asset used by sender to open the swap which is accounted in underlying asset.
    /// @param inputAssetTotalAmount total amount of input asset used by sender to open the swap, represented in decimals of the input asset.
    /// @param acceptableFixedInterestRate acceptable fixed interest rate, represented in 18 decimals.
    /// @param leverage swap leverage, represented in 18 decimals.
    /// @return swapId ID of the opened swap.
    /// @dev The address `beneficiary` is the swap's owner. Sender pays for the swap.
    function openSwapReceiveFixed28daysStEth(
        address beneficiary,
        address inputAsset,
        uint256 inputAssetTotalAmount,
        uint256 acceptableFixedInterestRate,
        uint256 leverage,
        RiskIndicatorsInputs calldata riskIndicatorsInputs
    ) external payable returns (uint256);

    /// @notice It opens a swap for stETH pay-fixed receive-floating with a tenor of 28 days.
    /// @param beneficiary address of the owner of the swap.
    /// @param inputAsset address of the entered asset used by sender to open the swap which is accounted in underlying asset.
    /// @param inputAssetTotalAmount total amount of input asset used by sender to open the swap, represented in decimals of the input asset.
    /// @param acceptableFixedInterestRate acceptable fixed interest rate, represented in 18 decimals.
    /// @param leverage swap leverage, represented in 18 decimals.
    /// @return swapId ID of the opened swap.
    /// @dev The address `beneficiary` is the swap's owner. Sender pays for the swap.
    function openSwapPayFixed28daysStEth(
        address beneficiary,
        address inputAsset,
        uint256 inputAssetTotalAmount,
        uint256 acceptableFixedInterestRate,
        uint256 leverage,
        RiskIndicatorsInputs calldata riskIndicatorsInputs
    ) external payable returns (uint256);
}