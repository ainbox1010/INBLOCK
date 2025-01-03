import { motion } from 'framer-motion';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import PageLayout from '../layouts/PageLayout';
import { useState } from 'react';
import { nodes } from '../utils/protocol/nodes';
import { edges } from '../utils/protocol/edges';
import ComponentNode from '../components/protocol/ComponentNode';
import DetailPanel from '../components/protocol/DetailPanel';

// Define node types
const nodeTypes = {
    custom: ComponentNode  // This maps 'custom' type to our ComponentNode
};

export default function ProtocolPage() {
    const [selectedNode, setSelectedNode] = useState(null);

    return (
        <PageLayout>
            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="h-[800px] relative bg-transparent"
                >
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}  // Use the defined nodeTypes
                        onNodeClick={(_, node) => setSelectedNode(node)}
                        fitView
                        className="bg-transparent react-flow-no-attribution"
                    >
                        <Background 
                            color="#ffffff10"
                            gap={20}
                            size={1}
                        />
                        <Controls />
                    </ReactFlow>

                    {selectedNode && (
                        <DetailPanel 
                            node={selectedNode}
                            onClose={() => setSelectedNode(null)}
                        />
                    )}
                </motion.div>
            </div>
        </PageLayout>
    );
} 