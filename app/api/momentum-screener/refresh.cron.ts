// Vercel cron jobs are deprecated - using GitHub Actions instead
// This file is kept for reference but not used
import CRON from './refresh/cron';

export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes (Vercel limit) - but cron is disabled anyway
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export default CRON;
