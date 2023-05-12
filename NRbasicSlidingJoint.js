import {
    create, all, forEach 
  } from 'mathjs'
const math = create(all)

// here 1 2 3 4 --- are joints of linkages, so l12, l23 --- are links 
// 1 6 5 are ground joints  l16 and l56 are grounded
// 1632 and 5634 are cycles
// 4 is a sliding joint so t34-1.57=t45 is additional equation along with 4 equations for 2 cycles

var lengths = {};
var lengths={
    "l12":2.5,"l23":2.0, "l36":2.5, "l16":2.0,  "l56":2.0, "l34":2.0,
    "l21":2.5,"l32":2.0, "l63":2.5, "l61":2.0,  "l65":2.0, "l43":2.0
}

var angles={};
var angles={ 
    "t61":3.14, "t56":3.14, "t12":1.57,
    "t16":0.0, "t65":0.0, "t21":1.57+3.14
}
const variables=["t23","t63","t34","t54","l54"]
export function SlidingBasic(){

     let EPSILON = 0.0001;

     function f(X)
     {  console.log(math.sin(X.get([1,0])+3.14)); 
        let a=lengths["l12"]*math.sin(angles["t12"])+lengths["l23"]*math.sin(X.get([0,0]))+
        lengths["l36"]*math.sin(X.get([1,0])+3.14)+lengths["l16"]*math.sin(angles["t61"]);
        let b=lengths["l12"]*math.cos(angles["t12"])+lengths["l23"]*math.cos(X.get([0,0]))+
        lengths["l36"]*math.cos(X.get([1,0])+3.14)+lengths["l16"]*math.cos(angles["t61"]);
        let c=lengths["l56"]*math.sin(angles["t56"])+lengths["l63"]*math.sin(X.get([1,0]))+
        lengths["l34"]*math.sin(X.get([2,0]))+X.get([4,0])*math.sin(X.get([3,0])+3.14);
        let d=lengths["l56"]*math.cos(angles["t56"])+lengths["l63"]*math.cos(X.get([1,0]))+
        lengths["l34"]*math.cos(X.get([2,0]))+X.get([4,0])*math.cos(X.get([3,0])+3.14);
        const arr=[
        [a],[b],[c],[d],[X.get([3,0])-X.get([2,0])-1.57]
    ]
        return math.matrix(arr);

     }
     function Jacobian(X)
     {  
        const arr2=[[lengths["l23"]*math.cos(X.get([0,0])), lengths["l36"]*math.cos(X.get([1,0])+3.14), 0, 0,0],
             [-lengths["l23"]*math.sin(X.get([0,0])), -lengths["l36"]*math.sin(X.get([1,0])+3.14), 0, 0,0],
             [0,lengths["l63"]*math.cos(X.get([1,0])), lengths["l34"]*math.cos(X.get([2,0])), 
             X.get([4,0])*math.cos(X.get([3,0])+3.14),math.sin(X.get([3,0])+3.14)],
             [0,-lengths["l63"]*math.sin(X.get([1,0])),-lengths["l34"]*math.sin(X.get([2,0])),
             -X.get([4,0])*math.sin(X.get([3,0])+3.14),math.cos(X.get([3,0])+3.14)],
             [0,0,-1,1,0]
            ]
        return math.matrix(arr2)
     }

     function newtonRaphson(x)
     {
        console.log("inside the function");
        // console.log(math.sin(angles["t12"]));
         let dx= math.multiply(math.inv(Jacobian(x)),f(x));
         let itr=1;
        while ((math.max(math.max(dx)) >= EPSILON) || (math.min(math.min(dx)) <=-1*EPSILON) )
         {
            console.log("itr",itr);
            itr=itr+1;
            if (itr==0){break}
             dx = math.multiply(math.inv(Jacobian(x)),f(x));
             x = math.subtract(x,dx);
             console.log(x.get([0,0]),x.get([1,0]),x.get([2,0]),x.get([3,0]),x.get([4,0]))
         }
        
         return x;
     }
  

    let x = [[0.0],[1.5],[0.0],[1.5],[2.0]];
    return newtonRaphson(math.matrix(x));
  
    }