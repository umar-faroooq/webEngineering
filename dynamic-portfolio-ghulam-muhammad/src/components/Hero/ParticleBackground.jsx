import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 50;

    // === PARTICLES ===
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 300;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 300;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 300;
      velocities.push({
        x: (Math.random() - 0.5) * 0.15,
        y: (Math.random() - 0.5) * 0.15,
        z: (Math.random() - 0.5) * 0.1,
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const getParticleColor = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      return isLight ? 0x5a52d5 : 0x6c63ff;
    };

    const particleMaterial = new THREE.PointsMaterial({
      color: getParticleColor(),
      size: 1.2,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // === CONNECTION LINES ===
    const linesMaterial = new THREE.LineBasicMaterial({
      color: getParticleColor(),
      transparent: true,
      opacity: 0.08,
    });

    // === FLOATING 3D SHAPES ===
    const shapes = [];
    const geometries = [
      new THREE.IcosahedronGeometry(8, 0),
      new THREE.OctahedronGeometry(6, 0),
      new THREE.TorusGeometry(5, 1.5, 8, 16),
      new THREE.TetrahedronGeometry(7, 0),
      new THREE.DodecahedronGeometry(5, 0),
    ];

    geometries.forEach((geo, i) => {
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x6c63ff : 0x00d4ff,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      });
      const mesh = new THREE.Mesh(geo, mat);

      const angle = (i / geometries.length) * Math.PI * 2;
      const radius = 60 + Math.random() * 40;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 100 - 30
      );

      mesh.userData = {
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.004,
          y: (Math.random() - 0.5) * 0.004,
          z: (Math.random() - 0.5) * 0.002,
        },
        floatSpeed: 0.0005 + Math.random() * 0.001,
        floatOffset: Math.random() * Math.PI * 2,
        baseY: mesh.position.y,
      };

      scene.add(mesh);
      shapes.push(mesh);
    });

    // === MOUSE TRACKING ===
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // === RESIZE ===
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // === THEME OBSERVER ===
    const themeObserver = new MutationObserver(() => {
      const color = getParticleColor();
      particleMaterial.color.setHex(color);
      linesMaterial.color.setHex(color);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // === ANIMATION LOOP ===
    let linesGroup = new THREE.Group();
    scene.add(linesGroup);
    let frameCount = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      frameCount++;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Move particles
      const positions = particleGeometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const idx = i / 3;
        positions[i] += velocities[idx].x;
        positions[i + 1] += velocities[idx].y;
        positions[i + 2] += velocities[idx].z;

        // Wrap around bounds
        if (positions[i] > 150) positions[i] = -150;
        if (positions[i] < -150) positions[i] = 150;
        if (positions[i + 1] > 150) positions[i + 1] = -150;
        if (positions[i + 1] < -150) positions[i + 1] = 150;
        if (positions[i + 2] > 150) positions[i + 2] = -150;
        if (positions[i + 2] < -150) positions[i + 2] = 150;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Update connection lines every 3 frames for performance
      if (frameCount % 3 === 0) {
        scene.remove(linesGroup);
        linesGroup = new THREE.Group();
        const maxDist = 50;

        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxDist) {
              const lineGeo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]),
                new THREE.Vector3(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]),
              ]);
              const line = new THREE.Line(lineGeo, linesMaterial);
              linesGroup.add(line);
            }
          }
        }
        scene.add(linesGroup);
      }

      // Rotate and float shapes
      const time = Date.now() * 0.001;
      shapes.forEach((shape) => {
        const ud = shape.userData;
        shape.rotation.x += ud.rotSpeed.x;
        shape.rotation.y += ud.rotSpeed.y;
        shape.rotation.z += ud.rotSpeed.z;
        shape.position.y = ud.baseY + Math.sin(time * ud.floatSpeed * 100 + ud.floatOffset) * 8;
      });

      // Camera parallax with mouse
      camera.position.x = mouseX * 15;
      camera.position.y = mouseY * 10;
      camera.lookAt(scene.position);

      // Gentle auto-rotation
      particles.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      themeObserver.disconnect();
      
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Dispose geometries and materials
      particleGeometry.dispose();
      particleMaterial.dispose();
      linesMaterial.dispose();
      geometries.forEach((g) => g.dispose());
      shapes.forEach((s) => s.material.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="particle-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleBackground;
