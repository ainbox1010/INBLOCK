import { useEffect, useRef } from 'react';

export default function MeshGradient() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#8B5CF6');   // accent-purple
        gradient.addColorStop(0.5, '#EC4899');  // accent-pink
        gradient.addColorStop(1, '#3B82F6');   // accent-blue

        // Create mesh pattern
        const drawMesh = () => {
            ctx.fillStyle = '#0F0F1A';  // primary-900
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw animated mesh
            const time = Date.now() * 0.001;
            const size = 50;

            for (let x = 0; x < canvas.width; x += size) {
                for (let y = 0; y < canvas.height; y += size) {
                    const distX = Math.sin(x * 0.01 + time) * 20;
                    const distY = Math.cos(y * 0.01 + time) * 20;

                    ctx.fillStyle = gradient;
                    ctx.globalAlpha = 0.1;
                    ctx.beginPath();
                    ctx.arc(x + distX, y + distY, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            requestAnimationFrame(drawMesh);
        };

        drawMesh();

        // Handle resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full"
            style={{ zIndex: 0 }}
        />
    );
} 