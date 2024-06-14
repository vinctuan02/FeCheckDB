import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './styles.scss'; // Đảm bảo rằng file styles.css của bạn đã được import
import Table from '../../Component/Table/Table';
import MenuComponent from '../../Component/Menu/MenuComponent';

function TestPage() {

    let ipBackEnd = 'localhost'

    const [inforTable1, setInforTable1] = useState()
    const [inforTable2, setInforTable2] = useState()

    const [isShowData, setIsShowData] = useState(true)
    const [isShowDescribe, setIsShowDescribe] = useState(true)

    const [inforSelect1, setInforSelect1] = useState()
    const [inforSelect2, setInforSelect2] = useState()

    // const dataWithIds = data.map((item, index) => ({ ...item, id: index + 1 }));


    const toggleDisplay = (nameTable) => {
        if (nameTable === 'data') {
            setIsShowData(!isShowData)
        }

        if (nameTable === 'describe') {
            setIsShowDescribe(!isShowDescribe)
        }
    };

    let setSelectTableDB = (dbName, tbName, id) => {
        let data = {
            nameDB: dbName,
            nameTable: tbName
        }

        if (id === 'db1') {
            setInforSelect1(data)
            axios.post(`http://${ipBackEnd}:3001/get-infor-a-table`, data)
                .then(response => {
                    setInforTable1(response.data.data)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            setInforSelect2(data)
            axios.post(`http://${ipBackEnd}:3001/get-infor-a-table`, data)
                .then(response => {
                    setInforTable2(response.data.data)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }


    }


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
            return total + Number(user.age)
        }, 0)
        totalRecordsTB2 = inforTable2.dataTable.length
        aRandomRecordTB2 = inforTable2.dataTable[0]
    }

    return (
        <div className="container">
            <div className="header">Compare 2 tables</div>
            <div className="chuanghira container-select">

                <div className="title title-select">Select Database</div>
                <div className='option'>
                    <div className='button'>
                        <button
                        // className={isASC ? 'active' : ''}
                        // onClick={toggleASC}
                        >ASC</button>
                        <button
                        // className={!isASC ? 'active' : ''}
                        // onClick={toggleDESC}
                        >DESC</button>
                    </div>
                    <div className='limit'>
                        <label>Limit: </label>
                        <input type="number"
                        // onChange={(event) => handleOnChangeInput(event)} value={limit}
                        />
                    </div>
                </div>
                <div className="content content-select">
                    <div className="select">
                        <MenuComponent id='db1' setSelectTableDB={setSelectTableDB}></MenuComponent>
                        {
                            inforSelect1 &&
                            <>
                                <div className='name'>Table curent: {inforSelect1.nameDB}.{inforSelect1.nameTable}</div>
                            </>
                        }
                    </div>
                    <div className="select">
                        <MenuComponent id='db2' setSelectTableDB={setSelectTableDB}></MenuComponent>
                        {
                            inforSelect2 &&
                            <>
                                <div className='name'>Table curent: {inforSelect2.nameDB}.{inforSelect2.nameTable}</div>
                            </>
                        }
                    </div>
                </div>

            </div>
            <div className="chuanghira container-display-db">
                <div className='title'>Info Table</div>
                <div className='content content-display-db'>
                    <div className="content-data-describe">
                        <div className='container-data'>
                            <button className={`button-data ${isShowData ? 'active' : ''}`} onClick={() => toggleDisplay('data')}>Data</button>
                            {
                                isShowData &&
                                <div className='data'>
                                    <div className='table'>
                                        {
                                            inforTable1 &&
                                            <div className="custom-data-grid">
                                                <Table data={inforTable1.dataTable} compareData={inforTable2?.dataTable || 0}></Table>
                                            </div>
                                        }
                                    </div>
                                    <div className='table'>
                                        {
                                            inforTable2 &&
                                            <div className="custom-data-grid">
                                                <Table data={inforTable2.dataTable} compareData={inforTable1?.dataTable || 0}></Table>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='container-describe'>
                            <button className={`button-describe ${isShowDescribe ? 'active' : ''}`} onClick={() => toggleDisplay('describe')}>Describe</button>
                            {
                                isShowDescribe &&
                                <div className='describe'>
                                    <div className='table'>
                                        {
                                            inforTable1 &&
                                            <div className="custom-data-grid">
                                                <Table data={inforTable1?.describeTable} compareData={inforTable2?.describeTable || 0} ></Table>
                                            </div>
                                        }
                                    </div>
                                    <div className='table'>
                                        {
                                            inforTable2 &&
                                            < div className="custom-data-grid">
                                                <Table data={inforTable2.describeTable} compareData={inforTable1?.describeTable || 0}></Table>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
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
        </div >
    );
}

export default TestPage;
