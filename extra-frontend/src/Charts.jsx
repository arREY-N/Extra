import './App.css'
import { 
    Legend, 
    PieChart, 
    Pie, 
    Sector, 
    Cell, 
    ResponsiveContainer, 
    Customized 
} from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300.56 },
    { name: 'Group C', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group C', value: 300 }
];

const COLORS = ['red', 'green', 'blue', '#FF8042'];

export default function CategoryPie() {
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <PieChart width={'450px'} height={'450px'}>
                <Legend/>
                <Pie
                    activeShape={renderActiveShape}
                    data={data}
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                    legendType='circle'
                >
                    {data.map((entry, index) => (
                        <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]}
                            stroke={COLORS[index % COLORS.length]}
                            className='pie-slice-cell'/>
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
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontWeight={'bold'}>
            {`${(percent * 100).toFixed(2)}%`}
        </text>
        <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius + 10}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
        />
        <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={startAngle}
            innerRadius={0}
            outerRadius={innerRadius-2}
            fill={fill}
        />
        <text 
            x={ex + (cos >= 0 ? 1 : -1)} 
            y={ey} 
            textAnchor={textAnchor} 
            fontWeight={500} 
            fill={fill}
            fontSize={'0.9rem'}
        >
            {`P${value.toFixed(2)}`}
        </text>
        </g>
    );
};
