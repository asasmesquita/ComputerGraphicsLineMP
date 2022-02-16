//create a cube

import { BoxGeometry,
         Mesh,
         MeshBasicMaterial,
         MathUtils,
         MeshStandardMaterial,
         MeshPhongMaterial } from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createCube(color){
    //create geometry   
    const geometry = new BoxGeometry(1, 1, 0.3);
    // white is  default color for basic material
    const material = new MeshStandardMaterial({color: color});
    //create a mesh with the geometray and material
    const cube = new Mesh(geometry, material);
    
    const radiansPerSecond = MathUtils.degToRad(30);
    //animate cube
    cube.tick = (delta) => {
        //change cube color to red
        //cube.material.color.set(0xFF0000);
        cube.rotation.z += radiansPerSecond * delta;
        cube.rotation.x += radiansPerSecond * delta;
        cube.rotation.y += radiansPerSecond * delta;
    };  
    
    return cube;
}

function createTransparentCube(color){
    //create geometry   
    const geometry = new BoxGeometry(1, 1, 0.25);
    // white is  default color for basic material
    //const material = new MeshBasicMaterial( {color: 0x50FF80});
    const material = new MeshPhongMaterial({
        color: color,
        opacity: 0.5,
        transparent: true
    });
    //create a mesh with the geometray and material
    const cube = new Mesh(geometry, material);
    
    return cube;
}

export { createCube, createTransparentCube };