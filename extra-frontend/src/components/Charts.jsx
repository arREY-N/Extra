import '../styles/App.css'
import { 
    Legend, 
    PieChart, 
    Pie, 
    Sector, 
    Cell, 
    ResponsiveContainer, 
    Customized,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Line,
    LineChart,
    BarChart,
    Bar,
    Label
} from 'recharts';

const COLORS = ['red', 'green', 'blue', '#FF8042'];

export function CategoryPie({data}) {
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
                <Legend 
                    verticalAlign="bottom" 
                    align="center" 
                    wrapperStyle={{ 
                        marginTop: 10, 
                        fontSize: '0.9rem', 
                        padding: '5px' 
                    }}     
                />

                <Pie
                    activeShape={renderActiveShape}
                    data={data}
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    legendType='circle'
                    cornerRadius={5} 
                >   
                    {data.map((_, index) => (
                        <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]}
                            stroke={COLORS[index % COLORS.length]}
                            className='pie-slice-cell'
                        />
                        ))
                    }       
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const mx = cx + (outerRadius) * cos;
    const my = cy + (outerRadius+20) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
        <text x={cx} y={cy} dy={-20} textAnchor="middle" fill={'var(--secondary-color)'} fontWeight={'bold'}>
            {`${payload.name}`}
        </text>
        <text x={cx} y={cy} dy={35} textAnchor="middle" fill={'var(--secondary-color)'} fontWeight={'bold'}>
            {`(${(percent * 100).toFixed(2)}%)`}
        </text>
        <text x={cx} y={cy} dy={10} textAnchor="middle" fill={fill} fontWeight={'bold'} fontSize={'1.5rem'}>
            {`P${value.toFixed(2)}`}
        </text>
        <Sector
            key={`sector-${payload.id}`}
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius + 10}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
            cornerRadius={5}
        />
        
        <text 
            x={ex + (cos >= 0 ? 1 : -1)} 
            y={ey} 
            textAnchor={textAnchor} 
            fontWeight={500} 
            fill={fill}
            fontSize={'0.9rem'}
        >
        </text>
        </g>
    );
};


export function DailyChart({data}){    
    // Check if data exists and has items
    if (!data || data.length === 0) {
        return (
            <div style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                color: 'var(--secondary-color)'
            }}>
                No data available for the chart
            </div>
        );
    }
    
    return(
        <div style={{ width: 'auto', height: '300px' }}>
            <ResponsiveContainer height="100%" width="100%">
                <BarChart 
                    data={data} 
                    margin={{ left: 20, bottom: 15 }}
                    barCategoryGap="30%"
                    backgroundColor="var(--container-color)"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="Date" 
                        stroke="var(--secondary-color)"
                        tick={{fill: "var(--secondary-color)"}} 
                        height={60} 
                        tickMargin={10}
                    >
                        <Label 
                            value="Date" 
                            position="insideBottom"  
                        />
                    </XAxis>
                    <YAxis 
                        stroke="var(--secondary-color)"
                        tick={{fill: "var(--secondary-color)"}} 
                        width={80} 
                        tickMargin={10}
                    >
                        <Label 
                            value="Amount (PHP)" 
                            position="insideLeft" 
                            angle={-90} 
                        />
                    </YAxis>
                    <Tooltip   
                        cursor ={{
                            fill: 'var(--background-shade)',
                            stroke: 'var(--secondary-color)',
                            strokeWidth: 1,
                        }}
                        contentStyle={{
                            backgroundColor: 'var(--container-color)',
                            border: '1px solid var(--secondary-color)',
                            color: 'var(--secondary-color)'
                        }}
                    />
                    <Bar 
                        dataKey="Amount" 
                        fill="var(--secondary-color)"
                        stroke='var(--secondary-color)' 
                        radius={[20, 20, 0, 0]} 
                        unit={'PHP'}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}