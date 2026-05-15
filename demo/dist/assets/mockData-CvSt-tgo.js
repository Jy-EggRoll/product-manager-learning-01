const e={title:"药房智能体解决方案",subtitle:'"数字副店长" - 全链路自动化会员运营',background:{problem:"门店客流下滑，线上竞品分流，存量会员价值未充分挖掘",goal:'从"人找药"到"药找人"，盘活会员资产，提升坪效和会员LTV',strategy:"全链路自动化闭环：感知-洞察-决策-触达-履约-复盘"},expectedBenefits:[{metric:"会员复购率",value:"+35%",desc:"慢性病患者精准触达"},{metric:"活动响应时效",value:"从7天到实时",desc:"舆情/天气自动触发"},{metric:"库存周转率",value:"+25%",desc:"智能补货建议"},{metric:"运营人力",value:"-40%",desc:"智能体自动执行"}],businessProcess:[{step:1,name:"感知",desc:"捕获季节、天气、舆情、地理位置等外部信号",color:"#3b82f6"},{step:2,name:"洞察",desc:"会员画像与药品标签智能匹配",color:"#8b5cf6"},{step:3,name:"决策",desc:"策略规则引擎自动判定券包与时机",color:"#ec4899"},{step:4,name:"触达",desc:"多渠道智能推送（企微/短信/小程序）",color:"#f59e0b"},{step:5,name:"履约",desc:"门店承接，券码核销，补货确认",color:"#10b981"},{step:6,name:"复盘",desc:"转化分析，库存消化，规则迭代",color:"#06b6d4"}],roles:[{name:"总部运营",count:"3-5人",avatar:"👩‍💼",responsibilities:["策略配置","标签规则维护","券模板管理","活动复盘"],painPoints:["活动赶不上变化","人工排期慢","标签匹配靠Excel"],collaborationMode:'从"做活动"变成"养策略"，智能体负责执行，运营负责审核调优'},{name:"门店店长/店员",count:"50-100人（50家店）",avatar:"👨‍⚕️",responsibilities:["会员承接","券码核销","补货确认"],painPoints:["有会员没抓手","不知道用药周期","补货靠经验"],collaborationMode:'智能体是"外挂大脑"，提供今日重点名单、补货建议、话术提示'},{name:"数字副店长（智能体）",count:"7x24小时",avatar:"🤖",responsibilities:["实时感知","智能匹配","自动决策","学习优化"],painPoints:[],collaborationMode:"感知-决策-执行-反馈-学习，全闭环自动化"}]},n={overviewCards:[{title:"今日活跃活动",value:"23",trend:"+5",trendUp:!0,icon:"Activity"},{title:"今日触达会员",value:"12,847",trend:"+18%",trendUp:!0,icon:"Users"},{title:"券核销率",value:"12.4%",trend:"+2.1%",trendUp:!0,icon:"CheckCircle"},{title:"带动销售额",value:"¥89.6万",trend:"+32%",trendUp:!0,icon:"TrendingUp"}],activeSignals:[{type:"天气",title:"寒潮预警",desc:"明日降温8-10°C，易感人群需关注",time:"10分钟前",severity:"high",color:"#ef4444"},{type:"舆情",title:"流感热点",desc:"本地流感病例上升30%，奥司他韦需求增加",time:"1小时前",severity:"medium",color:"#f59e0b"},{type:"季节",title:"花粉季来临",desc:"春季致敏花粉浓度升高，抗过敏药需求预期增长",time:"2小时前",severity:"low",color:"#10b981"}],recentActivities:[{id:1,name:"降温关怀活动",status:"running",type:"自动触发",triggeredBy:"天气信号",memberCount:3256,converted:412,conversionRate:"12.6%",startTime:"2026-05-14 08:00"},{id:2,name:"高血压复购提醒",status:"running",type:"周期触发",triggeredBy:"用药周期",memberCount:1894,converted:287,conversionRate:"15.2%",startTime:"2026-05-13 09:00"},{id:3,name:"流感预防券包",status:"completed",type:"舆情触发",triggeredBy:"流感热点",memberCount:5621,converted:894,conversionRate:"15.9%",startTime:"2026-05-10"},{id:4,name:"糖尿病会员专属",status:"pending",type:"策略触发",triggeredBy:"会员标签",memberCount:2145,converted:0,conversionRate:"0%",startTime:"2026-05-16 09:00"}],weeklyChart:{labels:["周一","周二","周三","周四","周五","周六","周日"],datasets:[{label:"触达人数",data:[8500,9200,11500,10800,12400,15200,13800],color:"#3b82f6"},{label:"转化人数",data:[950,1120,1420,1350,1580,1950,1760],color:"#10b981"}]}},t={storeInfo:{name:"人民路中心店",address:"人民路128号",members:8542,todayTasks:12,replenishmentItems:5},todayOverview:{visitorCount:156,couponUsed:23,newMembers:8,salesAmount:28560},priorityMembers:[{id:1,name:"张建国",age:68,tag:"高血压",avatar:"👴",lastPurchase:"2026-04-28",nextRefill:"今日",risk:"high",recommendedDrugs:["氨氯地平","缬沙坦"],suggestedCoupon:"老客复购立减20元"},{id:2,name:"李阿姨",age:72,tag:"糖尿病",avatar:"👵",lastPurchase:"2026-04-25",nextRefill:"明日",risk:"medium",recommendedDrugs:["二甲双胍","格列美脲"],suggestedCoupon:"慢病关怀满200减30"},{id:3,name:"王小明",age:35,tag:"过敏性鼻炎",avatar:"👨",lastPurchase:"2026-04-10",nextRefill:"花粉季",risk:"medium",recommendedDrugs:["氯雷他定","布地奈德"],suggestedCoupon:"春季过敏防护套装"},{id:4,name:"陈女士",age:58,tag:"高血脂",avatar:"👩",lastPurchase:"2026-04-20",nextRefill:"3天后",risk:"low",recommendedDrugs:["阿托伐他汀"],suggestedCoupon:"慢病续方立减15元"}],replenishmentList:[{id:1,drugName:"氨氯地平片",category:"降压药",currentStock:23,minStock:50,suggestedAmount:80,unit:"盒",lastSales:45,trend:"up"},{id:2,drugName:"奥司他韦胶囊",category:"抗病毒",currentStock:8,minStock:30,suggestedAmount:50,unit:"盒",lastSales:62,trend:"up"},{id:3,drugName:"氯雷他定片",category:"抗过敏",currentStock:15,minStock:40,suggestedAmount:60,unit:"盒",lastSales:38,trend:"up"},{id:4,drugName:"二甲双胍缓释片",category:"降糖药",currentStock:42,minStock:60,suggestedAmount:40,unit:"盒",lastSales:28,trend:"stable"},{id:5,drugName:"布洛芬缓释胶囊",category:"镇痛",currentStock:12,minStock:25,suggestedAmount:30,unit:"盒",lastSales:15,trend:"stable"}]},a={scenarios:[{id:"weather",name:"天气触发场景",icon:"CloudRain",description:"模拟降温天气触发智能关怀活动",messages:[{role:"agent",content:"【信号感知】检测到明日寒潮预警，预计降温8-10°C，相关疾病风险上升。",time:"08:00:15"},{role:"agent",content:`【洞察分析】正在匹配易感人群...

筛选条件：
- 高血压患者（血管收缩风险）
- 老年群体（免疫力较弱）
- 近3个月有购药记录

共匹配 3,256 位会员`,time:"08:00:42"},{role:"agent",content:`【决策生成】自动生成活动方案：

📋 活动名称：降温关怀活动
🎯 目标人群：3,256位易感会员
💊 推荐药品：氨氯地平、缬沙坦等
🎟️ 券包配置：
   - 老客复购立减20元（满100可用）
   - 慢病关怀满200减30
⏰ 推送时间：今日 09:00
📱 推送渠道：企微+短信

请确认是否执行？`,time:"08:01:15"},{role:"human",content:"确认执行",time:"08:02:00"},{role:"agent",content:`【触达执行】活动已启动

📊 执行进度：
- 企微消息：3,256条 已发送 ✓
- 短信提醒：892条（未关注企微用户）已发送 ✓

活动将持续追踪转化数据，每小时更新一次报告。`,time:"09:00:30"},{role:"agent",content:`【履约反馈】10:30 更新

今日到店使用降温关怀券会员：23人
带动销售额：¥8,620

当前核销率：0.7%（持续上升中）
预计最终核销率：12-15%`,time:"10:30:00"}]},{id:"replenishment",name:"补货建议场景",icon:"Package",description:"模拟智能体给店长推送补货建议",messages:[{role:"agent",content:`🌅 早上好，李店长！

这是昨晚为您计算的今日补货建议和重点会员名单。`,time:"08:00:00"},{role:"agent",content:`【补货建议】基于销售趋势和库存预警：

1️⃣ 氨氯地平片（降压药）
   当前库存：23盒 | 安全库存：50盒
   建议补货：80盒
   📈 近7天销量：45盒，流感+降温双重因素驱动

2️⃣ 奥司他韦胶囊（抗病毒）
   当前库存：8盒 | 安全库存：30盒
   建议补货：50盒
   📈 近7天销量：62盒，本地流感热点

3️⃣ 氯雷他定片（抗过敏）
   当前库存：15盒 | 安全库存：40盒
   建议补货：60盒
   📈 花粉季来临，需求预期增长

请确认或调整补货数量？`,time:"08:00:15"},{role:"human",content:"奥司他韦我要补80盒，其他按建议",time:"08:15:00"},{role:"agent",content:`✅ 已确认补货单：

- 氨氯地平片：80盒
- 奥司他韦胶囊：80盒（已调整）
- 氯雷他定片：60盒

补货单已同步至采购系统，预计今日下午送达。

需要我帮您调整其他药品吗？`,time:"08:15:20"},{role:"agent",content:`【今日重点会员】

根据用药周期，以下会员需要重点关注：

👴 张建国（68岁，高血压）
   上次购药：4月28日
   预计用完：今日
   建议推送：氨氯地平 + 复购券

👵 李阿姨（72岁，糖尿病）
   上次购药：4月25日 
   预计用完：明日
   建议推送：二甲双胍 + 关怀短信

需要我帮您生成今日触达话术吗？`,time:"08:01:00"}]},{id:"member_service",name:"会员服务场景",icon:"UserCircle",description:"模拟店员接待会员时的智能辅助",messages:[{role:"agent",content:`【会员到店提醒】

👴 张建国 先生正在店中
会员等级：银卡 | 年龄：68岁

📍 位置：处方药区

🔍 会员画像：
- 主要病症：原发性高血压3级
- 合并症：高血脂
- 过敏史：青霉素过敏

💊 近期用药：
- 氨氯地平片 5mg（每日1次）
- 阿托伐他汀 20mg（每晚1次）

📅 用药周期：
上次购药：2026-04-28
预计剩余：约2天用量`,time:"14:32:00"},{role:"agent",content:`💡 今日推荐话术：

"张先生您好，您常吃的氨氯地平还有吗？

最近降温明显，高血压患者需要特别注意监测血压哦。

今天店里有老客复购活动，买3盒立减20元，
您看要不要带几盒？

另外阿托伐他汀也可以一起备上～"`,time:"14:32:05"},{role:"human",content:"张先生表示最近血压控制得不错，但早上起来头有点晕",time:"14:35:00"},{role:"agent",content:`💡 跟进建议：

1️⃣ 询问头晕情况：
   - 是天旋地转还是昏昏沉沉？
   - 有没有按时吃药？
   - 最近睡眠怎么样？

2️⃣ 建议测血压：
   店里免费测，可以帮他测一下

3️⃣ 如血压偏高，可推荐：
   - 今日特惠：氨氯地平+缬沙坦联合用药
   - 免费赠送：血压监测记录表

4️⃣ 人文关怀：
   降温天气注意保暖，早上起床慢一点`,time:"14:35:10"},{role:"human",content:"张先生买了氨氯地平3盒和阿托伐他汀2盒，使用了复购券",time:"14:42:00"},{role:"agent",content:`✅ 交易记录已同步

📊 本次消费：
- 氨氯地平片 x3：¥156
- 阿托伐他汀 x2：¥298
- 优惠券抵扣：¥50
- 实付：¥404

📈 会员价值更新：
- 累计消费：¥12,850
- 距金卡升级：还需¥7,150

已自动记录本次购药时间，下次用药提醒将于15天后推送。`,time:"14:42:05"}]}]},s={businessFlow:`@startuml 药房智能体业务闭环流程图
skinparam backgroundColor #f8fafc
skinparam shadowing false
skinparam arrowColor #475569

title
  <b><size:18>药房智能体业务闭环</size></b>
  <size:12>感知-洞察-决策-触达-履约-复盘</size>
end title

partition "感知层 (外部信号)" #e0f2fe {
  :季节变化;
  :天气突变;
  :舆情热点;
  :地理位置;
}

partition "洞察层 (智能匹配)" #dbeafe {
  :会员画像分析;
  :用药周期计算;
  :药品标签匹配;
  :关联推荐计算;
}

partition "决策层 (智能体)" #fce7f3 {
  :策略规则引擎;
  :券包自动生成;
  :时机判定;
  :渠道选择;
}

partition "触达层 (多渠道)" #fef3c7 {
  :企业微信;
  :短信通知;
  :小程序推送;
  :APP消息;
}

partition "履约层 (门店)" #dcfce7 {
  :会员到店;
  :店员承接;
  :核销券码;
  :补货确认;
}

partition "复盘层 (数据闭环)" #f3e8ff {
  :转化数据分析;
  :库存消化统计;
  :策略效果评估;
  :规则迭代优化;
}

start
:外部信号触发;
:感知层捕获;
:洞察层分析;
:决策层判定;
:触达层推送;
:会员响应;
:门店履约;
:数据采集;
:复盘优化;
:形成闭环;
end

@enduml`,collaboration:`@startuml 角色与智能体协作图
skinparam backgroundColor #f8fafc
skinparam shadowing false

title
  <b><size:18>角色与智能体协作关系</size></b>
  <size:12>总部运营 + 门店店长 + 数字副店长</size>
end title

actor "总部运营专员" as HQ_OPERATOR
actor "门店店长/店员" as STORE_STAFF
actor "会员用户" as MEMBER

boundary "运营控制台" as HQ_PORTAL
boundary "店长工作台" as STORE_PORTAL
boundary "企微侧边栏" as WECOM_SIDEBAR
boundary "会员小程序" as MEMBER_MINIAPP

control "数字副店长智能体" as AGENT

== 总部运营视角 ==
HQ_OPERATOR -> HQ_PORTAL : 配置策略规则
HQ_PORTAL -> AGENT : 保存规则

note over HQ_OPERATOR, AGENT
  <b>协作模式：</b>
  运营从"做活动"变成"养策略"
  智能体负责执行，运营负责审核调优
end note

== 智能体自动运行 ==
AGENT --> MEMBER_MINIAPP : 推送消息
AGENT --> WECOM_SIDEBAR : 推送提醒

== 门店视角 ==
STORE_STAFF -> STORE_PORTAL : 查看今日任务
STORE_STAFF -> WECOM_SIDEBAR : 接待会员

note over STORE_STAFF, AGENT
  <b>协作模式：</b>
  智能体是店长的"外挂大脑"
  每日重点触达名单、补货建议、话术提示
end note

@enduml`,architecture:`@startuml 系统技术架构图
skinparam backgroundColor #f8fafc
skinparam shadowing false

title
  <b><size:18>药房智能体系统技术架构</size></b>
  <size:12>四层架构设计</size>
end title

package "接入层" #dbeafe {
  [运营管理后台] as HQ_ADMIN
  [店长工作台] as STORE_PORTAL
  [企微侧边栏] as WECOM_SIDEBAR
  [会员小程序] as MEMBER_MINIAPP
}

package "应用层" #fce7f3 {
  [智能体核心引擎] as AGENT_ENGINE
  [策略规则引擎] as RULE_ENGINE
  [活动编排引擎] as ACTIVITY_ENGINE
  [数据分析中心] as DATA_ANALYTICS
}

package "能力层" #dcfce7 {
  [会员画像服务] as MEMBER_PROFILE
  [药品知识图谱] as DRUG_KG
  [外部信号感知] as SIGNAL_PERCEIVE
  [推荐算法服务] as RECOMMEND_SVC
}

package "数据层" #fef3c7 {
  database "会员数据库" as MEMBER_DB
  database "药品数据库" as DRUG_DB
  database "策略数据库" as STRATEGY_DB
}

HQ_ADMIN --> AGENT_ENGINE
STORE_PORTAL --> AGENT_ENGINE
AGENT_ENGINE --> MEMBER_PROFILE
MEMBER_PROFILE --> MEMBER_DB

@enduml`};export{a,s as b,n as h,e as p,t as s};
