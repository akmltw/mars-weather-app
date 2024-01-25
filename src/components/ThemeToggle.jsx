import React from 'react';
import { ToggleButton } from './ThemeToggle.styles';

const ThemeToggle = ({ theme, onClick }) => {
    return (
        <ToggleButton onClick={onClick}>
            {theme === 'light' ? '🌞' : '🌜'}
        </ToggleButton>
    );
};

export default ThemeToggle;