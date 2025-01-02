import { motion } from 'framer-motion';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import PageLayout from '../layouts/PageLayout';
import { useState } from 'react';
import { getNodesForView } from '../utils/protocol/nodes';
import { getEdgesForView } from '../utils/protocol/edges';

// We'll create these components next
import ComponentNode from '../components/protocol/ComponentNode';
import DetailPanel from '../components/protocol/DetailPanel';
import ViewControls from '../components/protocol/ViewControls';

export default function ProtocolPage() {
    const [selectedView, setSelectedView] = useState('overview'); // 'overview', 'detailed', 'timeline'
    const [selectedNode, setSelectedNode] = useState(null);

    // We'll define these in separate files
    const nodes = getNodesForView(selectedView);
    const edges = getEdgesForView(selectedView);

    console.log('Nodes:', nodes);
    console.log('Edges:', edges);

    return (
        <PageLayout>
            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="h-[800px] relative bg-transparent"
                >
                    <ViewControls 
                        selectedView={selectedView} 
                        onViewChange={setSelectedView}
                    />
                    
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={{ custom: ComponentNode }}
                        onNodeClick={(_, node) => setSelectedNode(node)}
                        fitView
                        className="bg-transparent"
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