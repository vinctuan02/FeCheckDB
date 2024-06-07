import React from 'react'
import Table2 from './table2'

const test2 = () => {
    const data1 = [
        ['A1', 'B1', 'C1'],
        ['A2', 'B2', 'C2'],
        ['A3', 'B3', 'C3'],
    ];

    const data2 = [
        ['A1', 'B1', 'C1'],
        ['A2', 'X2', 'Y2'], // Dữ liệu khác nhau
        ['A3', 'B3', 'C3'],
    ];
    return (
        <div>
            <Table2 data1={data1} data2={data2} />
        </div>
    )
}

export default test2
