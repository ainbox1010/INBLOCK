export const nodes = [
    {
        id: '1',
        type: 'custom',
        position: { x: 100, y: 100 },
        data: { 
            label: 'User query',
            type: 'oval',
            color: 'purple',
            connections: ['right']
        }
    },
    {
        id: '2',
        type: 'custom',
        position: { x: 400, y: 100 },
        data: { 
            label: 'Short term memory',
            type: 'database',
            color: 'purple',
            connections: ['left', 'right']
        }
    },
    {
        id: '3',
        type: 'custom',
        position: { x: 250, y: 250 },
        data: { 
            label: 'Preprocessing',
            type: 'process',
            color: 'green',
            connections: ['left', 'right', 'top', 'bottom']
        }
    },
    {
        id: '4',
        type: 'custom',
        position: { x: 250, y: 400 },
        data: { 
            label: '',
            type: 'intersection',
            color: 'purple',
            connections: ['left', 'right', 'top', 'bottom']
        }
    }
];
