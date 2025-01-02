export const getNodesForView = (view) => {
    switch (view) {
        case 'overview':
            return [
                // Input Layer
                {
                    id: '1',
                    type: 'custom',
                    position: { x: 100, y: 300 },
                    data: {
                        label: 'User Interface',
                        description: 'Chat and visualization interface',
                        priority: 'high',
                    }
                },
                {
                    id: '2',
                    type: 'custom',
                    position: { x: 350, y: 150 },
                    data: {
                        label: 'Input Processor',
                        description: 'Query validation and formatting',
                        priority: 'high',
                    }
                },
                {
                    id: '3',
                    type: 'custom',
                    position: { x: 350, y: 450 },
                    data: {
                        label: 'Context Manager',
                        description: 'Session and history management',
                        priority: 'high',
                    }
                },

                // Core Processing
                {
                    id: '4',
                    type: 'custom',
                    position: { x: 600, y: 300 },
                    data: {
                        label: 'Query Router',
                        description: 'Request distribution system',
                        priority: 'medium',
                    }
                },
                {
                    id: '5',
                    type: 'custom',
                    position: { x: 850, y: 150 },
                    data: {
                        label: 'Token Evaluator',
                        description: 'Token analysis and scoring',
                        priority: 'high',
                    }
                },
                {
                    id: '6',
                    type: 'custom',
                    position: { x: 850, y: 300 },
                    data: {
                        label: 'Market Analyzer',
                        description: 'Real-time market analysis',
                        priority: 'high',
                    }
                },
                {
                    id: '7',
                    type: 'custom',
                    position: { x: 850, y: 450 },
                    data: {
                        label: 'Sentiment Analyzer',
                        description: 'Social media sentiment analysis',
                        priority: 'medium',
                    }
                },

                // Knowledge & Data Layer
                {
                    id: '8',
                    type: 'custom',
                    position: { x: 1100, y: 200 },
                    data: {
                        label: 'Vector Database',
                        description: 'Knowledge base storage',
                        priority: 'high',
                    }
                },
                {
                    id: '9',
                    type: 'custom',
                    position: { x: 1100, y: 400 },
                    data: {
                        label: 'Market Data Store',
                        description: 'Historical and real-time data',
                        priority: 'medium',
                    }
                },

                // Output Processing
                {
                    id: '10',
                    type: 'custom',
                    position: { x: 1350, y: 300 },
                    data: {
                        label: 'Response Generator',
                        description: 'Answer synthesis and formatting',
                        priority: 'high',
                    }
                },

                // Monitoring & Control
                {
                    id: '11',
                    type: 'custom',
                    position: { x: 600, y: 50 },
                    data: {
                        label: 'Admin Module',
                        description: 'System monitoring and control',
                        priority: 'low',
                    }
                },
                {
                    id: '12',
                    type: 'custom',
                    position: { x: 600, y: 550 },
                    data: {
                        label: 'Custom Agent Builder',
                        description: 'User-specific agent configuration',
                        priority: 'low',
                    }
                }
            ];
        default:
            return [];
    }
};
