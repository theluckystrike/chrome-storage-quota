/**
 * Storage Quota — Monitor and manage Chrome storage usage
 */
export class StorageQuota {
    /** Get local storage usage in bytes */
    static async getLocalUsage(): Promise<number> { return chrome.storage.local.getBytesInUse(null); }

    /** Get sync storage usage in bytes */
    static async getSyncUsage(): Promise<number> { return chrome.storage.sync.getBytesInUse(null); }

    /** Get usage percentage */
    static async getUsagePercent(area: 'local' | 'sync' = 'local'): Promise<number> {
        const quota = area === 'local' ? (chrome.storage.local.QUOTA_BYTES || 10485760) : (chrome.storage.sync.QUOTA_BYTES || 102400);
        const used = area === 'local' ? await this.getLocalUsage() : await this.getSyncUsage();
        return Math.round((used / quota) * 100);
    }

    /** Get per-key storage breakdown */
    static async getBreakdown(area: 'local' | 'sync' = 'local'): Promise<Array<{ key: string; bytes: number }>> {
        const storage = area === 'local' ? chrome.storage.local : chrome.storage.sync;
        const all = await storage.get(null);
        const breakdown: Array<{ key: string; bytes: number }> = [];
        for (const key of Object.keys(all)) {
            const bytes = await storage.getBytesInUse(key);
            breakdown.push({ key, bytes });
        }
        return breakdown.sort((a, b) => b.bytes - a.bytes);
    }

    /** Get largest items */
    static async getLargest(count: number = 5, area: 'local' | 'sync' = 'local'): Promise<Array<{ key: string; bytes: number }>> {
        const breakdown = await this.getBreakdown(area);
        return breakdown.slice(0, count);
    }

    /** Set alert when usage exceeds threshold */
    static watchUsage(thresholdPercent: number, callback: (percent: number) => void, intervalMs: number = 60000): NodeJS.Timeout {
        return setInterval(async () => {
            const percent = await this.getUsagePercent();
            if (percent >= thresholdPercent) callback(percent);
        }, intervalMs) as any;
    }

    /** Clean up items by age (requires timestamp in stored objects) */
    static async cleanOlderThan(days: number, timestampKey: string = 'createdAt'): Promise<number> {
        const cutoff = Date.now() - days * 86400000;
        const all = await chrome.storage.local.get(null);
        const keysToRemove: string[] = [];
        for (const [key, value] of Object.entries(all)) {
            if (value && typeof value === 'object' && (value as any)[timestampKey] < cutoff) keysToRemove.push(key);
        }
        if (keysToRemove.length) await chrome.storage.local.remove(keysToRemove);
        return keysToRemove.length;
    }

    /** Format bytes to human readable */
    static formatBytes(bytes: number): string {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / 1048576).toFixed(1)} MB`;
    }
}
