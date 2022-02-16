//create a torus

import { TorusGeometry,
        Mesh,
        MeshBasicMaterial } from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createTorus(){
    //create geometry   
    const geometry = new TorusGeometry(3, 1, 10, 20);
    //create a default white basic material
    const material = new MeshBasicMaterial( {color: 0x5005010});
    //create a mesh with the geometray and material
    const torus = new Mesh(geometry, material);
    
    return torus;
}

export { createTorus };