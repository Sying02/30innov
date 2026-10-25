const categories=["医疗器械与诊疗设备创新","药物与生物技术创新","医疗服务与组织体系创新"];
const rows=[
["Earl Bakken","Earl Bakken",0,"北美","心脏起搏","便携式电池心脏起搏器，让生命支持设备摆脱固定电源。","起搏器 心脏 医疗电子"],
["Thomas Fogarty","Thomas Fogarty",0,"北美","血管栓塞","球囊取栓导管以微创方式清除血管栓子。","血管 手术 导管"],
["Frederic Moll","Frederic Moll",0,"北美","微创手术","推动机器人辅助外科系统的开发与商业化。","手术 机器人 微创"],
["Judy Faulkner","Judy Faulkner",2,"北美","电子健康记录","创办Epic，推动医疗机构电子病历与临床信息系统建设。","电子病历 医疗信息"],
["Julio Palmaz","Julio Palmaz",0,"南美","血管狭窄","球囊扩张式血管支架为血管提供持续支撑。","支架 血管 介入"],
["Devi Shetty","Devi Shetty",0,"南亚","心脏手术费用","以规模化流程探索更可负担的心脏外科服务。","心脏 手术 低成本"],
["Willem Kolff","Willem Kolff",1,"欧洲","肾功能衰竭","研制早期血液透析设备，并参与人工器官研究。","透析 人工器官 肾脏"],
["Rick Krieger","Rick Krieger",2,"北美","常见病就诊不便","参与创办QuickMedx/MinuteClinic，以零售诊所重组部分基层医疗服务。","零售诊所 基层医疗 服务模式"],
["Robert Langer","Robert Langer",-1,"北美","药物递送与组织修复","以生物材料研究推动可控药物递送和组织工程发展。","药物递送 生物材料 组织工程"],
["Demis Hassabis","Demis Hassabis",0,"欧洲","药物发现","推动AI用于蛋白质结构预测和药物研发。","人工智能 蛋白质 药物"],
["邓宏魁","Hongkui Deng",0,"东亚","细胞重编程","发展化学小分子诱导细胞重编程的研究路径。","干细胞 化学重编程 再生医学"],
["大卫·贝克","David Baker",2,"北美","蛋白质设计","发展计算蛋白质设计方法，并推动其应用转化。","蛋白质 计算设计 生物医药"],
["加夫里尔·伊丹","Gavriel Iddan",1,"中东","小肠检查","推动胶囊内镜将微型成像与无线传输用于消化道检查。","胶囊内镜 消化道 影像"],
["Jonathan Rothberg","Jonathan Rothberg",-1,"北美","床旁超声检查","推动芯片式手持超声设备，拓展即时超声检查。","超声 影像 芯片"],
["Hugh Herr","Hugh Herr",-1,"北美","肢体功能障碍","推动动力假肢与生物机电康复技术发展。","假肢 康复 工程"],
["青柳卓雄","Takuo Aoyagi",-1,"东亚","血氧监测","发明脉搏血氧测量原理，促进无创患者监护。","血氧 监护 麻醉"],
["文卡塔斯瓦米","Govindappa Venkataswamy",-1,"南亚","眼科医疗可及性","创办Aravind眼科体系，探索规模化眼科服务与低成本耗材。","眼科 白内障 可及性"],
["戈弗雷·豪斯菲尔德","Godfrey Hounsfield",-1,"欧洲","体内断层成像","推动CT扫描技术发展，改变无创医学影像诊断。","CT 影像 诊断"],
["雷蒙德·达马迪安","Raymond Damadian",-1,"北美","磁共振成像","MRI商业化的重要先驱之一；技术发明归属存在争议。","MRI 磁共振 影像"],
["James Black","James Black",-1,"欧洲","心血管与消化疾病","以受体机制为基础推动普萘洛尔和西咪替丁研发。","药物 心脏 胃溃疡"],
["Dean Kamen","Dean Kamen",-1,"北美","糖尿病与居家透析","开发便携输液设备，并推动家用腹膜透析系统。","胰岛素泵 透析 医疗器械"],
["Jennifer Doudna","Jennifer Doudna",-1,"北美","基因编辑","推动CRISPR基因编辑工具发展及医疗转化。","CRISPR 基因编辑"],
["Emmanuelle Charpentier","Emmanuelle Charpentier",-1,"欧洲","基因编辑","与团队发展CRISPR-Cas9基因编辑技术。","CRISPR 基因编辑"],
["Sidney Garfield","Sidney Garfield",-1,"北美","医疗支付与组织","探索预付费综合医疗体系与预防导向服务组织。","预付费 医疗支付 Kaiser"],
["Noubar Afeyan","Noubar Afeyan",-1,"北美","生命科学创业","以Flagship Pioneering孵化科学假设并创建生物科技企业。","创业 孵化 生物科技"],
["George Yancopoulos","George Yancopoulos",-1,"北美","药物研发平台","推动基因工程和抗体药物研发平台建设。","抗体 基因工程 药物"],
["卡塔琳·卡里科","Katalin Karikó",-1,"欧洲","核酸疫苗","核苷修饰mRNA研究为疫苗和核酸药物发展奠定基础。","mRNA 疫苗 RNA"],
["Carl June","Carl June",-1,"北美","血液肿瘤治疗","推动CAR-T细胞疗法临床转化。","CAR-T 细胞治疗 癌症"],
["Patricia Bath","Patricia Bath",-1,"北美","白内障治疗","发明Laserphaco技术，并倡导社区眼科服务。","白内障 激光 眼科"],
["John C. Martin","John C. Martin",-1,"北美","病毒性疾病治疗","领导抗病毒药物研发、商业化与全球可及工作。","抗病毒 HIV 全球健康"]
];
const people=rows.map((r,id)=>({id,name:r[0],en:r[1],cat:r[2],region:r[3],problem:r[4],summary:r[5],keywords:r[6],source:null,photo:"assets/portrait-placeholder.svg",photoAvailable:false,city:"待补充",lon:0,lat:0,place:"工作地点待核实",locationSource:"#"}));const wordPortraits=["image2.png","image3.png","image4.png","image5.png","image6.png","image7.png","image9.png",null,"image12.png","image13.png","image14.png",null,"image18.png","image19.png","image20.png","image22.png","image23.png","image24.jpeg","image25.jpeg","image26.jpeg","image27.jpeg","image28.jpeg","image29.jpeg","image30.jpeg","image31.png","image32.png","image33.png","image34.png","image35.png","image36.png"];people.forEach((p,i)=>{if(wordPortraits[i]){p.photo="assets/word-portraits/"+wordPortraits[i];p.photoAvailable=true}else{p.photo="assets/portrait-placeholder.svg";p.photoAvailable=false}});
people[7].photo="assets/rick-krieger.jpg";people[7].photoAvailable=true;
people[11].photo="assets/david-baker.webp";people[11].photoAvailable=true;

