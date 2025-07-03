import React from "react";
import styled from "styled-components";

export const AnnouncementPillStyle = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 100%;
    transition: transform 0.3s ease;
    color: var(--secondary-color);
    height: auto;
    justify-content: space-between;
`


export const PillStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    overflow: hidden;
    white-space: nowrap;
    padding: 10px;
    width: 100%;
    transition: transform 0.3s ease;
    cursor: pointer;
    color: var(--secondary-color);

    .pillIcon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-bottom: 10px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        background-color: var(--secondary-color);
    }

    .pillIcon > img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        object-fit: cover;
        }
        
    .pillIcon > svg {
        color: var(--container-color);
        height: 35px;
        width: 35px;
    }
    
    .value h1 {
        margin: 0;
        font-size: ${props => props.$fontSize || '1.5rem'};
        transition: color 0.3s ease;
    }
    
    .title h3 {
        margin: 0;
        font-size: 0.9rem;
        color: var(--text-secondary);
        font-weight: normal;
    }
`

export const ReportPillStyle = styled.button`
    display: flex;
    flex-direction: row;
    margin: 0 10px;
    align-items: center;
    height: 45px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    background-color: var(--container-color);
    color: var(--secondary-color);

    &:hover {
        background-color: rgba(0,0,0,0.05);
        font-weight: 600;
    }

    .status{
        width: 10px;
        height: 100%;
        border-radius: 10px;
        background-color: var(${props => props.$isComplete ? '--highlight-b' : '--highlight-a'});
        margin-right: 10px;
    }
`

export const NullPillStyle = styled.div`
    display: flex;
    align-items: center;
    justify-items: center;
    color: rgba(0,0,0,0.5);
  
    h2{
        width: 100%;
        text-align: center;
    }

`


export function Pill(props){
    
    const IconComponent = typeof props.$img !== 'string' ? props.$img : null;
    
    return(
        <>
            <PillStyle
                $textColor = {props.$color}
                $fontSize = {props.$size}
            >
                <div className="pillIcon">
                    {typeof props.$img === 'string' ? (
                        <img src={props.$img} alt="" />
                    ) : IconComponent && (
                        React.createElement(IconComponent, {
                            style: { 
                                width: '35px', 
                                height: '35px'
                            }
                        })
                    )}
                </div>
                <div className="pillInfo">        
                    <div className="value">
                        <h1>{props.$value}</h1>
                    </div>
                    <div className="title">
                        <h3>{props.$title}</h3>
                    </div>
                </div>
            </PillStyle>
        </>
    );
}

export function ReportPill(props){
    return(
        <>
            <ReportPillStyle $isComplete = {props.$isComplete}>
                <div className="status">

                </div>
                <div className="month">
                    <p>{props.$date}</p>
                </div>
            </ReportPillStyle>
        </>
    );
}

export function AnnouncementPill(props){
    return(
        <AnnouncementPillStyle>
            <div className = 'description'>
                <p>{props.$description}</p>
            </div>
            <div className = 'value'>
                <h1>{props.$value}</h1>
                {
                    props.$sub !== null ? <p>{props.$sub}</p> : ""
                }
            </div>
        </AnnouncementPillStyle>
    );   
}

export function NullPill(){
    return(
        <NullPillStyle>
            <h2> No recorded transactions, yet! </h2>
        </NullPillStyle>
    );
}