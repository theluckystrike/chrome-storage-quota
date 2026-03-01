# chrome-storage-quota — Storage Monitoring for Extensions
> **Built by [Zovo](https://zovo.one)** | `npm i chrome-storage-quota`

Usage tracking, per-key breakdown, quota alerts, age-based cleanup, and formatting.

```typescript
import { StorageQuota } from 'chrome-storage-quota';
const percent = await StorageQuota.getUsagePercent();
const largest = await StorageQuota.getLargest(5);
StorageQuota.watchUsage(80, (p) => alert(`${p}% used`));
```
MIT License
