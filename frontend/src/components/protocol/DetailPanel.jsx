import React from 'react';

const DetailPanel = ({ node, onClose }) => {
    return (
        <div className="absolute top-4 right-4 bg-primary-800 p-4 rounded-lg">
            <h3>{node?.data?.label}</h3>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default DetailPanel;
