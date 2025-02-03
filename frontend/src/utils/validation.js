export const validateEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    
    // Domain validation (optional)
    const [, domain] = email.split('@');
    if (domain) {
        // Prevent common typos and disposable email services
        const suspiciousDomains = ['gmial.com', 'yahooo.com', 'hotmai.com', 'temp-mail.org'];
        const suggestedFixes = {
            'gmial.com': 'gmail.com',
            'yahooo.com': 'yahoo.com',
            'hotmai.com': 'hotmail.com'
        };
        
        if (suspiciousDomains.includes(domain)) {
            const suggestion = suggestedFixes[domain];
            return suggestion ? `Did you mean ${suggestion}?` : 'This email domain is not allowed';
        }
    }
    
    return '';
}; 