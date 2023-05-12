
import {
    create, all 
  } from 'mathjs'
const math = create(all)
let angle={};
let vr=[];

export function findAngle(l1,l2,l3){
    let ang= (l1*l1+l2*l2-l3*l3)/(2*l1*l2)
    let ans= Math.acos(ang);  
    return ans; }

export function fx(cycle,X){
  let l1=length["l"+cycle[0]+cycle[1]]
  let l2=length["l"+cycle[1]+cycle[2]]
  let l3=length["l"+cycle[2]+cycle[0]]
  // X=[angle of l1 , angle of l2]
  let f1= X.get(0)-X.get(1)-findAngle(l1,l2,l3)
  let f2= X.get(1)-X.get(2)-findAngle(l2,l3,l1)
    return [f1,f2]
}

export function j(cycle,X){
  const edgelist=[];
    for (let i=0; i<cycle.length; i++){
        edgelist.push("l"+cycle.charAt(i)+cycle.charAt((i+1)%(cycle.length)));
    }

  // for equation 1 it contains theta 1 and theta 2
  let arr1=[];  
  variables.forEach(v=>{
    if (edgelist.indexOf(v)!=-1){
      if (edgelist.indexOf(v)==0){arr1[variables.indexOf(v)]=1;}
      if (edgelist.indexOf(v)==1){arr1[variables.indexOf(v)]=-1;}
    }})
  // for equation 2 it contains theta 2 and theta 3
  let arr2=[];
  variables.forEach(v=>{
    if (edgelist.indexOf(v)!=-1){
      if (edgelist.indexOf(v)==1){arr2[variables.indexOf(v)]=1;}
      if (edgelist.indexOf(v)==2){arr2[variables.indexOf(v)]=-1;}
    }})
      return [arr1,arr2]
}

