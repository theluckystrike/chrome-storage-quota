# chrome-storage-quota

Manage storage quotas in Chrome extensions.

## Overview

chrome-storage-quota provides utilities to check, monitor, and manage storage usage with quota warnings and cleanup utilities.

## Installation

```bash
npm install chrome-storage-quota
```

## Usage

### Check Quota

```javascript
import { StorageQuota } from 'chrome-storage-quota';

const quota = await StorageQuota.check('sync');
console.log(quota.used, quota.quota);
```

### Monitor Usage

```javascript
const monitor = new StorageQuota('local');

monitor.on('warning', (data) => {
  console.log('80% used:', data.used);
});
```

## API

### Methods

- `check(type)` - Check quota usage
- `getUsage(type)` - Get usage details

## Browser Support

- Chrome 90+

## License

MIT
