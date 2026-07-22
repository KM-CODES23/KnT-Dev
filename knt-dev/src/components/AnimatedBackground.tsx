import { useEffect, useRef } from "react";
import * as THREE from "three";

const toThreeColor = (token: string) => {
  const [h = "0", s = "0%", l = "100%"] = token.trim().split(/\s+/);
  return new THREE.Color(`hsl(${h}, ${s}, ${l})`);
};

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const root = document.documentElement;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    const readThemeColors = () => {
      const styles = getComputedStyle(root);

      return {
        primary: toThreeColor(styles.getPropertyValue("--primary")),
        accent: toThreeColor(styles.getPropertyValue("--accent")),
        highlight: toThreeColor(styles.getPropertyValue("--warm-accent")),
      };
    };

    const rig = new THREE.Group();
    scene.add(rig);

    const knotMaterial = new THREE.MeshPhysicalMaterial({
      roughness: 0.2,
      metalness: 0.55,
      transparent: true,
      opacity: 0.36,
      clearcoat: 1,
      wireframe: true,
    });

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(3.1, 0.95, 220, 28),
      knotMaterial,
    );
    knot.position.set(3.1, 0.8, -6.2);
    knot.rotation.set(0.9, 0.35, 0);
    rig.add(knot);

    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      roughness: 0.12,
      metalness: 0.18,
      transparent: true,
      opacity: 0.38,
      clearcoat: 1,
      transmission: 0.08,
    });

    const crystal = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.85, 1),
      crystalMaterial,
    );
    crystal.position.set(-3.1, -1.1, -5.8);
    rig.add(crystal);

    const ringMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.38,
    });

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.4, 0.07, 18, 100),
      ringMaterial,
    );
    ring.position.set(-2.8, 2, -4.2);
    ring.rotation.set(1.14, 0.22, 0.36);
    rig.add(ring);

    const miniOrbMaterial = new THREE.MeshStandardMaterial({
      emissiveIntensity: 0.8,
      metalness: 0.18,
      roughness: 0.3,
      transparent: true,
      opacity: 0.55,
    });

    const miniOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 24, 24),
      miniOrbMaterial,
    );
    miniOrb.position.set(1.8, -2.1, -3.8);
    rig.add(miniOrb);

    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const stride = i * 3;
      particlePositions[stride] = (Math.random() - 0.5) * 20;
      particlePositions[stride + 1] = (Math.random() - 0.5) * 12;
      particlePositions[stride + 2] = (Math.random() - 0.5) * 10;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.075,
      transparent: true,
      opacity: 0.92,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particles.position.z = -5.5;
    scene.add(particles);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0xffffff, 3.2, 28, 2);
    mainLight.position.set(5, 5, 10);
    scene.add(mainLight);

    const sideLight = new THREE.PointLight(0xffffff, 2.6, 24, 2);
    sideLight.position.set(-7, -2, 7);
    scene.add(sideLight);

    const fillParticleColors = (colors: ReturnType<typeof readThemeColors>) => {
      const palette = [colors.primary, colors.accent, colors.highlight];

      for (let i = 0; i < particleCount; i += 1) {
        const stride = i * 3;
        const color = palette[i % palette.length];

        particleColors[stride] = color.r;
        particleColors[stride + 1] = color.g;
        particleColors[stride + 2] = color.b;
      }

      particlesGeometry.attributes.color.needsUpdate = true;
    };

    const applyTheme = () => {
      const colors = readThemeColors();

      knotMaterial.color.copy(colors.primary);
      knotMaterial.emissive.copy(colors.primary).multiplyScalar(0.72);

      crystalMaterial.color.copy(colors.accent);
      crystalMaterial.emissive.copy(colors.accent).multiplyScalar(0.54);

      ringMaterial.color.copy(colors.highlight);
      miniOrbMaterial.color.copy(colors.highlight);
      miniOrbMaterial.emissive.copy(colors.highlight).multiplyScalar(0.9);

      mainLight.color.copy(colors.primary);
      sideLight.color.copy(colors.accent);

      fillParticleColors(colors);
    };

    applyTheme();

    const themeObserver = new MutationObserver(() => {
      applyTheme();
    });

    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (event: MouseEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handlePointerMove);

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      knot.rotation.x = 0.9 + elapsed * 0.12;
      knot.rotation.y = 0.35 + elapsed * 0.16;
      knot.rotation.z = Math.sin(elapsed * 0.45) * 0.24;

      crystal.rotation.x = elapsed * 0.26;
      crystal.rotation.y = elapsed * 0.34;
      crystal.position.y = -1.3 + Math.sin(elapsed * 0.9) * 0.22;

      ring.rotation.z = 0.36 + elapsed * 0.18;
      miniOrb.position.y = -2.5 + Math.cos(elapsed * 1.1) * 0.32;
      miniOrb.position.x = 2.1 + Math.sin(elapsed * 0.85) * 0.35;

      particles.rotation.y = elapsed * 0.035;
      particles.rotation.x = Math.sin(elapsed * 0.12) * 0.08;

      rig.rotation.z = Math.sin(elapsed * 0.16) * 0.05;

      rig.position.x += ((pointer.x * 0.9) - rig.position.x) * 0.035;
      rig.position.y += ((-pointer.y * 0.55) - rig.position.y) * 0.035;

      camera.position.x += ((pointer.x * 0.85) - camera.position.x) * 0.025;
      camera.position.y += ((-pointer.y * 0.55) - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handlePointerMove);
      themeObserver.disconnect();

      knot.geometry.dispose();
      knotMaterial.dispose();
      crystal.geometry.dispose();
      crystalMaterial.dispose();
      ring.geometry.dispose();
      ringMaterial.dispose();
      miniOrb.geometry.dispose();
      miniOrbMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="animated-background fixed inset-0 z-0 pointer-events-none" />;
};

export default AnimatedBackground;
