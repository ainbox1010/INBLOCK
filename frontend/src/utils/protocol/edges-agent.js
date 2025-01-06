import { animate } from "framer-motion";

// Constants for repeated values
const SMOOTHSTEP = 'smoothstep';
const ANIMATED = true;

export const getEdgesForView = (view) => {
    switch (view) {
        case 'overview':
            return [
                // Input Layer Connections
                {
                    id: 'e1-2',
                    source: '1',
                    target: '2',
                    animated: ANIMATED,
                    label: 'User Queries'
                },
                {
                    id: 'e2-3',
                    source: '2',
                    target: '3',
                    animated: ANIMATED,
                    label: 'Context'
                },
                {
                    id: 'e3-4',
                    source: '3',
                    target: '4',
                    sourceHandle: 'top-3',
                    animated: ANIMATED,
                    label: 'Current data',
                },
                {
                    id: 'e3-5',
                    source: '3',
                    target: '5',
                    sourceHandle: 'bottom-3',
                    animated: ANIMATED,
                    label: 'Historic data',
                },
                {
                    id: 'e4-5',
                    type: SMOOTHSTEP,
                    source: '4',
                    target: '5',
                    targetHandle: 'left-5',
                    animated: ANIMATED,
                },
                {
                    id: 'e3-6',
                    source: '3',
                    target: '6',
                    sourceHandle: 'right-3',
                    animated: ANIMATED,
                },
                {
                    id: 'e6-7',
                    source: '6',
                    target: '7',
                    animated: ANIMATED,
                },
                {
                    id: 'e6-9',
                    type: SMOOTHSTEP,
                    source: '6',
                    target: '9',
                    animated: ANIMATED,
                },
                {
                    id: 'e8-9',
                    source: '8',
                    target: '9',
                    animated: ANIMATED,
                },
                {
                    id: 'e8-10',
                    source: '10',
                    target: '8',
                    animated: ANIMATED,
                },
                {
                    id: 'e10-11',
                    source: '11',
                    target: '10',
                },
                {
                    id: 'e12-6',
                    type: SMOOTHSTEP,
                    source: '12',
                    target: '6',
                    targetHandle: 'top-6',
                    animated: ANIMATED,
                },
                {
                    id: 'e13-12',
                    type: SMOOTHSTEP,
                    source: '13',
                    target: '12',
                    targetHandle: 'left-12',
                    animated: ANIMATED,
                },
                {
                    id: 'e13-14',
                    source: '13',
                    target: '14',
                    sourceHandle: 'right-13',
                    targetHandle: 'left-14',
                    animated: ANIMATED,
                },
                {
                    id: 'e14-12',
                    type: SMOOTHSTEP,
                    source: '14',
                    target: '12',
                    targetHandle: 'top-12',
                    animated: ANIMATED,
                },
                {
                    id: 'e15-12',
                    type: SMOOTHSTEP,
                    source: '15',
                    target: '12',
                    targetHandle: 'right-12',
                    animated: ANIMATED,
                },
                {
                    id: 'e16-13',
                    source: '16',
                    target: '13'
                },
                {
                    id: 'e16-14',
                    source: '16',
                    target: '14',
                    targetHandle: 'top-14',
                },
                {
                    id: 'e16-15',
                    source: '16',
                    target: '15',
                    targetHandle: 'top-14',
                },
                {
                    id: 'e7-17',
                    source: '7',
                    target: '17',
                    animated: ANIMATED,
                },
                {
                    id: 'e7-18',
                    source: '7',
                    target: '18',
                    animated: ANIMATED,
                },
                {
                    id: 'e7-19',
                    source: '7',
                    target: '19',
                    animated: ANIMATED,
                },
                {
                    id: 'e17-20',
                    source: '17',
                    target: '20',
                    animated: ANIMATED,
                    type: SMOOTHSTEP,
                },
                {
                    id: 'e18-20',
                    source: '18',
                    target: '20',
                    animated: ANIMATED,
                    type: SMOOTHSTEP,
                },
                {
                    id: 'e19-20',
                    source: '19',
                    target: '20',
                    animated: ANIMATED,
                    type: SMOOTHSTEP,
                },
                {
                    id: 'e20-21',
                    source: '20',
                    target: '21',
                    animated: ANIMATED,
                    type: SMOOTHSTEP,
                },
                {
                    id: 'e20-22',
                    source: '20',
                    target: '22',
                    animated: ANIMATED,
                    type: SMOOTHSTEP,
                },
                {
                    id: 'e20-23',
                    source: '20',
                    target: '23',
                    animated: ANIMATED,
                    type: SMOOTHSTEP,
                },
                {
                    id: 'e20-24',
                    source: '20',
                    target: '24',
                    animated: ANIMATED,
                    type: SMOOTHSTEP,
                },
                {
                    id: 'e20-25',
                    source: '20',
                    target: '25',
                    animated: ANIMATED,
                    type: SMOOTHSTEP,
                },
                {
                    id: 'e21-26',
                    source: '21',
                    target: '26',
                },
                {
                    id: 'e22-27',
                    source: '22',
                    target: '27',
                },
                {
                    id: 'e24-28',
                    source: '24',
                    target: '28',
                },
                {
                    id: 'e23-29',
                    source: '23',
                    target: '29',
                    animated: ANIMATED,
                },
                {
                    id: 'e29-30',
                    source: '29',
                    target: '30',
                    targetHandle: 'top-30',
                    animated: ANIMATED,
                    type: SMOOTHSTEP,
                },
                {
                    id: 'e29-31',
                    source: '29',
                    target: '31',
                    sourceHandle: 'right-29',
                    animated: ANIMATED,
                },
                {
                    id: 'e29-4',
                    source: '29',
                    target: '4',
                    sourceHandle: 'top-29',
                    targetHandle: 'top-4',
                    animated: ANIMATED,
                    type: SMOOTHSTEP,
                },
                {
                    id: 'e25-30',
                    source: '25',
                    target: '30',
                    targetHandle: 'left-30',
                    animated: ANIMATED,
                    type: SMOOTHSTEP,
                },
                {
                    id: 'e30-10',
                    source: '30',
                    target: '10',
                    targetHandle: 'right-10',
                    animated: ANIMATED,
                    type: SMOOTHSTEP,
                },
                {
                    id: 'e31-32',
                    source: '31',
                    target: '32',
                    targetHandle: 'right-10',
                    animated: ANIMATED,
                    type: SMOOTHSTEP,
                }

            ];
        default:
            return [];
    }
};
