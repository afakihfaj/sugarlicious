import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function ThreeCanvas() {
  const mountRef = useRef(null);
  const [selectedBread, setSelectedBread] = useState('sourdough'); // 'sourdough' | 'loaf' | 'roll'
  const [loading, setLoading] = useState(false);
  const sceneGroupRef = useRef(null);
  const currentModelRef = useRef(null);

  // Helper to build a procedural Photorealistic Artisan Sourdough Boule
  const createArtisanSourdoughMesh = () => {
    const group = new THREE.Group();

    // 1. Main Sourdough Bread Body (Puffy round loaf, slightly flattened base)
    const breadGeo = new THREE.SphereGeometry(0.72, 48, 36);
    breadGeo.scale(1.22, 0.72, 1.15); // Artisan oval boule shape

    // Warm rustic golden-brown crust with subtle matte flour texture
    const breadMat = new THREE.MeshStandardMaterial({
      color: 0x934919, // rich golden-caramel crust
      roughness: 0.75,
      metalness: 0.04,
      bumpScale: 0.05,
    });
    const breadMesh = new THREE.Mesh(breadGeo, breadMat);
    breadMesh.position.y = 0.08;
    breadMesh.castShadow = true;
    breadMesh.receiveShadow = true;
    group.add(breadMesh);

    // 2. White Flour Dusting on top of the crust
    const flourGeo = new THREE.SphereGeometry(0.725, 48, 24, 0, Math.PI * 2, 0, Math.PI / 3.2);
    flourGeo.scale(1.215, 0.725, 1.145);
    const flourMat = new THREE.MeshStandardMaterial({
      color: 0xf5efe6, // soft ivory flour dust
      roughness: 0.95,
      metalness: 0.0,
      transparent: true,
      opacity: 0.82,
    });
    const flourMesh = new THREE.Mesh(flourGeo, flourMat);
    flourMesh.position.y = 0.08;
    group.add(flourMesh);

    // 3. Signature Artisan Cross Scoring Cuts (Where the dough bloomed in the oven)
    const scoreMat = new THREE.MeshStandardMaterial({
      color: 0xe6a860, // warm creamy golden interior crumb exposed by score
      roughness: 0.85,
      metalness: 0.02,
    });

    // Score Cut 1: Longitudinal ear slash
    const scoreGeo1 = new THREE.TorusGeometry(0.76, 0.038, 16, 48, Math.PI * 0.65);
    scoreGeo1.scale(1.2, 0.72, 1.0);
    const scoreMesh1 = new THREE.Mesh(scoreGeo1, scoreMat);
    scoreMesh1.rotation.x = Math.PI * 0.5;
    scoreMesh1.rotation.y = Math.PI * 0.18;
    scoreMesh1.position.set(-0.05, 0.38, 0);
    group.add(scoreMesh1);

    // Score Cut 2: Transverse ear slash
    const scoreGeo2 = new THREE.TorusGeometry(0.72, 0.038, 16, 48, Math.PI * 0.62);
    scoreGeo2.scale(1.0, 0.72, 1.15);
    const scoreMesh2 = new THREE.Mesh(scoreGeo2, scoreMat);
    scoreMesh2.rotation.z = Math.PI * 0.5;
    scoreMesh2.rotation.y = Math.PI * 0.22;
    scoreMesh2.position.set(0, 0.38, -0.05);
    group.add(scoreMesh2);

    // 4. Toasted Crust Bloom Lip (Crispy blistered edge of the slash)
    const lipGeo = new THREE.TorusGeometry(0.76, 0.016, 12, 48, Math.PI * 0.65);
    lipGeo.scale(1.2, 0.72, 1.0);
    const lipMat = new THREE.MeshStandardMaterial({
      color: 0x5c2b0c, // deep toasted blister edge
      roughness: 0.5,
    });
    const lipMesh = new THREE.Mesh(lipGeo, lipMat);
    lipMesh.rotation.x = Math.PI * 0.5;
    lipMesh.rotation.y = Math.PI * 0.18;
    lipMesh.position.set(-0.06, 0.40, 0);
    group.add(lipMesh);

    return group;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.75, 3.0);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Warm Bakery Oven Lighting
    const ambientLight = new THREE.AmbientLight(0xfff3e3, 1.8);
    scene.add(ambientLight);

    // Main warm oven directional light
    const mainLight = new THREE.DirectionalLight(0xffae36, 3.8);
    mainLight.position.set(3, 4, 3);
    mainLight.castShadow = true;
    scene.add(mainLight);

    // Warm back rim light for crust glow
    const rimLight = new THREE.DirectionalLight(0xffe18f, 2.6);
    rimLight.position.set(-3, 2, -2.5);
    scene.add(rimLight);

    // Soft warm upward bounce
    const bounceLight = new THREE.DirectionalLight(0xd97706, 0.9);
    bounceLight.position.set(0, -2, 1);
    scene.add(bounceLight);

    // Root Group
    const showcaseGroup = new THREE.Group();
    scene.add(showcaseGroup);
    sceneGroupRef.current = showcaseGroup;

    // Artisanal Wooden Serving Board / Peel
    const boardGeo = new THREE.CylinderGeometry(1.25, 1.3, 0.08, 48);
    const boardMat = new THREE.MeshStandardMaterial({
      color: 0x3d2314, // dark rustic walnut
      roughness: 0.7,
      metalness: 0.05,
    });
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.position.set(0, -0.58, 0);
    board.receiveShadow = true;
    showcaseGroup.add(board);

    // Board golden rim accent
    const ringGeo = new THREE.TorusGeometry(1.27, 0.015, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xc88a3b,
      roughness: 0.25,
      metalness: 0.85,
    });
    const rimRing = new THREE.Mesh(ringGeo, ringMat);
    rimRing.rotation.x = Math.PI / 2;
    rimRing.position.set(0, -0.54, 0);
    showcaseGroup.add(rimRing);

    // Floating Golden Steam & Aroma Particles
    const particleCount = 36;
    const particleGeo = new THREE.SphereGeometry(0.018, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0xf5d77f,
      transparent: true,
      opacity: 0.75,
    });

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(particleGeo, particleMat);
      particle.position.set(
        (Math.random() - 0.5) * 2.2,
        -0.45 + Math.random() * 1.5,
        (Math.random() - 0.5) * 2.0
      );
      particle.userData = {
        speedY: 0.003 + Math.random() * 0.004,
        speedX: (Math.random() - 0.5) * 0.002,
        baseY: -0.55,
      };
      scene.add(particle);
      particles.push(particle);
    }

    // Function to load the active bread model
    const loadModel = (breadType) => {
      // Remove previous model
      if (currentModelRef.current) {
        showcaseGroup.remove(currentModelRef.current);
        currentModelRef.current = null;
      }

      setLoading(true);

      if (breadType === 'sourdough') {
        // High quality procedural flour-dusted sourdough boule
        const sourdough = createArtisanSourdoughMesh();
        currentModelRef.current = sourdough;
        showcaseGroup.add(sourdough);
        setLoading(false);
      } else if (breadType === 'loaf') {
        // Load Bread Loaf GLB
        const loader = new GLTFLoader();
        loader.load(
          '/bread_loaf.glb',
          (gltf) => {
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            model.position.x -= center.x;
            model.position.y -= center.y;
            model.position.z -= center.z;

            const maxDim = Math.max(size.x, size.y, size.z);
            const targetScale = 1.3 / (maxDim || 1);
            model.scale.setScalar(targetScale);
            model.position.y = 0.02;

            model.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                  child.material.roughness = 0.65;
                }
              }
            });

            currentModelRef.current = model;
            showcaseGroup.add(model);
            setLoading(false);
          },
          undefined,
          () => {
            // Fallback to sourdough if file missing
            const fallback = createArtisanSourdoughMesh();
            currentModelRef.current = fallback;
            showcaseGroup.add(fallback);
            setLoading(false);
          }
        );
      } else if (breadType === 'roll') {
        // Load Artisan Bread Roll GLB
        const loader = new GLTFLoader();
        loader.load(
          '/artisan_bread.glb',
          (gltf) => {
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            model.position.x -= center.x;
            model.position.y -= center.y;
            model.position.z -= center.z;

            const maxDim = Math.max(size.x, size.y, size.z);
            const targetScale = 1.35 / (maxDim || 1);
            model.scale.setScalar(targetScale);
            model.position.y = 0.05;

            model.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });

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

    // Load initial model
    loadModel(selectedBread);

    // Initial gentle tilt
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

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth dampening
      showcaseGroup.rotation.y += (targetRotationY - showcaseGroup.rotation.y) * 0.08;
      showcaseGroup.rotation.x += (targetRotationX - showcaseGroup.rotation.x) * 0.08;

      if (autoRotate && !isDragging) {
        targetRotationY += 0.004;
      }

      // Gentle breathing float
      if (currentModelRef.current) {
        currentModelRef.current.position.y = 0.05 + Math.sin(elapsedTime * 1.8) * 0.025;
      }

      // Floating golden aroma particles
      particles.forEach((p) => {
        p.position.y += p.userData.speedY;
        p.position.x += Math.sin(elapsedTime * 2 + p.position.y) * 0.001;
        if (p.position.y > 1.2) {
          p.position.y = p.userData.baseY;
          p.position.x = (Math.random() - 0.5) * 2.0;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
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
