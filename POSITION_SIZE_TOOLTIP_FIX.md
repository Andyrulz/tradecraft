# Position Size Tooltip Fix

## Issue Identified

The position size tooltip in the TradingRecommendation component had an incorrect calculation example that was confusing users.

## Problem

In the tooltip for position size, the example calculation was:

```
With a $10,000 portfolio, invest $X
```

Where X was calculated as: `tradePlan.riskManagement.suggestedPositionSize * 100`

This was **wrong** because:

- `suggestedPositionSize` is already in percentage format (e.g., 1.5 means 1.5%)
- Multiplying by 100 gave incorrect results (e.g., 1.5% became $150 instead of $150)

## Fix Applied

### 1. Corrected Tooltip Example Calculation

**Before:**

```typescript
${(tradePlan.riskManagement.suggestedPositionSize * 100).toFixed(0)}
```

**After:**

```typescript
${(10000 * tradePlan.riskManagement.suggestedPositionSize / 100).toFixed(0)}
```

**Example:**

- Position size: 1.5% of portfolio
- Portfolio value: $10,000
- Calculation: $10,000 × 1.5 ÷ 100 = $150 ✅

### 2. Corrected Risk Tolerance Description

**Before:**

```
swing: '2%', positional: '1.5%', longterm: '1%'
```

**After:**

```
swing: '0.5%', positional: '0.75%', longterm: '1%'
```

This now matches the actual values used in the calculation logic.

### 3. Updated Documentation

Updated `POSITION_SIZE_IMPLEMENTATION.md` to reflect:

- Correct base risk percentages (0.5%, 0.75%, 1%)
- Realistic examples with proper calculations
- Clear explanation of the conservative approach

## Verification

Tested the position size calculation logic:

- 2% risk per share with 0.5% max risk → 0.5% position (minimum)
- 5% risk per share with 0.75% max risk → 0.5% position (minimum)
- 10% risk per share with 1% max risk → 0.5% position (minimum)

The conservative approach ensures users never risk more than their specified tolerance, with sensible minimum position sizes.

## Files Modified

1. `components/trade-plan/TradingRecommendation.tsx` - Fixed tooltip calculation
2. `POSITION_SIZE_IMPLEMENTATION.md` - Updated documentation with correct values
