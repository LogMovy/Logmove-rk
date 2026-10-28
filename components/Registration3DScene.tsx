'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Registration3DSceneProps {
  step: number
  completionScore: number // 0 to 1
  activeDaysCount?: number
  submitted?: boolean
}

export default function Registration3DScene({
  step,
  completionScore,
  activeDaysCount = 0,
  submitted = false,
}: Registration3DSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stateRef = useRef({ step, completionScore, activeDaysCount, submitted })

  useEffect(() => {
    stateRef.current = { step, completionScore, activeDaysCount, submitted }
  }, [step, completionScore, activeDaysCount, submitted])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene Setup
    const scene = new THREE.Scene()

    const width = container.clientWidth || 380
    const height = container.clientHeight || 240
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
    camera.position.set(0, 0.3, 5.2)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    container.innerHTML = ''
    container.appendChild(renderer.domElement)

    // Root Group
    const rootGroup = new THREE.Group()
    scene.add(rootGroup)

    // 1. Core Wireframe Geodesic Sphere (Logistics Hub)
    const coreGeo = new THREE.IcosahedronGeometry(1.38, 2)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x06284b,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    rootGroup.add(coreMesh)

    // Inner Energy Core
    const innerGeo = new THREE.IcosahedronGeometry(0.95, 1)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x8ce51b,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    })
    const innerMesh = new THREE.Mesh(innerGeo, innerMat)
    rootGroup.add(innerMesh)

    // 2. Glowing Vertex Nodes on the Core
    const posAttr = coreGeo.attributes.position
    const vertexPoints: THREE.Vector3[] = []
    const uniqueKeys = new Set<string>()

    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i)
      const vy = posAttr.getY(i)
      const vz = posAttr.getZ(i)
      const key = `${vx.toFixed(2)}_${vy.toFixed(2)}_${vz.toFixed(2)}`
      if (!uniqueKeys.has(key)) {
        uniqueKeys.add(key)
        vertexPoints.push(new THREE.Vector3(vx, vy, vz))
      }
    }

    const pointsGeo = new THREE.BufferGeometry().setFromPoints(vertexPoints)
    const pointsMat = new THREE.PointsMaterial({
      color: 0x8ce51b,
      size: 0.085,
      transparent: true,
      opacity: 0.9,
    })
    const pointsCloud = new THREE.Points(pointsGeo, pointsMat)
    rootGroup.add(pointsCloud)

    // 3. Orbital Telemetry Rings (Representing the 4 Steps)
    const rings: THREE.Mesh[] = []
    const ringConfigs = [
      { radius: 1.72, tube: 0.014, rotX: 1.1, rotY: 0.2, color: 0x8ce51b },
      { radius: 1.92, tube: 0.012, rotX: -0.7, rotY: 0.8, color: 0x06284b },
      { radius: 2.12, tube: 0.012, rotX: 0.4, rotY: -1.1, color: 0x38bdf8 },
      { radius: 2.30, tube: 0.015, rotX: 1.45, rotY: -0.3, color: 0x8ce51b },
    ]

    ringConfigs.forEach((cfg) => {
      const rGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 12, 90)
      const rMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.22,
      })
      const rMesh = new THREE.Mesh(rGeo, rMat)
      rMesh.rotation.set(cfg.rotX, cfg.rotY, 0)
      rootGroup.add(rMesh)
      rings.push(rMesh)
    })

    // 4. Orbiting Courier Satellites (7 nodes for the 7 days of the week)
    const satellitesGroup = new THREE.Group()
    rootGroup.add(satellitesGroup)
    const satellites: { mesh: THREE.Mesh; angle: number; speed: number; radius: number; yOffset: number }[] = []

    const satGeo = new THREE.SphereGeometry(0.065, 12, 12)
    for (let i = 0; i < 7; i++) {
      const satMat = new THREE.MeshBasicMaterial({
        color: 0x8ce51b,
        transparent: true,
        opacity: 0.35,
      })
      const satMesh = new THREE.Mesh(satGeo, satMat)
      const angle = (i / 7) * Math.PI * 2
      const radius = 1.78 + (i % 3) * 0.18
      const yOffset = (i - 3) * 0.22
      satellites.push({
        mesh: satMesh,
        angle,
        speed: 0.012 + i * 0.002,
        radius,
        yOffset,
      })
      satellitesGroup.add(satMesh)
    }

    // 5. Ambient Floating Particles
    const ambientCount = 45
    const ambientPositions = new Float32Array(ambientCount * 3)
    for (let i = 0; i < ambientCount; i++) {
      ambientPositions[i * 3] = (Math.random() - 0.5) * 6.5
      ambientPositions[i * 3 + 1] = (Math.random() - 0.5) * 4.2
      ambientPositions[i * 3 + 2] = (Math.random() - 0.5) * 3.5
    }
    const ambientGeo = new THREE.BufferGeometry()
    ambientGeo.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3))
    const ambientMat = new THREE.PointsMaterial({
      color: 0x06284b,
      size: 0.045,
      transparent: true,
      opacity: 0.28,
    })
    const ambientParticles = new THREE.Points(ambientGeo, ambientMat)
    scene.add(ambientParticles)

    // Mouse Parallax Interaction
    let targetMouseX = 0
    let targetMouseY = 0
    let currentMouseX = 0
    let currentMouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1
      targetMouseX = Math.max(-1, Math.min(1, nx))
      targetMouseY = Math.max(-1, Math.min(1, ny))
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return
      const newW = container.clientWidth || 380
      const newH = container.clientHeight || 240
      camera.aspect = newW / newH
      camera.updateProjectionMatrix()
      renderer.setSize(newW, newH)
    })
    resizeObserver.observe(container)

    // Animation Loop
    let animationFrameId: number
    let clock = 0

    const animate = () => {
      clock += 0.016
      const { step: curStep, completionScore: score, activeDaysCount: daysCount, submitted: isSubmitted } = stateRef.current

      // Smoothly interpolate mouse parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.06
      currentMouseY += (targetMouseY - currentMouseY) * 0.06

      // Dynamic speed multiplier based on step and completion
      const speedBoost = isSubmitted ? 2.6 : 1 + curStep * 0.32 + score * 0.5

      // Rotate Core & Inner Core
      coreMesh.rotation.y += 0.0045 * speedBoost
      coreMesh.rotation.x += 0.002 * speedBoost
      pointsCloud.rotation.copy(coreMesh.rotation)

      innerMesh.rotation.y -= 0.007 * speedBoost
      innerMesh.rotation.z += 0.004 * speedBoost

      // Breathing scale on inner mesh
      const pulseScale = 1 + Math.sin(clock * 2.5) * (0.05 + score * 0.05)
      innerMesh.scale.set(pulseScale, pulseScale, pulseScale)

      // Update Rings based on active step
      rings.forEach((ring, idx) => {
        const mat = ring.material as THREE.MeshBasicMaterial
        const isActiveRing = idx <= curStep || isSubmitted
        const targetOpacity = isSubmitted ? 0.65 : isActiveRing ? 0.48 : 0.12
        mat.opacity += (targetOpacity - mat.opacity) * 0.08
        if (isActiveRing) {
          mat.color.setHex(idx % 2 === 0 || isSubmitted ? 0x8ce51b : 0x06284b)
        }
        ring.rotation.z += (idx % 2 === 0 ? 0.005 : -0.004) * speedBoost
        ring.rotation.x += 0.0015 * (idx + 1)
      })

      // Update Orbiting Satellites (highlighted by selected work days or completion)
      satellites.forEach((sat, idx) => {
        sat.angle += sat.speed * speedBoost
        sat.mesh.position.set(
          Math.cos(sat.angle) * sat.radius,
          sat.yOffset + Math.sin(sat.angle * 1.5) * 0.25,
          Math.sin(sat.angle) * sat.radius
        )
        const satMat = sat.mesh.material as THREE.MeshBasicMaterial
        const isHighlighted = isSubmitted || idx < daysCount || (curStep < 2 && idx < Math.ceil(score * 7))
        const targetSatOp = isHighlighted ? 0.95 : 0.22
        satMat.opacity += (targetSatOp - satMat.opacity) * 0.1
        satMat.color.setHex(isHighlighted ? 0x8ce51b : 0x06284b)
        const sScale = isHighlighted ? 1.35 : 0.85
        sat.mesh.scale.set(sScale, sScale, sScale)
      })

      // Apply subtle tilt from mouse + step camera shift
      const targetGroupRotY = currentMouseX * 0.35 + curStep * 0.25
      const targetGroupRotX = -currentMouseY * 0.25 + (curStep % 2 === 0 ? 0.08 : -0.08)
      rootGroup.rotation.y += (targetGroupRotY - rootGroup.rotation.y) * 0.05
      rootGroup.rotation.x += (targetGroupRotX - rootGroup.rotation.x) * 0.05

      ambientParticles.rotation.y = clock * 0.04

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      resizeObserver.disconnect()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="reg-3d-widget">
      <div className="reg-3d-canvas-wrap" ref={containerRef} aria-hidden="true" />
      <div className="reg-3d-hud-bar">
        <div className="reg-3d-hud-left">
          <span className="reg-3d-live-dot" />
          <span className="reg-3d-hud-label">
            {submitted
              ? 'PERFIL SINCRONIZADO NA MALHA'
              : [
                  'TELEMETRIA · IDENTIFICAÇÃO DO PARCEIRO',
                  'TELEMETRIA · CONEXÃO DE REPASSES & PIX',
                  `TELEMETRIA · ${activeDaysCount} ${activeDaysCount === 1 ? 'DIA ATIVO' : 'DIAS ATIVOS'} NA ROTA`,
                  'TELEMETRIA · VALIDAÇÃO FINAL DE ACESSO',
                ][step]}
          </span>
        </div>
        <span className="reg-3d-hud-pct">{Math.round(completionScore * 100)}%</span>
      </div>
    </div>
  )
}

