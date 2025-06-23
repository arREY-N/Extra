import './App.css';
import { GridContainer, GridItem, BorderedGridItem } from './Containers';
import { Pill } from './Pill'
import { LineChart, ChartStyle,Legend } from './Visual';
import { TransactionBox, Entry } from './Transaction';
import CategoryPie from './Charts';

function App(){
    return(
        <>
            <GridContainer>
                <GridItem>
                    <h1>Dashboard</h1>
                </GridItem>

                <BorderedGridItem $spanCols = {4} >
                    <Pill 
                        $img={'https://placehold.co/70'} 
                        $title = {'Balance'}
                        $value = {'P XXX,XXX.XX'}/>
                </BorderedGridItem>

                <BorderedGridItem $spanCols = {4}>
                    <Pill 
                        $img={'https://placehold.co/70'} 
                        $title = {'Balance'}
                        $value = {'P XXX,XXX.XX'}/>
                </BorderedGridItem>

                <BorderedGridItem $spanCols = {4}>
                    <Pill 
                        $img={'https://placehold.co/70'} 
                        $title = {'Balance'}
                        $value = {'P XXX,XXX.XX'}/>
                </BorderedGridItem>
                
                <BorderedGridItem $spanCols = {8}>
                    <LineChart/>
                </BorderedGridItem>

                <BorderedGridItem $spanCols = {4}>
                    <CategoryPie/>
                    <ChartStyle>
                        <div className="info">
                            <Legend 
                                $color = 'red'
                                $text = 'Category 1'/>
                                        
                            <Legend 
                                $color = 'green'
                                $text = 'Category 2'/>
                    
                            <Legend 
                                $color = 'blue'
                                $text = 'Category 3'/>
                        </div>
                    </ChartStyle>
                </BorderedGridItem>

                <TransactionBox>                                    
                    <Entry 
                        $name = 'Entry 1'
                        $date = {new Date().toLocaleDateString()}
                        $amount = {100}/>
                    <Entry 
                        $name = 'Entry 2'
                        $date = {new Date().toLocaleDateString()}
                        $amount = {1000}/>
                    <Entry 
                        $name = 'Entry 3'
                        $date = {new Date().toLocaleDateString()}
                        $amount = {1000}/>
                    <Entry 
                        $name = 'Entry 4'
                        $date = {new Date().toLocaleDateString()}
                        $amount = {1000}/>
                    <Entry 
                        $name = 'Entry 5'
                        $date = {new Date().toLocaleDateString()}
                        $amount = {1000}/>
                </TransactionBox>

                <BorderedGridItem 
                    style={
                        {
                            alignSelf: 'start',
                            aspectRatio: '1 / 1',
                            position: 'sticky',
                            top: '10px'
                        }
                    } 
                    $spanCols = {4}>
                </BorderedGridItem>
            </GridContainer>
        </>
    );
}

export default App