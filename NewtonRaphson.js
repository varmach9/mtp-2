
import {create, all } from 'mathjs'
const math = create(all)
export function NewtonRaphson(A){
     let EPSILON = 0.001;

     function f(X)
     {   const x=X.get([0,0]);
        const y=X.get([1,0]);
        console.log(x*x+y-5,y*y+x-3)
        return math.matrix([[x*x+y-5] ,[y*y+x-3]])
     }

     function Jacobian(X)
     {  const x=X.get([0,0]);
        const y=X.get([1,0]);
        console.log(2*x,1,1,2*y)
        return math.matrix([[2*x,1],[1,2*y]])
     }

     function newtonRaphson(x)
     {  console.log("y");
         let dx= math.multiply(math.inv(Jacobian(x)),f(x));
         console.log("y");
         console.log(math.max(math.max(dx)));
         while ((math.max(math.max(dx)) >= EPSILON) || (math.min(math.min(dx)) <=-1*EPSILON))
         {  console.log("y");
             dx = math.multiply(math.inv(Jacobian(x)),f(x));
             x = math.subtract(x,dx);
             console.log(x.get([0,0]),x.get([1,0]))
         }
         return x;}
    // Initial values assumed
    var a=2.0;
    var b=-1.0;
    let x = [[a],[b]];
    return newtonRaphson(math.matrix(x)); }