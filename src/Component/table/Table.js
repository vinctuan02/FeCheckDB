import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './style.css';

export default function Table({ data, compareData }) {


    const addIdIfNotExists = (dataArray) => {
        dataArray.map((item, index) => {
            item.id = item.id ? item.id : (index + 1)
            return 0
        });
    };

    data && addIdIfNotExists(data)
    compareData && addIdIfNotExists(compareData)

    // console.log("2: ", data)
    // console.log(compareData)

    let getColumns = () => {
        if (data && data.length > 0) {
            let columns = [];
            const keys = Object.keys(data[0]);
            keys.forEach((key) => {
                columns.push({
                    field: key,
                    headerName: key,
                    cellClassName: (params) => {
                        // So sánh giá trị với bảng compareData
                        if (compareData) {
                            const compareRow = compareData.find(row => row.id === params.id);
                            if (compareRow) {
                                return params.value !== compareRow[key] ? 'cell-different' : 'cell-same';
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
    const rows = data || [];

    // console.log(columns)

    return (
        <div style={{ height: '100%', width: '100%' }}>
            {
                data &&
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 15, 20, 25, 30]}
                    getRowId={(row) => row.id} // Đảm bảo mỗi hàng có một id duy nhất
                />
            }
        </div>
    );
}
