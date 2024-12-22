import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function TradingCharts() {
    const mountRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const scene = new THREE.Scene();
            scene.background = new THREE.Color('#0F0F1A');

            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ 
                antialias: true,
                powerPreference: "high-performance" 
            });

            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            mountRef.current?.appendChild(renderer.domElement);

            // Create multiple chart lines
            const createChartLine = (yOffset, color, speed) => {
                const points = [];
                const segmentCount = 100;
                for(let i = 0; i < segmentCount; i++) {
                    const x = (i - segmentCount/2) * 0.5;
                    const y = yOffset;
                    const z = 0;
                    points.push(new THREE.Vector3(x, y, z));
                }

                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const material = new THREE.LineBasicMaterial({ 
                    color: color,
                    transparent: true,
                    opacity: 0.5
                });

                const line = new THREE.Line(geometry, material);
                scene.add(line);

                return { line, points, speed };
            };

            // Create candlesticks
            const createCandlestick = (x, y, height, isGreen) => {
                const geometry = new THREE.BoxGeometry(0.2, height, 0.2);
                const material = new THREE.MeshPhongMaterial({
                    color: isGreen ? '#10B981' : '#EF4444',
                    transparent: true,
                    opacity: 0.7
                });
                const candlestick = new THREE.Mesh(geometry, material);
                candlestick.position.set(x, y, 0);
                scene.add(candlestick);
                return candlestick;
            };

            // Create multiple chart elements
            const charts = [
                createChartLine(0, '#8B5CF6', 1),    // Main trend
                createChartLine(5, '#EC4899', 0.8),  // Secondary trend
                createChartLine(-5, '#3B82F6', 1.2), // Third trend
            ];

            // Create candlesticks
            const candlesticks = [];
            for(let i = -20; i < 20; i += 2) {
                const height = Math.random() * 2 + 1;
                const isGreen = Math.random() > 0.5;
                candlesticks.push(createCandlestick(i, Math.random() * 10 - 5, height, isGreen));
            }

            // Add ambient light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            // Add directional light
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(5, 5, 5);
            scene.add(directionalLight);

            camera.position.z = 30;

            // Animation
            const animate = () => {
                requestAnimationFrame(animate);

                const time = Date.now() * 0.001;

                // Animate chart lines
                charts.forEach(({ line, points, speed }) => {
                    const positions = line.geometry.attributes.position;
                    for(let i = 0; i < positions.count; i++) {
                        const x = positions.getX(i);
                        const newY = points[i].y + Math.sin(time * speed + x) * 0.3;
                        positions.setY(i, newY);
                    }
                    positions.needsUpdate = true;
                });

                // Animate candlesticks
                candlesticks.forEach((stick, index) => {
                    stick.position.y += Math.sin(time + index) * 0.01;
                    stick.rotation.z = Math.sin(time * 0.5 + index) * 0.05;
                });

                renderer.render(scene, camera);
            };

            animate();

            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                mountRef.current?.removeChild(renderer.domElement);
                scene.traverse((object) => {
                    if (object.geometry) object.geometry.dispose();
                    if (object.material) object.material.dispose();
                });
            };
        } catch (err) {
            console.error('Three.js error:', err);
            setError(err.message);
        }
    }, []);

    if (error) {
        return <div className="text-red-500">Error initializing 3D background: {error}</div>;
    }

    return (
        <div 
            ref={mountRef} 
            style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        />
    );
} 