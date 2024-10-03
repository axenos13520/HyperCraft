var f=Object.defineProperty;var u=(a,t,e)=>t in a?f(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var n=(a,t,e)=>u(a,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();class h{static Init(){document.onkeydown=t=>{this.pressedKeys.indexOf(t.key.toLowerCase())===-1&&(this.pressedKeys=[...this.pressedKeys,t.key.toLocaleLowerCase()])},document.onkeyup=t=>{this.pressedKeys=this.pressedKeys.filter(e=>e!=t.key.toLowerCase())},document.onmousemove=t=>{this.mouseOffsetX=t.movementX,this.mouseOffsetY=t.movementY}}static GetKey(t){for(let e=0;e<this.pressedKeys.length;++e)if(this.pressedKeys[e]===t)return 1;return 0}static GetAxis(t){let e=0;return t==="horizontal"?(e=this.mouseOffsetX,this.mouseOffsetX=0):t==="vertical"&&(e=this.mouseOffsetY,this.mouseOffsetY=0),e}static GetAxisRow(t){return t==="horizontal"?this.GetKey("d")-this.GetKey("a"):t==="vertical"?this.GetKey("w")-this.GetKey("s"):0}}n(h,"mouseOffsetX",0),n(h,"mouseOffsetY",0),n(h,"pressedKeys",[]);class d{static Vector3Sum(t,e){return[t[0]+e[0],t[1]+e[1],t[2]+e[2]]}static Vector2Sum(t,e){return[t[0]+e[0],t[1]+e[1]]}}class m{constructor(t,e,o){n(this,"fovTan");n(this,"sensitivity");this.fov=t,this.position=e,this.rotation=o,this.fovTan=Math.tan(t*Math.PI/180),this.sensitivity=.3}update(){let t=h.GetAxisRow("horizontal")*.01*7,e=h.GetAxisRow("vertical")*.01*7,o=t*Math.cos(this.rotation[1])+e*Math.sin(this.rotation[1]),s=e*Math.cos(this.rotation[1])-t*Math.sin(this.rotation[1]),i=(h.GetKey("e")-h.GetKey("q"))*.01*7;this.position=d.Vector3Sum(this.position,[o,i,s]);let r=h.GetAxis("horizontal")*.01*this.sensitivity,l=h.GetAxis("vertical")*.01*this.sensitivity;this.rotation=d.Vector3Sum(this.rotation,[l,r,0]),this.rotation[0]>=Math.PI*2?this.rotation[0]=0:this.rotation[0]<0&&(this.rotation[0]=Math.PI*2)}}class g{constructor(t,e,o){n(this,"canvases",[]);n(this,"contexts",[]);n(this,"canvas",()=>this.canvases[0].hidden?0:1);if(this.shader=o,this.canvases=[...document.querySelectorAll(".brat")],this.canvases.length===0){alert("Karaul!!! Risovat' negde!");return}for(let s=0;s<this.canvases.length;++s){this.canvases[s].width=t,this.canvases[s].height=e,this.canvases[s].hidden=!0;let i=this.canvases[s].getContext("2d");if(i===null){alert("Karaul!!! Risovat' ne mogu!");return}this.contexts[s]=i}this.canvases[1].hidden=!1}async init(){for(;;)await this.drawFrame(),this.canvas()===0?(this.canvases[0].hidden=!1,this.canvases[1].hidden=!0):(this.canvases[0].hidden=!0,this.canvases[1].hidden=!1),await new Promise(t=>setTimeout(t,10))}async drawFrame(){const t=this.canvases[this.canvas()],e=this.contexts[this.canvas()];e.clearRect(0,0,t.width,t.height);const o=this.shader.countedPolygons();let s=o.next();do s.value!==void 0&&(e.fillStyle=s.value[0],e.beginPath(),this.createPolygonPath(t,e,s.value),e.closePath(),e.stroke(),e.fill()),s=o.next();while(s.done===!1);return 0}createPolygonPath(t,e,o){e.moveTo(o[1][0]*t.width,o[1][1]*t.height);for(let s=2;s<o.length;++s)e.lineTo(o[s][0]*t.width,o[s][1]*t.height);e.lineTo(o[1][0]*t.width,o[1][1]*t.height)}}class c{}n(c,"gameObjects",[]);class y{constructor(t,e){n(this,"fovTanX");this.camera=t,this.sideRatio=e,this.fovTanX=Math.tan(t.fov)}projectVector3(t){let e=[t[0]-this.camera.position[0],t[1]-this.camera.position[1],t[2]-this.camera.position[2]];e[0]===0&&(e[0]=1e-4),e[1]===0&&(e[1]=1e-4),e[2]===0&&(e[2]=1e-4);let o=Math.sqrt(Math.pow(e[0],2)+Math.pow(e[2],2)),s=Math.atan(e[0]/e[2])-this.camera.rotation[1];e[2]<0&&(s-=Math.PI),s>Math.PI*2&&(s-=Math.PI*2),s<0&&(s=Math.PI*2+s),e[0]=Math.sin(s)*o,e[2]=Math.cos(s)*o;let i=Math.atan(e[1]/e[2])+this.camera.rotation[0];if(o=Math.sqrt(Math.pow(e[1],2)+Math.pow(e[2],2)),e[2]<0&&(i-=Math.PI),i>Math.PI*2&&(i-=Math.PI*2),i<0&&(i+=Math.PI*2),i>this.camera.fov&&i<Math.PI*2-this.camera.fov)return[-1,-1];e[1]=Math.sin(i)*o,e[2]=Math.cos(i)*o;let r=e[0]/(this.fovTanX*e[2]),l=e[1]/(this.fovTanX*e[2])/this.sideRatio;return[r+1/2,-l+1/2]}*countedPolygons(){for(let t=0;t<c.gameObjects.length;++t){const e=c.gameObjects[t].getMesh();for(let o=0;o<e.length;++o){let s=[e[o][0]];for(let i=1;i<e[o].length;++i){let r=this.projectVector3(e[o][i]);r[0]!=-1&&(s=[...s,r])}s.length>1&&(yield s)}}}}class p{constructor(t){n(this,"getMesh",()=>this.mesh);this.mesh=t,c.gameObjects=[...c.gameObjects,this]}dispose(){c.gameObjects=c.gameObjects.filter(t=>t!=this)}update(){}}class v extends p{constructor(t,e){let o=[["brown",[-.5,-.5,-.5],[-.5,.5,-.5],[.5,.5,-.5],[.5,-.5,-.5]],["red",[-.5,-.5,.5],[-.5,.5,.5],[-.5,.5,-.5],[-.5,-.5,-.5]],["orange",[.5,-.5,-.5],[.5,.5,-.5],[.5,.5,.5],[.5,-.5,.5]],["blue",[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5],[-.5,-.5,.5]],["green",[-.5,.5,-.5],[-.5,.5,.5],[.5,.5,.5],[.5,.5,-.5]],["pink",[-.5,-.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,-.5,-.5]]];super(o),this.position=t,this.rotation=e;for(let s=0;s<o.length;++s)for(let i=1;i<o[s].length;++i)o[s][i]=[o[s][i][0]+this.position[0],o[s][i][1]+this.position[1],o[s][i][2]+this.position[2]]}}document.addEventListener("DOMContentLoaded",()=>w());const w=()=>{h.Init();const a=[window.innerWidth,window.innerHeight],t=new m(70*Math.PI/180,[0,2,-3],[0,0,0]);console.log(a);const e=new y(t,a[1]/a[0]),o=new g(a[0],a[1],e);let i=2*4;for(let r=-i;r<i;++r)for(let l=-i;l<i;++l)new v([r+.5,.5,l+.5],[0,0,0]);o.init(),M(t)},M=async a=>{for(;;)await new Promise(t=>setTimeout(t,1e3/60)),a.update(),c.gameObjects.forEach(t=>t.update())};
