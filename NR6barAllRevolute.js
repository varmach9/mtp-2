import { sinefunc,cosinefunc, sinejacob, cosinejacob } from './NewtonRaphsonhelper'; 
import {
    create, all, forEach 
  } from 'mathjs'
const math = create(all)

// here 1 2 3 4 --- are joints of linkages, so l12, l23 --- are links 
// 4 equations for 2 cycles

var lengths = {};
var lengths={
    "l13":2.0,"l21":2.0, "l34":2.5, "l42":2.0, "l45":2.5, "l56":2.0, "l62":2.0,
    "l31":2.0,"l12":2.0, "l43":2.5, "l24":2.0, "l54":2.5, "l65":2.0, "l26":2.0
}

var angles={};
var angles={ 
    "l12":3.14, "l26":3.14, "l13":1.57,
    "l21":0.0, "l62":0.0, "l31":1.57+3.14
}
const variables=["l34","l42","l45","l56"]
export function NewtonRaphsonfor6bar(){

     let EPSILON = 0.0001;
     function f(X)
     {   const arr=[
        [lengths["l12"]*math.sin(angles["l21"])+lengths["l13"]*math.sin(angles["l13"])+lengths["l34"]*math.sin(X.get([0,0]))+lengths["l42"]*math.sin(X.get([1,0]))],
        [lengths["l12"]*math.cos(angles["l21"])+lengths["l13"]*math.cos(angles["l13"])+lengths["l34"]*math.cos(X.get([0,0]))+lengths["l42"]*math.cos(X.get([1,0]))],
        [lengths["l62"]*math.sin(angles["l62"])+lengths["l24"]*math.sin(X.get([1,0])+3.1416)+lengths["l45"]*math.sin(X.get([2,0]))+lengths["l56"]*math.sin(X.get([3,0]))],
        [lengths["l62"]*math.cos(angles["l62"])+lengths["l24"]*math.cos(X.get([1,0])+3.1416)+lengths["l45"]*math.cos(X.get([2,0]))+lengths["l56"]*math.cos(X.get([3,0]))]
    ]
        return math.matrix(arr);

     }
     function Jacobian(X)
     {  
        const arr2=[[lengths["l34"]*math.cos(X.get([0,0])), lengths["l42"]*math.cos(X.get([1,0])), 0, 0],
             [-lengths["l34"]*math.sin(X.get([0,0])), -lengths["l42"]*math.sin(X.get([1,0])), 0, 0],
             [0,lengths["l42"]*math.cos(3.1416+X.get([1,0])), lengths["l45"]*math.cos(X.get([2,0])), lengths["l56"]*math.cos(X.get([3,0]))],
             [0,-lengths["l42"]*math.sin(3.1416+X.get([1,0])),-lengths["l45"]*math.sin(X.get([2,0])),-lengths["l56"]*math.sin(X.get([3,0]))]
            ]
        return math.matrix(arr2)
     }

     function newtonRaphson(x)
     {
         let dx= math.multiply(math.inv(Jacobian(x)),f(x));
         let itr=1;
        while ((math.max(math.max(dx)) >= EPSILON) || (math.min(math.min(dx)) <=-1*EPSILON) )
         {
            console.log("itr",itr);
            itr=itr+1;
            if (itr==0){break}
             dx = math.multiply(math.inv(Jacobian(x)),f(x));
             x = math.subtract(x,dx);
             console.log(x.get([0,0]),x.get([1,0]),x.get([2,0]),x.get([3,0]))
         }
        
         return x;
     }
  

    let x = [[3.0],[5.0],[6.0],[4.0]];
    return newtonRaphson(math.matrix(x));
  
    }