import './styles/NavBar.css';
import { useState } from 'react';
import DayIcon from '@mui/icons-material/WbSunnyOutlined';
import NightIcon from '@mui/icons-material/NightlightRounded';


export default function NavBar() {

    const [theme, setTheme] = useState("Dark Mode");


    function toggleTheme(){
        document.body.classList.toggle('dark');
        setTheme(prevTheme => prevTheme === "Light Mode" ? "Dark Mode" : "Light Mode");
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
                    <button onClick={toggleTheme}>{theme}</button>
                </GridItem>
            </GridItem>
        </nav>
    );
}
