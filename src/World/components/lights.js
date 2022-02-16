import {DirectionalLight} from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createLights(){
    
    //basic meshMaterial is not affected by lights nor does it need one eto be visible
    //light constructor takes colar and intensity as parameters
    const light = new DirectionalLight('white', 8);

    //directional light shines from ligh.position to light.target.position
    //move light position
    light.position.set(10, 10, 10);



    return light;

}

export { createLights };