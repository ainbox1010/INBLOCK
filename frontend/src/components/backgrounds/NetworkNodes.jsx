import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import CyborgBlockLogo from '../brand/logos/CyborgBlockLogo'
import { createRoot } from 'react-dom/client'

export default function NetworkNodes() {
    const mountRef = useRef(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        try {
            // Scene setup
            const scene = new THREE.Scene()
            scene.background = new THREE.Color('#0F0F1A')

            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
            
            // Create both WebGL and CSS3D renderers
            const renderer = new THREE.WebGLRenderer({ 
                antialias: true,
                powerPreference: "high-performance",
                alpha: true
            })
            const cssRenderer = new CSS3DRenderer()

            renderer.setSize(window.innerWidth, window.innerHeight)
            cssRenderer.setSize(window.innerWidth, window.innerHeight)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            
            mountRef.current?.appendChild(renderer.domElement)
            cssRenderer.domElement.style.position = 'absolute'
            cssRenderer.domElement.style.top = '0'
            mountRef.current?.appendChild(cssRenderer.domElement)

            // Create particles
            const particlesCount = 50
            const particles = []
            const particleObjects = new THREE.Group()
            const velocities = []
            const roots = [] // Store React roots

            for(let i = 0; i < particlesCount; i++) {
                // Create container for logo
                const div = document.createElement('div')
                div.style.width = '32px'
                div.style.height = '32px'
                
                // Create React root and render logo
                const root = createRoot(div)
                root.render(<CyborgBlockLogo className="w-8 h-8 opacity-20" />)
                roots.push(root) // Store root for cleanup
                
                // Create CSS3D object
                const object = new CSS3DObject(div)
                object.position.x = (Math.random() - 0.5) * 1000
                object.position.y = (Math.random() - 0.5) * 1000
                object.position.z = (Math.random() - 0.5) * 1000
                
                velocities.push({
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5,
                    z: (Math.random() - 0.5) * 0.5
                })
                
                particles.push(object)
                particleObjects.add(object)
            }

            scene.add(particleObjects)

            // Add lines between nearby particles
            const linesMaterial = new THREE.LineBasicMaterial({
                color: 0x8B5CF6,
                transparent: true,
                opacity: 0.1
            })

            const linesGeometry = new THREE.BufferGeometry()
            const lines = new THREE.LineSegments(linesGeometry, linesMaterial)
            scene.add(lines)

            camera.position.z = 500

            // Updated Animation
            const animate = () => {
                requestAnimationFrame(animate)

                // Update particle positions
                particles.forEach((particle, i) => {
                    particle.position.x += velocities[i].x
                    particle.position.y += velocities[i].y
                    particle.position.z += velocities[i].z

                    // Bounce off boundaries
                    const bounds = 500
                    if (Math.abs(particle.position.x) > bounds) velocities[i].x *= -1
                    if (Math.abs(particle.position.y) > bounds) velocities[i].y *= -1
                    if (Math.abs(particle.position.z) > bounds) velocities[i].z *= -1
                })

                // Update lines between nearby particles
                const linePositions = []
                particles.forEach((particle, i) => {
                    particles.slice(i + 1).forEach(other => {
                        const distance = particle.position.distanceTo(other.position)
                        if(distance < 300) {
                            linePositions.push(
                                particle.position.x, particle.position.y, particle.position.z,
                                other.position.x, other.position.y, other.position.z
                            )
                        }
                    })
                })

                linesGeometry.setAttribute(
                    'position',
                    new THREE.Float32BufferAttribute(linePositions, 3)
                )

                renderer.render(scene, camera)
                cssRenderer.render(scene, camera)
            }

            animate()

            // Handle window resize
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight
                camera.updateProjectionMatrix()
                renderer.setSize(window.innerWidth, window.innerHeight)
                cssRenderer.setSize(window.innerWidth, window.innerHeight)
            }

            window.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('resize', handleResize)
                // Cleanup React roots
                roots.forEach(root => root.unmount())
                mountRef.current?.removeChild(renderer.domElement)
                mountRef.current?.removeChild(cssRenderer.domElement)
                scene.remove(particleObjects)
                scene.remove(lines)
                linesGeometry.dispose()
                linesMaterial.dispose()
            }
        } catch (err) {
            console.error('Three.js error:', err)
            setError(err.message)
        }
    }, [])

    if (error) {
        return <div className="text-red-500">Error initializing 3D background: {error}</div>
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
    )
} 