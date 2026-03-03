import React from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { useGLTF, useTexture, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Dog() {
  const { camera, gl } = useThree()
  camera.position.set(-0.5, 0, 2.5)
  gl.toneMapping = THREE.ReinhardToneMapping
  gl.outputColorSpace = THREE.SRGBColorSpace

  const model = useGLTF('/models/dog.drc.glb')

  const { actions } = useAnimations(model.animations, model.scene)
  useEffect(() => {
    if (actions["Take 001"]) {
      actions["Take 001"].play()
    }
  }, [actions])

  const [normalMap, branchNormalMap, branchMap] = useTexture([
    '/models/dog_normals.jpg',
    '/branches_normals.jpg',
    '/branches_diffuse.jpg'
  ]).map((texture) => {
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  })

  const [matcap1, matcap2, matcap3, matcap4, matcap5, matcap6, matcap7, matcap8, matcap9, matcap10, matcap11, matcap12, matcap13, matcap14, matcap15, matcap16, matcap17, matcap18, matcap19, matcap20] = (useTexture([
    "/matcap/mat-1.png",
    "/matcap/mat-2.png",
    "/matcap/mat-3.png",
    "/matcap/mat-4.png",
    "/matcap/mat-5.png",
    "/matcap/mat-6.png",
    "/matcap/mat-7.png",
    "/matcap/mat-8.png",
    "/matcap/mat-9.png",
    "/matcap/mat-10.png",
    "/matcap/mat-11.png",
    "/matcap/mat-12.png",
    "/matcap/mat-13.png",
    "/matcap/mat-14.png",
    "/matcap/mat-15.png",
    "/matcap/mat-16.png",
    "/matcap/mat-17.png",
    "/matcap/mat-18.png",
    "/matcap/mat-19.png",
    "/matcap/mat-20.png",
  ])).map(texture => {
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  })


  const material = useRef({
    uMatcap2: { value: matcap1 },
    uMatcap1: { value: matcap19 },
    uProgress: { value: 0.0 }
  })

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: matcap2,
  })

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    map: branchMap,
  })

  function onBeforeCompile(shader) {
    shader.uniforms.uMatcapTexture1 = material.current.uMatcap1
    shader.uniforms.uMatcapTexture2 = material.current.uMatcap2
    shader.uniforms.uProgress = material.current.uProgress

    shader.fragmentShader = shader.fragmentShader.replace(
      "void main() {",
      `
        uniform sampler2D uMatcapTexture1;
        uniform sampler2D uMatcapTexture2;
        uniform float uProgress;

        void main() {
      `
    )

    shader.fragmentShader = shader.fragmentShader.replace(
      "vec4 matcapColor = texture2D( matcap, uv );",
      `
        vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
        vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );

        float edgeWidth = 0.5;
        float center = mix(100.0, -100.0, uProgress);
        float progress = smoothstep(center - edgeWidth, center + edgeWidth, (vViewPosition.x + vViewPosition.y));

        vec4 matcapColor = mix(matcapColor2, matcapColor1, progress);
      `
    )
  }
  dogMaterial.onBeforeCompile = onBeforeCompile

  model.scene.traverse((child) => {
    if (child.name.includes('DOG')) {
      child.material = dogMaterial
    } else {
      child.material = branchMaterial
    }
  })

  const model1 = useRef()

  useGSAP(() => {
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        endTrigger: "#section-2",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    })

    tl1
      .to(model.scene.position, {
        z: "-=0.75",
        y: "+=0.1"
      })
      .to(model.scene.rotation, {
        x: `+=${Math.PI / 15}`
      })
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-2",
        endTrigger: "#section-3",
        start: "bottom top",
        end: "bottom bottom",
        scrub: true,
      }
    })

    tl2
      .to(model.scene.rotation, {
        y: `-=${Math.PI}`,
        duration: 2,
      }, "rotate")
      .to(model.scene.position, {
        x: "-=0.5",
        z: "+=0.6",
        y: "-=0.05",
        duration: 2,
      }, "rotate")
      .to(material.current.uProgress, {
        value: 1.0,
        duration: 2,
      }, "rotate")

  }, [])

  useEffect(() => {
    const addHover = (selector, matcap) => {
      const el = document.querySelector(selector)
      if (!el) return
      el.addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = matcap
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value
            material.current.uProgress.value = 1.0
          }
        })
      })
    }

    addHover(`.title[img-title="tomorrowland"]`, matcap19)
    addHover(`.title[img-title="navy-pier"]`, matcap8)
    addHover(`.title[img-title="msi-chicago"]`, matcap9)
    addHover(`.title[img-title="phone"]`, matcap12)
    addHover(`.title[img-title="kikk"]`, matcap10)
    addHover(`.title[img-title="kennedy"]`, matcap8)
    addHover(`.title[img-title="opera"]`, matcap13)

    const titlesEl = document.querySelector(`.titles`)
    if (titlesEl) {
      titlesEl.addEventListener("mouseleave", () => {
        material.current.uMatcap1.value = matcap2
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value
            material.current.uProgress.value = 1.0
          }
        })
      })
    }
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