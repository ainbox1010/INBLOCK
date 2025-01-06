import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';

const ComponentNode = ({ data, isConnectable }) => {
    return (
        <motion.div
            className={`relative p-4 ${data.border || 'rounded-xl'} border bg-primary-900/50 backdrop-blur-sm 
                       hover:border-accent-purple/50 transition-all duration-300`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
        >
            {/* Handles */}
            {data.handles && data.handles.map(handle => (
                <Handle
                    key={handle.id}
                    type={handle.type}
                    id={handle.id}
                    position={handle.position}
                    isConnectable={isConnectable}
                    className='w-3 h-3 bg-accent-purple/50 border-2 border-accent-purple'
                />
            ))}

            {/* Node Content */}
            <div className="flex flex-col gap-2">
                {/* Icon */}
                {data.icon && (
                    <div className="w-8 h-8 text-accent-purple">
                        {data.icon}
                    </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-semibold text-transparent bg-clip-text 
                             bg-gradient-to-r from-accent-purple to-accent-pink">
                    {data.label}
                </h3>

                {/* Description */}
                {data.description && (
                    <p className="text-sm text-gray-400">
                        {data.description}
                    </p>
                )}

                {/* Priority Badge */}
                {data.priority && (
                    <span className={`absolute top-1 right-4 px-1 py-0 text-xs rounded-full text-[6px]
                                   ${getPriorityColor(data.priority)}`}>
                        {data.priority}
                    </span>
                )}
            </div>
        </motion.div>
    );
};

// Helper function for priority colors
const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
        case 'high':
            return 'bg-accent-purple/20 text-accent-purple border border-accent-purple/50';
        case 'medium':
            return 'bg-accent-blue/20 text-accent-blue border border-accent-blue/50';
        case 'low':
            return 'bg-accent-pink/20 text-accent-pink border border-accent-pink/50';
        default:
            return 'bg-gray-800 text-gray-400';
    }
};

export default memo(ComponentNode);
