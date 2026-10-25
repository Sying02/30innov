const $=s=>document.querySelector(s);
let category=-1,expanded=false;
const aliases={"看病贵":"低成本","缺医生":"基层医疗","发现太晚":"早筛","手术安全":"安全"};
function results(){const terms=$("#query").value.trim().toLowerCase().split(/\s+/).filter(Boolean);return people.filter(p=>(category<0||p.cat===category)&&terms.every(t=>[p.name,p.en,p.problem,p.summary,p.keywords].join(" ").toLowerCase().includes(t)||p.keywords.includes(aliases[t]||"\u0000")))}
function render(){
 const filtered=results();$("#count").textContent="找到 "+filtered.length+" / "+people.length+" 位";
 $("#cards").innerHTML=filtered.slice(0,expanded?people.length:9).map(p=>{const w=wordProfiles[p.id];const fields=[w.innovationAngle?'<div class="card-field"><b>创新角度</b><span>'+w.innovationAngle+'</span></div>':'',w.innovationDomain?'<div class="card-field"><b>创新领域</b><span>'+w.innovationDomain+'</span></div>':''].join('');return '<button class="card cat'+p.cat+'" data-person="'+p.id+'"><div class="card-top"><span class="avatar"><img src="'+p.photo+'" alt="'+p.name+(p.photoAvailable?'肖像':'：肖像待补充')+'" loading="lazy"></span><div><h3>'+p.name+'</h3><span class="en">'+p.en+'</span></div></div><div class="card-fields">'+fields+'</div></button>'}).join("")||'<div class="empty">暂未找到匹配人物。试试“疫苗”“眼科”或“看病贵”。<button class="secondary" id="reset">清空筛选</button></div>';
 $("#more").hidden=filtered.length<=9;$("#more").textContent=expanded?"收起人物 ↑":"展开全部人物 ↓";
 document.querySelectorAll("[data-category]").forEach(b=>{b.classList.toggle("active",Number(b.dataset.category)===category);b.setAttribute("aria-pressed",Number(b.dataset.category)===category)});
}
let currentPersonId=0;
function detail(id){
 const p=people.find(p=>p.id===Number(id));if(!p)return; currentPersonId=p.id;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const profile=wordProfiles[p.id];
 const headings=/^(国籍|创新角度|创新领域|突破式创新|突破性创新|颠覆式创新|颠覆性创新|整合创新|特点|人物特点|来源|介绍|具体介绍|链接)[：:]/;let sections=[],current={title:'人物材料',lines:[]};profile.content.forEach(line=>{const m=line.match(headings);if(m){if(current.lines.length)sections.push(current);current={title:m[1],lines:[line.replace(headings,'').trim()].filter(Boolean)}}else if(/^([一二三四五六七八九十]+、)/.test(line)){if(current.lines.length)sections.push(current);current={title:line,lines:[]}}else current.lines.push(line)});if(current.lines.length)sections.push(current);const sectionHtml=sections.map(s=>'<section class="word-section"><h3>'+esc(s.title)+'</h3>'+s.lines.map(line=>'<p>'+esc(line)+'</p>').join('')+'</section>').join('');
 $("#detail-content").innerHTML='<div class="profile-hero"><img class="detail-portrait" src="'+p.photo+'" alt="'+esc(p.name)+(p.photoAvailable?'肖像':'，Word未附个人照片')+'"><div class="profile-identity"><p class="eyebrow">人物档案 / '+String(p.id+1).padStart(2,"0")+'</p><h2 id="detail-title">'+esc(p.name)+'</h2><span class="en">'+esc(p.en)+' · '+esc(p.city==='待补充'?'地点待核实':p.city)+'</span></div></div><div class="word-profile">'+sectionHtml+'</div>'+(p.en==="David Baker"?'<button class="secondary" id="go-story">阅读六幕故事 →</button>':'');
 const wasOpen=$("#detail").open;if(!wasOpen)$("#detail").showModal();document.body.style.overflow="hidden";$("#detail").scrollTop=0;if(!wasOpen)$(".close").focus();$("#person-counter").textContent=(p.id+1)+" / "+people.length;
}
$("#detail").addEventListener("close",()=>document.body.style.overflow="");$(".close").onclick=()=>$("#detail").close();
document.addEventListener("click",e=>{const p=e.target.closest("[data-person]");if(p)detail(p.dataset.person);const c=e.target.closest("[data-category]");if(c){category=Number(c.dataset.category);expanded=false;render()}if(e.target.id==="reset"){category=-1;$("#query").value="";render()}if(e.target.id==="go-story"){$("#detail").close();$("#story").scrollIntoView()}});
$("#quick").innerHTML=["看病贵","疫苗","癌症","偏远地区","手术安全","发现太晚"].map(t=>'<button type="button">'+t+' ↗</button>').join("");
$("#quick").onclick=e=>{if(e.target.tagName==="BUTTON"){$("#query").value=e.target.textContent.replace(" ↗","");category=-1;expanded=false;render()}};
$("#categories").innerHTML=["全部人物",...categories].map((t,i)=>'<button data-category="'+(i-1)+'">'+t+'</button>').join("");
$("#query").oninput=()=>{expanded=false;render()};$("#search-form").addEventListener("submit",e=>{e.preventDefault();expanded=false;render();$("#cards").scrollIntoView({behavior:"smooth",block:"start"})});$("#more").onclick=()=>{expanded=!expanded;render();if(!expanded)$("#explore").scrollIntoView()};
document.addEventListener("keydown",e=>{if(e.key==="/"&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)&&!$("#detail").open){e.preventDefault();$("#query").focus()}});

render();

const profileNav=document.createElement("div");profileNav.className="profile-nav";profileNav.innerHTML='<button id="previous-person" type="button" aria-label="上一位创新者" title="上一位创新者"></button><span id="person-counter" aria-live="polite"></span><button id="next-person" type="button" aria-label="下一位创新者" title="下一位创新者"></button>';$("#detail").append(profileNav);
function movePerson(step){detail((currentPersonId+step+people.length)%people.length)}
$("#previous-person").onclick=()=>movePerson(-1);$("#next-person").onclick=()=>movePerson(1);
document.addEventListener("keydown",e=>{if(!$("#detail").open||["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName))return;if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();movePerson(e.key==="ArrowLeft"?-1:1)}});


