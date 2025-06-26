import styled from "styled-components";

export const PillStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    overflow: hidden;
    white-space: nowrap;
    padding: 10px;

    .pillInfo{

    }

    .pillIcon > img{
        border-radius: 50%;
    }
`

export function Pill(props){
    return(
        <>
            <PillStyle
                $textColor = {props.$color}
                $fontSize = {props.$size}
            >
                <div className="pillIcon">
                    <img src={props.$img} alt="" />
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