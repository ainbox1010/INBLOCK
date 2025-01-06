import { Position } from 'reactflow';

export const getNodesForView = (view) => {
    switch (view) {
        case 'overview':
            return [
                // Input Layer
                {
                    id: '1',
                    type: 'custom',
                    position: { x: 100, y: 400 },
                    data: {
                        label: 'User Query',
                        description: 'Input from client',
                        priority: 'high',
                        border: 'rounded-full',
                        handles: [
                            {
                                type: 'source',
                                position: Position.Right,
                            }
                        ]
                    }
                },
                {
                    id: '2',
                    type: 'custom',
                    position: { x: 380, y: 400 },
                    data: {
                        label: 'Preprocessing',
                        description: 'Query pre-processor',
                        handles: [
                            {
                                type: 'source',
                                position: Position.Right,
                            },
                            {
                                type: 'target',
                                position: Position.Left,
                            }
                        ]
                    }
                },
                {
                    id: '3',
                    type: 'custom',
                    position: { x: 660, y: 400 },
                    data: {
                        label: 'Transformation',
                        description: 'Query with context',
                        priority: 'medium',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            },
                            {
                                type: 'source',
                                id: 'top-3',
                                position: Position.Top,
                            },
                            {
                                type: 'source',
                                id: 'bottom-3',
                                position: Position.Bottom,
                            },
                            {
                                type: 'source',
                                id: 'right-3',
                                position: Position.Right,
                            },
                        ]
                    }
                },
                {
                    id: '4',
                    type: 'custom',
                    position: { x: 660, y: 200 },
                    data: {
                        label: 'Session',
                        description: 'Short term memory',
                        border: 'rounded-sm',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Bottom,
                            },
                            {
                                type: 'target',
                                id: 'top-4',
                                position: Position.Top,
                            },
                            {
                                type: 'source',
                                position: Position.Left,
                            },
                        ]
                    }
                },
                {
                    id: '5',
                    type: 'custom',
                    position: { x: 660, y: 600 },
                    data: {
                        label: 'User DB',
                        description: 'Chat history database',
                        border: 'rounded-sm',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Top,
                            },
                            {
                                type: 'target',
                                id: 'left-5',
                                position: Position.Left,
                            },
                        ]
                    }
                },
                {
                    id: '6',
                    type: 'custom',
                    position: { x: 940, y: 400 },
                    data: {
                        label: 'Routing',
                        description: 'Query router',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            },
                            {
                                type: 'target',
                                id: 'top-6',
                                position: Position.Top,
                            },
                            {
                                type: 'source',
                                position: Position.Right,
                            }
                        ]
                    }
                },
                {
                    id: '7',
                    type: 'custom',
                    position: { x: 1180, y: 400 },
                    data: {
                        label: 'Tools',
                        description: 'External APIs',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            },
                            {
                                type: 'source',
                                position: Position.Right,
                            }
                        ]
                    }
                },
                {
                    id: '8',
                    type: 'custom',
                    position: { x: 940, y: 600 },
                    data: {
                        label: 'Embedding',
                        description: 'Data embeddings',
                        handles: [
                            {
                                type: 'source',
                                position: Position.Right,
                            },
                            {
                                type: 'target',
                                position: Position.Bottom,
                            }
                        ]
                    }
                },
                {
                    id: '9',
                    type: 'custom',
                    position: { x: 1180, y: 600 },
                    data: {
                        label: 'Vector',
                        description: 'Vectorization DB',
                        border: 'rounded-sm',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            }
                        ]
                    }
                },
                {
                    id: '10',
                    type: 'custom',
                    position: { x: 900, y: 750 },
                    data: {
                        label: 'Expertise',
                        description: 'Internal know-how proprietary DB',
                        border: 'rounded-sm',
                        handles: [
                            {
                                type: 'source',
                                position: Position.Top,
                            },
                            {
                                type: 'target',
                                position: Position.Left,
                            },
                            {
                                type: 'target',
                                id: 'right-10',
                                position: Position.Right,
                            }
                        ]
                    }
                },
                {
                    id: '11',
                    type: 'custom',
                    position: { x: 660, y: 750 },
                    data: {
                        label: 'Console ',
                        description: 'Admin node console',
                        border: 'rounded-full',
                        handles: [
                            {
                                type: 'source',
                                position: Position.Right,
                            }
                        ]
                    }
                },
                {
                    id: '12',
                    type: 'custom',
                    position: { x: 1090, y: 300 },
                    data: {
                        label: 'X ',
                        border: 'rounded-full border-accent-purple',
                        handles: [
                            {
                                type: 'source',
                                position: Position.Bottom,
                            },
                            {
                                type: 'target',
                                id: 'left-12',
                                position: Position.Left,
                            },
                            {
                                type: 'target',
                                id: 'right-12',
                                position: Position.Right,
                            },
                            {
                                type: 'target',
                                id: 'top-12',
                                position: Position.Top,
                            }
                        ]
                    }
                },
                {
                    id: '13',
                    type: 'custom',
                    position: { x: 850, y: 150 },
                    data: {
                        label: 'Market monitor',
                        description: 'Periodic module',
                        border: 'rounded-xl border-accent-green',
                        handles: [
                            {
                                type: 'source',
                                position: Position.Bottom,
                            },
                            {
                                type: 'source',
                                id: 'right-13',
                                position: Position.Right,
                            },
                            {
                                type: 'target',
                                position: Position.Top,
                            }
                        ]
                    }
                },
                {
                    id: '14',
                    type: 'custom',
                    position: { x: 1040, y: 150 },
                    data: {
                        label: 'Trading rules',
                        description: 'General market module',
                        border: 'rounded-xl border-accent-purple',
                        handles: [
                            {
                                type: 'source',
                                position: Position.Bottom,
                            },
                            {
                                type: 'target',
                                id: 'left-14',
                                position: Position.Left,
                            },
                            {
                                type: 'target',
                                id: 'top-14',
                                position: Position.Top,
                            }
                        ]
                    }
                },
                {
                    id: '15',
                    type: 'custom',
                    position: { x: 1250, y: 150 },
                    data: {
                        label: 'User rules',
                        description: 'User Agent module',
                        border: 'rounded-xl border-accent-red',
                        handles: [
                            {
                                type: 'source',
                                position: Position.Bottom,
                            },
                            {
                                type: 'target',
                                position: Position.Top,
                            }
                        ]
                    }
                },
                {
                    id: '16',
                    type: 'custom',
                    position: { x: 980, y: 0 },
                    data: {
                        label: 'Admin node',
                        description: 'Rules for trading and content generation',
                        border: 'rounded-full',
                        priority: 'high',
                        handles: [
                            {
                                type: 'source',
                                position: Position.Bottom,
                            },
                        ]
                    }
                },
                {
                    id: '17',
                    type: 'custom',
                    position: { x: 1400, y: 280 },
                    data: {
                        label: 'Market data',
                        description: 'Real time market API',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            },
                            {
                                type: 'source',
                                position: Position.Right,
                            }                            
                        ]
                    }
                },
                {
                    id: '18',
                    type: 'custom',
                    position: { x: 1400, y: 400 },
                    data: {
                        label: 'Web search',
                        description: 'Scraping module',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            },
                            {
                                type: 'source',
                                position: Position.Right,
                            }
                        ]
                    }
                },
                {
                    id: '19',
                    type: 'custom',
                    position: { x: 1400, y: 520 },
                    data: {
                        label: 'Sentiment analysis',
                        description: 'Analysis module (F, FB, etc.)',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            },
                            {
                                type: 'source',
                                position: Position.Right,
                            }
                        ]
                    }
                },
                {
                    id: '20',
                    type: 'custom',
                    position: { x: 1680, y: 400 },
                    data: {
                        label: 'Evaluation',
                        description: 'Data routing module',
                        border: 'rounded-xl border-accent-red',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            },
                            {
                                type: 'source',
                                position: Position.Right,
                            },
                        ]
                    }
                },
                {
                    id: '21',
                    type: 'custom',
                    position: { x: 1920, y: 40 },
                    data: {
                        label: 'Generation',
                        description: 'Content generation module',
                        border: 'rounded-xl border-accent-green',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            },
                            {
                                type: 'source',
                                position: Position.Right,
                            }
                        ]
                    }
                },
                {
                    id: '22',
                    type: 'custom',
                    position: { x: 1920, y: 220 },
                    data: {
                        label: 'Trading',
                        description: 'Automatic trading module',
                        border: 'rounded-xl border-accent-purple',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            },
                            {
                                type: 'source',
                                position: Position.Right,
                            }
                        ]
                    }
                },
                {
                    id: '23',
                    type: 'custom',
                    position: { x: 1920, y: 400 },
                    data: {
                        label: 'Context',
                        description: 'Processing and routing',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            },
                            {
                                type: 'source',
                                position: Position.Right,
                            }
                        ]
                    }
                },
                {
                    id: '24',
                    type: 'custom',
                    position: { x: 1920, y: 580 },
                    data: {
                        label: 'User agent trading',
                        description: 'Trading module',
                        border: 'rounded-xl border-accent-red',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            },
                            {
                                type: 'source',
                                position: Position.Right,
                            }
                        ]
                    }
                },
                {
                    id: '25',
                    type: 'custom',
                    position: { x: 1920, y: 760 },
                    data: {
                        label: 'Analytical feedback',
                        description: 'Self learning module',
                        border: 'rounded-xl border-accent-green',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            },
                            {
                                type: 'source',
                                position: Position.Right,
                            }
                        ]
                    }
                },
                {
                    id: '26',
                    type: 'custom',
                    position: { x: 2180, y: 55 },
                    data: {
                        label: 'Automatic publishing',
                        border: 'rounded-full border-accent-green',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            }
                        ]
                    }
                },
                {
                    id: '27',
                    type: 'custom',
                    position: { x: 2180, y: 235 },
                    data: {
                        label: 'Trade execution',
                        border: 'rounded-full border-accent-purple',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            }
                        ]
                    }
                },
                {
                    id: '28',
                    type: 'custom',
                    position: { x: 2180, y: 595 },
                    data: {
                        label: 'Trade via agent',
                        border: 'rounded-full border-accent-red',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            }
                        ]
                    }
                },
                {
                    id: '29',
                    type: 'custom',
                    position: { x: 2450, y: 415 },
                    data: {
                        label: 'X ',
                        border: 'rounded-full border-accent-purple',
                        handles: [
                            {
                                type: 'source',
                                id: 'bottom-29',
                                position: Position.Bottom,
                            },
                            {
                                type: 'source',
                                id: 'top-29',
                                position: Position.Top,
                            },
                            {
                                type: 'target',
                                position: Position.Left,
                            },
                            {
                                type: 'source',
                                id: 'right-29',
                                position: Position.Right,
                            }
                        ]
                    }
                },
                {
                    id: '30',
                    type: 'custom',
                    position: { x: 2250, y: 825 },
                    data: {
                        label: 'Feedback and learning',
                        handles: [
                            {
                                type: 'source',
                                id: 'bottom-29',
                                position: Position.Bottom,
                            },
                            {
                                type: 'target',
                                id: 'left-30',
                                position: Position.Left,
                            },
                            {
                                type: 'target',
                                id: 'top-30',
                                position: Position.Top,
                            }
                        ]
                    }
                },
                {
                    id: '31',
                    type: 'custom',
                    position: { x: 2550, y: 400 },
                    data: {
                        label: 'LLM interpretation',
                        description: 'Human language wrapper',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            },
                            {
                                type: 'source',
                                position: Position.Right,
                            }
                        ]
                    }
                },
                {
                    id: '32',
                    type: 'custom',
                    position: { x: 2800, y: 400 },
                    data: {
                        label: 'Answer to Query',
                        description: 'Final response',
                        priority: 'high',
                        border: 'rounded-full border-accent-green',
                        handles: [
                            {
                                type: 'target',
                                position: Position.Left,
                            }
                        ]
                    }
                },
                
            ];
        default:
            return [];
    }
};
