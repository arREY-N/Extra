import { useState, useEffect } from 'react';
import { GridItem } from './Containers';
import { format } from '../SampleData';

import DayIcon from '@mui/icons-material/WbSunnyOutlined';
import NightIcon from '@mui/icons-material/NightlightRounded';

export function Greeting() {
    const [date, setDate] = useState(new Date().toLocaleString('en-US', format));
    const [greeting, setGreeting] = useState("Good day");
    const [isNight, setIsNight] = useState(false);
    const [username, setUsername] = useState("Guest");

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(d => new Date().toLocaleDateString('en-US', format));
        }, 1000);

        return () => clearInterval(interval);
    },[]);

    useEffect(() => {
        setGreeting(() => {
            const currentHour = new Date().getHours();
            
            return (currentHour > 6 && currentHour < 12) ? "Good morning" : 
                (currentHour >= 12 && currentHour < 18) ? "Good afternoon" : 
                "Good evening";
        });
    
        setIsNight(() => {
            const currentHour = new Date().getHours();
            return currentHour >= 18 || currentHour < 6;
        })
    }, [])

    return(
        <GridItem $spanCols = {12} style={{margin: '10px'}}>
            <div className='greeting'>
                <div className='icon'>
                    <div className='svg-icon'>
                        {
                            isNight ?
                            <NightIcon style={{ width: '70px', height: '70px' }} /> : 
                            <DayIcon style={{ width: '70px', height: '70px' }} />
                        }
                    </div>
                </div>
                <div className='greeting-text'>
                    <h3>{date}</h3>
                    <h2>{greeting}, {username}!</h2>
                </div>
            </div>    
        </GridItem>
    );
}

export default Greeting;