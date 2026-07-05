#!/bin/bash
# scripts/test-api.sh

echo "🧪 Testing API Endpoints..."
echo ""

# Set base URL
BASE_URL="http://localhost:3000"

# Test 1: Admin Auth
echo "📋 Test 1: Admin Authentication"
echo "POST ${BASE_URL}/api/admin/auth"
curl -X POST "${BASE_URL}/api/admin/auth" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"1234"}' \
  -c cookies.txt \
  -w "\nStatus: %{http_code}\n"
echo ""

# Test 2: Get Registrations (Admin)
echo "📋 Test 2: Get Registrations"
echo "GET ${BASE_URL}/api/admin/registrations"
curl -X GET "${BASE_URL}/api/admin/registrations" \
  -b cookies.txt \
  -w "\nStatus: %{http_code}\n"
echo ""

# Test 3: Get Events (Public)
echo "📋 Test 3: Get Events"
echo "GET ${BASE_URL}/api/events"
curl -X GET "${BASE_URL}/api/events" \
  -w "\nStatus: %{http_code}\n"
echo ""

# Test 4: Registration (Public)
echo "📋 Test 4: Submit Registration"
echo "POST ${BASE_URL}/api/registration"
TEST_EMAIL="test$(date +%s)@example.com"
curl -X POST "${BASE_URL}/api/registration" \
  -H "Content-Type: application/json" \
  -d "{
    \"fullName\": \"Test User\",
    \"email\": \"${TEST_EMAIL}\",
    \"eventId\": \"leadership-in-action\",
    \"phone\": \"08012345678\"
  }" \
  -w "\nStatus: %{http_code}\n"
echo ""

# Clean up
rm -f cookies.txt
echo "🧹 Cleaned up cookies"
echo ""
echo "✅ API tests complete!"