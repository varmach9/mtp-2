/* eslint-disable eqeqeq */

import {
    create, all 
  } from 'mathjs'
const math = create(all)
// here 1 2 3 4--- are joints
var lengths = {};
var lengths={
    "l13":2.0,"l21":2.0, "l34":2.0, "l42":2.0, "l45":2.0, "l56":2.0, "l62":2.0,
    "l31":2.0,"l12":2.0, "l43":2.0, "l24":2.0, "l54":2.0, "l65":2.0, "l26":2.0
}

var angles={};
var angles={ 
    "l12":3.14, "l26":3.14, "l13":1.57,
    "l21":0.0, "l62":0.0, "l31":1.57+3.14
}

const variables=["l34","l42","l45","l56"]
const variableop=["l43","l24","l54","l65"]
const cycles=["1342","2456"] 

export function sinefunc(cycle,x){

     let a=0.0;
    //  console.log(a,cycle,x,cycle.length);
     for (let i=0; i<cycle.length; i++){
        // console.log("i",i);
        const edge="l"+cycle.charAt(i)+cycle.charAt((i+1)%(cycle.length));
        // console.log(edge);
        // console.log(variables);
        // console.log(variables[1]);
        // console.log(variables.indexOf(edge) !=-1)
        if (variables.indexOf(edge) !=-1 || variableop.indexOf(edge)!=-1){
            var j=0;
            if (variables.indexOf(edge) !=-1)
            { j = variables.indexOf(edge);
                a+=Math.sin(x[j])*lengths[edge];}  
            else{ j= variableop.indexOf(edge);
                a+=Math.sin(x[j]+3.14)*lengths[edge]; }
            // console.log(a);
        }
        else{
            a=a+lengths[edge]*Math.sin(angles[edge]);
            // console.log(a);
        }
    }
    console.log(a);
    return a;
     }
export function cosinefunc(cycle,x){
        let a=0.0;
        // console.log(a,cycle,x,cycle.length);
        for (let i=0; i<cycle.length; i++){
        //    console.log("i",i);
           const edge="l"+cycle.charAt(i)+cycle.charAt((i+1)%(cycle.length));
        //    console.log(edge);
        //    console.log(variables);
        //    console.log(variables[1]);
        //    console.log(variables.indexOf(edge) !=-1)
           if (variables.indexOf(edge) !=-1 || variableop.indexOf(edge)!=-1){
            var j=0;
            if (variables.indexOf(edge) !=-1)
            { j = variables.indexOf(edge);
                a+=Math.cos(x[j])*lengths[edge];}  
            else{ j= variableop.indexOf(edge) ;
                a+=Math.cos(x[j]+3.14)*lengths[edge];}
            // console.log(a);
        }
           else{
               a=a+lengths[edge]*Math.cos(angles[edge]);
            //    console.log(a);
           }
       }
       console.log(a);
       return a;
        }
export function sinejacob(cycle,x){
    const edgelist=[];
    for (let i=0; i<cycle.length; i++){
        edgelist.push("l"+cycle.charAt(i)+cycle.charAt((i+1)%(cycle.length)));
    }
    // console.log(edgelist)
    var arr=[0,0,0,0]
    variables.forEach(v=>{
        if (edgelist.indexOf(v)!=-1){
            const ang=x[variables.indexOf(v)]
            arr[variables.indexOf(v)]+=lengths[v]*math.cos(ang);
        }
        
    })
    variableop.forEach(v=>{
        if (edgelist.indexOf(v)!=-1){
            const ang=x[variableop.indexOf(v)]
            arr[variableop.indexOf(v)]+=lengths[v]*math.cos(ang);
        }
        
    })
    // console.log(arr)
    return arr
}
export function cosinejacob(cycle,x){
    const edgelist=[];
    for (let i=0; i<cycle.length; i++){
        // console.log("i",i);
        edgelist.push("l"+cycle.charAt(i)+cycle.charAt((i+1)%(cycle.length)));
    }
    var arr=[0,0,0,0]
    variables.forEach(v=>{
        if (edgelist.indexOf(v)!=-1){
            const ang=x[variables.indexOf(v)]
            arr[variables.indexOf(v)]+=-lengths[v]*math.sin(ang);
        }
        
    })
    variableop.forEach(v=>{
        if (edgelist.indexOf(v)!=-1){
            const ang=x[variableop.indexOf(v)]
            arr[variableop.indexOf(v)]+=-lengths[v]*math.sin(ang);
        }
        
    })

    return arr
}
