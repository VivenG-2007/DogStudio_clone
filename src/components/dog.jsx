import React from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function Dog() {
  gsap.registerPlugin(useGSAP())
  gsap.registerPlugin(ScrollTrigger)

  const { camera, gl } = useThree()
  camera.position.set(-0.5, 0, 2.5)
  gl.toneMapping = THREE.ReinhardToneMapping
  gl.outputColorSpace = THREE.SRGBColorSpace

  const model = useGLTF('/models/dog.drc.glb')

  const { actions } = useAnimations(model.animations, model.scene)
  useEffect(() => {
    actions["Take 001"].play()
  }, [actions])


  const [normalMap, matcap, brachMap, branchNormalMap] = useTexture([
    '/models/dog_normals.jpg',
    '/matcap/mat-1.png',
    '/branches_normals.jpg',
    '/branches_diffuse.jpg'
  ]).map((texture) => {
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  })


  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: matcap,
  })

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: brachMap,
    map: branchNormalMap,
  })


  model.scene.traverse((child) => {
    if (child.name.includes('DOG')) {
      child.material = dogMaterial
    } else {
      child.material = branchMaterial
    }
  })

  const model1 = useRef()

  useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#section-1",
      endTrigger: "#section-3",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      markers: true,
    }
  })

  tl
    .to(model1.current.position, {
      z: -3,
      x: 0,
      duration:1.3,
    }, "phase1")

    .to(model1.current.rotation, {
      x: 0.1 * Math.PI,
      y: -0.8 * Math.PI,
    }, "phase3")

    .to(model1.current.position, {
      z: -1,
      x:-1.2,
    }, "phase2")
    .to(model1.current.rotation,{
      y:-0.9*Math.PI
    },"phase2")

}, [])


  return (
    <>
      <primitive ref={model1}
        object={model.scene}
        position={[0.7, -2.8, 0]}
        scale={[5, 5, 5]}
        rotation={[0, 0.2 * Math.PI, 0]}
      />
      <directionalLight position={[1, 5, 5]} intensity={10} />

    </>
  )
}