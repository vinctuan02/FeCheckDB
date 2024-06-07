import React from 'react';

const TableCompare = ({ data1, data2 }) => {
    // console.log(data1)
    // console.log(data2)
    // Kiểm tra xem cả data1 và data2 có tồn tại và có ít nhất một phần tử không
    if (!data1 || !data2 || !data1.length || !data2.length) {
        return <div>Dữ liệu không hợp lệ</div>;
    }



    // Lấy các key từ object đầu tiên của mảng data1 hoặc data2
    const keys1 = Object.keys(data1[0]);
    const keys2 = Object.keys(data2[0]);
    const keys = keys1.length >= keys2.length ? keys1 : keys2;

    const renderTableCell = (cellData1, cellData2) => {
        // So sánh dữ liệu của hai ô
        if (cellData1 !== cellData2) {
            // Trả về ô với màu đỏ nếu dữ liệu khác nhau
            return <td style={{ color: 'red' }}>{cellData1}</td>;
        } else {
            // Trả về ô bình thường nếu dữ liệu giống nhau
            return <td style={{ color: 'green' }}>{cellData1}</td>;
        }
    };

    return (
        <table className="db-table">
            <thead>
                <tr>
                    {keys.map((key, index) => (
                        <th key={index}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data1.map((rowData1, index) => (
                    <tr key={index} align="center">
                        {keys.map((key) => (
                            <React.Fragment key={key}>
                                {renderTableCell(rowData1[key], data2[index] && data2[index][key])}
                            </React.Fragment>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableCompare;
