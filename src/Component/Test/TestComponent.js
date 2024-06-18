import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './style.css';

export default function Table() {
    // Dữ liệu giả cho bảng inforTable
    const inforTable = {
        dataTable: [
            { id: 1, name: 'John', age: 25, city: 'New York' },
            { id: 2, name: 'Jane', age: 30, city: 'Los Angeles' },
            { id: 3, name: 'Alice', age: 28, city: 'Chicago' },
            { id: 4, name: 'Bob', age: 22, city: 'San Francisco' },
            { id: 5, name: 'Charlie', age: 35, city: 'Houston' }
        ]
    };

    // Dữ liệu giả cho bảng compareTable
    const compareTable = {
        dataTable: [
            { id: 1, name: 'John', age: 24, city: 'New York' },  // Khác ở age
            { id: 2, name: 'Jane', age: 30, city: 'Los Angeles' }, // Giống hoàn toàn
            { id: 3, name: 'Alice', age: 28, city: 'Seattle' },   // Khác ở city
            { id: 4, name: 'Bob', age: 22, city: 'San Francisco' }, // Giống hoàn toàn
            { id: 5, name: 'Charlie', age: 36, city: 'Houston' }  // Khác ở age
        ]
    };

    // Hàm để lấy các cột từ bảng dữ liệu
    let getColumns = () => {
        if (inforTable) {
            let columns = [];
            const keys = Object.keys(inforTable.dataTable[0]);
            keys.forEach((key) => {
                columns.push({
                    field: key,
                    headerName: key,
                    cellClassName: (params) => {
                        // So sánh giá trị với bảng compareTable
                        if (compareTable) {
                            const compareRow = compareTable.dataTable.find(row => row.id === params.id);
                            if (compareRow) {
                                return params.value === compareRow[key] ? 'cell-same' : 'cell-different';
                            }
                        }
                        return '';
                    }
                });
            });
            return columns;
        }
        return [];
    };

    const columns = getColumns();
    const rows = inforTable?.dataTable || [];

    return (
        <div style={{ height: '100%', width: '100%' }}>
            {
                inforTable &&
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 15, 20, 25, 30]}
                    checkboxSelection
                    getRowId={(row) => row.id} // Đảm bảo mỗi hàng có một id duy nhất
                />
            }
        </div>
    );
}
