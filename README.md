# chrome-storage-quota

Storage quota monitoring for Chrome extensions. Track usage, set threshold alerts, inspect per-key breakdowns, and clean up stale entries. Built for Manifest V3.

INSTALL

```
npm install chrome-storage-quota
```

USAGE

```typescript
import { StorageQuota } from 'chrome-storage-quota';
```

The entire API is static methods on the StorageQuota class. No instantiation needed.

CHECK USAGE

```typescript
const localBytes = await StorageQuota.getLocalUsage();
const syncBytes  = await StorageQuota.getSyncUsage();
const percent    = await StorageQuota.getUsagePercent('local');

console.log(StorageQuota.formatBytes(localBytes));
// "3.2 MB"
```

getLocalUsage() returns total bytes consumed in chrome.storage.local.
getSyncUsage() returns total bytes consumed in chrome.storage.sync.
getUsagePercent(area) returns an integer 0-100 representing how full the given area is relative to its quota (10 MB for local, 100 KB for sync).

PER-KEY BREAKDOWN

```typescript
const breakdown = await StorageQuota.getBreakdown('local');
// [{ key: 'history', bytes: 48210 }, { key: 'prefs', bytes: 1024 }, ...]
```

getBreakdown(area) returns every key in the storage area with its byte size, sorted largest first.

FIND LARGEST ITEMS

```typescript
const top3 = await StorageQuota.getLargest(3, 'sync');
```

getLargest(count, area) is a convenience wrapper that returns the top N entries from getBreakdown.

THRESHOLD ALERTS

```typescript
const timer = StorageQuota.watchUsage(80, (percent) => {
  console.log(`Storage is at ${percent}%`);
}, 30000);

// Stop watching later
clearInterval(timer);
```

watchUsage(thresholdPercent, callback, intervalMs) polls local storage usage on an interval (default 60 seconds). When the percentage meets or exceeds the threshold, the callback fires with the current percent.

CLEANUP BY AGE

```typescript
const removed = await StorageQuota.cleanOlderThan(30, 'createdAt');
console.log(`Removed ${removed} stale entries`);
```

cleanOlderThan(days, timestampKey) scans chrome.storage.local for objects where the given timestamp field is older than the specified number of days and removes them. Returns the count of deleted keys.

FORMAT BYTES

```typescript
StorageQuota.formatBytes(1048576);  // "1.0 MB"
StorageQuota.formatBytes(2048);     // "2.0 KB"
StorageQuota.formatBytes(512);      // "512 B"
```

API REFERENCE

StorageQuota.getLocalUsage() - Returns bytes used in local storage.
StorageQuota.getSyncUsage() - Returns bytes used in sync storage.
StorageQuota.getUsagePercent(area) - Returns usage as an integer percentage. Area is "local" or "sync", defaults to "local".
StorageQuota.getBreakdown(area) - Returns array of { key, bytes } sorted by size descending.
StorageQuota.getLargest(count, area) - Returns the top N items from getBreakdown. Count defaults to 5.
StorageQuota.watchUsage(threshold, callback, intervalMs) - Polls usage and fires callback when threshold is met. Returns a timer handle for clearInterval.
StorageQuota.cleanOlderThan(days, timestampKey) - Removes local storage entries older than the given age. Timestamp key defaults to "createdAt".
StorageQuota.formatBytes(bytes) - Converts a byte count to a human-readable string (B, KB, or MB).

BROWSER SUPPORT

Chrome 90+ with Manifest V3.

LICENSE

MIT. See LICENSE file.

---

Built at zovo.one
