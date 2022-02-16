
//class that serves to create module and render Threejs into the html
import { createCamera } from "./components/camera.js";
import { createTransparentCube } from './components/cube.js';
import { createBoard } from './components/board.js';
import { createLine } from "./components/line.js";
import { createScene } from "./components/scene.js";
import { createRenderer } from "./systems/renderer.js";
import { createLights } from "./components/lights.js";
import { Resizer } from "./systems/Resizer.js";
import { createGroup } from './components/group.js';
import { createControls } from './systems/controls.js';
import { Loop } from './systems/Loop.js';
import { createRaycaster } from "./systems/raycaster.js";
import { Vector2 } from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import lineMP from '../../lineMP.mjs';


//js does not yet has private
//use module scope variables so that class properties cannot be accessed
//from outside the module
let camera;
let renderer;
let scene;
let loop;

const raycaster = new createRaycaster();
const mouse = new Vector2();
const overedTile = {x:0, y:0};//default
//user defined
let initial = {x:0, y:0};
let final = {x:0, y:0};
let start = true;
//const allPoints = [];


class World {
    //1. create n instance of the world app
    constructor(){
        //define canvas
        const container = document.querySelector('#sceneContainer');
        //define animation components and systems
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);
        const controls = new createControls(camera, renderer.domElement);
        loop = new Loop(camera, scene, renderer);
        const light = createLights();

        //create things here
        //axis
        const lineX = new createLine(0, 0, 0.2, 15.5, 0, 0.2, 0x00000FF);
        const lineY = new createLine(0, 0, 0.2, 0, 15.5, 0.2, 0xFF00100);
        //Board
        const board = new createBoard(0x808099, 'brown', 0);
        
        //add animated objects
        loop.updatables.push(controls);

        //add here your initial scene elements
        scene.add(light);
        scene.add(lineX, lineY, board);  

        //event listeners
        //resize scene
        const resizer = new Resizer(container, camera, renderer);
        //render world on changes
        controls.addEventListener('change', () => {
            this.render();
        });
        //console log coordinates of overed tile
        container.addEventListener('mousemove', onMouseMove);
        //mark points
        window.addEventListener('keydown', markPoint);
    }

    //render the scene
    render(){
        //draw a single frame
        renderer.render(scene, camera);
    }
    //start animation loop
    start(){
        loop.start();
    }
    //stop animation loop
    stop(){
        loop.stop();
    }
}


function onMouseMove(event) {
    //get mouse position over container
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	
    // update the picking ray with the camera and mouse position
	raycaster.setFromCamera(mouse, camera);

	// calculate objects intersecting the picking ray
    // board is scene.children[3]
	const intersects = raycaster.intersectObjects(scene.children[3].children, true);
    
    for(let i = 0; i < intersects.length; i++ ){//go to all intersects
        if(intersects[i].object.position.x !=  overedTile.x || intersects[i].object.position.y != overedTile.y){//console.log value is distict from existing
            //update value
            overedTile.x = intersects[i].object.position.x;
            overedTile.y = intersects[i].object.position.y;
            //show result
            console.log(overedTile);
        }
        break;//get just just one first slap
	}
}

function markPoint(event){
    if(event.key == 'x' || event.key == 'X'){//if x is pressed
        //make slap that mouse is overing over as red
        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // calculate objects intersecting the picking ray
        // board is scene.children[3]
        const intersects = raycaster.intersectObjects(scene.children[3].children, true);
        
        let i = 0;//position in array of board slaps
        for(; i < intersects.length; i++ ){//starting conditions
            intersects[i].object.material.color.set(0xff0000);
            break;//get just just one first slap
        }
        
        if(start == true){//mark as first point
            initial.x = intersects[i].object.position.x;
            initial.y = intersects[i].object.position.y;
            start = false;
        }
        else{//mark final point and add element to scene
            final.x = intersects[i].object.position.x;
            final.y = intersects[i].object.position.y;

            //implement MP algorithm
            const allPoints = lineMP(initial, final);

            //draw line if not at the same o point
            const line = new createLine(
                allPoints[0].x, allPoints[0].y, 0.2,
                allPoints[allPoints.length - 1].x, allPoints[allPoints.length - 1].y, 0.2,
                'black'
            );

            //draw slaps 
            const points = new createGroup();

            for(let i = 0; i < allPoints.length; i++){
                const point = new createTransparentCube('yellow');
                point.position.set(allPoints[i].x, allPoints[i].y,0.3);
                points.add(point);
            }

            //add redefined elements
            scene.add(line);
            scene.add(points);
        }
    }
    else if(event.key == 'Backspace'){
        //remove scene elemetents
        for(let i = scene.children.length; i > 2; i--){//keep light, axisY and axisX
            //remove the rest
            scene.remove(scene.children[i]);
        }
        //reset counter
        start = true;
        //restore color of all tiles
        const board = new createBoard(0x808099, 'brown', 0);
        scene.add(board);

    }
    renderer.render( scene, camera );
}

export { World };