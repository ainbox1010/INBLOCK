import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function WaveTerrain() {
    const mountRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            // Scene setup
            const scene = new THREE.Scene();
            scene.background = new THREE.Color('#0F0F1A');

            const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ 
                antialias: true,
                powerPreference: "high-performance",
                alpha: false
            });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            mountRef.current?.appendChild(renderer.domElement);

            // Create terrain geometry with more detail
            const geometry = new THREE.PlaneGeometry(80, 80, 50, 50);
            const material = new THREE.MeshPhongMaterial({
                color: '#8B5CF6',
                wireframe: true,
                transparent: true,
                opacity: 0.6,
                shininess: 100,
                side: THREE.DoubleSide
            });

            const terrain = new THREE.Mesh(geometry, material);
            terrain.rotation.x = -Math.PI / 4;
            terrain.position.y = -5;
            scene.add(terrain);

            // Add more dramatic lighting
            const mainLight = new THREE.DirectionalLight('#EC4899', 2);
            mainLight.position.set(1, 1, 1);
            scene.add(mainLight);

            const purpleLight = new THREE.PointLight('#8B5CF6', 2);
            purpleLight.position.set(-10, 5, 5);
            scene.add(purpleLight);

            const blueLight = new THREE.PointLight('#3B82F6', 2);
            blueLight.position.set(10, -5, 5);
            scene.add(blueLight);

            scene.add(new THREE.AmbientLight('#404040', 0.5));

            camera.position.z = 40;
            camera.position.y = 20;
            camera.lookAt(0, 0, 0);

            // More dramatic animation
            const animate = () => {
                requestAnimationFrame(animate);

                const time = Date.now() * 0.001;
                const positions = geometry.attributes.position;

                for(let i = 0; i < positions.count; i++) {
                    const x = positions.getX(i);
                    const y = positions.getY(i);
                    const value = 
                        Math.sin(x * 0.2 + time) * 
                        Math.cos(y * 0.2 + time) * 4 +
                        Math.sin(x * 0.05 - time * 0.5) * 3;
                    positions.setZ(i, value);
                }
                positions.needsUpdate = true;

                terrain.rotation.z = Math.sin(time * 0.1) * 0.1;

                renderer.render(scene, camera);
            };

            animate();

            // Handle resize
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                mountRef.current?.removeChild(renderer.domElement);
                geometry.dispose();
                material.dispose();
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