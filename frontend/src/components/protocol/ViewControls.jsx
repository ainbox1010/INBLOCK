import React from 'react';

const ViewControls = ({ selectedView, onViewChange }) => {
    return (
        <div className="absolute top-4 left-4 z-10">
            <select 
                value={selectedView} 
                onChange={(e) => onViewChange(e.target.value)}
                className="bg-primary-800 text-white p-2 rounded"
            >
                <option value="overview">Overview</option>
                <option value="detailed">Detailed</option>
                <option value="timeline">Timeline</option>
            </select>
        </div>
    );
};

export default ViewControls;
