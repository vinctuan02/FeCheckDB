import React, { useEffect, useState } from 'react';
import { DatabaseOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import axios from 'axios';
import './style.css'; // Import CSS file for custom styling

const MenuSelectComponent = ({ id, setSelectTableDB }) => {

    const [databaseItems, setDatabaseItems] = useState([]);
    const [loadingTables, setLoadingTables] = useState({}); // Track loading state for tables
    const [showTables, setShowTables] = useState(false); // State to control showing tables

    useEffect(() => {
        axios.get('http://localhost:3001/get-all-name-db')
            .then(response => {
                const dbData = response.data.data;
                if (Array.isArray(dbData)) {
                    const formattedItems = formatDatabaseItems(dbData);
                    setDatabaseItems(formattedItems);
                } else {
                    console.error('Error: Data is not an array:', dbData);
                }
            })
            .catch(error => {
                console.error('Error fetching databases:', error);
            });
    }, []);

    // Hàm để định dạng dữ liệu từ API thành dạng menu
    const formatDatabaseItems = (data) => {
        return [
            {
                key: 'listdb',
                icon: <DatabaseOutlined />,
                label: 'List Database',
                children: data
                    .filter(db => !['information_schema', 'my_database', 'mysql', 'performance_schema'].includes(db.Database))
                    .map((db, index) => ({
                        key: `db${index}`,
                        label: db.Database,
                        children: [], // Khởi tạo rỗng, sẽ load khi hover
                    })),
            },
        ];
    };

    // Hàm gọi API để lấy danh sách các bảng của một database
    const fetchTables = (dbKey, dbName) => {
        if (loadingTables[dbKey]) {
            // Nếu đang loading thì không làm gì
            return;
        }

        let params = {
            nameDB: dbName
        }

        setLoadingTables(prevState => ({
            ...prevState,
            [dbKey]: true
        }));

        axios.get('http://localhost:3001/get-all-name-tb-of-db', { params })
            .then(response => {
                const tables = response.data.data;
                // console.log(`Tables of ${dbName}:`, tables); // Log danh sách các bảng
                setDatabaseItems(prevItems => {
                    const newItems = prevItems.map(item => {
                        if (item.key === 'listdb') {
                            return {
                                ...item,
                                children: item.children.map(db => {
                                    if (db.key === dbKey) {
                                        return {
                                            ...db,
                                            children: tables.map((table, index) => ({
                                                key: `${dbKey}_table${index}`,
                                                label: Object.values(table)[0], // Đổi key tùy vào cấu trúc dữ liệu trả về
                                            }))
                                        };
                                    }
                                    return db;
                                })
                            };
                        }
                        return item;
                    });
                    return newItems;
                });
            })
            .catch(error => {
                console.error('Error fetching tables:', error);
            })
            .finally(() => {
                setLoadingTables(prevState => ({
                    ...prevState,
                    [dbKey]: false
                }));
            });
    };

    // Xử lý sự kiện hover vào item "List DB"
    const handleListDbHover = () => {
        setShowTables(true);
    };

    // Xử lý sự kiện hover vào một database con
    const handleDbHover = (dbKey, dbName) => {
        // console.log(`Fetching tables for database: ${dbName}`);
        fetchTables(dbKey, dbName);
    };

    const handleTbHover = (tbKey, tbName, dbName) => {
        setSelectTableDB(dbName, tbName, id)
    };

    // Định dạng lại menu items với sự kiện hover
    const menuItems = databaseItems.map(item => ({
        ...item,
        onTitleMouseEnter: handleListDbHover,
        children: showTables ? item.children.map(db => ({
            ...db,
            onMouseEnter: () => handleDbHover(db.key, db.label),
            children: db.children.map(table => ({
                ...table,
                onMouseEnter: () => handleTbHover(table.key, table.label, db.label)
                // console.log(`Hovered table: ${table.label}`)
            }))
        })) : []
    }));

    // choseDB && choseTB && console.log("choseDB", choseDB, "choseTB", choseTB)

    // inforTabe && console.log(inforTabe)

    return (
        <Menu
            onClick={() => { }} // Xử lý sự kiện click nếu cần
            style={{ width: 256 }}
            mode="vertical"
            items={menuItems} // Truyền danh sách menu đã định dạng vào Menu component
        />
    );
};

export default MenuSelectComponent;
