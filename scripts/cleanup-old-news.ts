import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// One-time cleanup script to remove news older than 72 hours
async function cleanupOldNews() {
  const now = new Date();
  const seventyTwoHoursAgo = new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString();
  
  console.log(`Cleaning up news older than: ${seventyTwoHoursAgo}`);
  
  // First, check how many records will be deleted
  const { count: oldCount, error: countError } = await supabase
    .from('market_news')
    .select('*', { count: 'exact', head: true })
    .lt('published_at', seventyTwoHoursAgo);
  
  if (countError) {
    console.error('Error counting old records:', countError);
    return;
  }
  
  console.log(`Found ${oldCount || 0} old records to delete`);
  
  if (oldCount === 0) {
    console.log('No old records to delete.');
    return;
  }
  
  // Delete old records
  const { error: deleteError, count: deletedCount } = await supabase
    .from('market_news')
    .delete()
    .lt('published_at', seventyTwoHoursAgo);
  
  if (deleteError) {
    console.error('Error deleting old news:', deleteError);
  } else {
    console.log(`Successfully deleted ${deletedCount || 0} old news items`);
  }
  
  // Check remaining records
  const { count: remainingCount, error: remainingError } = await supabase
    .from('market_news')
    .select('*', { count: 'exact', head: true });
  
  if (!remainingError) {
    console.log(`Remaining records in table: ${remainingCount || 0}`);
  }
}

cleanupOldNews().then(() => {
  console.log('Cleanup complete.');
  process.exit(0);
}).catch(err => {
  console.error('Cleanup failed:', err);
  process.exit(1);
});
