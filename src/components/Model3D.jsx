import * as THREE from "three";
import { useRef, useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const Model3D = () => {
    const mountRef = useRef(null);

    useEffect(()=>{
        const currentRef = mountRef.current;
        const { clientWidth: width, clientHeight: height } = currentRef;

        const scene = new THREE.Scene();
        //scene.background = new THREE.Color();
        const camera = new THREE.PerspectiveCamera(25, width/height , 0.01, 1000)
        scene.add(camera);
        camera.position.z = 6;
        camera.position.x = 6;

        //Creo el objeto render
        const renderer = new THREE.WebGLRenderer();
        //defino el tamaño de ese render
        renderer.setSize(width, height);

        //a los hijos del currentRef le paso el objeto renderer creado
        currentRef.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const geometry = new THREE.BoxGeometry(1,1,1);
        const material = new THREE.MeshPhongMaterial({ color: 0x0f2c64 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        camera.lookAt(cube.position);

        const ambientLight = new THREE.AmbientLight(0x404040, 10);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xff0000, 15)
        pointLight.position.set(1,1,1);
        scene.add(pointLight);

        const clock = new THREE.Clock();
        const animate = () => {
            const elapsedTime = clock.getElapsedTime();
            cube.rotation.y = elapsedTime;
            cube.position.y = Math.sin(elapsedTime);

            controls.update();
            renderer.render(scene,camera);
            requestAnimationFrame(animate);
        }
        animate();

        const resize = () => {
            const updatedWidth = currentRef.clientWidth;
            const updatedHeight = currentRef.clientHeight;
            renderer.setSize(updatedWidth, updatedHeight);
            camera.aspect = updatedWidth / updatedHeight;
            camera.updateProjectionMatrix();
        }

        window.addEventListener('resize', resize)        

        return () => {
            currentRef.removeChild(renderer.domElement);
            window.removeEventListener('resize', resize);
        }
    },[]);

    return <div ref={mountRef} style={{width: '100%', height:'100vh'}}></div>
}