import styled from "styled-components";

export const ChartStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .info{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .chart > img{
        width: 100%;
    }
`
export const LegendStyle = styled.div`
    margin: 2px 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;

    .legendIcon{
        flex-basis: 10px;
        flex-shrink: 0;
        flex-grow: 0;
        height: 10px;
        border-radius: 100px;
        margin-right: 5px;
        border: var(--wireframe);
    }
` 

export function Legend(props){
    return(
        <>
            <LegendStyle>
                <div 
                    className="legendIcon" 
                    style={{backgroundColor: props.$color}}
                />

                <p>{props.$text}</p>
            </LegendStyle>
        </>
    );
}