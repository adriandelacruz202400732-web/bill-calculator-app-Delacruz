# Bill Calculator App - Setup & Testing Guide

## ✅ Configuration Complete

Your app is now configured with:
- **Supabase URL:** `https://bbhuszbmuxcxqseezblh.supabase.co`
- **API Key:** `sb_publishable_j-waUigk7jTOrpV1FUyeFQ_Gro-z_QB`
- **Authentication:** Email/Password via Supabase Auth
- **Configuration File:** `supabase.js` (centralized)

---

## 📋 Step 1: Create Database Table

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/project/bbhuszbmuxcxqseezblh)
2. Click **SQL Editor** → **New Query**
3. Copy and paste this SQL:

```sql
-- Create billing table
CREATE TABLE billing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  month text NOT NULL,
  bill numeric NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE billing ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own bills
CREATE POLICY "Users can view own bills" ON billing
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own bills
CREATE POLICY "Users can insert own bills" ON billing
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own bills
CREATE POLICY "Users can update own bills" ON billing
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own bills
CREATE POLICY "Users can delete own bills" ON billing
  FOR DELETE USING (auth.uid() = user_id);
```

4. Click **Run**
5. Verify the table appears in **Table Editor**

---

## 📋 Step 2: Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Ensure **Email** provider is enabled (toggle ON)
3. (Optional) Go to **Email Templates** to customize signup/confirmation emails

---

## 🧪 Quick Test Checklist

### Test 1: Open Application
- Open `index.html` in your browser
- You should see the homepage with login/register buttons

### Test 2: User Registration
1. Click **Register** button
2. Fill in:
   - Email: `test@example.com` (or any valid email)
   - Password: `password123` (at least 6 characters)
3. Click **Register**
4. Expected Result:
   - Success message: "Registered successfully..."
   - Redirects to login page

### Test 3: User Login
1. Enter the email and password from Test 2
2. Click **Login**
3. Expected Result:
   - Successfully logs in
   - Redirects to `userdashboard.html`
   - Shows welcome message

### Test 4: Page Protection
1. **Without logging in**, manually type into browser:
   - `calculatorpage.html`
   - `resultpage.html`
   - `profilepage.html`
2. Expected Result:
   - All redirect to `login.html`

### Test 5: Calculator Functionality
1. After logging in, click **Calculate Now**
2. Fill in:
   - Previous Reading: `100`
   - Current Reading: `150`
   - Rate per kWh: `10.50`
3. Click **Compute**
4. Expected Result:
   - Shows: "Total Bill: 525.00 PHP"
   - (50 kWh × 10.50 = 525)

### Test 6: Save Billing Record
1. After computing, click **Save Result**
2. Enter Month: `January 2025`
3. Click OK
4. Expected Result:
   - Shows success message
   - Billing History table updates with new record
   - Table shows: "January 2025 | 525.00"

### Test 7: View Results Page
1. Click **View History**
2. Expected Result:
   - Shows all saved calculations
   - Most recent first
   - Displays each calculation with month and bill amount

### Test 8: Multiple Calculations
1. Go back to Calculator
2. Create 2-3 more calculations with different values
3. Click **View History**
4. Expected Result:
   - All calculations appear
   - Data is correct

### Test 9: Profile Page
1. Click **Profile**
2. Expected Result:
   - Shows your email address
   - Has **Logout** button

### Test 10: Logout
1. Click **Logout**
2. Expected Result:
   - Clears session
   - Redirects to `index.html`
3. Try accessing `calculatorpage.html` again
4. Expected Result:
   - Redirects to `login.html`

---

## 🐛 Troubleshooting

### ❌ "Cannot find module 'supabase'" or blank page
**Solution:**
- Make sure `supabase.js` is in the same folder as your HTML files
- Check browser console (F12 → Console) for errors
- Verify the Supabase CDN link is loading

### ❌ Registration/Login fails
**Solution:**
- Check browser console for error messages
- Verify email provider is enabled in Supabase
- Try a different email address
- Check Supabase dashboard → Logs

### ❌ Cannot save calculations
**Solution:**
- Verify the `billing` table exists in Supabase
- Check that Row Level Security (RLS) policies are created
- Ensure you're logged in (check browser console)
- Check browser console for database error messages

### ❌ Results page shows "No history yet" but you saved data
**Solution:**
- Verify user_id is being saved correctly
- Check that RLS policies allow SELECT operations
- Verify you're viewing results while logged in with same account
- Go to Supabase Table Editor to manually check if data exists

### ❌ CORS or network errors
**Solution:**
- Verify Supabase URL is correct: `https://bbhuszbmuxcxqseezblh.supabase.co`
- Verify API Key is correct: `sb_publishable_j-waUigk7jTOrpV1FUyeFQ_Gro-z_QB`
- Clear browser cache (Ctrl+Shift+Delete)
- Try in incognito/private mode

---

## 🔧 Browser Console Commands

Open browser console (F12 → Console tab) and test:

```javascript
// Check if Supabase is loaded
console.log(supabaseClient);

// Check current session
checkAuth().then(session => console.log('Session:', session));

// Check current user
getCurrentUser().then(user => console.log('User:', user));
```

---

## 📁 Project Structure

```
bill-calculator-app-delacruz/
├── index.html              # Home page
├── login.html              # Login page
├── register.html           # Registration page
├── userdashboard.html      # User dashboard
├── calculatorpage.html     # Billing calculator
├── resultpage.html         # View billing history
├── profilepage.html        # User profile & logout
├── supabase.js            # ✨ Centralized Supabase config
├── style.css              # Styles
└── SETUP_AND_TESTING.md   # This guide
```

---

## 🔐 Security Features Implemented

✅ **Centralized Configuration** - All credentials in one file
✅ **Row Level Security (RLS)** - Users only see their own data
✅ **Authentication** - Email/Password via Supabase Auth
✅ **Page Protection** - Protected pages redirect to login
✅ **Session Management** - localStorage + Supabase sessions
✅ **Safe Logout** - Clears all session data

---

## ✨ Features Your App Has

1. **User Registration** - Create new accounts
2. **User Login** - Authenticate with email/password
3. **Bill Calculator** - Calculate electricity bills
4. **Save Records** - Store calculations in database
5. **View History** - See all past calculations
6. **User Profile** - View account email
7. **Logout** - End session safely
8. **Data Privacy** - Each user only sees their data

---

## 🚀 Next Steps (Optional Enhancements)

- Add password reset functionality
- Implement password strength requirements
- Add email verification on signup
- Create monthly/yearly analytics charts
- Export billing history to PDF/CSV
- Add bill reminders/notifications
- Implement bill categories
- Add payment tracking

---

## 📞 Support Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)

---

**Last Updated:** December 6, 2025
**Status:** ✅ Ready for Testing
