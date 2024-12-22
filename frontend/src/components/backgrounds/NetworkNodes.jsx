import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function NetworkNodes() {
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

            // Create particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 200;
            const posArray = new Float32Array(particlesCount * 3);
            const scales = new Float32Array(particlesCount);

            // Create random positions and scales
            for(let i = 0; i < particlesCount * 3; i += 3) {
                posArray[i] = (Math.random() - 0.5) * 50;      // x
                posArray[i + 1] = (Math.random() - 0.5) * 50;  // y
                posArray[i + 2] = (Math.random() - 0.5) * 50;  // z
                scales[i/3] = Math.random();
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

            // Custom shader material for particles
            const particlesMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    color1: { value: new THREE.Color('#8B5CF6') },
                    color2: { value: new THREE.Color('#EC4899') }
                },
                vertexShader: `
                    attribute float scale;
                    uniform float time;
                    varying vec3 vColor;
                    
                    void main() {
                        vec3 pos = position;
                        pos.y += sin(time + position.x) * 0.5;
                        pos.x += cos(time + position.y) * 0.5;
                        
                        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                        gl_PointSize = scale * 8.0 * (300.0 / -mvPosition.z);
                        gl_Position = projectionMatrix * mvPosition;
                        
                        vColor = mix(vec3(0.545, 0.361, 0.965), vec3(0.925, 0.286, 0.6), scale);
                    }
                `,
                fragmentShader: `
                    varying vec3 vColor;
                    
                    void main() {
                        float strength = distance(gl_PointCoord, vec2(0.5));
                        strength = 1.0 - strength;
                        strength = pow(strength, 3.0);
                        
                        vec3 color = vColor;
                        gl_FragColor = vec4(color, strength);
                    }
                `,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });

            const particles = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particles);

            // Add lines between nearby particles
            const linesMaterial = new THREE.LineBasicMaterial({
                color: 0x8B5CF6,
                transparent: true,
                opacity: 0.1
            });

            const linesGeometry = new THREE.BufferGeometry();
            const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
            scene.add(lines);

            camera.position.z = 30;

            // Animation
            const animate = () => {
                requestAnimationFrame(animate);

                const time = Date.now() * 0.001;
                particlesMaterial.uniforms.time.value = time * 0.5;

                // Update lines between nearby particles
                const positions = particles.geometry.attributes.position.array;
                const linePositions = [];

                for(let i = 0; i < positions.length; i += 3) {
                    const x1 = positions[i];
                    const y1 = positions[i + 1];
                    const z1 = positions[i + 2];

                    for(let j = i + 3; j < positions.length; j += 3) {
                        const x2 = positions[j];
                        const y2 = positions[j + 1];
                        const z2 = positions[j + 2];

                        const distance = Math.sqrt(
                            Math.pow(x2 - x1, 2) +
                            Math.pow(y2 - y1, 2) +
                            Math.pow(z2 - z1, 2)
                        );

                        if(distance < 10) {
                            linePositions.push(x1, y1, z1);
                            linePositions.push(x2, y2, z2);
                        }
                    }
                }

                linesGeometry.setAttribute(
                    'position',
                    new THREE.Float32BufferAttribute(linePositions, 3)
                );

                particles.rotation.y = time * 0.1;
                lines.rotation.y = time * 0.1;

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
                particlesGeometry.dispose();
                particlesMaterial.dispose();
                linesGeometry.dispose();
                linesMaterial.dispose();
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