# Supabase Connection Setup Guide

## ✅ Project Status: Connected

Your Bill Calculator app is now fully configured to use Supabase for authentication and data storage.

### Configuration Details
- **Supabase URL:** `https://bbhuszbmuxcxqseezblh.supabase.co`
- **Project ID:** `bbhuszbmuxcxqseezblh`
- **Configuration File:** `supabase.js` (centralized)

---

## 🔧 Setup Instructions

### Step 1: Create the Database Table

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/bbhuszbmuxcxqseezblh)
2. Click **SQL Editor** → **New Query**
3. Copy and paste the following SQL:

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

4. Click **Run** and verify the table was created

### Step 2: Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Ensure **Email** provider is enabled
3. (Optional) Configure email templates in **Email Templates** section

### Step 3: Test the Application

1. Open `index.html` in your browser
2. Test the **Register** flow
3. Test the **Login** flow
4. Test the **Calculator** page
5. Test **Save Result** to verify database integration
6. Test **View History** to confirm data retrieval

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
├── profilepage.html        # User profile
├── supabase.js            # ✨ Centralized Supabase config (NEW)
├── style.css              # Styles
└── SUPABASE_SETUP.md      # This file
```

---

## 🔐 Security Features

✅ **Centralized Configuration** - Credentials in one file
✅ **Row Level Security (RLS)** - Users can only access their own data
✅ **Authentication** - Supabase Auth handles user management
✅ **Email Verification** - Optional email confirmation on signup
✅ **Session Management** - localStorage + Supabase session tracking

---

## 🐛 Troubleshooting

### Issue: "Cannot read property 'from' of undefined"
**Solution:** Make sure `supabase.js` is properly imported in your HTML file
```javascript
import { supabase } from './supabase.js';
```

### Issue: Authentication not working
**Solution:** 
1. Verify Email provider is enabled in Supabase
2. Check browser console for error messages
3. Ensure localStorage is not disabled

### Issue: Cannot save billing records
**Solution:**
1. Verify the `billing` table exists
2. Check that RLS policies are created
3. Ensure user is logged in (check localStorage)
4. Check browser console and Supabase logs

### Issue: CORS errors
**Solution:** Supabase handles CORS automatically. If you see errors:
1. Check browser console
2. Verify project URL matches in `supabase.js`
3. Clear browser cache and try again

---

## 🚀 Next Steps (Optional Features)

- Add password reset functionality
- Implement two-factor authentication
- Add export billing history to CSV
- Add monthly bill charts/analytics
- Implement bill reminders

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

---

**Last Updated:** December 6, 2025
**Status:** ✅ Production Ready
