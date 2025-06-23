import styled from "styled-components";

export const PillStyle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(${props => props.$textColor || '--black' });
    overflow: hidden;
    white-space: nowrap;

    .pillIcon{
        flex: 1fr;
        margin-right: 10px;
    }

    .pillInfo{
        flex: 2;
    }

    .pillIcon > img{
        border-radius: 50%;
    }

    .value{
        font-size: ${props => props.$fontSize || '1.5'}rem;
        font-weight: bold;
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
                    <div className="title">
                        {props.$title}
                    </div>
                    <div className="value">
                        {props.$value}
                    </div>
                </div>
            </PillStyle>
        </>
    );
}

