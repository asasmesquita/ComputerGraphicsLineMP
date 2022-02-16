//crate a (30x30) board made of a set of grouped cubes

import { createCube } from "./cube.js";
import { Group } from 'https://unpkg.com/three@0.124.0/build/three.module.js'; 

function createBoard(color1, color2, z){
    //group for cubes
    const board = new Group();
    //create and insert cube in position alterning the color
    let c1 = true;
    let slap;

    for(let y = -15; y < 16; y++){
        for(let x = -15; x < 16; x++){
            if(c1){
                slap = new createCube(color1);
                c1 = false;
            }
            else{
                slap = new createCube(color2);
                c1 = true;
            }
            slap.position.set(x, y, z);
            board.add(slap);
        }
    }
    
    return board;
}

export { createBoard };