const $=s=>document.querySelector(s);
let category=-1,expanded=false;
const aliases={"看病贵":"低成本","缺医生":"基层医疗","发现太晚":"早筛","手术安全":"安全"};
function results(){const terms=$("#query").value.trim().toLowerCase().split(/\s+/).filter(Boolean);return people.filter(p=>(category<0||p.cat===category)&&terms.every(t=>[p.name,p.en,p.problem,p.summary,p.keywords].join(" ").toLowerCase().includes(t)||p.keywords.includes(aliases[t]||"\u0000")))}
function render(){
 const filtered=results();$("#count").textContent="找到 "+filtered.length+" / 30 位";
 $("#cards").innerHTML=filtered.slice(0,expanded?30:9).map(p=>'<button class="card cat'+p.cat+'" data-person="'+p.id+'"><div class="card-top"><span class="avatar"><img src="'+p.photo+'" alt="'+p.name+(p.photoAvailable?'肖像':'：肖像待补充')+'" loading="lazy"></span><div><h3>'+p.name+'</h3><span class="en">'+p.en+'</span></div></div><p>'+p.summary+'</p><span class="tag">关注问题 / '+p.problem+'</span><div class="card-bottom"><span>'+categories[p.cat]+'</span><span>'+(p.source?"基础来源已附":"候选 · 待核实")+' ↗</span></div></button>').join("")||'<div class="empty">暂未找到匹配人物。试试“疫苗”“眼科”或“看病贵”。<button class="secondary" id="reset">清空筛选</button></div>';
 $("#more").hidden=filtered.length<=9;$("#more").textContent=expanded?"收起人物 ↑":"展开全部人物 ↓";
 document.querySelectorAll("[data-category]").forEach(b=>{b.classList.toggle("active",Number(b.dataset.category)===category);b.setAttribute("aria-pressed",Number(b.dataset.category)===category)});
}
let currentPersonId=0;
function detail(id){
 const p=people.find(p=>p.id===Number(id));if(!p)return; currentPersonId=p.id;
 $("#detail-content").innerHTML='<img class="detail-portrait" src="'+p.photo+'" alt="'+p.name+'肖像"><p class="eyebrow">人物档案 / '+String(p.id+1).padStart(2,"0")+'</p><h2 id="detail-title">'+p.name+'</h2><span class="en">'+p.en+' · '+p.city+' · '+p.place+'（城市级代表地点）</span><p>'+p.summary+'</p><h3>解决什么问题？</h3><p>'+p.problem+'</p><h3>从什么角度理解创新？</h3><p>'+categories[p.cat]+'。这是课程初步分类，尚不构成突破性或颠覆性的最终判断。</p><h3>后续研究档案</h3><p>待补充：原有方案的局限、创新机制、团队贡献、阻力与转化过程，以及附年份和来源的影响数据。</p><h3>资料状态</h3><p>'+(p.source?'<a href="'+p.source+'" target="_blank" rel="noopener">查看原始机构资料 ↗</a>。完整生平与影响评价尚待补充。':'当前为候选研究条目，未完成资料核验，不用于正式课堂事实引用。')+'</p>'+(p.id===2?'<button class="secondary" id="go-story">阅读六幕故事 →</button>':'');
 $("#detail-content").insertAdjacentHTML("beforeend", '<h3>图片与地点来源</h3><p><a target="_blank" rel="noopener" href="'+p.locationSource+'">人物与工作经历核查入口 ↗</a></p>'+(p.photoSource?'<p><a target="_blank" rel="noopener" href="'+p.photoSource+'">肖像原文件、作者与许可 ↗</a> · 裁切展示。</p>':'<p>已保留图片头像位置，真实肖像待补充。</p>')); const wasOpen=$("#detail").open;if(!wasOpen)$("#detail").showModal();document.body.style.overflow="hidden";$("#detail").scrollTop=0;if(!wasOpen)$(".close").focus();$("#person-counter").textContent=(p.id+1)+" / "+people.length;
}
$("#detail").addEventListener("close",()=>document.body.style.overflow="");$(".close").onclick=()=>$("#detail").close();
document.addEventListener("click",e=>{const p=e.target.closest("[data-person]");if(p)detail(p.dataset.person);const c=e.target.closest("[data-category]");if(c){category=Number(c.dataset.category);expanded=false;render()}if(e.target.id==="reset"){category=-1;$("#query").value="";render()}if(e.target.id==="go-story"){$("#detail").close();$("#story").scrollIntoView()}});
$("#quick").innerHTML=["看病贵","疫苗","癌症","偏远地区","手术安全","发现太晚"].map(t=>'<button type="button">'+t+' ↗</button>').join("");
$("#quick").onclick=e=>{if(e.target.tagName==="BUTTON"){$("#query").value=e.target.textContent.replace(" ↗","");category=-1;expanded=false;render()}};
$("#categories").innerHTML=["全部人物",...categories].map((t,i)=>'<button data-category="'+(i-1)+'">'+t+'</button>').join("");
$("#query").oninput=()=>{expanded=false;render()};$("#more").onclick=()=>{expanded=!expanded;render();if(!expanded)$("#explore").scrollIntoView()};
document.addEventListener("keydown",e=>{if(e.key==="/"&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)&&!$("#detail").open){e.preventDefault();$("#query").focus()}});
$("#chapters").innerHTML=chapters.map((c,i)=>'<details '+(i<2?"open":"")+'><summary><span>0'+(i+1)+'</span>'+c[0]+'</summary><p>'+c[1]+'</p></details>').join("");
render();

const profileNav=document.createElement("div");profileNav.className="profile-nav";profileNav.innerHTML='<button id="previous-person" aria-label="上一位创新者">← 上一位</button><span id="person-counter" aria-live="polite"></span><button id="next-person" aria-label="下一位创新者">下一位 →</button>';$("#detail").append(profileNav);
function movePerson(step){detail((currentPersonId+step+people.length)%people.length)}
$("#previous-person").onclick=()=>movePerson(-1);$("#next-person").onclick=()=>movePerson(1);
document.addEventListener("keydown",e=>{if(!$("#detail").open||["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName))return;if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();movePerson(e.key==="ArrowLeft"?-1:1)}});
