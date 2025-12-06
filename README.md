# Electricity Bill Calculator App

A web application to calculate electricity bills with user authentication and data persistence using Supabase.

## Features

- ✅ User Registration & Login
- ✅ Calculate electricity bills
- ✅ Save billing calculations to database
- ✅ View billing history
- ✅ User profile management
- ✅ Secure authentication with Row Level Security
- ✅ Persistent data storage

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Supabase (PostgreSQL + Auth)
- **Authentication:** Supabase Auth (Email/Password)
- **Database:** PostgreSQL via Supabase

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/adriandelacruz202400732-web/bill-calculator-app-Delacruz.git
cd bill-calculator-app-Delacruz
```

### 2. Supabase Configuration
1. Go to https://supabase.com/dashboard/project/bbhuszbmuxcxqseezblh
2. Run the SQL schema (see `SETUP_AND_TESTING.md`)
3. Your API credentials are already in `supabase.js`

### 3. Open the Application
1. Open `index.html` in your web browser
2. Or use a local server (Live Server in VS Code recommended)

## Project Structure

```
bill-calculator-app-delacruz/
├── index.html              # Home page
├── login.html              # Login page
├── register.html           # Registration page
├── userdashboard.html      # User dashboard
├── calculatorpage.html     # Billing calculator
├── resultpage.html         # Billing history
├── profilepage.html        # User profile
├── supabase.js            # Supabase configuration & auth functions
├── style.css              # Stylesheet
├── README.md              # This file
├── .gitignore             # Git ignore file
└── SETUP_AND_TESTING.md   # Setup & testing guide
```

## Database Schema

### billing table
```sql
- id (UUID) - Primary key
- user_id (UUID) - Foreign key to auth.users
- month (TEXT) - Month of billing
- bill (NUMERIC) - Bill amount
- created_at (TIMESTAMP) - Creation date
```

## Usage

1. **Register** - Create a new account with email and password
2. **Login** - Sign in with your credentials
3. **Calculate** - Enter readings and rate to calculate bills
4. **Save** - Store calculations in your history
5. **View History** - See all your past calculations
6. **Logout** - Safely end your session

## Security Features

- ✅ Row Level Security (RLS) - Users only see their own data
- ✅ Email/Password authentication
- ✅ Secure API key management
- ✅ Session-based access control

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Adding Features
1. Create new HTML file
2. Add authentication check with `initAuth()`
3. Use `supabaseClient` for database operations
4. Style with `style.css`

### Debugging
- Open browser console (F12)
- Check Supabase dashboard logs
- Review network requests in DevTools

## Troubleshooting

### Registration/Login Issues
- Verify email provider is enabled in Supabase
- Check browser console for error messages
- Clear localStorage and try again

### Calculation Not Saving
- Ensure you're logged in
- Check Supabase table exists: `billing`
- Verify RLS policies are set up correctly

### History Not Loading
- Confirm you're authenticated
- Check database permissions
- Verify Row Level Security policies

## Future Enhancements

- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Monthly analytics/charts
- [ ] Export history to PDF/CSV
- [ ] Bill reminders
- [ ] Multiple user accounts support
- [ ] Dark mode theme

## License

This project is open source and available under the MIT License.

## Author

Adrian De La Cruz

## Support

For issues or questions, please open an issue on GitHub or contact the developer.

---

**Last Updated:** December 6, 2025
**Version:** 1.0.0
