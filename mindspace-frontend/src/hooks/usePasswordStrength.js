import { useState, useCallback } from "react";

export const usePasswordStrength = () => {
  const [strength, setStrength] = useState(0);

  const calculateStrength = useCallback((password) => {
    let score = 0;
    
    if (password.length >= 8) score += 25;
  
    if (/[A-Z]/.test(password)) score += 25;
    
    if (/[0-9]/.test(password)) score += 25;
    
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    
    setStrength(score);
    return score;
  }, []);

  return { strength, calculateStrength };
};