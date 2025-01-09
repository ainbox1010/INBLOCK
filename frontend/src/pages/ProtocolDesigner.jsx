import { useState, useCallback } from 'react';
import ReactFlow, { 
    Background, 
    Controls, 
    useNodesState, 
    useEdgesState,
    addEdge
} from 'reactflow';
import 'reactflow/dist/style.css';
import ComponentNode from '../components/protocol/ComponentNode';

const nodeTypes = {
    custom: ComponentNode
};

export default function ProtocolDesigner() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nodeType, setNodeType] = useState('process');
    const [isDrawing, setIsDrawing] = useState(false);
    const [startNode, setStartNode] = useState(null);

    const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge({
            ...params,
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#9333ea' }
        }, eds));
    }, []);

    const handlePaneClick = useCallback((event) => {
        const position = event.position;
        setNodes((nds) => [
            ...nds,
            {
                id: `node_${nds.length + 1}`,
                type: 'custom',
                position,
                data: {
                    label: `Node ${nds.length + 1}`,
                    type: nodeType,
                    color: 'purple',
                    connectionPoints: ['left', 'right', 'top', 'bottom']
                }
            }
        ]);
    }, [nodeType]);

    const handleSave = () => {
        console.log('Nodes:', nodes);
        console.log('Edges:', edges);
        // You can copy this data to your nodes.js and edges.js files
    };

    return (
        <div className="h-screen w-full">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
                <select 
                    value={nodeType} 
                    onChange={(e) => setNodeType(e.target.value)}
                    className="bg-gray-800 text-white rounded-lg px-4 py-2"
                >
                    <option value="process">Process</option>
                    <option value="database">Database</option>
                    <option value="oval">Oval</option>
                </select>
                <button 
                    onClick={handleSave}
                    className="bg-accent-purple text-white px-4 py-2 rounded-lg"
                >
                    Save Configuration
                </button>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onPaneClick={handlePaneClick}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background color="#ffffff10" gap={20} size={1} />
                <Controls />
            </ReactFlow>
        </div>
    );
} 