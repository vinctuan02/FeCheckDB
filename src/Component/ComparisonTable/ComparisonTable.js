// ComparisonTable.js
import React from 'react';

const ComparisonTable = ({ data, rowHeaders, columnHeaders }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    {columnHeaders.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <th>{rowHeaders[rowIndex]}</th>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ComparisonTable;
