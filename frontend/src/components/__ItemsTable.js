import React from 'react';

const ItemsTable = ({ items, columns }) => {
    return (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', margin: '20px 0' }}>
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        {columns.map((col) => (
                            <td key={col}>{item[col]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ItemsTable;
