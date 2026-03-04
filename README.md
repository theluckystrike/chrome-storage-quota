# chrome-storage-quota

[![npm version](https://img.shields.io/npm/v/chrome-storage-quota)](https://npmjs.com/package/chrome-storage-quota)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Web Extension](https://img.shields.io/badge/Chrome-Web%20Extension-orange.svg)](https://developer.chrome.com/docs/extensions/)
[![CI Status](https://github.com/theluckystrike/chrome-storage-quota/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/chrome-storage-quota/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/chrome-storage-quota?style=social)](https://github.com/theluckystrike/chrome-storage-quota)

> Manage storage quotas in Chrome extensions.

**chrome-storage-quota** provides utilities to check, monitor, and manage storage usage with quota warnings and cleanup utilities. Part of the Zovo Chrome extension utilities.

Part of the [Zovo](https://zovo.one) developer tools family.

## Overview

chrome-storage-quota provides utilities to check, monitor, and manage storage usage with quota warnings and cleanup utilities.

## Features

- ✅ **Quota Checking** - Check storage quota usage
- ✅ **Usage Monitoring** - Real-time usage monitoring
- ✅ **Warning Events** - Get notified at thresholds
- ✅ **Cleanup Utilities** - Built-in cleanup helpers
- ✅ **TypeScript Support** - Full type definitions included

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

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/quota-improvement`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/quota-improvement`
7. **Submit** a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/theluckystrike/chrome-storage-quota.git
cd chrome-storage-quota

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

## Built by Zovo

Part of the [Zovo](https://zovo.one) developer tools family — privacy-first Chrome extensions built by developers, for developers.

## See Also

### Related Zovo Repositories

- [zovo-extension-template](https://github.com/theluckystrike/zovo-extension-template) - Boilerplate for building privacy-first Chrome extensions
- [zovo-types-webext](https://github.com/theluckystrike/zovo-types-webext) - Comprehensive TypeScript type definitions for browser extensions
- [chrome-storage-plus](https://github.com/theluckystrike/chrome-storage-plus) - Type-safe storage wrapper

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT - [Zovo](https://zovo.one)

---

Built by [Zovo](https://zovo.one)
