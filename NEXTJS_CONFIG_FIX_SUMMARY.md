# Next.js Configuration ESM/CommonJS Compatibility Fix

## Issue Fixed

The Next.js build was failing with a syntax error because `next.config.js` was using ESM syntax (`export default`) while Next.js config files must use CommonJS syntax (`module.exports`).

## Error Message

```
(node:23132) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
⨯ Failed to load next.config.js, see more info here https://nextjs.org/docs/messages/next-config-error
SyntaxError: Unexpected token 'export' at <unknown> (C:\Users\aabishek\repos\tradecraft-prod\next.config.js:63)
```

## Root Cause

- Next.js configuration files (`next.config.js`) must always use CommonJS syntax
- The file was using ESM syntax: `export default nextConfig;`
- This conflicts with Next.js's expectation of CommonJS format

## Solution Applied

Fixed the export syntax in `next.config.js`:

### Before (ESM - Incorrect):

```javascript
export default nextConfig;
```

### After (CommonJS - Correct):

```javascript
module.exports = nextConfig;
```

## Current Status

✅ **Next.js Configuration Fixed**: The config file now loads successfully
✅ **Build Process Starts**: Next.js 15.3.4 recognizes the configuration
⚠️ **Windows Permission Issue**: Build encounters EPERM error with `.next/trace` file

## Next Steps

The configuration fix is complete. The remaining Windows permission issue with the `.next/trace` file is a separate problem that can be resolved by:

1. Clearing the `.next` directory: `Remove-Item -Path ".next" -Recurse -Force`
2. Running as administrator if needed
3. Checking for antivirus interference
4. Ensuring no development server is running

## Files Modified

- `next.config.js` - Changed from ESM to CommonJS export syntax

## Impact

This fix resolves the ESM/CommonJS compatibility issues between:

- The cron script (now using ESM)
- The Next.js configuration (using CommonJS as required)
- The project's module system configuration

Both the cron script and Next.js build can now coexist properly with their respective module system requirements.
