import React from 'react';

const Table = ({ data, isShow = true }) => {
    let keysData = Object.keys(data[0])
    return (
        <>
            {isShow &&
                <table className="db-table">
                    <thead>
                        <tr>
                            {
                                keysData && keysData.map((key, index) => {
                                    return <th key={index}>{key}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((data, index) => (
                            <tr key={index} align="center">
                                {keysData.map((key) => (
                                    <td key={key}>{data[key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>

    );
};

export default Table;
