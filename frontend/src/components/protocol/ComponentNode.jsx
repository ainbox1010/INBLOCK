import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';

const ComponentNode = ({ data, isConnectable }) => {
    const isDatabase = data.type === 'database';
    const isOval = data.type === 'oval';
    const isRectProcess = data.type === 'process';
    const isIntersection = data.type === 'intersection';

    const renderHandle = (position) => {
        if (!data.connections?.includes(position.toLowerCase())) return null;

        return (
            <Handle
                type={position === 'left' || position === 'top' ? 'target' : 'source'}
                position={Position[position.toUpperCase()]}
                isConnectable={isConnectable}
                className={`w-2 h-2 bg-gradient-to-r from-accent-purple/50 to-accent-blue/50 
                           border border-accent-purple`}
                style={{
                    ...(isDatabase && position === 'left' && {
                        transform: 'translateX(-50%) translateY(-2px)'
                    }),
                    ...(isDatabase && position === 'right' && {
                        transform: 'translateX(50%) translateY(-2px)'
                    })
                }}
            />
        );
    };

    return (
        <motion.div
            className={`relative p-4 
                       ${isDatabase ? 'database-node' : ''} 
                       ${isOval ? 'oval-node' : ''} 
                       ${isRectProcess ? 'rounded-lg' : ''}
                       ${isIntersection ? 'rounded-full' : ''}
                       border bg-gradient-to-br from-primary-900/50 to-primary-800/50 
                       hover:from-primary-800/50 hover:to-primary-700/50 backdrop-blur-sm 
                       ${isDatabase ? 'border-accent-blue/50' : 'border-accent-purple/50'} 
                       transition-all duration-300`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            style={{
                ...(isDatabase && {
                    borderRadius: '20px 20px 10px 10px',
                    transform: 'perspective(500px) rotateX(5deg)',
                    boxShadow: 'inset 0 -10px 20px -10px rgba(66, 153, 225, 0.2)'
                }),
                ...(isOval && {
                    borderRadius: '50px',
                    minWidth: '200px',
                    minHeight: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 24px'
                }),
                ...(isRectProcess && {
                    minWidth: '180px',
                    minHeight: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }),
                ...(isIntersection && {
                    width: '40px',
                    height: '40px',
                    minWidth: '40px',
                    minHeight: '40px',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                })
            }}
        >
            {/* Database node elements */}
            {isDatabase && (
                <>
                    <div className="absolute top-0 left-0 right-0 h-2 bg-accent-blue/20 
                                  rounded-full transform -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-accent-blue/20 
                                  rounded-full transform translate-y-1/2"></div>
                </>
            )}

            {/* Render handles based on connections array */}
            {renderHandle('left')}
            {renderHandle('right')}
            {renderHandle('top')}
            {renderHandle('bottom')}

            {/* Node Content */}
            <div className={`flex flex-col gap-2 items-center text-center w-full`}>
                {!isIntersection && (
                    <h3 className={`font-semibold text-transparent bg-clip-text 
                                  bg-gradient-to-r from-accent-purple to-accent-pink
                                  ${isOval || isRectProcess ? 'text-base' : 'text-lg'}`}>
                        {data.label}
                    </h3>
                )}
            </div>
        </motion.div>
    );
};

export default memo(ComponentNode);
