// @vercel/crons 0 */4 * * *
import CRON from './refresh/cron';

export const runtime = 'nodejs';
export const maxDuration = 600; // 10 minutes timeout for rate-limited processing
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export default CRON;
