"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MotionScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Starfield particles
    const starCount = 300;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 9;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.02,
      transparent: true,
      opacity: 0.65,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Neural Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.15, 2);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      roughness: 0.25,
      metalness: 0.6,
      wireframe: true,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    // Inner Core
    const innerGeo = new THREE.IcosahedronGeometry(0.7, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.3,
      metalness: 0.8,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.4,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Rings
    const ring1Geo = new THREE.TorusGeometry(1.65, 0.012, 12, 180);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.set(Math.PI / 2.3, 0.2, 0);
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.9, 0.009, 12, 180);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.set(0.7, Math.PI / 2.8, 0.2);
    coreGroup.add(ring2);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 20);
    pointLight1.position.set(3, 3, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 12);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      icoMesh.rotation.x += delta * 0.12;
      icoMesh.rotation.y += delta * 0.2;
      innerMesh.rotation.x -= delta * 0.15;
      innerMesh.rotation.y -= delta * 0.18;

      ring1.rotation.z -= delta * 0.09;
      ring1.rotation.x = Math.sin(elapsed * 0.22) * 0.15 + Math.PI / 2.3;

      ring2.rotation.z += delta * 0.07;
      ring2.rotation.y = Math.cos(elapsed * 0.18) * 0.2 + Math.PI / 2.8;

      starField.rotation.y += delta * 0.018;
      starField.rotation.x = Math.sin(elapsed * 0.08) * 0.08;

      coreGroup.position.y = Math.sin(elapsed * 1.2) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="motion-scene" aria-hidden="true" style={{ width: "100%", height: "100%" }} />
  );
}
