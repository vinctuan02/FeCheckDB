import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './styles.scss';
import MenuSelectComponent from '../../Component/Menu/MenuSelectComponent';
import TableCompare from '../../Component/TableCompare/TableCompare';

function TestPage() {

    let ipBackEnd = 'localhost'

    const [inforTB1, setInforTB1] = useState()
    const [inforTB2, setInforTB2] = useState()

    const [isShowData, setIsShowData] = useState(true)
    const [isShowDescribe, setIsShowDescribe] = useState(true)

    const [inforSelect1, setInforSelect1] = useState()
    const [inforSelect2, setInforSelect2] = useState()

    const [isASC, setIsASC] = useState(true)
    const [limit, setLimit] = useState(10)

    const toggleDisplay = (nameTB) => {
        if (nameTB === 'data') {
            setIsShowData(!isShowData)
        }

        if (nameTB === 'describe') {
            setIsShowDescribe(!isShowDescribe)
        }
    };

    const toggleASCDESC = () => {
        setIsASC(!isASC)
    }

    const handleOnChangeLimit = (event) => {
        let value = event.target.value
        if (0 <= value) {
            setLimit(value)
        }
    }

    useEffect(() => {
        if ((limit || limit === 0) && inforSelect1 && inforSelect2) {

            inforSelect1.isASC = isASC
            inforSelect1.limit = limit

            let params = inforSelect1
            let allRespone = {};

            Promise.all([
                axios.get(`http://${ipBackEnd}:3001/get-data-tb`, { params }),
                axios.get(`http://${ipBackEnd}:3001/get-describe-tb`, { params })
            ])
                .then(([dataResponse, describeResponse]) => {
                    allRespone = {
                        dataTB: dataResponse.data.data,
                        describeTB: describeResponse.data.data
                    };
                    setInforTB1(allRespone);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });


            inforSelect2.isASC = isASC
            inforSelect2.limit = limit

            params = inforSelect2

            Promise.all([
                axios.get(`http://${ipBackEnd}:3001/get-data-tb`, { params }),
                axios.get(`http://${ipBackEnd}:3001/get-describe-tb`, { params })
            ])
                .then(([dataResponse, describeResponse]) => {
                    allRespone = {
                        dataTB: dataResponse.data.data,
                        describeTB: describeResponse.data.data
                    };
                    setInforTB2(allRespone);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [isASC, limit])



    let setSelectTableDB = (nameDB, nameTB, id) => {
        let data = {
            nameDB: nameDB,
            nameTB: nameTB,
            isASC: isASC,
            limit: limit
        }

        if (id === 'db1') {
            setInforSelect1(data)

        } else {
            setInforSelect2(data)
        }
    }

    useEffect(() => {
        if (inforSelect1) {
            let params = inforSelect1;
            let allRespone = {};

            Promise.all([
                axios.get(`http://${ipBackEnd}:3001/get-data-tb`, { params }),
                axios.get(`http://${ipBackEnd}:3001/get-describe-tb`, { params })
            ])
                .then(([dataResponse, describeResponse]) => {
                    allRespone = {
                        dataTB: dataResponse.data.data,
                        describeTB: describeResponse.data.data
                    };
                    setInforTB1(allRespone);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [inforSelect1]);

    useEffect(() => {
        if (inforSelect2) {
            let params = inforSelect2;
            let allRespone = {};

            Promise.all([
                axios.get(`http://${ipBackEnd}:3001/get-data-tb`, { params }),
                axios.get(`http://${ipBackEnd}:3001/get-describe-tb`, { params })
            ])
                .then(([dataResponse, describeResponse]) => {
                    allRespone = {
                        dataTB: dataResponse.data.data,
                        describeTB: describeResponse.data.data
                    };
                    setInforTB2(allRespone);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [inforSelect2]);

    let totalRecordsTB1 = 0
    let totalRecordsTB2 = 0
    let totalColumnTB1 = 0
    let totalColumnTB2 = 0

    let aRandomRecordTB1
    let aRandomRecordTB2


    if (inforTB1 && inforTB1.dataTB) {
        totalColumnTB1 = inforTB1.dataTB.reduce((total, user) => {
            return total + Number(user.age);
        }, 0);
        totalRecordsTB1 = inforTB1.dataTB.length
        aRandomRecordTB1 = inforTB1.dataTB[0]
    }

    if (inforTB2 && inforTB2.dataTB) {
        totalColumnTB2 = inforTB2.dataTB.reduce((total, user) => {
            return total + Number(user.age)
        }, 0)
        totalRecordsTB2 = inforTB2.dataTB.length
        aRandomRecordTB2 = inforTB2.dataTB[0]
    }

    return (
        <div className="container">
            <div className="header">Compare 2 tables</div>
            <div className="chuanghira container-select">

                <div className="title title-select">Select Database</div>
                <div className='option'>
                    <div className='button'>
                        <button
                            className={isASC ? 'active' : ''}
                            onClick={toggleASCDESC}
                        >ASC</button>
                        <button
                            className={!isASC ? 'active' : ''}
                            onClick={toggleASCDESC}
                        >DESC</button>
                    </div>
                    <div className='limit'>
                        <label>{`Limit (<=0) : `}</label>
                        <input type="number"
                            onChange={(event) => handleOnChangeLimit(event)} value={limit}
                        />
                    </div>
                </div>
                <div className="content content-select">
                    <div className="select">
                        <MenuSelectComponent id='db1' setSelectTableDB={setSelectTableDB}></MenuSelectComponent>
                        {
                            inforSelect1 &&
                            <>
                                <div className='name'>Table current: {inforSelect1.nameDB}.{inforSelect1.nameTB}</div>
                            </>
                        }
                    </div>
                    <div className="select">
                        <MenuSelectComponent id='db2' setSelectTableDB={setSelectTableDB}></MenuSelectComponent>
                        {
                            inforSelect2 &&
                            <>
                                <div className='name'>Table current: {inforSelect2.nameDB}.{inforSelect2.nameTB}</div>
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
                                            inforTB1 &&
                                            <div className="custom-data-grid">
                                                <TableCompare data={inforTB1.dataTB} compareData={inforTB2?.dataTB || 0}></TableCompare>
                                            </div>
                                        }
                                    </div>
                                    <div className='table'>
                                        {
                                            inforTB2 &&
                                            <div className="custom-data-grid">
                                                <TableCompare data={inforTB2.dataTB} compareData={inforTB1?.dataTB || 0}></TableCompare>
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
                                            inforTB1 &&
                                            <div className="custom-data-grid">
                                                <TableCompare data={inforTB1?.describeTB} compareData={inforTB2?.describeTB || 0} ></TableCompare>
                                            </div>
                                        }
                                    </div>
                                    <div className='table'>
                                        {
                                            inforTB2 &&
                                            < div className="custom-data-grid">
                                                <TableCompare data={inforTB2.describeTB} compareData={inforTB1?.describeTB || 0}></TableCompare>
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
