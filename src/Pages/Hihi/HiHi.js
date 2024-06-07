import React, { useState } from 'react';

const TwoLevelSelect = () => {
    const [selectedDatabase, setSelectedDatabase] = useState('');
    const [selectedTable, setSelectedTable] = useState('');

    const databases = [
        { name: 'Database 1', tables: ['Table 1', 'Table 2', 'Table 3'] },
        { name: 'Database 2', tables: ['Table A', 'Table B', 'Table C'] },
        // Thêm các cơ sở dữ liệu khác nếu cần thiết
    ];

    const handleDatabaseChange = (event) => {
        setSelectedDatabase(event.target.value);
        setSelectedTable(''); // Reset bảng khi chọn cơ sở dữ liệu mới
    };

    const handleTableChange = (event) => {
        setSelectedTable(event.target.value);
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Chọn Database và Table:</h1>
            <div style={{ display: 'flex', marginBottom: '15px' }}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="database">Database:</label>
                    <select
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff', fontSize: '16px' }}
                        id="database"
                        value={selectedDatabase}
                        onChange={handleDatabaseChange}
                    >
                        <option value="">Chọn Database</option>
                        {databases.map(database => (
                            <option key={database.name} value={database.name}>{database.name}</option>
                        ))}
                    </select>
                </div>
                <div style={{ flex: 1, marginLeft: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="table">Table:</label>
                    <select
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff', fontSize: '16px' }}
                        id="table"
                        value={selectedTable}
                        onChange={handleTableChange}
                        disabled={!selectedDatabase}
                    >
                        <option value="">Chọn Table</option>
                        {selectedDatabase && databases.find(db => db.name === selectedDatabase).tables
                            .map(table => (
                                <option key={table} value={table}>{table}</option>
                            ))}
                    </select>
                </div>
            </div>
            {selectedDatabase && selectedTable && (
                <div style={{ marginTop: '20px' }}>
                    <h2 style={{ marginBottom: '10px' }}>Lựa chọn của bạn:</h2>
                    <p>Database: {selectedDatabase}</p>
                    <p>Table: {selectedTable}</p>
                </div>
            )}
        </div>
    );
};

export default TwoLevelSelect;
