import '../styles/NavBar.css';
import { GridItem } from './Containers';
import { useEffect, useState } from 'react';

export default function NavBar() {

    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;  
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        return 'light';
    });

    useEffect(() => {
        document.body.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    function toggleTheme(){
        document.body.classList.toggle('dark');
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
    }

    return(
        <nav className="navbar">
            <GridItem className='navbar-container' $cols = {12}>
                <GridItem $spanCols={7}>
                    <h1>EXTRA</h1>    
                </GridItem>
                <GridItem className='nav-links' $spanCols = {5} $cols = {5}>
                    <a href="">Dashboard</a>
                    <a href="">History</a>
                    <a href="">Report</a>
                    <a href="">Settings</a>
                    <button onClick={toggleTheme}>
                        {theme === 'dark' ? "Light Mode" : "Dark Mode"}
                    </button>
                </GridItem>
            </GridItem>
        </nav>
    );
}
