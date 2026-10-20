const topics=[
{id:"infection",name:"感染与预防",color:"#087b7a",ids:[0,1,4,6,7,8,20,21,23],x:210,y:200},
{id:"access",name:"医疗可及性",color:"#aa7543",ids:[2,5,24,27,28,29],x:550,y:200},
{id:"devices",name:"诊断与器械",color:"#4776ab",ids:[9,10,11,12,13,14],x:890,y:200},
{id:"care",name:"照护与安全",color:"#7a6b9b",ids:[3,20,21,22,25,26],x:210,y:530},
{id:"genes",name:"基因与再生",color:"#51856a",ids:[15,16,17,19],x:550,y:530},
{id:"cancer",name:"肿瘤治疗",color:"#ae6674",ids:[18,19],x:890,y:530}
];
const collabs=[{a:1,b:4,label:"核苷碱基修饰研究",source:"https://www.nobelprize.org/prizes/medicine/2023/summary/"},{a:15,b:16,label:"CRISPR-Cas9合作研究",source:"https://www.nobelprize.org/prizes/chemistry/2020/summary/"}];
function smallPerson(p){return '<button class="person-chip" data-person="'+p.id+'"><img src="'+p.photo+'" alt=""><span>'+p.name+'<small>'+p.city+'</small></span><b>↗</b></button>'}
function portraitNote(p){return p.photoSource?'<a class="source-link" href="'+p.photoSource+'" target="_blank" rel="noopener">肖像来源与许可 ↗</a>':'<small>真实肖像待补充 · 已预留图片位</small>'}
const net=d3.select("#network"),defs=net.append("defs");
const coords=new Map();
topics.forEach(t=>{const primary=t.ids.filter(id=>topics.find(s=>s.ids.includes(id))===t);primary.forEach((id,i)=>{const angle=-Math.PI/2+2*Math.PI*i/primary.length;coords.set(id,{x:t.x+128*Math.cos(angle),y:t.y+112*Math.sin(angle),topic:t})})});
people.forEach(p=>defs.append("clipPath").attr("id","face-"+p.id).append("circle").attr("r",23));
const linkData=topics.flatMap(t=>t.ids.map(id=>({topic:t,id,...coords.get(id)})));
const themeLines=net.append("g").selectAll("line").data(linkData).join("line").attr("x1",d=>d.topic.x).attr("y1",d=>d.topic.y).attr("x2",d=>d.x).attr("y2",d=>d.y).attr("stroke",d=>d.topic.color).attr("stroke-opacity",.25).attr("stroke-dasharray","3 4");
const cooperation=net.append("g").selectAll("path").data(collabs).join("path").attr("d",d=>{const a=coords.get(d.a),b=coords.get(d.b);return "M"+a.x+","+a.y+" Q"+(a.x+b.x)/2+","+((a.y+b.y)/2-40)+" "+b.x+","+b.y}).attr("fill","none").attr("stroke","#163d4c").attr("stroke-width",3);
cooperation.append("title").text(d=>d.label);
const hubs=net.append("g").selectAll("g").data(topics).join("g").attr("transform",d=>"translate("+d.x+","+d.y+")").attr("role","button").attr("tabindex",0).attr("aria-label",d=>"查看"+d.name+"主题").on("click",(_,d)=>selectTopic(d.id)).on("keydown",(e,d)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();selectTopic(d.id)}});
hubs.append("circle").attr("r",48).attr("fill",d=>d.color).attr("fill-opacity",.1).attr("stroke",d=>d.color).attr("stroke-opacity",.35);
hubs.append("text").attr("text-anchor","middle").attr("dy",4).attr("fill",d=>d.color).attr("font-size",14).text(d=>d.name);
const nodes=net.append("g").selectAll("g").data(people).join("g").attr("transform",p=>"translate("+coords.get(p.id).x+","+coords.get(p.id).y+")").attr("role","button").attr("tabindex",0).attr("aria-label",p=>"查看"+p.name+"的联系").on("click",(_,p)=>selectPerson(p)).on("keydown",(e,p)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();selectPerson(p)}});
nodes.append("circle").attr("r",26).attr("fill","white").attr("stroke",p=>coords.get(p.id).topic.color).attr("stroke-width",2);
nodes.append("image").attr("href",p=>p.photo).attr("x",-23).attr("y",-23).attr("width",46).attr("height",46).attr("preserveAspectRatio","xMidYMid slice").attr("clip-path",p=>"url(#face-"+p.id+")");
nodes.append("text").attr("y",43).attr("text-anchor","middle").attr("font-size",12).attr("fill","#183b50").text(p=>p.name);
$("#network-filters").innerHTML='<button data-topic="all" class="selected">全部联系</button>'+topics.map(t=>'<button data-topic="'+t.id+'">'+t.name+'</button>').join("");
function selectTopic(id){
 const t=topics.find(t=>t.id===id);const ids=t?t.ids:people.map(p=>p.id);
 nodes.attr("opacity",p=>ids.includes(p.id)?1:.15);hubs.attr("opacity",s=>!t||s===t?1:.25);themeLines.attr("stroke-opacity",d=>!t||d.topic===t?.5:.05);cooperation.attr("opacity",d=>ids.includes(d.a)&&ids.includes(d.b)?1:.08);
 document.querySelectorAll("[data-topic]").forEach(b=>{b.classList.toggle("selected",b.dataset.topic===id);b.setAttribute("aria-pressed",b.dataset.topic===id)});
 $("#network-info").innerHTML='<p class="eyebrow">研究主题</p><h3>'+(t?t.name:"30个人，六个共同问题")+'</h3><p>'+(t?"相关人物 "+ids.length+" 位。主题归类为课程分析，同一个人可以跨越多个主题。":"选择一个节点，查看它与其他人物的主题联系及已知科研合作。")+'</p>'+(t?ids.map(i=>smallPerson(people[i])).join(""):'<div class="network-explain"><b>虚线 / 共同问题</b><p>主题联系是分析工具，不等同于历史合作或影响关系。</p><b>实线 / 科研合作</b><p>目前展示卡里科—韦斯曼、杜德纳—沙尔庞捷两组合作。</p></div>');
}
function selectPerson(p){
 const ts=topics.filter(t=>t.ids.includes(p.id));const ids=new Set(ts.flatMap(t=>t.ids));
 nodes.attr("opacity",q=>ids.has(q.id)?1:.15);hubs.attr("opacity",t=>ts.includes(t)?1:.2);themeLines.attr("stroke-opacity",d=>d.id===p.id?.85:.08);cooperation.attr("opacity",d=>d.a===p.id||d.b===p.id?1:.08);
 const cs=collabs.filter(c=>c.a===p.id||c.b===p.id);
 $("#network-info").innerHTML='<img class="aside-portrait" src="'+p.photo+'" alt="'+p.name+'肖像"><h3>'+p.name+'</h3><p>'+ts.map(t=>t.name).join(" · ")+'</p>'+portraitNote(p)+'<button class="secondary" data-person="'+p.id+'">打开人物档案 ↗</button><h4>已记录的合作</h4>'+(cs.length?cs.map(c=>'<p>'+people[c.a===p.id?c.b:c.a].name+' · '+c.label+'<br><a href="'+c.source+'" target="_blank" rel="noopener">诺贝尔奖官方资料 ↗</a></p>').join(""):'<p>当前资料中未录入直接合作关系；不代表不存在。</p>')+'<h4>共同主题人物</h4>'+[...ids].filter(id=>id!==p.id).map(id=>smallPerson(people[id])).join("");
}
$("#network-filters").onclick=e=>{if(e.target.dataset.topic)selectTopic(e.target.dataset.topic)};
selectTopic("all");

