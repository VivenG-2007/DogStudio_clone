import React, { useEffect } from 'react';
import * as Three from 'three'
import { useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';


export default function Dog() {
    const model=  useGLTF('/models/dog.drc.glb');
    useThree(({ camera,scene,gl }) => {
      camera.position.set(-0.5, 0, 2.5);
      gl.toneMapping=Three.ReinhardToneMapping;
      gl.outputColorSpace=Three.SRGBColorSpace
    });
    const texture = useTexture({ normalMap: '/models/dog_normals.jpg',sampleMatCap:"/matcap/mat-2.png" },(texture)=>{
    });
    const[
      normalMap,
      sampleMatCap,
    ]  =(useTexture(["/models/dog_normals.jpg","/matcap/mat-2.png"])).map((texture)=>{
      texture.outputColorSpace=Three.SRGBColorSpace
      texture.flipY=false;
      return texture;
    })

   model.scene.traverse((child) => {
    if(child.name.includes("DOG")){
    child.material = new Three.MeshMatcapMaterial({
  normalMap: texture.normalMap,
  matcap:texture.sampleMatCap
})
  }
})
  return (
    <>
        <primitive object={model.scene} position={[0.5,-2.8,0]} scale={[5,5,5]} rotation={[0,0.2*Math.PI,0]} />
        <directionalLight position={[1,5,5]} color={0xFFFFFF} intensity={10}/>
        <OrbitControls />
    </>
  )
}
