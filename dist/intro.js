(()=>{
 const overlay=document.querySelector('#map-intro');
 const source=document.querySelector('#world-map');
 if(!overlay||!source)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const force=new URLSearchParams(location.search).has('intro');
 let seen=false;try{seen=sessionStorage.getItem('medical-map-intro-seen')==='1'}catch(_){seen=true}
 if((reduced&&!force)||(seen&&!force)){overlay.remove();return}
 const clone=source.cloneNode(true);clone.removeAttribute('id');clone.setAttribute('aria-hidden','true');
 const layer=clone.querySelector('g');
 const points=[...clone.querySelectorAll('[role="button"]')].map(node=>{
   const m=(node.getAttribute('transform')||'').match(/translate\(([-\d.]+)[ ,]([-\d.]+)\)/);
   return m?[+m[1],+m[2]]:null;
 }).filter(Boolean);
 const ns='http://www.w3.org/2000/svg';
 const routes=document.createElementNS(ns,'g');routes.setAttribute('class','intro-routes');
 const pairs=[[0,1],[1,2],[2,4],[4,5],[5,8],[8,9],[9,13],[13,17],[17,20],[20,24],[24,27],[27,29],[29,0],[3,10],[10,15],[15,22],[22,26],[26,3]];
 pairs.forEach((pair,i)=>{const a=points[pair[0]%points.length],b=points[pair[1]%points.length];if(!a||!b)return;const line=document.createElementNS(ns,'path');line.setAttribute('d',`M${a[0]},${a[1]} Q${(a[0]+b[0])/2},${(a[1]+b[1])/2-22} ${b[0]},${b[1]}`);line.style.setProperty('--route-delay',`${.55+i*.075}s`);routes.appendChild(line)});
 if(layer)layer.insertBefore(routes,layer.firstChild);
 document.querySelector('#intro-map').appendChild(clone);
 const done=()=>{if(overlay.classList.contains('is-leaving'))return;overlay.classList.add('is-leaving');if(!force)try{sessionStorage.setItem('medical-map-intro-seen','1')}catch(_){}setTimeout(()=>overlay.remove(),850)};
 overlay.querySelector('.intro-skip').addEventListener('click',done);
 setTimeout(done,6500);
})();
