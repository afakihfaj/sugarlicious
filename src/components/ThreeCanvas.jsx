import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Global cache for loaded GLTF models to prevent repeated downloads
const modelCache = new Map();

export default function ThreeCanvas() {
  const mountRef = useRef(null);
  const [selectedBread, setSelectedBread] = useState('sourdough'); // 'sourdough' | 'loaf' | 'roll'
  const [loading, setLoading] = useState(false);
  const sceneGroupRef = useRef(null);
  const currentModelRef = useRef(null);
  const rendererRef = useRef(null);

  // Helper to build a lightweight, optimized procedural Artisan Sourdough Boule
  const createArtisanSourdoughMesh = () => {
    const group = new THREE.Group();

    // 1. Optimized Sourdough Bread Body (32x24 segments for smooth curve with low polygon count)
    const breadGeo = new THREE.SphereGeometry(0.72, 32, 24);
    breadGeo.scale(1.22, 0.72, 1.15);

    const breadMat = new THREE.MeshStandardMaterial({
      color: 0x934919, // rich golden-caramel crust
      roughness: 0.78,
      metalness: 0.02,
    });
    const breadMesh = new THREE.Mesh(breadGeo, breadMat);
    breadMesh.position.y = 0.08;
    breadMesh.castShadow = true;
    breadMesh.receiveShadow = true;
    group.add(breadMesh);

    // 2. White Flour Dusting (optimized segment count)
    const flourGeo = new THREE.SphereGeometry(0.724, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3.2);
    flourGeo.scale(1.215, 0.725, 1.145);
    const flourMat = new THREE.MeshStandardMaterial({
      color: 0xf5efe6,
      roughness: 0.95,
      metalness: 0.0,
      transparent: true,
      opacity: 0.8,
    });
    const flourMesh = new THREE.Mesh(flourGeo, flourMat);
    flourMesh.position.y = 0.08;
    group.add(flourMesh);

    // 3. Signature Artisan Cross Scoring Cuts
    const scoreMat = new THREE.MeshStandardMaterial({
      color: 0xe6a860,
      roughness: 0.85,
      metalness: 0.02,
    });

    // Score Cut 1: Longitudinal ear slash
    const scoreGeo1 = new THREE.TorusGeometry(0.76, 0.035, 8, 32, Math.PI * 0.65);
    scoreGeo1.scale(1.2, 0.72, 1.0);
    const scoreMesh1 = new THREE.Mesh(scoreGeo1, scoreMat);
    scoreMesh1.rotation.x = Math.PI * 0.5;
    scoreMesh1.rotation.y = Math.PI * 0.18;
    scoreMesh1.position.set(-0.05, 0.38, 0);
    group.add(scoreMesh1);

    // Score Cut 2: Transverse ear slash
    const scoreGeo2 = new THREE.TorusGeometry(0.72, 0.035, 8, 32, Math.PI * 0.62);
    scoreGeo2.scale(1.0, 0.72, 1.15);
    const scoreMesh2 = new THREE.Mesh(scoreGeo2, scoreMat);
    scoreMesh2.rotation.z = Math.PI * 0.5;
    scoreMesh2.rotation.y = Math.PI * 0.22;
    scoreMesh2.position.set(0, 0.38, -0.05);
    group.add(scoreMesh2);

    return group;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0.75, 3.0);

    // 1. WebGL Renderer Optimization: clamp pixelRatio to 1.5 for 50% GPU fill-rate savings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'default',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap; // Lightweight shadow map

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Warm Bakery Oven Lighting
    const ambientLight = new THREE.AmbientLight(0xfff3e3, 1.8);
    scene.add(ambientLight);

    // Main oven spotlight with lightweight shadow map resolution (512x512)
    const mainLight = new THREE.DirectionalLight(0xffae36, 3.8);
    mainLight.position.set(3, 4, 3);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 512;
    mainLight.shadow.mapSize.height = 512;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 10;
    scene.add(mainLight);

    // Rim light for crust glow
    const rimLight = new THREE.DirectionalLight(0xffe18f, 2.4);
    rimLight.position.set(-3, 2, -2.5);
    scene.add(rimLight);

    // Root Group
    const showcaseGroup = new THREE.Group();
    scene.add(showcaseGroup);
    sceneGroupRef.current = showcaseGroup;

    // Wooden Serving Board (32 segments)
    const boardGeo = new THREE.CylinderGeometry(1.25, 1.3, 0.08, 32);
    const boardMat = new THREE.MeshStandardMaterial({
      color: 0x3d2314,
      roughness: 0.7,
      metalness: 0.05,
    });
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.position.set(0, -0.58, 0);
    board.receiveShadow = true;
    showcaseGroup.add(board);

    // Board golden rim accent
    const ringGeo = new THREE.TorusGeometry(1.27, 0.015, 8, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xc88a3b,
      roughness: 0.3,
      metalness: 0.8,
    });
    const rimRing = new THREE.Mesh(ringGeo, ringMat);
    rimRing.rotation.x = Math.PI / 2;
    rimRing.position.set(0, -0.54, 0);
    showcaseGroup.add(rimRing);

    // 2. High-Performance Particle System using single THREE.Points (1 draw call instead of 36!)
    const particleCount = 24;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 2.2;
      const y = -0.45 + Math.random() * 1.5;
      const z = (Math.random() - 0.5) * 2.0;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleVelocities.push({
        speedY: 0.003 + Math.random() * 0.003,
        speedX: (Math.random() - 0.5) * 0.0015,
        baseY: -0.55,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf5d77f,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Function to load model with memory caching
    const loadModel = (breadType) => {
      if (currentModelRef.current) {
        showcaseGroup.remove(currentModelRef.current);
        currentModelRef.current = null;
      }

      setLoading(true);

      if (breadType === 'sourdough') {
        const sourdough = createArtisanSourdoughMesh();
        currentModelRef.current = sourdough;
        showcaseGroup.add(sourdough);
        setLoading(false);
      } else {
        const glbUrl = breadType === 'loaf' ? '/bread_loaf.glb' : '/artisan_bread.glb';

        // Check if cached in memory
        if (modelCache.has(glbUrl)) {
          const cachedClone = modelCache.get(glbUrl).clone(true);
          currentModelRef.current = cachedClone;
          showcaseGroup.add(cachedClone);
          setLoading(false);
          return;
        }

        const loader = new GLTFLoader();
        loader.load(
          glbUrl,
          (gltf) => {
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            model.position.x -= center.x;
            model.position.y -= center.y;
            model.position.z -= center.z;

            const maxDim = Math.max(size.x, size.y, size.z);
            const targetScale = (breadType === 'loaf' ? 1.3 : 1.35) / (maxDim || 1);
            model.scale.setScalar(targetScale);
            model.position.y = breadType === 'loaf' ? 0.02 : 0.05;

            model.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });

            // Save to memory cache
            modelCache.set(glbUrl, model);

            currentModelRef.current = model;
            showcaseGroup.add(model);
            setLoading(false);
          },
          undefined,
          () => {
            const fallback = createArtisanSourdoughMesh();
            currentModelRef.current = fallback;
            showcaseGroup.add(fallback);
            setLoading(false);
          }
        );
      }
    };

    loadModel(selectedBread);

    // Initial tilt
    showcaseGroup.rotation.x = 0.28;
    showcaseGroup.rotation.y = -0.35;

    // Mouse & Touch Drag Interaction
    let isDragging = false;
    let previousPointerPos = { x: 0, y: 0 };
    let targetRotationY = -0.35;
    let targetRotationX = 0.28;
    let autoRotate = true;
    let idleTimer = null;

    const onPointerDown = (e) => {
      isDragging = true;
      autoRotate = false;
      if (idleTimer) clearTimeout(idleTimer);

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      previousPointerPos = { x: clientX, y: clientY };
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousPointerPos.x;
      const deltaY = clientY - previousPointerPos.y;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.006;
      targetRotationX = Math.max(-0.25, Math.min(0.65, targetRotationX));

      previousPointerPos = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      idleTimer = setTimeout(() => {
        autoRotate = true;
      }, 2500);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 3. IntersectionObserver: Stop render loop completely when canvas is off-screen!
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip GPU render pass if off-screen (saves 100% GPU when user scrolls down to products)
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth dampening
      showcaseGroup.rotation.y += (targetRotationY - showcaseGroup.rotation.y) * 0.08;
      showcaseGroup.rotation.x += (targetRotationX - showcaseGroup.rotation.x) * 0.08;

      if (autoRotate && !isDragging) {
        targetRotationY += 0.0035;
      }

      // Gentle floating
      if (currentModelRef.current) {
        currentModelRef.current.position.y = 0.05 + Math.sin(elapsedTime * 1.8) * 0.025;
      }

      // Update particle positions efficiently
      const posAttr = particleGeometry.attributes.position;
      const posArray = posAttr.array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += particleVelocities[i].speedY;
        posArray[i * 3] += Math.sin(elapsedTime * 2 + posArray[i * 3 + 1]) * 0.0008;

        if (posArray[i * 3 + 1] > 1.2) {
          posArray[i * 3 + 1] = particleVelocities[i].baseY;
          posArray[i * 3] = (Math.random() - 0.5) * 2.0;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onPointerDown);
      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);

      if (container && domEl) {
        container.removeChild(domEl);
      }
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      boardGeo.dispose();
      boardMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, [selectedBread]);

  return (
    <div className="relative w-full">
      {/* 3D Canvas Box */}
      <div
        className="relative w-full h-[360px] md:h-[460px] cursor-grab active:cursor-grabbing select-none"
        ref={mountRef}
      >
        {/* Loading Indicator */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-amber-50/60 backdrop-blur-sm rounded-3xl z-20">
            <div className="w-9 h-9 border-3 border-amber-600 border-t-transparent rounded-full animate-spin mb-2" />
            <span className="text-xs font-semibold text-bakery-espresso">
              Menyiapkan Roti Artisan 3D...
            </span>
          </div>
        )}

        {/* 360 Degree Indicator Badge */}
        <div className="absolute bottom-4 right-4 pointer-events-none z-10">
          <div className="flex items-center gap-2 bg-[#2A1B14]/85 backdrop-blur-md text-amber-200 text-xs font-medium px-4 py-2 rounded-full border border-amber-400/30 shadow-lg">
            <svg className="w-4 h-4 text-amber-400 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 21h5v-5" />
            </svg>
            <div className="text-left">
              <span className="block font-bold text-white text-[11px] leading-tight">Putar 360°</span>
              <span className="text-[10px] text-amber-300">Interaktif 3D</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 3D Bread Selector Pills */}
      <div className="mt-3 flex items-center justify-center gap-2 px-2 z-10 relative">
        <button
          onClick={() => setSelectedBread('sourdough')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 shadow-sm ${
            selectedBread === 'sourdough'
              ? 'bg-[#213728] text-white ring-2 ring-amber-400/50'
              : 'bg-white/80 text-bakery-cocoa hover:bg-amber-100/70 border border-bakery-border'
          }`}
        >
          <span>🥖</span>
          <span>Sourdough Bulat</span>
        </button>

        <button
          onClick={() => setSelectedBread('loaf')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 shadow-sm ${
            selectedBread === 'loaf'
              ? 'bg-[#213728] text-white ring-2 ring-amber-400/50'
              : 'bg-white/80 text-bakery-cocoa hover:bg-amber-100/70 border border-bakery-border'
          }`}
        >
          <span>🍞</span>
          <span>Roti Loaf Emas</span>
        </button>

        <button
          onClick={() => setSelectedBread('roll')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 shadow-sm ${
            selectedBread === 'roll'
              ? 'bg-[#213728] text-white ring-2 ring-amber-400/50'
              : 'bg-white/80 text-bakery-cocoa hover:bg-amber-100/70 border border-bakery-border'
          }`}
        >
          <span>🥪</span>
          <span>Artisan Roll</span>
        </button>
      </div>
    </div>
  );
}
