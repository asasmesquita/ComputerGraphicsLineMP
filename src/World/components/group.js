//crate a (30x30) board made of a set of grouped cubes

import { Group } from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createGroup(){
    //group for any thing
    const group = new Group();
    
    return group;
}

export { createGroup };