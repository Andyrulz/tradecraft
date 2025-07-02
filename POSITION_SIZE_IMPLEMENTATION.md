# Position Size Calculation - Enhanced Implementation

## Overview

The position size calculation has been updated from placeholder values to risk-based calculations that provide realistic, actionable position sizing recommendations.

## Position Size Logic

### Risk-Based Calculation

```
Position Size % = (Risk per Trade %) / (Risk per Share %) × Adjustments
```

### Base Risk per Trade (% of Portfolio)

- **All Timeframes**: 0.5% of portfolio maximum risk per trade

### Risk per Share Calculation

```
Risk per Share % = (Stop Loss Distance / Current Price) × 100
```

### Adjustment Factors

#### Confidence Level Multiplier

- **High Confidence**: 1.2x (increase position size)
- **Medium Confidence**: 1.0x (standard size)
- **Low Confidence**: 0.6x (reduce position size)

#### Volatility Adjustment

- **High Volatility (ATR > 3%)**: 0.7x (reduce for risk)
- **Normal Volatility**: 1.0x (standard size)

#### Volume Confirmation (Frontend Only)

- **Volume Spike**: 1.1x (slight increase)
- **Normal Volume**: 0.9x (slight decrease)

### Position Size Ranges

- **Minimum**: 0.5% of portfolio
- **Maximum**: 8-10% of portfolio
- **Typical Range**: 1-5% of portfolio

## Examples

### Swing Trade Example

- Current Price: $100
- Stop Loss: $98 (2% risk per share)
- Base Risk: 0.5% of portfolio
- Position Size: 0.5% ÷ 2% = 25% of portfolio
- **Result**: Allocate 25% of portfolio (if stop hits, lose exactly 0.5%)

### Positional Trade Example

- Current Price: $50
- Stop Loss: $47.50 (5% risk per share)
- Base Risk: 0.5% of portfolio
- Position Size: 0.5% ÷ 5% = 10% of portfolio
- **Result**: Allocate 10% of portfolio (if stop hits, lose exactly 0.5%)

### Long Term Example

- Current Price: $200
- Stop Loss: $180 (10% risk per share)
- Base Risk: 0.5% of portfolio
- Position Size: 0.5% ÷ 10% = 5% of portfolio
- **Result**: Allocate 5% of portfolio (wide stop = smaller position, but same 0.5% risk)

## Integration

### Backend API (`lib/api.ts`)

- Calculates position size based on actual stop loss distance
- Includes confidence and volatility adjustments
- Updates summary text with specific position size recommendations

### Frontend (`app/trade-plan/page.tsx`)

- Enhanced calculation with volume confirmation
- Consistent with backend methodology
- Real-time updates based on timeframe changes

### UI Display

- Shows percentage of portfolio to allocate
- Consistent recommendations between text and metrics
- Clear risk-based rationale

## Benefits

1. **Realistic Sizing**: No more 100% position sizes
2. **Risk-Consistent**: Larger stops = smaller positions
3. **Confidence-Based**: High confidence setups get larger allocations
4. **Volatility-Aware**: Reduces size for volatile stocks
5. **Timeframe-Appropriate**: Different base risk for different holding periods
