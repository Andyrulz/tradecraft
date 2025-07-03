# Cron Script ESM Compatibility Fix

## Issue Fixed
The GitHub Actions workflow `cron-screener-script.yml` was failing because the Node.js script `scripts/refresh-momentum-screener.js` was using CommonJS syntax (`require()`) in a project configured as ESM (`"type": "module"` in package.json).

## Root Cause
- Project has `"type": "module"` in package.json, making Node.js treat `.js` files as ES modules
- Script was using CommonJS syntax: `require('https')`, `require('fs')`, `require('path')`
- This caused Node.js to throw: `ReferenceError: require is not defined in ES module scope`

## Solution Applied
Converted the script from CommonJS to ESM syntax:

### Before (CommonJS):
```javascript
const https = require('https');
const fs = require('fs');
const path = require('path');
```

### After (ESM):
```javascript
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

## Testing Results
- ✅ Script runs without syntax errors locally
- ✅ Log file created successfully
- ✅ GET request executed successfully (status 200, processed 55 stocks)
- ✅ Node.js syntax check passes
- ✅ Compatible with both manual execution and GitHub Actions environment

## GitHub Actions Workflows
1. **`cron-screener.yml`** - Uses direct curl commands (not affected by this issue)
2. **`cron-screener-script.yml`** - Uses the Node.js script (now fixed)
   - Currently disabled (schedule commented out)
   - Available for manual triggering via workflow_dispatch
   - Should now run successfully after this fix

## Files Modified
- `scripts/refresh-momentum-screener.js` - Converted to ESM syntax

## Next Steps
The script is now compatible with the project's ESM configuration and should run successfully in GitHub Actions. The workflow can be re-enabled if needed by uncommenting the schedule section in `cron-screener-script.yml`.
