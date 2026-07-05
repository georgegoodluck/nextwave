import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const { Client } = pg;

async function testConnection() {
  console.log('🧪 Testing Supabase connection...\n');
  
  const connectionString = process.env.DATABASE_URL;
  console.log('📋 Connection string:', connectionString.replace(/:[^:]*@/, ':****@'));
  console.log('');

  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔌 Connecting...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    // Test query
    const result = await client.query('SELECT NOW() as time, version() as version');
    console.log('📊 Database info:');
    console.log(`   Time: ${result.rows[0].time}`);
    console.log(`   Version: ${result.rows[0].version}`);

    // List tables
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log(`\n📋 Tables found: ${tables.rows.length}`);
    tables.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });

    await client.end();
    console.log('\n✅ Test complete!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n📝 Troubleshooting tips:');
    console.log('   1. Check your password is correct');
    console.log('   2. Make sure the project is not paused in Supabase');
    console.log('   3. Try using the Direct connection string instead');
    console.log('   4. Check if your IP is blocked in Supabase');
    process.exit(1);
  }
}

testConnection();