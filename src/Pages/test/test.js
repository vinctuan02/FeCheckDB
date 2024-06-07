import React, { useState } from 'react';
import './styles.scss';

const LimitSelector = () => {
    const [isASCActive, setIsASCActive] = useState(true); // State để theo dõi trạng thái active của nút ASC

    const toggleASC = () => {
        setIsASCActive(true); // Thiết lập trạng thái active cho nút ASC
    };

    const toggleDESC = () => {
        setIsASCActive(false); // Thiết lập trạng thái active cho nút DESC
    };

    return (
        <div className='option'>
            <div>
                <button className={isASCActive ? 'active' : ''} onClick={toggleASC}>ASC</button>
                <button className={!isASCActive ? 'active' : ''} onClick={toggleDESC}>DESC</button>
            </div>
            <div>
                <label>Limit:</label>
                <input type="text" list="limitOptions" placeholder="" />
                <datalist id="limitOptions">
                </datalist>
            </div>
        </div>
    );
};

export default LimitSelector;
