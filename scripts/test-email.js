// scripts/test-email.js
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function testResendEmail() {
  console.log("🧪 Testing Resend Email Configuration...\n");

  // Check environment variables
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  console.log("📋 Configuration:");
  console.log(`   API Key: ${apiKey ? "✅ Present" : "❌ Missing"}`);
  console.log(`   From Email: ${fromEmail}`);
  console.log(`   Admin Emails: ${process.env.ADMIN_EMAILS || "Not set"}\n`);

  if (!apiKey) {
    console.error("❌ RESEND_API_KEY is missing in .env.local");
    process.exit(1);
  }

  const resend = new Resend(apiKey);

  try {
    // Test 1: Verify API key
    console.log("🔍 Testing API key...");
    await resend.emails.send({
      from: fromEmail,
      to: "test@example.com",
      subject: "Test Email",
      html: "<p>This is a test</p>",
    });
    console.log("✅ API key is valid!\n");

    // Test 2: Send real email
    console.log("📧 Sending test email...");
    const testEmail = process.env.TEST_EMAIL || "nextwaveglobal509@gmail.com";

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: testEmail,
      subject: "✅ NextWave Global - Test Email",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Test Email</title>
            <style>
              body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
              .container { background: #f5f5f5; padding: 30px; border-radius: 12px; }
              .header { color: #b08d21; font-size: 24px; font-weight: bold; }
              .success { color: #10b981; font-weight: bold; }
              .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">🎯 NextWave Global</div>
              <h2>Email Test Successful! ✅</h2>
              <div class="details">
                <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>From:</strong> ${fromEmail}</p>
                <p><strong>To:</strong> ${testEmail}</p>
                <p><strong>Status:</strong> <span class="success">✓ Delivered</span></p>
              </div>
              <p>This is a test email from NextWave Global.</p>
              <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
                If you received this, your Resend configuration is working properly!
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("❌ Error sending test email:", error);
      process.exit(1);
    }

    console.log(`✅ Test email sent to ${testEmail}`);
    console.log(`   Email ID: ${data?.id}`);
    console.log("\n🎉 All tests passed! Resend is configured correctly.\n");
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
}

testResendEmail();
