import React from 'react';

const Table2 = ({ data1, data2 }) => {
    const renderTableCell = (cellData1, cellData2) => {
        // So sánh dữ liệu của hai ô
        if (cellData1 !== cellData2) {
            // Trả về ô với màu đỏ nếu dữ liệu khác nhau
            return <td style={{ color: 'red' }}>{cellData1}</td>;
        } else {
            // Trả về ô bình thường nếu dữ liệu giống nhau
            return <td>{cellData1}</td>;
        }
    };

    return (
        <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
            <tbody>
                {data1.map((row1, rowIndex) => (
                    <tr key={rowIndex}>
                        {row1.map((cellData1, cellIndex) => (
                            <React.Fragment key={cellIndex}>
                                {renderTableCell(cellData1, data2[rowIndex][cellIndex])}
                            </React.Fragment>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table2;
