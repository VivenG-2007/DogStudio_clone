import React from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'

export default function Dog() {
  const { camera, gl } = useThree()

  // Camera + renderer setup
  camera.position.set(-0.5, 0, 2.5)
  gl.toneMapping = THREE.ReinhardToneMapping
  gl.outputColorSpace = THREE.SRGBColorSpace

  const model = useGLTF('/models/dog.drc.glb')

  const textures = useTexture({
    normalMap: '/models/dog_normals.jpg',
    matcap: '/matcap/mat-2.png',
  })

  textures.normalMap.flipY = false
  textures.matcap.colorSpace = THREE.SRGBColorSpace

  // Apply material once
  model.scene.traverse((child) => {
    if (child.isMesh && child.name.includes('DOG')) {
      child.material = new THREE.MeshMatcapMaterial({
        normalMap: textures.normalMap,
        matcap: textures.matcap,
      })
    }
  })

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.5, -2.8, 0]}
        scale={[5, 5, 5]}
        rotation={[0, 0.2 * Math.PI, 0]}
      />
      <directionalLight position={[1, 5, 5]} intensity={10} />
      <OrbitControls />
    </>
  )
}