import { sinefunc,cosinefunc, sinejacob, cosinejacob } from './NewtonRaphsonhelper'; 
import {
    create, all, forEach 
  } from 'mathjs'
const math = create(all)

// here 1m2 3-- are joints and l12, l23 are links
const variables=["l34","l42","l45","l56"]
const variableop=["l43","l24","l54","l65"]
const cycles=["1342","2456"] 

export function NewtonRaphson(){

    function mattoarr(k){
        var a=[];
        for(var i=0;i<(math.size(k).get([0]));i++){a.push(k.get([i,0]))}
        return a;
    }

     let EPSILON = 0.0001;
     
     function f(X)
     {   var arr=[]
        var x= mattoarr(X)
         cycles.forEach(i =>{
            console.log(i);
            arr.push([sinefunc(i,x)])
            arr.push([cosinefunc(i,x)])
        }
            )
        console.log(arr);
        return math.matrix(arr);

     }
     function Jacobian(X)
     {  
        var arr=[]
        var x=mattoarr(X)
        cycles.forEach(i =>{
            arr.push(sinejacob(i,x))
            arr.push(cosinejacob(i,x))
        })
        console.log(arr);
        return math.matrix(arr)
     }

     function newtonRaphson(x)
     {
         let dx= math.multiply(math.inv(Jacobian(x)),f(x));
         let itr=99;
        while ((math.max(math.max(dx)) >= EPSILON) || (math.min(math.min(dx)) <=-1*EPSILON) )
         {
            console.log("itr",itr);
            itr=itr-1;
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