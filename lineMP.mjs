//receives two literals (p1 and p2) with x and y parameters as integers
//calculates the line between p1 and p2 via the middle point algorithm
//returns an array with all points of the line
function lineMP(p1, p2){
    //add first element to array
    const allPoints = [p1]; 
    //test for p1 relative position to p2
    if(p1.x == p2.x && p1.y == p2.y){//single point line
        //console.log('point line');
        return allPoints;
    }
    else if((p2.x - p1.x) == 0 && p1.y < p2.y){//vertical line towards N
        //x constant and increment y until pn.y == p2.y
        //console.log('vertical n');
        let i = p1.y + 1;
        while(i < p2.y){
            const point = {x: p1.x, y: i};
            allPoints.push(point);
            i++;
        }
    }
    else if((p2.x - p1.x) == 0 && p1.y > p2.y){//vertical line towards S
        //x constant and decrement y until pn.y == p2.y
        //console.log('vertical s');
        let i = p1.y - 1;
        while(i > p2.y){
            const point = {x:p1.x, y:i};
            allPoints.push(point);
            i--;
        }
    }
    else if((p2.y - p1.y) == 0 && p1.x < p2.x){//horizontal line towards E
        //increment x until pn.x == p2.x and y constant
        //console.log('horizontal e');
        let i = p1.x + 1;
        while(i < p2.x){
            const point = {x:i, y:p1.y};
            allPoints.push(point);
            i++;
        }
    }
    else if((p2.y - p1.y) == 0 && p1.x > p2.x){//vertical line towards W
        //decrement x until pn.x == p2.x and y constant
        //console.log('horizontal w');
        let i = p1.x - 1;
        while(i > p2.x){
            const point = {x:i, y:p1.y};
            allPoints.push(point);
            i--;
        }
    }
    else {//put p1 at origin point=(0, 0) and fim= p2 - p1
        const point = {x:0, y:0};
        const fim = {x: p2.x - p1.x, y: p2.y - p1.y};
        
        let absX = Math.abs(fim.x);
        let absY = Math.abs(fim.y);
        const signX = Math.sign(fim.x);
        const signY = Math.sign(fim.y);
        let oct27 = false;
        //determine octant to rotate
        if(absY > absX){//m > 0 is in octant 2, 3, 6 or 7
            //rotate over x=y
            const aux = absX;
            absX = absY;
            absY = aux;
            oct27 = true;
        }
        //calculate d, A and B
        let d = 2 * absY - absX;
        const deltaA = 2 * absY;
        const deltaB = 2 * (absY - absX);
        for(let i = 1; i < absX; i++){
            if(d < 0){
                if(oct27){
                    point.y += signY;//this may decrease value if sign is negative
                }
                else{
                    point.x += signX;//this may decrease value if sign is negative
                }
                d = d + deltaA;
            }
            else{
                point.y += signY;//this may decrease value if sign is negative
                point.x += signX;//this may decrease value if sign is negative
                d = d + deltaB;
            }
            const plottedPoint = {x:point.x + p1.x, y:point.y + p1.y};//marked taking into consideration initial point
            allPoints.push(plottedPoint);
        }
    }
    //add last element to array
    allPoints.push(p2);
    //console.log(allPoints);
    return allPoints;
}

export default lineMP;