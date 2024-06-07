import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './styles.scss'; // Đảm bảo rằng file styles.css của bạn đã được import
import Table from '../../Component/table/Table';
import TableCompare from '../../Component/TableCompare/TableCompare';

function Task2() {

    let ipBackEnd = 'localhost'

    const [displayTable, setDisplayTable] = useState(false);


    const [allNameDB, setAllNameDB] = useState()

    const [choseDB1, setChoseDB1] = useState()
    const [choseDB2, setChoseDB2] = useState()

    const [allNameTableOfDB1, setAllNameTableOfDB1] = useState()
    const [allNameTableOfDB2, setAllNameTableOfDB2] = useState()

    const [choseTableOfDB1, setChoseTableOfDB1] = useState()
    const [choseTableOfDB2, setChoseTableOfDB2] = useState()

    const [inforTable1, setInforTable1] = useState()
    const [inforTable2, setInforTable2] = useState()

    const [isShowData, setIsShowData] = useState(true)
    const [isShowDescribe, setIsShowDescribe] = useState(true)



    useEffect(() => {
        axios.get(`http://${ipBackEnd}:3001/get-all-name-db`)
            .then(response => {
                setAllNameDB(response.data.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Fake data
    const userData = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 },
    ];

    const describeData = [
        { columnName: 'id', dataType: 'int', description: 'Unique identifier' },
        { columnName: 'name', dataType: 'varchar', description: 'Name of the user' },
        { columnName: 'age', dataType: 'int', description: 'Age of the user' },
    ];

    const toggleDisplay = (nameTable) => {
        if (nameTable === 'data') {
            setIsShowData(!isShowData)
        }

        if (nameTable === 'describe') {
            setIsShowDescribe(!isShowDescribe)
        }
    };

    let handleChoseDB = (event, idChose) => {
        const nameDB = event.target.value

        if (nameDB !== '') {
            let data = {
                nameDB: nameDB
            }

            if (idChose === 'DB1') {
                setChoseDB1(nameDB)
                axios.post(`http://${ipBackEnd}:3001/get-all-name-table-of-db`, data)
                    .then(response => {
                        setAllNameTableOfDB1(response.data.data)
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            } else if (idChose === "DB2") {
                setChoseDB2(nameDB)
                axios.post(`http://${ipBackEnd}:3001/get-all-name-table-of-db`, data)
                    .then(response => {
                        setAllNameTableOfDB2(response.data.data)
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }
        }
    }

    const handleChoseTableOfDB = (event, idChose) => {
        const nameTable = event.target.value
        if (idChose === "DB1") {
            const data = {
                nameDB: choseDB1,
                nameTable: nameTable
            }

            setChoseTableOfDB1(nameTable)
            axios.post(`http://${ipBackEnd}:3001/get-infor-a-table`, data)
                .then(response => {
                    setInforTable1(response.data.data)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else if (idChose === "DB2") {
            const data = {
                nameDB: choseDB2,
                nameTable: nameTable
            }

            setChoseTableOfDB2(nameTable)
            axios.post(`http://${ipBackEnd}:3001/get-infor-a-table`, data)
                .then(response => {
                    setInforTable2(response.data.data)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }

    // inforTable1 && console.log(inforTable1.dataTable)
    // inforTable2 && console.log(inforTable2.dataTable.length)


    let totalRecordsTB1 = 0
    let totalRecordsTB2 = 0
    let totalColumnTB1 = 0
    let totalColumnTB2 = 0

    let aRandomRecordTB1
    let aRandomRecordTB2


    if (inforTable1 && inforTable1.dataTable) {
        totalColumnTB1 = inforTable1.dataTable.reduce((total, user) => {
            return total + Number(user.age);
        }, 0);
        totalRecordsTB1 = inforTable1.dataTable.length
        aRandomRecordTB1 = inforTable1.dataTable[0]
    }

    if (inforTable2 && inforTable2.dataTable) {
        totalColumnTB2 = inforTable2.dataTable.reduce((total, user) => {
            return total + Number(user.age);
        }, 0);
        totalRecordsTB2 = inforTable2.dataTable.length
        aRandomRecordTB2 = inforTable2.dataTable[0]
    }

    return (
        <div className="container">
            <div className="header">Compare 2 tables</div>
            <div className="chuanghira container-select">
                <div className="title title-select">Select Database</div>
                <div className="content content-select">
                    <div className="select">
                        <div className="database">
                            <label htmlFor="db1">Select Database 1:</label>
                            <select onChange={(event) => handleChoseDB(event, 'DB1')}>
                                <option value="">Select an option</option>
                                {allNameDB && allNameDB.map((nameDB, index) => {
                                    return <option key={index}>{Object.values(nameDB)}</option>
                                })}
                            </select>
                        </div>
                        <div className="table">
                            <label htmlFor="tb1">Select TB1:</label>
                            <select onChange={(event) => handleChoseTableOfDB(event, "DB1")}>
                                {allNameTableOfDB1 && <option value="">Select an option</option>}
                                {allNameTableOfDB1 && allNameTableOfDB1.map((nameTable, index) => {
                                    return <option key={index}>{Object.values(nameTable)}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="select">
                        <div className="database">
                            <label htmlFor="db2">Select DB2:</label>
                            <select onChange={(event) => handleChoseDB(event, 'DB2')}>
                                <option value="">Select an option</option>
                                {allNameDB && allNameDB.map((nameDB, index) => {
                                    return <option key={index}>{Object.values(nameDB)}</option>
                                })}
                            </select>
                        </div>
                        <div className="table">
                            <label htmlFor="tb2">Select TB2:</label>
                            <select onChange={(event) => handleChoseTableOfDB(event, "DB2")}>
                                {allNameTableOfDB2 && <option value="">Select an option</option>}
                                {allNameTableOfDB2 && allNameTableOfDB2.map((nameTable, index) => {
                                    return <option key={index}>{Object.values(nameTable)}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>

            </div>
            <div className="chuanghira container-display-db">
                <div className='title'>Info Table</div>
                <div className='content content-display-db'>
                    <div className="buttons">
                        <button className={isShowData ? 'active' : ''} onClick={() => toggleDisplay('data')}>Data</button>
                        <button className={isShowDescribe ? 'active' : ''} onClick={() => toggleDisplay('describe')}>Describe</button>
                    </div>
                    <div className="content-data-describe">
                        {
                            isShowData &&
                            <div className='container-data'>
                                <div className='table'>

                                    {/* {inforTable1 &&
                                        <Table data={inforTable1.dataTable}></Table>
                                    } */}
                                    {inforTable1 && inforTable2 &&
                                        <TableCompare data1={inforTable1.dataTable} data2={inforTable2.dataTable} ></TableCompare>
                                    }
                                </div>
                                <div className='table'>
                                    {/* {inforTable2 &&
                                        <Table data={inforTable2.dataTable}></Table>
                                    } */}
                                    {inforTable1 && inforTable2 &&
                                        <TableCompare data1={inforTable2.dataTable} data2={inforTable1.dataTable} ></TableCompare>
                                    }
                                </div>
                            </div>
                        }
                        {
                            isShowDescribe &&
                            <div className='container-describe'>
                                <div className='table'>
                                    {/* {inforTable1 &&
                                        <Table data={inforTable1.describeTable}></Table>
                                    } */}
                                    {inforTable1 && inforTable2 &&
                                        <TableCompare data1={inforTable1.describeTable} data2={inforTable2.describeTable} ></TableCompare>
                                    }
                                </div>
                                <div className='table'>
                                    {/* {inforTable2 &&
                                        <Table data={inforTable2.describeTable}></Table>
                                    } */}
                                    {inforTable1 && inforTable2 &&
                                        <TableCompare data1={inforTable2.describeTable} data2={inforTable1.describeTable} ></TableCompare>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="chuanghira container-compare">
                <div className='title title-compare'>Compare</div>
                <div className='content content-compare'>
                    <table>
                        <thead>
                            <tr>
                                <th>Table</th>
                                <th>Total records</th>
                                <th>Total column value (Age)</th>
                                <th>A random record [0]</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Table1</td>
                                <td>{totalRecordsTB1}</td>
                                <td>{totalColumnTB1}</td>
                                <td>{JSON.stringify(aRandomRecordTB1)}</td>
                            </tr>
                            <tr>
                                <td>Table2</td>
                                <td>{totalRecordsTB2}</td>
                                <td>{totalColumnTB2}</td>
                                <td>{JSON.stringify(aRandomRecordTB2)}</td>
                            </tr>
                            <tr>
                                <td>Result</td>
                                <td>{totalRecordsTB1 === totalRecordsTB2 ? "True" : "False"}</td>
                                <td>{totalColumnTB1 === totalColumnTB2 ? "True" : "False"}</td>
                                <td>{JSON.stringify(aRandomRecordTB1) === JSON.stringify(aRandomRecordTB2) ? "True" : "False"} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Task2;
