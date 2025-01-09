import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function CircuitGrid() {
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

            // Create grid
            const gridSize = 20;
            const gridDivisions = 20;
            const gridMaterial = new THREE.LineBasicMaterial({ 
                color: '#3B82F6',
                transparent: true,
                opacity: 0.2
            });

            const grid = new THREE.GridHelper(gridSize, gridDivisions, '#3B82F6', '#3B82F6');
            grid.rotation.x = Math.PI / 4;
            scene.add(grid);

            // Create circuit nodes
            const nodes = [];
            const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
            const nodeMaterial = new THREE.MeshPhongMaterial({
                color: '#8B5CF6',
                emissive: '#8B5CF6',
                emissiveIntensity: 0.5
            });

            for(let i = 0; i < 50; i++) {
                const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
                node.position.set(
                    (Math.random() - 0.5) * gridSize,
                    (Math.random() - 0.5) * gridSize,
                    (Math.random() - 0.5) * gridSize
                );
                scene.add(node);
                nodes.push({
                    mesh: node,
                    speed: Math.random() * 0.5 + 0.5
                });
            }

            // Create connecting lines
            const linesMaterial = new THREE.LineBasicMaterial({
                color: '#EC4899',
                transparent: true,
                opacity: 0.3
            });

            const lines = [];
            for(let i = 0; i < nodes.length; i++) {
                for(let j = i + 1; j < nodes.length; j++) {
                    if(Math.random() > 0.9) {
                        const geometry = new THREE.BufferGeometry();
                        const line = new THREE.Line(geometry, linesMaterial);
                        scene.add(line);
                        lines.push({
                            line,
                            start: nodes[i].mesh,
                            end: nodes[j].mesh
                        });
                    }
                }
            }

            // Add lights
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(5, 5, 5);
            scene.add(directionalLight);

            camera.position.z = 15;
            camera.position.y = 5;
            camera.lookAt(0, 0, 0);

            // Animation
            const animate = () => {
                requestAnimationFrame(animate);

                const time = Date.now() * 0.001;

                // Animate nodes
                nodes.forEach((node) => {
                    node.mesh.position.y += Math.sin(time * node.speed) * 0.01;
                    node.mesh.scale.setScalar(1 + Math.sin(time * node.speed) * 0.2);
                });

                // Update connecting lines
                lines.forEach(({ line, start, end }) => {
                    const positions = new Float32Array([
                        start.position.x, start.position.y, start.position.z,
                        end.position.x, end.position.y, end.position.z
                    ]);
                    line.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                });

                // Rotate grid slowly
                grid.rotation.z += 0.001;

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