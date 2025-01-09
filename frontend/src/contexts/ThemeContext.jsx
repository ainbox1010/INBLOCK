import { createContext, useContext } from 'react';
import { modernTheme } from '../theme/modern/index.jsx';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    return (
        <ThemeContext.Provider value={modernTheme}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
} 