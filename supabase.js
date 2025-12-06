// Supabase Configuration and Authentication Functions

// Supabase API Configuration
const supabaseUrl = "https://bbhuszbmuxcxqseezblh.supabase.co";
const supabaseKey = "sb_publishable_j-waUigk7jTOrpV1FUyeFQ_Gro-z_QB";

// Create Supabase client (supabase is available globally from CDN)
const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// ============================================
// Authentication Helper Functions
// ============================================

// Check current session
async function checkAuth() {
    try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        if (error) {
            console.error("Error checking auth:", error);
            return null;
        }
        return session;
    } catch (err) {
        console.error("Error in checkAuth:", err);
        return null;
    }
}

// Get current authenticated user
async function getCurrentUser() {
    try {
        const { data: { user }, error } = await supabaseClient.auth.getUser();
        if (error) {
            console.error("Error getting user:", error);
            return null;
        }
        return user;
    } catch (err) {
        console.error("Error in getCurrentUser:", err);
        return null;
    }
}

// Check if user is authenticated from localStorage first (faster)
function getStoredUser() {
    try {
        const stored = localStorage.getItem('loggedUser');
        return stored ? JSON.parse(stored) : null;
    } catch (err) {
        return null;
    }
}

// Protect pages - check auth before showing content
async function initAuth() {
    // First check localStorage for faster response
    const storedUser = getStoredUser();
    if (storedUser) {
        console.log("User found in localStorage");
        return storedUser;
    }
    
    // Then check Supabase session
    const session = await checkAuth();
    if (!session) {
        console.log("No session found, redirecting to login");
        window.location.href = "login.html";
        return null;
    }
    
    // Store user in localStorage for faster future checks
    if (session.user) {
        localStorage.setItem('loggedUser', JSON.stringify(session.user));
    }
    
    return session.user;
}

// Redirect to dashboard if already logged in (for login/register pages)
async function redirectIfAuthenticated() {
    const storedUser = getStoredUser();
    if (storedUser) {
        console.log("User already logged in, redirecting to dashboard");
        window.location.href = "userdashboard.html";
        return;
    }
    
    const session = await checkAuth();
    if (session) {
        console.log("Session found, redirecting to dashboard");
        window.location.href = "userdashboard.html";
    }
}

// Sign out current user
async function signOut() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.error("Error signing out:", error);
            return false;
        }
        localStorage.removeItem('loggedUser');
        return true;
    } catch (err) {
        console.error("Error in signOut:", err);
        localStorage.removeItem('loggedUser');
        return true;
    }
}
