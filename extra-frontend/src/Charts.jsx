import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 }
];

const COLORS = ['red', 'green', 'blue', '#FF8042'];

export default function CategoryPie() {
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <PieChart width={'450px'} height={'450px'}>
                <Pie
                    data={data}
                    innerRadius={95}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} />
                        ))}

                    <Pie
                        data={data}
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]} />
                            ))}

                        <Pie
                            data={data}
                            innerRadius={45}
                            outerRadius={50}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                        
                        </Pie>
                    </Pie>
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}
