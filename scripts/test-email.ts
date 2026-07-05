import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testResendEmail() {
  console.log('🧪 Testing Resend Email Configuration...\n');

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  console.log('📋 Configuration:');
  console.log(`   API Key: ${apiKey ? '✅ Present' : '❌ Missing'}`);
  console.log(`   From Email: ${fromEmail}`);
  console.log(`   Admin Emails: ${process.env.ADMIN_EMAILS || 'Not set'}\n`);

  if (!apiKey) {
    console.error('❌ RESEND_API_KEY is missing in .env.local');
    process.exit(1);
  }

  const resend = new Resend(apiKey);

  try {
    console.log('📧 Sending test email...');
    const testEmail = 'nextwaveglobal509@gmail.com';
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: testEmail,
      subject: '✅ NextWave Global - Test Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; border-radius: 12px;">
          <h1 style="color: #b08d21;">🎯 NextWave Global</h1>
          <h2>Email Test Successful! ✅</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Status:</strong> <span style="color: #10b981;">✓ Delivered</span></p>
          </div>
          <p>This is a test email from NextWave Global.</p>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            If you received this, your Resend configuration is working! 🎉
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Email error:', error);
      process.exit(1);
    }

    console.log('✅ Test email sent successfully!');
    console.log(`   Email ID: ${data?.id}`);
    console.log(`   To: ${testEmail}`);
    console.log('\n🎉 All tests passed!\n');

  } catch (error) {
    console.error('❌ Test failed:', error);
    console.log('\n📝 Troubleshooting:');
    console.log('   1. Check RESEND_API_KEY is correct');
    console.log('   2. Visit resend.com to verify your account');
    process.exit(1);
  }
}

testResendEmail();