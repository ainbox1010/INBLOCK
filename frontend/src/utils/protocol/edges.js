export const getEdgesForView = (view) => {
    switch (view) {
        case 'overview':
            return [
                // Input Layer Connections
                {
                    id: 'e1-2',
                    source: '1',
                    target: '2',
                    animated: true,
                    label: 'User Queries'
                },
                {
                    id: 'e1-3',
                    source: '1',
                    target: '3',
                    animated: true,
                    label: 'Session Context'
                },

                // To Query Router
                {
                    id: 'e2-4',
                    source: '2',
                    target: '4',
                    animated: true,
                    label: 'Validated Input'
                },
                {
                    id: 'e3-4',
                    source: '3',
                    target: '4',
                    animated: true,
                    label: 'Historical Context'
                },

                // Query Router to Analysis Layer
                {
                    id: 'e4-5',
                    source: '4',
                    target: '5',
                    animated: true,
                    label: 'Token Analysis Request'
                },
                {
                    id: 'e4-6',
                    source: '4',
                    target: '6',
                    animated: true,
                    label: 'Market Analysis Request'
                },
                {
                    id: 'e4-7',
                    source: '4',
                    target: '7',
                    animated: true,
                    label: 'Sentiment Analysis Request'
                },

                // Analysis to Data Stores
                {
                    id: 'e5-8',
                    source: '5',
                    target: '8',
                    animated: true,
                    label: 'Knowledge Query'
                },
                {
                    id: 'e6-9',
                    source: '6',
                    target: '9',
                    animated: true,
                    label: 'Market Data Query'
                },
                {
                    id: 'e7-9',
                    source: '7',
                    target: '9',
                    animated: true,
                    label: 'Social Data Query'
                },

                // To Response Generator
                {
                    id: 'e5-10',
                    source: '5',
                    target: '10',
                    animated: true,
                    label: 'Token Analysis'
                },
                {
                    id: 'e6-10',
                    source: '6',
                    target: '10',
                    animated: true,
                    label: 'Market Insights'
                },
                {
                    id: 'e7-10',
                    source: '7',
                    target: '10',
                    animated: true,
                    label: 'Sentiment Data'
                },
                {
                    id: 'e8-10',
                    source: '8',
                    target: '10',
                    animated: true,
                    label: 'Knowledge Base Data'
                },

                // Admin Module Connections
                {
                    id: 'e11-4',
                    source: '11',
                    target: '4',
                    animated: true,
                    label: 'System Controls'
                },
                {
                    id: 'e11-8',
                    source: '11',
                    target: '8',
                    animated: true,
                    label: 'Knowledge Updates'
                },

                // Custom Agent Builder Connections
                {
                    id: 'e12-4',
                    source: '12',
                    target: '4',
                    animated: true,
                    label: 'Custom Rules'
                },
                {
                    id: 'e12-3',
                    source: '12',
                    target: '3',
                    animated: true,
                    label: 'Agent Config'
                },

                // Response back to UI
                {
                    id: 'e10-1',
                    source: '10',
                    target: '1',
                    animated: true,
                    label: 'Final Response'
                }
            ];
        default:
            return [];
    }
};
