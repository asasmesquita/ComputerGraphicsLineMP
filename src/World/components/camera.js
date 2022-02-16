//create a camera

import { PerspectiveCamera } from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createCamera(){
    const camera = new PerspectiveCamera(
        35, //fov
        1, //aspect of container 1 is just dummy value to be changed
        0.1, //near clipping plane
        100//far clipping plane
    );

    ///move back the camera from (0, 0, 0) so that  we can view the scene
    camera.position.set(0, 0, 50);
    
    return camera;
}

export { createCamera };
