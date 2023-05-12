
// this is generalized function of all sliding and revolute mechanism chains
import { sinefunc,cosinefunc, sinejacob, cosinejacob } from "./helperForAllMechnisms"; 
import {
    create, all, forEach 
  } from 'mathjs'
const math = create(all)

// load data of cycles,lenghts and angles into these dictionaries
// assuming angle of grounded links is 0
// This is an example for testing

var lengths = {};
//  1st hashmap: load known lengths in direct and reverse orders
var lengths={
    "l12":2.5,"l23":2.0, "l36":2.5, "l16":2.0,  "l56":2.0, "l34":2.0,
    "l21":2.5,"l32":2.0, "l63":2.5, "l61":2.0,  "l65":2.0, "l43":2.0
}

var angles={};
//  2nd hashmap: load known angles in direct (theta) and reverse orders (180+theta)
var angles={ 
    "t61":3.14, "t56":3.14, "t12":1.57,
    "t16":0.0, "t65":0.0, "t21":1.57+3.14
}

const cycles=["1632","5634"]
const variables=["t23","t63","t34","t54","l54"]
const variablesop=["t32","t36","t43","t45","l45"]
const revoluteJoints=[("t34","t45")]

function findValueOfLength(edge,x){
    let len_val=0.0;
    if (variables.indexOf(edge) !==-1 || variablesop.indexOf(edge)!==-1){
        var j=0;
        if (variables.indexOf(edge) !==-1)
        { j = variables.indexOf(edge);
            len_val=x[j]}  
        else{ j= variablesop.indexOf(edge);
            len_val=x[j]; }
    }
    else{
        len_val=lengths[edge]
    }
    return len_val
}
function findValueOfAngle(angle,x){
    let ang_val=0.0;

    if (variables.indexOf(angle) !==-1 || variablesop.indexOf(angle)!==-1){
        var j=0;
        if (variables.indexOf(angle) !==-1)
        { j = variables.indexOf(angle);
            ang_val=x[j]}  
        else{ j= variablesop.indexOf(angle);
            ang_val=3.14+x[j]; }
    }
    else{
        ang_val=angles[angle]
    }
    return ang_val
}



export function NRTotal(){

    let EPSILON = 0.0001;
    function mattoarr(k){
        var a=[];
        for(var i=0;i<(math.size(k).get([0]));i++){a.push(k.get([i,0]))}
        return a;
    }
    function f(X)
    {  
        var arr=[]
        var x= mattoarr(X)
         cycles.forEach(i =>{
            console.log(i);
            arr.push([sinefunc(i,x)])
            arr.push([cosinefunc(i,x)])
        })
        // add revolute joints equations
        revoluteJoints.forEach(v =>{
        arr.push(findValueOfAngle(
            v.get(0))-findValueOfAngle(v.get(1))-1.57)
        })
            
        console.log(arr);
        return math.matrix(arr);
    }

    function Jacobian(X)
    {   var arr=[]
        var x=mattoarr(X)
        cycles.forEach(i =>{
            arr.push(sinejacob(i,x))
            arr.push(cosinejacob(i,x))
        })
        // for revolute joints
        revoluteJoints.forEach(v =>{
            var tempArr=[];
            for (let i=0; i<variables.length; ++i) tempArr.push(0)
            if(variables.indexOf(v.get(0)) !==-1){
                tempArr[variables.indexOf(v.get(0))]=1}
            else if(variablesop.indexOf(v.get(0)) !==-1){
                tempArr[variablesop.indexOf(v.get(0))]=-1}
            if(variables.indexOf(v.get(1)) !==-1){
                tempArr[variables.indexOf(v.get(1))]=-1}
            else if(variablesop.indexOf(v.get(1)) !==-1){
                tempArr[variablesop.indexOf(v.get(1))]=1}
            arr.push(tempArr)
        })

        console.log(arr);
        return math.matrix(arr)
    }

    function newtonRaphson(x)
    {
       console.log("inside the function");
        let dx= math.multiply(math.inv(Jacobian(x)),f(x));
        let itr=1;
       while ((math.max(math.max(dx)) >= EPSILON) || (math.min(math.min(dx)) <=-1*EPSILON) )
        {
           console.log("itr",itr);
           itr=itr+1;
           if (itr===0){break}
            dx = math.multiply(math.inv(Jacobian(x)),f(x));
            x = math.subtract(x,dx);
            console.log(x.get([0,0]),x.get([1,0]),x.get([2,0]),x.get([3,0]),x.get([4,0]))
        }
       
        return x;
    }
 

   let x = [[0.0],[1.5],[0.0],[1.5],[2.0]];
   return newtonRaphson(math.matrix(x));
 
   }