import '../styles/App.css'
import { 
    Legend, 
    PieChart, 
    Pie, 
    Sector, 
    Cell, 
    ResponsiveContainer, 
    Customized 
} from 'recharts';


const COLORS = ['red', 'green', 'blue', '#FF8042'];

export default function CategoryPie({data}) {
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
                <Legend
                    verticalAlign='bottom'
                    align='center'
                    wrapperStyle={{marginTop: 0}} 
                />
                <Pie
                    activeShape={renderActiveShape}
                    data={data}
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    legendType='circle'
                >
                    {data.map((_, index) => (
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

import { ResponsivePie } from '@nivo/pie'

const MyPie = ({ data /* see data tab */ }) => (
    <ResponsivePie /* or Pie for fixed dimensions */
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.6}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                symbolShape: 'circle'
            }
        ]}
    />
)
