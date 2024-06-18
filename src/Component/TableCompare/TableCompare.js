import React from 'react';

const TableCompare = ({ data, compareData }) => {
    // console.log(data)
    // console.log(compareData)
    // Kiểm tra xem cả data và compareData có tồn tại và có ít nhất một phần tử không
    if (!data || !compareData || !data.length || !compareData.length) {
        return <div>Dữ liệu không hợp lệ</div>;
    }



    // Lấy các key từ object đầu tiên của mảng data hoặc compareData
    const keys1 = Object.keys(data[0]);
    const keys2 = Object.keys(compareData[0]);
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
                {data.map((rowData1, index) => (
                    <tr key={index} align="center">
                        {keys.map((key) => (
                            <React.Fragment key={key}>
                                {renderTableCell(rowData1[key], compareData[index] && compareData[index][key])}
                            </React.Fragment>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableCompare;