const map=d3.select("#world-map");const projection=d3.geoEqualEarth().fitExtent([[20,20],[1080,560]],{type:"Sphere"});const path=d3.geoPath(projection);
map.append("path").datum({type:"Sphere"}).attr("d",path).attr("fill","#edf4f7");
const layer=map.append("g");
layer.append("path").datum(d3.geoGraticule10()).attr("d",path).attr("fill","none").attr("stroke","#d2e0e5").attr("stroke-width",.5);
layer.append("g").selectAll("path").data(worldLand.features).join("path").attr("d",path).attr("fill","#c6d9dc").attr("stroke","#a4bdc5").attr("stroke-width",.5);
const cities=Array.from(d3.group(people,p=>p.city),([city,ps])=>({city,ps,point:projection([ps[0].lon,ps[0].lat])}));
let transform=d3.zoomIdentity;
const markers=layer.append("g").selectAll("g").data(cities).join("g").attr("transform",d=>"translate("+d.point+")").attr("tabindex",0).attr("role","button").attr("aria-label",d=>d.city+"，"+d.ps.map(p=>p.name).join("、")).style("cursor","pointer").on("click",(_,d)=>showCity(d)).on("keydown",(e,d)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();showCity(d)}}).on("mouseenter",(e,d)=>tooltip(e,d)).on("mousemove",(e,d)=>tooltip(e,d)).on("mouseleave",()=>$("#map-tooltip").hidden=true).on("focus",(_,d)=>showCity(d));
markers.append("circle").attr("r",d=>d.ps.length>1?8:5).attr("fill","#087b7a").attr("stroke","white").attr("stroke-width",1.5);
markers.filter(d=>d.ps.length>1).append("text").text(d=>d.ps.length).attr("text-anchor","middle").attr("dy",3).attr("font-size",9).attr("fill","white");
markers.append("title").text(d=>d.city+" · "+d.ps.map(p=>p.name).join(" / "));
const activeLabel=map.append("g").attr("pointer-events","none");activeLabel.append("rect").attr("x",-70).attr("y",-40).attr("width",140).attr("height",25).attr("rx",4).attr("fill","#163d4c");activeLabel.append("text").attr("y",-23).attr("text-anchor","middle").attr("fill","white").attr("font-size",12);activeLabel.style("display","none");
let selectedCity=null;
function positionLabel(){if(selectedCity){const [x,y]=transform.apply(selectedCity.point);activeLabel.attr("transform","translate("+Math.max(75,Math.min(1025,x))+","+Math.max(45,Math.min(570,y))+")")}}
const zoom=d3.zoom().scaleExtent([1,15]).translateExtent([[0,0],[1100,580]]).filter(e=>e.type!=="wheel"||e.ctrlKey).on("zoom",e=>{transform=e.transform;layer.attr("transform",transform);markers.attr("transform",d=>"translate("+d.point+") scale("+(1/transform.k)+")");positionLabel()});map.call(zoom).on("dblclick.zoom",null);
function tooltip(e,d){const box=$(".world-canvas").getBoundingClientRect();const el=$("#map-tooltip");el.textContent=d.city+" · "+d.ps.map(p=>p.name).join(" / ");el.hidden=false;el.style.left=Math.max(5,Math.min(box.width-210,e.clientX-box.left+12))+"px";el.style.top=Math.max(5,e.clientY-box.top-50)+"px"}
function showCity(d){selectedCity=d;activeLabel.style("display",null).select("text").text(d.city);positionLabel();markers.select("circle").attr("fill",c=>c===d?"#c17b36":"#087b7a");$("#map-info").innerHTML='<p class="eyebrow">创新工作地 / CITY</p><h3>'+d.city+'</h3><p class="coordinates">'+Math.abs(d.ps[0].lat).toFixed(3)+'° '+(d.ps[0].lat>=0?"N":"S")+' · '+Math.abs(d.ps[0].lon).toFixed(3)+'° '+(d.ps[0].lon>=0?"E":"W")+'</p>'+d.ps.map(p=>smallPerson(p)+'<p class="place-note">'+p.place+'<br><a href="'+p.locationSource+'" target="_blank" rel="noopener">人物资料核查入口 ↗</a></p>').join("")+'<small>城市级近似坐标；不是出生地、现住址或机构门址。</small>'}
$("#map-person").innerHTML+=people.map(p=>'<option value="'+p.id+'">'+p.name+' · '+p.city+'</option>').join("");
$("#map-person").onchange=e=>{if(e.target.value==="")return;const p=people[Number(e.target.value)],d=cities.find(c=>c.city===p.city);showCity(d);map.call(zoom.transform,d3.zoomIdentity.translate(550-d.point[0]*5,290-d.point[1]*5).scale(5))};
$("#map-in").onclick=()=>map.call(zoom.scaleBy,1.6);$("#map-out").onclick=()=>map.call(zoom.scaleBy,1/1.6);$("#map-reset").onclick=()=>{map.call(zoom.transform,d3.zoomIdentity);$("#map-person").value=""};
showCity(cities.find(d=>d.city==="马杜赖"));

