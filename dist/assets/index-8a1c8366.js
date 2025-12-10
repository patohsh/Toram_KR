var Et=Object.defineProperty;var xt=(i,t,e)=>t in i?Et(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var v=(i,t,e)=>(xt(i,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=e(a);fetch(a.href,o)}})();const H={characterLevel:310,smithLevel:100,materialSkillLevels:[10,10,10,10,10,10],get materialAnvilSkillLevelSum(){return 50}},C={PotentialCapacity:100,EquipmentBasePotentialMinimum:30,EquipmentItemMaximumNumber:8,PotentialConvertDefaultThreshold:20,Character:{get level(){return H.characterLevel},get smithLevel(){return H.smithLevel},tec:255,getMaterialSkillLevel(i){return H.materialSkillLevels[i]||0},get materialAnvilSkillLevelSum(){return H.materialAnvilSkillLevelSum}}};var S=(i=>(i.Constant="constant",i.Multiplier="multiplier",i))(S||{}),G=(i=>(i.MainWeapon="main-weapon",i.BodyArmor="body-armor",i.OriginalElement="original-element",i))(G||{}),N=(i=>(i.MainWeapon="main-weapon",i.BodyArmor="body-armor",i))(N||{}),_=(i=>(i.Normal="normal",i.Each="each",i))(_||{}),j=(i=>(i.Physical="physical",i.Magic="magic",i.None="none",i))(j||{}),W=(i=>(i.SuccessRate="success-rate",i.Material="material",i))(W||{});const rt=i=>i,ct=(i,t)=>10,et={Character:{findStatBase:i=>({baseId:i,name:i.toUpperCase()})},Enchant:{categorys:[]}};class A{constructor(t){v(this,"_weaponOnly");v(this,"title");v(this,"items");this.title=t,this.items=rt([]),this._weaponOnly=!1}get weaponOnly(){return this._weaponOnly}setWeaponOnly(){this._weaponOnly=!0}appendItem(t){const e=rt(new kt(this,t));return this.items.push(e),e}}class kt{constructor(t,{baseId:e,potential:n,limit:a,extraLimit:o,unitValue:s,materialPointType:l,materialPointValue:c,potentialConvertThreshold:u}){v(this,"_category");v(this,"statBase");v(this,"conditionalProps");v(this,"potential");v(this,"limit");v(this,"extraLimit");v(this,"unitValue");v(this,"materialPointType");v(this,"materialPointValue");v(this,"potentialConvertThreshold");this._category=t,this.statBase=et.Character.findStatBase(e),this.conditionalProps=[],this.potential={[S.Constant]:n[0],[S.Multiplier]:n[1]},this.limit={[S.Constant]:{base:a[0][0],negative:a[0][1]},[S.Multiplier]:{base:a[1][0],negative:a[1][1]}},this.extraLimit={[S.Constant]:{base:o[0][0],negative:o[0][1]},[S.Multiplier]:{base:o[1][0],negative:o[1][1]}},this.unitValue={[S.Constant]:{base:s[0][0],advanced:s[0][1]},[S.Multiplier]:{base:s[1][0],advanced:s[1][1]}},this.materialPointType=l,this.materialPointValue={[S.Constant]:c[0],[S.Multiplier]:c[1]},this.potentialConvertThreshold={[S.Constant]:u[0],[S.Multiplier]:u[1]}}get belongCategory(){return this._category}appendConditionalProps(t,e){const n=new Pt(t,e);this.conditionalProps.push(n)}checkConditionalProps(t){return this.conditionalProps.find(e=>{switch(e.condition){case G.MainWeapon:return t.fieldType===N.MainWeapon;case G.BodyArmor:return t.fieldType===N.BodyArmor;case G.OriginalElement:return t.isOriginalElement}})||null}getPotential(t,e){const n=this.checkConditionalProps(e);return n?n.potential[t]:this.potential[t]}getOriginalPotential(t){return this.potential[t]}getLimit(t){const e=this.limit[t],n=this.getLimitFromPotentialCapacity(t),a=Math.floor(C.Character.level/10),o=Math.min(20,a),s=Math.min(n,o),l=e.negative===null?-1*s:e.negative,c=e.base===null?s:e.base,{base:u,negative:d}=this.extraLimit[t],r=C.Character.level-200,h=u!==null&&r>0?Math.floor(ct()):0,p=d===null?h*-1:-1*(r>0?Math.floor(ct()):0);return{min:Math.max(l+p,-1*a),max:Math.min(c+h,a)}}getLimitFromPotentialCapacity(t,e=0){let n=C.PotentialCapacity+e;const a=this.getOriginalPotential(t);return a===6&&(n-=10),a===0?999:Math.floor(n/a)}getUnitValue(t){return this.unitValue[t]}getMaterialPointValue(t){const e=this.materialPointValue[t];return e===null?{1:5,3:16.5,5:25,6:33.5,10:50,20:100}[this.getOriginalPotential(t).toString()]||0:e}getPotentialConvertThreshold(t){return this.potentialConvertThreshold[t]||Math.min(C.PotentialConvertDefaultThreshold,this.getLimitFromPotentialCapacity(t))}}class Pt{constructor(t,{potential:e}){v(this,"condition");v(this,"potential");this.condition=t,this.potential={[S.Constant]:e[0],[S.Multiplier]:e[1]}}}function Mt(i){return i.reduce((e,n)=>e+n*n,20)*5}function B(i){return i[i.length-1]}class wt{constructor(t,e,n){v(this,"baseId");v(this,"type");v(this,"value");this.baseId=t,this.type=e,this.value=n}show(t){return`${this.baseId} ${t??this.value}`}add(t){return this.value+=t,this.value}equals(t){return this.baseId===t.baseId&&this.type===t.type}}class Lt{constructor(t,e=null){v(this,"name");v(this,"equipment");v(this,"categorys");this.name=t,this.equipment=e||new nt,this.categorys=[]}}class nt{constructor(){v(this,"_steps");v(this,"basePotential");v(this,"originalPotential");v(this,"fieldType");v(this,"isOriginalElement");this._steps=[],this.basePotential=15,this.originalPotential=1,this.fieldType=N.MainWeapon,this.isOriginalElement=!1}clone(t){const e=new nt;return e.basePotential=this.basePotential,e.originalPotential=this.originalPotential,e.fieldType=this.fieldType,e.isOriginalElement=this.isOriginalElement,e._steps=this._steps.map(n=>{const a=new J(e);return a.type=n.type,a.stats=n.stats.map(o=>new gt(a,o.itemBase,o.type,o.value)),a}),e}loadSteps(t){this._steps=t}get allSteps(){return this._steps}steps(t){return t=t===void 0?this._steps.length-1:t,t<0?[]:this._steps.slice(0,t+1)}get firstStep(){return this.steps()[0]||null}get lastStep(){return this._steps.length>0?this._steps[this._steps.length-1]:null}get operationStepsQuantity(){return this.lastStep?this.steps(this.lastStep.index).reduce((t,e)=>e.firstStat?e.type===_.Each?t+Math.ceil(e.firstStat.value/e.step):t+1:t,0):0}appendStep(){const t=new J(this);return this._steps.push(t),t}insertStepBefore(t){const e=new J(this);return this._steps.splice(t.index,0,e),e}stepRemainingPotential(t){return this.steps(t).reduce((e,n)=>e-n.potentialCost,this.originalPotential)}stepPotentialExtraRate(t){const e=[];return this.stats(t).forEach(n=>{const a=n.itemBase.belongCategory,o=e.find(s=>s.category===a);o?o.cnt+=1:e.push({category:a,cnt:1})}),Mt(e.map(n=>n.cnt))}stat(t,e,n){const a=this.steps(n).reduce((o,s)=>{const l=s.stat(t,e);return l?o+l.value:o},0);return new $(t,e,a)}stats(t){const e=[];return this.steps(t).forEach(n=>{n.stats.forEach(a=>{const o=e.find(s=>s.equals(a));o?o.add(a.value):e.push(a.pure())})}),e}statsMap(t){const e=new Map;return this.stats(t).forEach(n=>e.set(n.statId,n)),e}checkStats(t){return this.stats(t).length<C.EquipmentItemMaximumNumber}hasStat(t,e){return!!this.stats(e).find(n=>n.equals(t))}get realSuccessRate(){if(!this.lastStep)return 160;const t=this.lastStep.index,e=this.stepRemainingPotential(t),n=Math.max(this.stepRemainingPotential(t-1),this.basePotential);return Math.max(160+e*230/n,0)}get allMaterialPointCost(){const t=[0,0,0,0,0,0];return this.steps().forEach(e=>e.stats.forEach(n=>{const a=n.materialPointCost;a&&(t[a.type]+=a.value)})),t}refreshStats(){}checkMergeSteps(){}}class J{constructor(t){v(this,"_parent");v(this,"stats");v(this,"type");v(this,"step");v(this,"hidden");this._parent=t,this.stats=[],this.type=_.Normal,this.step=1,this.hidden=!1}get belongEquipment(){return this._parent}get potentialExtraRate(){return this.belongEquipment.stepPotentialExtraRate(this.index)}get index(){return this._parent.allSteps.indexOf(this)}get potentialCost(){if(this.stats.length===0)return 0;const t=this.potentialExtraRate;if(this.type===_.Normal){const e=this.stats.reduce((n,a)=>n+a.potentialCost,0);return this.realPotentialCost(e*t/100)}return this.type===_.Each&&this.firstStat?this.firstStat.potentialCost:0}get remainingPotential(){return this.belongEquipment.stepRemainingPotential(this.index)}get previousStep(){return this.index>0?this.belongEquipment.allSteps[this.index-1]:null}get nextStep(){return this.belongEquipment.allSteps[this.index+1]||null}get firstStat(){return this.stats[0]||null}appendStat(t,e,n){const a=new gt(this,t,e,n);return this.stats.push(a),a}stat(t,e){return this.stats.find(n=>n.itemBase===t&&n.type===e)??null}remove(){this.index>-1&&this.belongEquipment.allSteps.splice(this.index,1)}realPotentialCost(t){return t>=0?Math.floor(t):Math.ceil(t)}optimizeType(t){return 0}toString(){return`Step ${this.index+1}: ${this.remainingPotential}pt`}}class ${constructor(t,e,n){v(this,"itemBase");v(this,"stat");this.itemBase=t,this.stat=new wt(t.statBase.baseId,e,n)}get value(){return this.stat.value}set value(t){this.stat.value=t}get type(){return this.stat.type}get statId(){return`${this.itemBase.statBase.baseId}_${this.type}`}get originalPotential(){return this.itemBase.getOriginalPotential(this.type)}get limit(){return this.itemBase.getLimit(this.type)}get potentialConvertThreshold(){return this.itemBase.getPotentialConvertThreshold(this.type)}show(){return this.stat.show()}add(t){return this.stat.add(t)}equals(t){return this.stat.equals(t.stat)}clone(){return new $(this.itemBase,this.type,this.value)}pure(){return this.clone()}calcMaterialPointCost(t,e){t>e&&([t,e]=[e,t]);const n=C.Character.smithLevel,a=100-Math.floor(n/10)-Math.floor(n/50),o=C.Character.getMaterialSkillLevel(this.itemBase.materialPointType),s=this.itemBase.getMaterialPointValue(this.type),l=(c,u)=>{u=Math.abs(u),c=Math.abs(c),c>u&&([c,u]=[u,c]);let d=0;for(let r=c;r<u;r++){let h=r+1,p=Math.floor(h*h*s*a/100);p=Math.floor(p*(100-o)/100),d+=p}return d};return t*e>=0?l(t,e):l(t,0)+l(0,e)}}class gt extends ${constructor(e,n,a,o){super(n,a,o);v(this,"_parent");this._parent=e}get belongEquipment(){return this._parent.belongEquipment}get belongStep(){return this._parent}get potential(){return this.itemBase.getPotential(this.type,this.belongEquipment)}get previousStepStatValue(){const e=this.belongEquipment.stat(this.itemBase,this.type,this._parent.index-1);return e?e.value:0}get potentialCost(){const e=this.previousStepStatValue;if(this._parent.type===_.Normal)return this.calcPotentialCost(this.value,e);{const n=this._parent.potentialExtraRate;let a=1;const o=this.value;let s=0,l=0;for(o<0&&(a=-1);l!==o;){let c=this.calcPotentialCost(a,e+l);s+=this._parent.realPotentialCost(c*n/100),l+=a}return s}}calcPotentialCost(e,n=0){const a=this.potential;if(e>0&&n>=0)return e*a;if(e<0&&n<=0){const s=.05+C.Character.tec/1e3,l=e*a;return Math.ceil(l*s)}return e*a}get materialPointCost(){const e=this.previousStepStatValue,n=e+this.value;return{type:this.itemBase.materialPointType,value:this.calcMaterialPointCost(e,n)}}remove(){this.index>-1&&this._parent.stats.splice(this.index,1)}get index(){return this._parent.stats.indexOf(this)}}class T{constructor(t){v(this,"category");v(this,"stats");this.category=t,this.stats=[]}static classifyStats(t){const e=[];return t.forEach(n=>{const a=n.itemBase.belongCategory,o=e.find(s=>s.category===a);if(o)o.stats.push(n);else{const s=new T(a);s.stats.push(n),e.push(s)}}),e}sortStats(t,e){if(t==="max-effect")this.stats.sort((n,a)=>{const o=-1*n.originalPotential*n.limit.min;return-1*a.originalPotential*a.limit.min-o});else if(t==="max-cost"){const{equipment:n}=e;this.stats.sort((a,o)=>{const s=a.itemBase.getPotential(a.type,n),l=o.itemBase.getPotential(o.type,n);return s===l?o.value-a.value:l-s})}else t==="negaitve--min-material-cost"&&this.stats.sort((n,a)=>{const o=n.calcMaterialPointCost(n.limit.min,0),s=a.calcMaterialPointCost(a.limit.min,0);return o-s})}originalPotentialEffectMaximumSum(t){return t=t===void 0?this.stats.length:t,-1*this.stats.slice(0,t).reduce((e,n)=>e+n.originalPotential*n.limit.min,0)}materialPointMaximumSum(t,e){return e=e===void 0?this.stats.length:e,this.stats.slice(0,e).reduce((n,a)=>n+a.calcMaterialPointCost(a.limit[t],0),0)}}class at{constructor({itemCategorys:t,equipment:e,positiveStats:n,negativeStats:a}){v(this,"itemCategorys");v(this,"equipment");v(this,"positiveStats");v(this,"negativeStats");v(this,"virtualStats");v(this,"flags");v(this,"clones");v(this,"copyFrom");this.itemCategorys=t,this.equipment=e.clone(t),this.positiveStats=n.map(o=>o.clone()),this.negativeStats=a.map(o=>o.clone()),this.virtualStats=[],this.flags={error:null,hasHandleFirstStep:!1},this.clones=[],this.copyFrom=null}get cloneId(){return this.copyFrom?this.copyFrom.cloneId+"-"+this.copyFrom.clones.indexOf(this).toString():"@"}findPositiveStat(t){return this.positiveStats.find(e=>e.equals(t))}beforeFillNegative(){if(this.equipment.stats().length===0){const t=this.clone(),e=this.handleBeforeFillNegative({positivesFilter:"positive"}),n=t.handleBeforeFillNegative({positivesFilter:"both"});return[...e,t,...n]}return this.handleBeforeFillNegative({positivesFilter:"positive"})}handleBeforeFillNegative({positivesFilter:t="positive"}={}){const e=T.classifyStats(this.positiveStats),n=T.classifyStats(this.negativeStats);e.forEach(d=>d.sortStats("max-cost",{equipment:this.equipment})),n.forEach(d=>d.sortStats("max-effect"));const a=this.equipment,o=[];n.sort((d,r)=>d.stats.length-r.stats.length);const s=e.find(d=>n.some(r=>r.category===d.category));if(t==="both"&&!s)return[];const l=t==="positive"?e.filter(d=>d.stats.length>1):e.filter(d=>d.stats.length>1||n.some(r=>r.category===d.category));if(l.length===0)return[];const c=l.length===e.length||s;if(this.refreshCategorys(e),this.refreshCategorys(n),l.sort((d,r)=>{const h=d.stats.length,p=r.stats.length;if(h===p){const m=d.stats.reduce((f,y)=>f+y.itemBase.getPotential(y.type,this.equipment),0);return r.stats.reduce((f,y)=>f+y.itemBase.getPotential(y.type,this.equipment),0)-m}return h-p}),a.steps().length===0&&c){const d=l[0],r=d.stats[0];a.appendStep().appendStat(r.itemBase,r.type,1),r.value-=1;{let m=this;const g=[];for(;;){m=m.clone();const f=m.equipment.firstStep;if(!f)break;const y=f.firstStat;if(!y)break;y.value+=1;const b=m.positiveStats.find(x=>x.equals(y));if(!b||(b.value-=1,f.remainingPotential<=0||b.value===0))break;m.flags.hasHandleFirstStep=!0,g.push(m)}g.forEach(f=>o.push(f,...f.beforeFillNegative()))}if(this.checkMakeUpPotential(),t==="both"&&d.stats.length>1){const m=this.clone(),g=B(d.stats).clone();m.virtualStats.push(g),o.push(m,...m.beforeFillNegative())}const p=l.find((m,g)=>g!==0&&m.stats.length>2&&m.stats[1].originalPotential===3);if(p){const m=this.clone(),g=this.positiveStats.map(f=>f.clone());if(p.stats.slice(0,2).forEach(f=>{a.appendStep().appendStat(f.itemBase,f.type,1),f.value-=1,this.checkMakeUpPotential()}),a.lastStep.potentialExtraRate>120){for(;a.allSteps.length!==1;)B(a.allSteps).remove();this.positiveStats=g}else o.push(m,...m.beforeFillNegative())}}let u=!1;return l.forEach(d=>{d.stats.forEach(r=>{if(!this.checkFillNegativeStats()&&!u&&(u=!0,o.push(this.clone())),a.hasStat(r)||this.virtualStats.some(m=>m.equals(r)))return;const h=a.appendStep();h.appendStat(r.itemBase,r.type,1),r.value-=1;const p=h.potentialExtraRate;if(r.originalPotential===3&&p===120&&h.remainingPotential>0){const m=this.clone();m.checkMakeUpPotential(),o.push(m,...m.beforeFillNegative());const g=a.appendStep();g.type=_.Each;const f=Math.min(r.value,r.potentialConvertThreshold-1);g.appendStat(r.itemBase,r.type,f),r.value-=f}this.checkMakeUpPotential()})}),o}clearVirtualStats(){this.virtualStats=[]}checkFillNegativeStats(){const t=this.equipment.stats(),e=t.filter(n=>this.negativeStats.some(a=>a.equals(n))).length;return t.length+this.negativeStats.length-e<7}checkMakeUpPotential(){const t=this.equipment,e=this.equipment.steps();if(e.length===0)return;const n=B(e),a=T.classifyStats(this.negativeStats);this.refreshCategorys(a);const o=()=>{const s=n.firstStat;if(!s)return;const l=this.positiveStats.find(c=>c.equals(s));l&&(l.value+=s.value),n.remove()};if(n.remainingPotential<=0){const s=(()=>{if(a.length===0)return o(),"base-potential-not-enough";const l=t.insertStepBefore(n),c=this.negativeStats.map(d=>d.clone()),u=()=>{this.negativeStats=c,l.remove()};for(;n.remainingPotential<=0;){if(a.length===0)return u(),o(),"base-potential-not-enough";const d=B(a).stats[0],r=l.stat(d.itemBase,d.type);if(r)r.value-=1;else if(!l.appendStat(d.itemBase,d.type,-1))return u(),o(),"base-potential-not-enough";d.value+=1,this.refreshCategorys(a)}return null})();s&&(this.flags.error=s)}}refreshCategorys(t){const e=[];for(t.forEach((n,a)=>{n.stats=n.stats.filter(o=>o.value!==0),n.stats.length===0&&e.push(a)});e.length!==0;)t.splice(e.pop(),1)}mostUseRemainingPotential(){return this.equipment.steps().forEach(t=>t.optimizeType(-1)),[...this.handleMostUseRemainingPotential(!0),...this.handleMostUseRemainingPotential(!1)]}handleMostUseRemainingPotential(t){const e=[],n=this.clone(),a=n.getMostUsePotentialStatlList();if(a.length>0){const o=n.equipment,s=n.positiveStats,l=n.equipment.statsMap();let c=t&&a.find(p=>{var g;const m=((g=l.get(p.stat.statId))==null?void 0:g.value)??0;return p.type==="step"&&p.stat.potential===3&&p.stat.belongStep.potentialExtraRate<=120&&m<p.stat.potentialConvertThreshold})||null,u=B(a);const d=o.steps(),r=d[0],h=()=>d.every(p=>p.remainingPotential>0);for(;a.length!==0;){const p=s.find(g=>g.equals(u.stat));if(!p){a.pop(),a.length>0&&(u=B(a));continue}for(;h()&&p.value!==0;)u.type==="step"?(u.stat.value+=1,p.value-=1):(p.value-=1,u={stat:r.appendStat(u.stat.itemBase,u.stat.type,1),type:"step",value:p.value,existedAndNoRate:u.existedAndNoRate});a.pop();const m=B(a);if(h()||(u.stat.value-=1,p.value+=1),u.type==="step"&&u.stat.value===0&&u.stat.remove(),c!==null&&u.type==="step"&&u.stat.value>1){const f=u.stat.value;let y=!1;const b=c;for(;u.stat.value!==0;){const x=o.lastStep.remainingPotential;if(x!==1&&(x-1)%3===0){const w=s.find(k=>k.equals(b.stat)),L=(x-1)/3;if(L+c.stat.value<=c.stat.potentialConvertThreshold&&L<=w.value&&L*3<b.stat.belongStep.remainingPotential){a.splice(a.indexOf(c),1),p.value+=f-u.stat.value,w.value-=L,c.stat.value+=L,y=!0;break}}u.stat.value-=1}if(!y)u.stat.value=f;else break}u=m,c===u&&(c=null)}e.push(n)}return e}checkRemainingPotentialBeforeFillNegative(){const t=this.equipment,e=t.steps(),n=e.map(s=>s.firstStat).filter(s=>s&&s.value>0).map(s=>s.potential).filter(s=>s>1);if(n.length===0)return;const a=Math.min(...n),o=t.lastStep;if(o.remainingPotential>a){const s=e.find(l=>l.firstStat.value<-1);if(s&&s!==o){const l=s.nextStep,c=s.firstStat,u=l.firstStat;if(u.value>1&&l!==o){const d=o.firstStat,r=d.value-1;c.value+=1,d.value=1;let h=0;for(;l.remainingPotential<1||o.remainingPotential<1;){if(u.value===1){u.value+=h,c.value-=1,d.value+=r;return}u.value-=1,h+=1}this.positiveStats.find(p=>p.equals(u)).value+=h,this.positiveStats.find(p=>p.equals(d)).value+=r,this.negativeStats.find(p=>p.equals(c)).value-=1}}}}checkMergeStepToFillNegative(){const t=this.equipment.lastStep;if(!t)return[];const e=[],n=t.firstStat;if(n.potential===1){const a=t.previousStep;if(a){const o=a.firstStat,s=this.findPositiveStat(o),l=this.findPositiveStat(n);if(s&&s.value>0&&l){const c=n.value-1;n.value=1,o.value+=1,l.value+=c,s.value-=1,a.remainingPotential>0&&t.remainingPotential===0&&e.push(this.clone()),n.value+=c,l.value-=c,o.value-=1,s.value+=1}}}return e}checkStepTypeEach(){const t=[],e=this.positiveStats.filter(n=>n.value!==0&&n.originalPotential===1);if(e.length!==0){const n=a=>{const o=this.clone(),s=o.equipment;e.every(c=>{if(this.equipment.stats().length===7&&!this.equipment.hasStat(c))return!0;const u=o.positiveStats.find(d=>d.equals(c));if(u.value>0){const d=s.appendStep();d.type=_.Each;const r=d.appendStat(u.itemBase,u.type,0),h=r.potentialConvertThreshold,p=s.stat(r.itemBase,r.type),m=p?p.value:0;for(;(!a||m+r.value<h)&&s.stepRemainingPotential()>0&&u.value>0;)r.value+=1,u.value-=1;s.stepRemainingPotential()<=0&&(r.value-=1,u.value+=1),r.value===0&&d.remove()}return!1})||t.push(o)};n(!0),n(!1)}return t}getMostUsePotentialStatlList(){const t=this.equipment,e=this.positiveStats,n=t.steps().map((a,o)=>{const s=a.potentialExtraRate;if(a.type!==_.Each&&(o===0&&this.flags.hasHandleFirstStep||s!==100||a.stats.length!==1))return null;const l=a.firstStat;if(l.value!==1)return null;const c=e.find(u=>u.equals(l));return!c||c.value===0?null:{type:"step",stat:l,value:l.potentialCost,existedAndNoRate:s===100}}).filter(a=>a);if(n.length===0)return[];if(this.checkFillNegativeStats()){const o=T.classifyStats(e).filter(s=>s.stats.length===1&&s.stats[0].value!==0).map(s=>s.stats[0]);o.length!==0&&(o.sort((s,l)=>{const c=s.originalPotential,u=l.originalPotential;return c===u?l.value-s.value:c-u}),o.forEach(s=>{const l=s.itemBase.getPotential(s.type,t);n.push({type:"unused",stat:s,value:l,existedAndNoRate:!1})}))}return n.sort((a,o)=>{if(a.existedAndNoRate!==o.existedAndNoRate)if(a.existedAndNoRate||o.existedAndNoRate){const s=a.existedAndNoRate?a:o,l=s.stat,c=e.find(u=>u.equals(l));if(s.value*c.value>=l.belongStep.remainingPotential)return a.existedAndNoRate?1:-1}else return a.existedAndNoRate?1:-1;return a.value-o.value})}fillNegative(){const t=this.equipment,e=t.lastStep;let n;e&&e.remainingPotential===0?(e.type=_.Normal,n=e):n=t.appendStep();const a=T.classifyStats([...this.negativeStats,...this.positiveStats]);a.sort((s,l)=>l.stats.length-s.stats.length);const o=[];a.forEach(s=>o.push(...s.stats.filter(l=>l.value<0))),o.forEach(s=>{this.equipment.stats().length===7&&!this.equipment.hasStat(s)||(n.appendStat(s.itemBase,s.type,s.value),s.value=0)})}finalFill(){const t=this.equipment.appendStep();this.positiveStats.filter(e=>e.value!==0).forEach(e=>{t.appendStat(e.itemBase,e.type,e.value),e.value=0}),this.negativeStats.filter(e=>e.value!==0).forEach(e=>{t.appendStat(e.itemBase,e.type,e.value),e.value=0})}clone(){const t=new at({itemCategorys:this.itemCategorys,equipment:this.equipment,positiveStats:this.positiveStats,negativeStats:this.negativeStats});return t.virtualStats=this.virtualStats.map(e=>e.clone()),this.clones.push(t),t.copyFrom=this,t}log(t=!1){const e=this.equipment.steps();t?e.some(n=>n.remainingPotential<1)?console.group(`[ ${this.cloneId} ]`):console.groupCollapsed(`[ ${this.cloneId} ]`):console.group(`[ ${this.cloneId} ]`),e.forEach(n=>console.log(n.toString())),console.log(" [pos] "+this.positiveStats.map(n=>n.show()).join("|")),console.log(" [neg] "+this.negativeStats.map(n=>n.show()).join("|")),console.groupEnd()}}const Ct={Enchant:{categorys:[]}};class _t{constructor(){v(this,"_positiveStats");v(this,"build");v(this,"lastResults");v(this,"config");this.build=new Lt("Potum"),this._positiveStats=[],this.lastResults=[],this.config={baseType:j.None,autoFindNegaitveStatsType:W.SuccessRate,containsNaturalMpRegenConstant:!1}}get numPositiveStats(){return this._positiveStats.length}get numNegativeStats(){return C.EquipmentItemMaximumNumber-this.numPositiveStats}get positiveStats(){return this._positiveStats}appendPositiveStat(t,e,n){const a=new $(t,e,n);return this._positiveStats.length===C.EquipmentItemMaximumNumber?null:(this._positiveStats.push(a),a)}removePositiveStat(t){const e=this.positiveStats.indexOf(t);this._positiveStats.splice(e,1)}getPositiveStat(t,e){return this._positiveStats.find(n=>n.itemBase===t&&n.type===e)}hasPositiveStat(t,e){return!!this.getPositiveStat(t,e)}calc(t,e=0){const n=t.map(r=>r.clone()),a=this._positiveStats.map(r=>r.clone());if(n.find(r=>r.value===0)||a.find(r=>r.value===0))return console.warn("[enchant-doll] 제공된 일부 스탯의 값이 0입니다."),null;if(n.length>7)return console.warn("[enchant-doll] 부정 속성은 7개를 초과할 수 없습니다."),null;const o=new at({itemCategorys:this.build.categorys,equipment:this.build.equipment,positiveStats:a,negativeStats:n});e!==0&&(o.equipment.originalPotential=e);const s=[o];s.push(...o.beforeFillNegative());let l=s.filter(r=>r.flags.error===null);const c=s.filter(r=>r.flags.error!==null),u=()=>{const r=l,h=new Map;r.forEach(p=>{const m=p.equipment,g=m.steps(),f=g.filter((x,w)=>w===g.length-1||x.stats[0].value<0).map(x=>x.stats.map(w=>w.statId+w.value).join(",")).join("->"),b=`${m.lastStep?`${m.lastStep.remainingPotential}/${m.lastStep.potentialExtraRate}`:"none"}/${g.length}::${f}`;h.has(b)||h.set(b,p)}),l=Array.from(h.values())},d=(r,h)=>{const p=Math.floor(h.equipment.realSuccessRate),m=Math.floor(r.equipment.realSuccessRate);return p===m?r.equipment.operationStepsQuantity-h.equipment.operationStepsQuantity:p-m};return l.length!==0?(l.forEach(r=>r.clearVirtualStats()),u(),l.forEach(r=>l.push(...r.mostUseRemainingPotential())),u(),l.forEach(r=>r.checkRemainingPotentialBeforeFillNegative()),l.forEach(r=>l.push(...r.checkMergeStepToFillNegative())),l.forEach(r=>r.fillNegative()),l.forEach(r=>l.push(...r.checkStepTypeEach())),l.forEach(r=>r.finalFill()),l.sort(d),this.lastResults=l.slice(0,11).map(r=>r.equipment),this.lastResults[0]):(c.forEach(r=>r.finalFill()),c.sort(d),this.lastResults=l.slice(0,11).map(r=>r.equipment),this.lastResults[0])}optimizeResults(){this.lastResults.forEach(t=>{t.checkMergeSteps(),t.steps().forEach(e=>e.optimizeType(0))})}autoFindNegaitveStats(t=[],e=0){const n=this.numNegativeStats,a=Ct.Enchant.categorys,o=this.build.equipment,s={[N.MainWeapon]:["def","mdef","dodge","natural_hp_regen",this.config.containsNaturalMpRegenConstant?"natural_mp_regen":{baseId:"natural_mp_regen",types:[S.Multiplier]}],[N.BodyArmor]:["accuracy"]}[o.fieldType]||[];if(o.fieldType===N.BodyArmor)switch(this.config.baseType){case j.Physical:s.unshift("matk","magic_pierce");break;case j.Magic:s.unshift("atk","physical_pierce");break;case j.None:s.unshift("atk","matk","physical_pierce","magic_pierce")}const l=[],c=[S.Constant,S.Multiplier];a.forEach(h=>{h.items.forEach(p=>{const m=s.find(g=>typeof g=="object"?g.baseId===p.statBase.baseId:g===p.statBase.baseId);m&&(typeof m=="object"?m.types:c).forEach(f=>{if(f===S.Multiplier&&!p.statBase.hasMultiplier||this.hasPositiveStat(p,f))return;const y=new $(p,f,p.getLimit(f).min);l.push(y)})})});const u=T.classifyStats(l);u.forEach(h=>{this.config.autoFindNegaitveStatsType===W.SuccessRate?(h.sortStats("negaitve--min-material-cost"),h.sortStats("max-effect")):h.sortStats("negaitve--min-material-cost")});const d=u.map(h=>h.stats).flat();t=t.filter(h=>!d.find(p=>p.equals(h)));const r=Math.min(Math.max(this.numNegativeStats-t.length,d.length),this.numNegativeStats);if(d.length>=r){t=t.slice(0,this.numNegativeStats-r);const h=this.getNegativeStatsList(d,r),p=y=>{const b=T.classifyStats(y).sort((k,O)=>O.stats.length-k.stats.length);b.forEach(k=>k.sortStats("max-effect"));const x=b.map(k=>k.originalPotentialEffectMaximumSum()).reduce((k,O)=>k+O,0),w=b.map(k=>k.materialPointMaximumSum("min")).reduce((k,O)=>k+O,0);return{categorysId:b.map(k=>k.stats.length).join("|"),potentialEffect:x,materialPoint:w}},m=new Map;return h.forEach(y=>{const{categorysId:b,potentialEffect:x,materialPoint:w}=p(y);if(m.has(b)){const L=m.get(b);if(L.potentialEffect===x&&L.materialPoint<=w||L.potentialEffect>x)return}m.set(b,{potentialEffect:x,materialPoint:w,stats:y})}),Array.from(m,y=>y[1].stats).map(y=>{const b=[...y,...t],x=this.calc(b,e);return x?{realSuccessRate:x.realSuccessRate,stats:b,equipment:x}:null}).filter(y=>y!==null).sort((y,b)=>b.realSuccessRate-y.realSuccessRate)[0]}return{realSuccessRate:0,equipment:null,stats:this.parseNegativeCategorys(u,n)}}parseNegativeCategorys(t,e){const n=e,a=(c,u)=>c.originalPotentialEffectMaximumSum(u),o=(c,u)=>c.materialPointMaximumSum("min",u),s=(c,u)=>this.config.autoFindNegaitveStatsType===W.SuccessRate?a(c,u):o(c,u);t.sort((c,u)=>{for(let d=1;d<=n;++d){if(d>=c.stats.length&&d>=u.stats.length)return 0;const r=s(c,d),h=s(u,d);if(r>h)return-1;if(r<h)return 1}return 0});const l=[];return t.find(c=>c.stats.find(u=>(l.push(u.clone()),l.length===n))),l}getNegativeStatsList(t,e){const n=[],a=s=>{const l=[];for(let c=0;c<s.length-1;++c)for(let u=0;u<t.length;++u){const d=s[c];if(B(d)<u){const r=d.slice();r.push(u),l.push(r)}}return l};let o=Array(t.length).fill([]).map((s,l)=>[l]);for(;o.length!==0&&o[0].length!==t.length;)if(o=a(o),o[0].length===e){n.push(...o);break}return n.map(s=>s.map(l=>t[l]))}}const F=new A("Basic Stats"),U=new A("Attack"),it=new A("Critical"),st=new A("Defense"),ot=new A("HP / MP"),lt=new A("Speed / Dodge"),M=new A("Elements & DTE"),V={};function E(i,t,e,n,a,o,s=0){const l=i.appendItem({baseId:t,potential:[n??0,a??0],limit:[[null,null],[o,-1*o]],extraLimit:[[null,null],[null,null]],unitValue:[[1,1],[1,1]],materialPointType:s,materialPointValue:[null,null],potentialConvertThreshold:[null,null]});return l.statBase.name=e,l.statBase.hasMultiplier=a!==null&&a!==0,V[t]=l,l}E(F,"str","STR",5,10,50,1);E(F,"dex","DEX",5,10,50,1);E(F,"int","INT",5,10,50,1);E(F,"vit","VIT",5,10,50,1);E(F,"agi","AGI",5,10,50,1);E(U,"atk","ATK",3,10,50,2);E(U,"matk","MATK",3,10,50,5);E(U,"ppierce","물리관통",null,20,20,2);E(U,"mpierce","마법관통",null,20,20,5);E(it,"cdmg","크리티컬 데미지",3,10,50,5);E(it,"crit","크리티컬률",1,1,50,5);E(st,"def","DEF",3,10,50,0);E(st,"mdef","MDEF",3,10,50,0);E(ot,"hp_regen","HP자연회복",10,20,50,4);E(ot,"mp_regen","MP자연회복",20,40,20,5);E(lt,"dodge","회피",3,10,50,0);E(lt,"acc","명중",10,20,50,0);E(M,"ele_fire","Element: 불",100,null,1,5);E(M,"ele_water","Element: 물",100,null,1,5);E(M,"ele_wind","Element: 바람",100,null,1,5);E(M,"ele_earth","Element: 땅",100,null,1,5);E(M,"ele_light","Element: 빛",100,null,1,5);E(M,"ele_dark","Element: 어둠",100,null,1,5);E(M,"dte_fire","불속성 데미지 ",null,5,20,5);E(M,"dte_water"," 물속성 데미지 ",null,5,20,5);E(M,"dte_wind"," 바람속성 데미지 ",null,5,20,5);E(M,"dte_earth"," 땅속성 데미지 ",null,5,20,5);E(M,"dte_light"," 빛속성 데미지 ",null,5,20,5);E(M,"dte_dark"," 어둠속성 데미지 ",null,5,20,5);et.Enchant.categorys.push(F,U,it,st,ot,lt,M);const q=document.querySelector("#app");function I(){var i,t,e,n,a,o,s;q.innerHTML=`
    <div class="home-container">
      <h1 class="home-title">🌸 토람 리모컨</h1>
      
      <div class="menu-grid">
        <!-- 기존 메뉴 -->
        <div class="menu-card" id="go-enchant">
          <div class="menu-icon">⚔️</div>
          <div class="menu-text">옵션 부여 시뮬레이션<br> (조정중)</div>
        </div>
        
        <div class="menu-card" id="go-crysta">
          <div class="menu-icon">💎</div>
          <div class="menu-text">크리스타 검색</div>
        </div>
        
        <div class="menu-card" id="go-skill">
          <div class="menu-icon">📖</div>
          <div class="menu-text">스킬 정보</div>
        </div>

        <!-- 신규 메뉴 4종 -->
        <div class="menu-card" id="go-ability">
          <div class="menu-icon">🔮</div>
          <div class="menu-text">장비 어빌리티</div>
        </div>

        <div class="menu-card" id="go-registlet">
          <div class="menu-icon">💍</div>
          <div class="menu-text">레지스트릿</div>
        </div>

        <div class="menu-card" id="go-cooking">
          <div class="menu-icon">🍳</div>
          <div class="menu-text">요리 주소</div>
        </div>

        <div class="menu-card" id="go-equipment">
          <div class="menu-icon">🛡️</div>
          <div class="menu-text">장비 검색</div>
        </div>
      </div>
    </div>
  `,(i=document.getElementById("go-enchant"))==null||i.addEventListener("click",At),(t=document.getElementById("go-crysta"))==null||t.addEventListener("click",Tt),(e=document.getElementById("go-skill"))==null||e.addEventListener("click",qt),(n=document.getElementById("go-ability"))==null||n.addEventListener("click",jt),(a=document.getElementById("go-registlet"))==null||a.addEventListener("click",Gt),(o=document.getElementById("go-cooking"))==null||o.addEventListener("click",Qt),(s=document.getElementById("go-equipment"))==null||s.addEventListener("click",Xt)}function Tt(){var t,e;q.innerHTML=`
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">💎 크리스타 검색기</h2>
    </div>

    <div class="search-container">
      <!-- 검색어 입력 -->
      <input type="text" id="nameInput" class="search-input" placeholder="크리스타 이름을 입력하세요 (실시간 검색)">

      <!-- 카테고리 필터 -->
      <div class="checkbox-group" id="category-filters">
        <input type="checkbox" id="normal" value="normal" checked> <label for="normal">노말</label>
        <input type="checkbox" id="weapon" value="weapon" checked> <label for="weapon">무기</label>
        <input type="checkbox" id="armor" value="armor" checked> <label for="armor">갑옷</label>
        <input type="checkbox" id="hat" value="hat" checked> <label for="hat">모자</label>
        <input type="checkbox" id="ring" value="ring" checked> <label for="ring">반지</label>
        
        <input type="checkbox" id="enhanced_normal" value="enhanced_normal"> <label for="enhanced_normal">노말(강화)</label>
        <input type="checkbox" id="enhanced_weapon" value="enhanced_weapon"> <label for="enhanced_weapon">무기(강화)</label>
        <input type="checkbox" id="enhanced_armor" value="enhanced_armor"> <label for="enhanced_armor">갑옷(강화)</label>
        <input type="checkbox" id="enhanced_hat" value="enhanced_hat"> <label for="enhanced_hat">모자(강화)</label>
        <input type="checkbox" id="enhanced_ring" value="enhanced_ring"> <label for="enhanced_ring">반지(강화)</label>
      </div>

      <!-- 옵션 필터 -->
      <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; justify-content:center; width:100%;">
        <select id="optionType" style="padding:8px; border-radius:5px; background:var(--input-bg); color:white; border:1px solid var(--border-color);">
          <option value="none">옵션 선택 (전체)</option>
          <option value="STR%">STR %</option> <option value="STR">STR (고정)</option>
          <option value="DEX%">DEX %</option> <option value="DEX">DEX (고정)</option>
          <option value="INT%">INT %</option> <option value="INT">INT (고정)</option>
          <option value="AGI%">AGI %</option> <option value="AGI">AGI (고정)</option>
          <option value="VIT%">VIT %</option> <option value="VIT">VIT (고정)</option>
          <option value="ATK%">ATK %</option> <option value="ATK">ATK (고정)</option>
          <option value="MATK%">MATK %</option> <option value="MATK">MATK (고정)</option>
          <option value="크리티컬률%">크리티컬률 %</option> <option value="크리티컬률">크리티컬률 (고정)</option>
          <option value="크리티컬데미지%">크리티컬데미지 %</option> <option value="크리티컬데미지">크리티컬데미지 (고정)</option>
          <option value="최대HP%">최대HP %</option> <option value="최대HP">최대HP (고정)</option>
          <option value="최대MP%">최대MP %</option> <option value="최대MP">최대MP (고정)</option>
          <option value="공격속도%">공격속도 %</option> <option value="공격속도">공격속도 (고정)</option>
          <option value="시전속도%">시전속도 %</option> <option value="시전속도">시전속도 (고정)</option>
          <option value="안정률%">안정률 %</option>
          <option value="명중%">명중 %</option> <option value="명중">명중 (고정)</option>
          <option value="회피%">회피 %</option> <option value="회피">회피 (고정)</option>
          <option value="물리내성%">물리내성 %</option>
          <option value="마법내성%">마법내성 %</option>
          <option value="근거리위력%">근거리위력 %</option>
          <option value="원거리위력%">원거리위력 %</option>
          <option value="발도공격%">발도공격 %</option>
          <option value="어그로%">어그로 %</option>
        </select>

        <select id="symbol" style="padding:8px; border-radius:5px; background:var(--input-bg); color:white; border:1px solid var(--border-color);">
          <option value="=">같음 (=)</option>
          <option value=">">큼 (>)</option>
          <option value="<">작음 (<)</option>
          <option value=">=">크거나 같음 (>=)</option>
          <option value="<=">작거나 같음 (<=)</option>
        </select>

        <input type="number" id="valueInput" placeholder="수치 입력" style="width:80px; padding:8px;">
      </div>
    </div>

    <div style="text-align:center; margin-bottom:20px;">
      <button id="randomButton" class="secondary">🎲 랜덤 크리스타 뽑기</button>
    </div>

    <!-- 결과 리스트 -->
    <div id="searchResults">
      <div style="text-align:center; padding:20px; color:#888;">검색 조건을 입력하거나 카테고리를 선택하세요.</div>
    </div>
  `,(t=document.getElementById("back-home"))==null||t.addEventListener("click",I),["nameInput","optionType","symbol","valueInput"].forEach(n=>{var a,o;(a=document.getElementById(n))==null||a.addEventListener("input",K),(o=document.getElementById(n))==null||o.addEventListener("change",K)}),document.querySelectorAll("#category-filters input").forEach(n=>{n.addEventListener("change",K)}),(e=document.getElementById("randomButton"))==null||e.addEventListener("click",It),K()}const ft={normal:"CrystaImg/normal.png",enhanced_normal:"CrystaImg/enhanced_normal.png",weapon:"CrystaImg/weapon.png",enhanced_weapon:"CrystaImg/enhanced_weapon.png",armor:"CrystaImg/armor.png",enhanced_armor:"CrystaImg/enhanced_armor.png",hat:"CrystaImg/hat.png",enhanced_hat:"CrystaImg/enhanced_hat.png",ring:"CrystaImg/ring.png",enhanced_ring:"CrystaImg/enhanced_ring.png"};let R={};async function K(){const i=document.getElementById("nameInput").value.toLowerCase(),t=document.getElementById("optionType").value,e=document.getElementById("symbol").value,n=document.getElementById("valueInput").value,a=parseFloat(n),s=Array.from(document.querySelectorAll("#category-filters input:checked")).map(c=>c.value);if(s.length===0){document.getElementById("searchResults").innerHTML='<div style="text-align:center; padding:20px;">카테고리를 하나 이상 선택해주세요.</div>';return}const l=document.getElementById("searchResults");l.innerHTML='<div style="text-align:center; padding:20px;">검색 중...</div>';try{const d=(await Promise.all(s.map(async r=>{if(!R[r])try{const h=await fetch(`CrystaData/${r}.json`);if(!h.ok)throw new Error("File not found");R[r]=await h.json()}catch{console.warn(`Failed to load ${r}.json`),R[r]=[]}return R[r].map(h=>({...h,_category:r}))}))).flat().filter(r=>!(i&&!r.name.toLowerCase().includes(i)||t!=="none"&&(!r.option.includes(t.replace("%",""))||!r.option.split(/\n|&|,/).some(m=>{if(!m.includes(t.replace("%","")))return!1;const g=m.includes("%"),f=t.includes("%");if(g!==f)return!1;if(!isNaN(a)){const y=m.match(/-?\d+(\.\d+)?/);if(!y)return!1;const b=parseFloat(y[0]);if(e==="=")return b===a;if(e===">")return b>a;if(e==="<")return b<a;if(e===">=")return b>=a;if(e==="<=")return b<=a}return!0}))));yt(d)}catch(c){console.error(c),l.innerHTML='<div style="text-align:center; color:red;">데이터 로딩 오류 발생</div>'}}function yt(i){const t=document.getElementById("searchResults");if(i.length===0){t.innerHTML='<div style="text-align:center; padding:20px;">검색 결과가 없습니다.</div>';return}t.innerHTML=i.map(e=>{const n=ft[e._category]||"CrystaImg/normal.png",a=e.option.replace(/&/g,"<br>");return`
      <div class="crysta-item">
        <img src="${n}" alt="icon" onerror="this.src='CrystaImg/normal.png'">
        <h3>${e.name}</h3>
        <p style="margin-top:5px; font-size:0.9em; color:var(--text-main); font-weight:500;">${a}</p>

        ${e.enhance?`<p style="margin-top:5px; font-size:0.8em; color:var(--accent-light);">[강화 전: ${e.enhance}]</p>`:""}
      </div>
    `}).join("")}async function It(){const i=Object.keys(ft),t=i[Math.floor(Math.random()*i.length)];if(!R[t])try{const a=await fetch(`CrystaData/${t}.json`);R[t]=await a.json()}catch{alert("데이터 로딩 실패");return}const e=R[t];if(e.length===0){alert("해당 카테고리에 데이터가 없습니다.");return}const n=e[Math.floor(Math.random()*e.length)];yt([{...n,_category:t}])}const bt={주무기:{블레이드:"skills_blade",슛:"skills_shot",매직:"skills_magic",마샬:"skills_martial",듀얼소드:"skills_dual_sword",할버드:"skills_halberd",모노노후:"skills_mononofu",크러셔:"skills_crusher",스프라이트:"skills_sprite"},"보조/생존":{배틀:"skills_battle",서포트:"skills_support",서바이벌:"skills_survival"},"강화/직업":{대거:"skills_dagger",쉴드:"skills_shield",나이트:"skills_knight",헌터:"skills_hunter",프리스트:"skills_priest",어쌔신:"skills_assassin",위저드:"skills_wizard",가드:"skills_guard"},"특수/책":{닌자:"skills_ninja",인술:"skills_ninjutsu",민스트럴:"skills_minstrel",댄서:"skills_dancer",다크파워:"skills_darkpower",매직블레이드:"skills_magicblade",베어핸드:"skills_barehand",파르티잔:"skills_partisan"},생활:{스미스:"skills_smith",연금술:"skills_alchemy",테이머:"skills_tamer",펫:"skills_pet"}},Bt={주무기:"Main","보조/생존":"Assist","강화/직업":"Enforce","특수/책":"Book",생활:"Life"};function qt(){var i;q.innerHTML=`
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">📖 스킬정보</h2>
    </div>

    <div class="container">
      <!-- 대분류 탭 -->
      <div class="skill-tabs" id="main-category-tabs">
        <button class="skill-tab-btn active" data-cat="주무기">주무기</button>
        <button class="skill-tab-btn" data-cat="보조/생존">보조/생존</button>
        <button class="skill-tab-btn" data-cat="강화/직업">강화/직업</button>
        <button class="skill-tab-btn" data-cat="특수/책">특수/책</button>
        <button class="skill-tab-btn" data-cat="생활">생활</button>
      </div>

      <!-- 소분류 탭 -->
      <div class="skill-tabs" id="sub-category-tabs" style="background:transparent; padding-top:0;"></div>

      <!-- 스킬 트리 영역 -->
      <div class="skill-tree-wrapper">
        <div id="skill-grid" class="skill-columns-container">
          <div style="grid-column:1/-1; text-align:center; padding:50px; color:#888;">
            카테고리를 선택하세요.
          </div>
        </div>

        <!-- 하단 고정 상세 정보 -->
        <div id="skill-detail-view">
          <div style="text-align:center; color:#888;">스킬을 클릭하면 상세 정보가 여기에 표시됩니다.</div>
        </div>
      </div>
    </div>
  `,(i=document.getElementById("back-home"))==null||i.addEventListener("click",I),Rt()}function Rt(){const i=document.querySelectorAll("#main-category-tabs .skill-tab-btn");i.forEach(t=>{t.addEventListener("click",e=>{i.forEach(a=>a.classList.remove("active")),e.target.classList.add("active");const n=e.target.dataset.cat;ut(n)})}),ut("주무기")}function ut(i){const t=document.getElementById("sub-category-tabs");t.innerHTML="";const e=Object.keys(bt[i]);e.forEach((n,a)=>{const o=document.createElement("button");o.className=`skill-tab-btn ${a===0?"active":""}`,o.innerText=n,o.onclick=()=>{document.querySelectorAll("#sub-category-tabs .skill-tab-btn").forEach(s=>s.classList.remove("active")),o.classList.add("active"),dt(i,n)},t.appendChild(o)}),e.length>0&&dt(i,e[0])}async function dt(i,t){const e=document.getElementById("skill-grid");e.innerHTML='<div style="grid-column:1/-1; text-align:center; padding:20px;">데이터 로딩 중...</div>',document.getElementById("skill-detail-view").classList.remove("active");const n=bt[i][t],a=Bt[i],o=`SkillData/${a}/${n}.js`;try{const s=await fetch(o);if(!s.ok)throw new Error("File not found");const l=await s.text();let c=l.substring(l.indexOf("["),l.lastIndexOf("]")+1);const u=new Function(`return ${c}`)();Nt(u,a,n)}catch(s){console.error(s),e.innerHTML=`<div style="grid-column:1/-1; text-align:center; color:red;">데이터 로딩 실패<br>(${o})</div>`}}function Nt(i,t,e){const n=document.getElementById("skill-grid");n.innerHTML="";const a=[[],[],[],[],[],[]];i.forEach(s=>{const l=s.tier||1;l>=1&&l<=5&&a[l].push(s)});const o=e.replace("skills_","");for(let s=1;s<=5;s++){const l=document.createElement("div");if(l.className="skill-tier-column",l.innerHTML=`<div class="tier-label">Tier ${s}</div>`,a[s].length>0)a[s].forEach(c=>{const u=document.createElement("div");u.className="skill-card";const d=(c.id||c.name).replace(/\s+/g,"_"),r=`SkillImg/${t}/${o}/${d}.png`,h="https://toram-id.info/img/skill/unknown.png";u.innerHTML=`
          <img src="${r}" onerror="this.onerror=null; this.src='${h}';" alt="${c.name}">
          <div class="skill-name">${c.name}</div>
        `,u.onclick=()=>{document.querySelectorAll(".skill-card").forEach(p=>p.classList.remove("selected")),u.classList.add("selected"),$t(c,r,h)},l.appendChild(u)});else{const c=document.createElement("div");c.style.height="50px",c.style.border="1px dashed rgba(255,255,255,0.1)",c.style.borderRadius="6px",l.appendChild(c)}n.appendChild(l)}}function $t(i,t,e){const n=document.getElementById("skill-detail-view");n.classList.add("active");const a=i.description?i.description.replace(/\n/g,"<br>"):"설명 없음";let o="";i.mp_cost&&(o+=`<span class="meta-tag" style="color:#4a90e2">MP ${i.mp_cost}</span>`),i.type&&(o+=`<span class="meta-tag">${i.type}</span>`),i.element&&(o+=`<span class="meta-tag" style="color:#e24a4a">${i.element}</span>`),i.weapon&&(o+=`<span class="meta-tag">${Array.isArray(i.weapon)?i.weapon.join(", "):i.weapon}</span>`),n.innerHTML=`
    <div class="detail-header">
      <img src="${t}" onerror="this.onerror=null; this.src='${e}';" class="detail-icon">
      <div>
        <div class="detail-title">${i.name}</div>
        <div class="detail-meta">${o}</div>
      </div>
    </div>
    <div class="detail-desc">${a}</div>
  `}I();function At(){var i;q.innerHTML=`
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">⚔️ 옵션부여 시뮬</h2>
    </div>

    <div>
      <div class="section">
        <h2>1. 초기설정</h2>
        <div style="margin-bottom: 15px;">
          <label><input type="radio" name="eqType" value="weapon" checked> 무기</label>
          <label><input type="radio" name="eqType" value="armor"> 방어구</label>
          <span style="margin:0 10px; color:#555">|</span>
          잠재력: <input type="number" id="base-pot" value="81">
        </div>
        <div style="display:flex; gap:15px; align-items:center;">
          <label> 캐릭터 Lv: <input type="number" id="char-lv" value="290"></label>
          <label> 스미스 Lv: <input type="number" id="smith-lv" value="290"></label>
        </div>
      </div>

      <div class="section">
        <h2>2. ➕ 옵션 (Positive)</h2>
        <div id="target-list"></div>
        <div style="text-align:center; margin-top:15px;">
          <button id="btn-add-pos">➕ 옵션 추가</button>
        </div>
      </div>

      <div class="section">
        <h2>3. -옵션 (Penalty)</h2>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <label style="cursor:pointer;">
            <input type="checkbox" id="chk-auto-neg" checked> 
            자동- 옵션 버튼 (고장났습니다.)
          </label>
          <button id="btn-add-neg" class="secondary" style="display:none;">➖ 옵션 추가</button>
        </div>
        <div id="negative-list"></div>
        <p id="auto-desc" style="font-size:0.9em; color:var(--text-dim)">
          * Automatically selects optimized penalties (DEF%, MDEF%, Dodge, etc.)
        </p>
      </div>

      <div style="text-align:center; margin:30px;">
        <button id="run-btn" style="font-size:1.2em; padding:12px 40px; box-shadow: 0 0 15px var(--accent-pink);">🚀 실행</button>
      </div>

      <div id="result-area" class="section" style="display:none;">
        <h2> 결과</h2>
        <div id="result-summary" style="font-size:1.1em; margin-bottom:15px; padding:10px; background:rgba(0,0,0,0.3); border-radius:5px;"></div>
        <h3 style="margin-top:20px; border-bottom:1px solid #444; padding-bottom:5px;">🛠️ 레시피</h3>
        <div id="material-output" style="display:grid; grid-template-columns: repeat(6, 1fr); gap:5px; margin-bottom:20px; text-align:center;"></div>
        <h3>👣 스텝</h3>
        <div id="steps-output"></div>
      </div>
    </div>

    <!-- 모달 팝업 -->
    <div id="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:1000; justify-content:center; align-items:center;">
      <div style="background:var(--card-bg); width:500px; max-height:80vh; border:1px solid var(--accent-pink); border-radius:10px; padding:20px; display:flex; flex-direction:column;">
        <h3 id="modal-title" style="margin-top:0; color:var(--accent-light)">Select Stat</h3>
        <div id="modal-content" style="overflow-y:auto; flex:1; padding-right:5px;"></div>
        <div style="text-align:right; margin-top:15px;">
          <button class="secondary" id="btn-close-modal">Close</button>
        </div>
      </div>
    </div>
  `,(i=document.getElementById("back-home"))==null||i.addEventListener("click",I),Ht()}const P={positives:[],negatives:[],modalMode:"positive"};function Ht(){var i,t,e,n,a;P.positives.length===0&&P.positives.push({item:V.cdmg,type:S.Constant,value:10},{item:V.cdmg,type:S.Multiplier,value:10},{item:V.crit,type:S.Constant,value:25},{item:V.crit,type:S.Multiplier,value:25}),Q(),(i=document.getElementById("btn-add-pos"))==null||i.addEventListener("click",()=>ht("positive")),(t=document.getElementById("btn-add-neg"))==null||t.addEventListener("click",()=>ht("negative")),(e=document.getElementById("btn-close-modal"))==null||e.addEventListener("click",()=>document.getElementById("modal-overlay").style.display="none"),(n=document.getElementById("chk-auto-neg"))==null||n.addEventListener("change",o=>{const s=o.target.checked;document.getElementById("btn-add-neg").style.display=s?"none":"inline-block",document.getElementById("auto-desc").style.display=s?"block":"none",Q()}),(a=document.getElementById("run-btn"))==null||a.addEventListener("click",Ot)}function Q(){var n;const i=document.getElementById("target-list"),t=document.getElementById("negative-list");if(!i||!t)return;i.innerHTML="",P.positives.forEach((a,o)=>i.appendChild(pt(a,o,"positive"))),t.innerHTML="",((n=document.getElementById("chk-auto-neg"))==null?void 0:n.checked)?t.innerHTML='<div style="color:#666; text-align:center;">Auto-selecting penalties...</div>':(P.negatives.length===0&&(t.innerHTML='<div style="color:#666; text-align:center; padding:10px;">No penalties selected.</div>'),P.negatives.forEach((a,o)=>t.appendChild(pt(a,o,"negative"))))}function pt(i,t,e){const n=document.createElement("div");n.className="stat-row",e==="negative"&&(n.style.borderLeftColor="#ffaa00");const a=i.type===S.Multiplier,o=i.item.statBase.name+(a?" %":"");return n.innerHTML=`
    <span style="font-weight:bold;">${o}</span>
    <div>
      <button class="secondary" data-action="dec">-</button>
      <input type="number" value="${i.value}" readonly style="width:50px;">
      <button class="secondary" data-action="inc">+</button>
      <button class="remove" data-action="del">×</button>
    </div>
  `,n.querySelectorAll("button").forEach(s=>{s.addEventListener("click",l=>{const c=l.target.dataset.action,u=e==="positive"?P.positives:P.negatives;c==="inc"&&u[t].value++,c==="dec"&&u[t].value--,c==="del"&&u.splice(t,1),Q()})}),n}function ht(i){P.modalMode=i;const t=document.getElementById("modal-overlay"),e=document.getElementById("modal-content");document.getElementById("modal-title").innerText=i==="positive"?"Select Target":"Select Penalty",t.style.display="flex",e.innerHTML="",et.Enchant.categorys.forEach(n=>{const a=document.createElement("div");a.innerText=n.title,a.style.fontWeight="bold",a.style.marginTop="10px",a.style.borderBottom="1px dashed #555",e.appendChild(a);const o=document.createElement("div");o.style.display="grid",o.style.gridTemplateColumns="1fr 1fr",o.style.gap="5px",n.items.forEach(s=>{const l=s.potential;l[S.Constant]!==0&&mt(o,s,S.Constant),l[S.Multiplier]!==0&&mt(o,s,S.Multiplier)}),e.appendChild(o)})}function mt(i,t,e){const n=document.createElement("button");n.style.textAlign="left",n.style.background="rgba(255,255,255,0.05)";const a=e===S.Multiplier;n.innerText=t.statBase.name+(a?" %":""),n.onclick=()=>{Ft(t,e),document.getElementById("modal-overlay").style.display="none"},i.appendChild(n)}function Ft(i,t){const e=t===S.Multiplier;P.modalMode==="positive"?P.positives.push({item:i,type:t,value:e?10:20}):P.negatives.push({item:i,type:t,value:-10}),Q()}function Ot(){try{const i=Number(document.getElementById("base-pot").value),t=Number(document.getElementById("char-lv").value),e=Number(document.getElementById("smith-lv").value),n=document.getElementById("chk-auto-neg").checked;H.characterLevel=t,H.smithLevel=e;const a=new _t;a.build.equipment.originalPotential=i,P.positives.forEach(s=>a.appendPositiveStat(s.item,s.type,s.value));let o;if(n)o=a.autoFindNegaitveStats([],i);else{const s=P.negatives.map(l=>new $(l.item,l.type,l.value));o={equipment:a.calc(s,i)}}Dt(o)}catch(i){alert("Error: "+i)}}function Dt(i){var d;const t=document.getElementById("result-area"),e=document.getElementById("result-summary"),n=document.getElementById("steps-output"),a=document.getElementById("material-output");if(t.style.display="block",n.innerHTML="",a.innerHTML="",!i||!i.equipment){e.innerHTML='<span style="color:#ff4444; font-weight:bold;">Calculation Failed!</span>';return}const o=i.equipment,s=Math.floor(o.realSuccessRate),l=s>95?"#00ff9d":s>0?"#ffff00":"#ff4444";e.innerHTML=`잠재 성공률: <strong style="color:${l}">${s}%</strong> (소모 잠재: ${((d=o.lastStep)==null?void 0:d.remainingPotential)??0})`;const c=o.allMaterialPointCost,u=["금속","짐승","목재","천","약품","마나"];c.forEach((r,h)=>{const p=document.createElement("div");p.style.background="rgba(255,255,255,0.05)",p.style.padding="5px",p.style.borderRadius="4px",p.innerHTML=`<div style="font-size:0.8em; color:#aaa;">${u[h]}</div><div style="font-weight:bold; color:var(--accent-light);">${r}</div>`,a.appendChild(p)}),o.allSteps.length===0&&(n.innerHTML="<div style='padding:10px; color:#aaa'>No steps.</div>"),o.allSteps.forEach((r,h)=>{const p=r.stats.map(g=>{const f=g.value>0?`+${g.value}`:g.value,y=g.value<0,b=g.itemBase.statBase.name,x=g.type===S.Multiplier;return`<span class="badge ${y?"neg":""}">${b}${x?"%":""} ${f}</span>`}).join(" "),m=document.createElement("div");m.className="step-item",m.innerHTML=`
      <div style="margin-bottom:5px;">
        <strong>순서 ${h+1}</strong> <span style="font-size:0.8em; color:#888;">(${r.type===1?"Each":"Normal"}) Cost: ${r.potentialCost} | Pot: ${r.remainingPotential}</span>
      </div>
      <div>${p}</div>
    `,n.appendChild(m)})}let Y=[],Z={};function jt(){var t,e;q.innerHTML=`
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">🔮 장비 어빌리티 검색</h2>
    </div>

    <div class="section">
      <!-- 1. 티어 정보 (범례) -->
      <h4 style="margin-bottom:10px;">📋 티어(Tier) 정보</h4>
      <div class="trait-legend" id="trait-legend-container">
        <span style="color:#888;">데이터 로딩 중...</span>
      </div>

      <!-- 2. 카테고리 선택 -->
      <div class="trait-tabs">
        <button class="trait-tab-btn active" data-cat="all">ALL</button>
        <button class="trait-tab-btn" data-cat="basic">기본 스탯</button>
        <button class="trait-tab-btn" data-cat="combat">전투/HP/MP</button>
        <button class="trait-tab-btn" data-cat="special">특수</button>
      </div>

      <!-- 3. 검색창 -->
      <div class="search-container" style="background:transparent; border:none; box-shadow:none; padding:0; margin-bottom:20px;">
        <input type="text" id="trait-search" class="search-input" placeholder="이름, 설명, 공식으로 검색..." style="width:100%; max-width:100%;">
      </div>

      <!-- 4. 결과 리스트 -->
      <div id="trait-results">
        <div style="grid-column:1/-1; text-align:center; padding:30px; color:#888;">
          데이터를 불러오는 중입니다...
        </div>
      </div>
    </div>
  `,(t=document.getElementById("back-home"))==null||t.addEventListener("click",I);const i=document.querySelectorAll(".trait-tab-btn");i.forEach(n=>{n.addEventListener("click",a=>{i.forEach(o=>o.classList.remove("active")),a.target.classList.add("active"),X()})}),(e=document.getElementById("trait-search"))==null||e.addEventListener("input",X),Vt()}async function Vt(){const i=document.getElementById("trait-results"),t=document.getElementById("trait-legend-container");if(Y.length>0){vt(t),X();return}try{const e=await fetch("traitDB/traitDB.js");if(!e.ok)throw new Error("Trait DB File not found");const n=await e.text(),a=n.substring(n.indexOf("{")),o=new Function(`return ${a}`)();if(o&&Array.isArray(o.items))Y=o.items.map((s,l)=>{let c="special";return l<5?c="basic":l<20&&(c="combat"),{...s,category:c}}),Z=o.meta_info||{},vt(t),X();else throw new Error("Invalid Data")}catch(e){console.error(e),i&&(i.innerHTML=`<div style="grid-column:1/-1; text-align:center; color:#ff4444;">데이터 로딩 실패 (${e})</div>`)}}function vt(i){if(!i||!Z.circles)return;const t=Z.circles,e=Object.entries(t).map(([n,a])=>`<div class="legend-item">
            <span style="font-size:1.4em; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));">${n}</span>
            <span>${a}</span>
        </div>`).join("");i.innerHTML=e}function X(){const i=document.getElementById("trait-results");if(!i)return;const t=document.querySelector(".trait-tab-btn.active"),e=t?t.dataset.cat:"all",a=document.getElementById("trait-search").value.trim().toLowerCase(),o=Y.filter(s=>e!=="all"&&s.category!==e?!1:a?s.name.toLowerCase().includes(a)||s.name_en.toLowerCase().includes(a)||s.description.toLowerCase().includes(a)||s.formula&&s.formula.toLowerCase().includes(a):!0);if(o.length===0){i.innerHTML='<div style="grid-column:1/-1; text-align:center; padding:40px; color:#888;">검색 결과가 없습니다.</div>';return}i.innerHTML=o.map(s=>`
      <div class="trait-card">
        <!-- 1. 헤더 (카테고리 텍스트 + 이름) -->
        <div class="trait-header">
            <span class="trait-cat-text" style="color:${zt(s.category)}">
                [${Ut(s.category)}]
            </span>
            <div style="flex:1;">
                <span class="trait-name">${s.name}</span>
                <span class="trait-en">(${s.name_en})</span>
            </div>
        </div>
        
        <!-- 2. 설명 박스 (요청하신 부분) -->
        <div class="trait-desc">${s.description}</div>
        
        <!-- 3. 하단 정보 박스 (공식, 티어 수치) -->
        ${s.formula||s.tier_value?`
          <div class="trait-footer-box">
            ${s.formula?`<div class="trait-formula">📐 공식: ${s.formula}</div>`:""}
            ${s.tier_value?`<div class="trait-tier-val">📊 수치: ${s.tier_value}</div>`:""}
          </div>
        `:""}
      </div>
    `).join("")}function zt(i){return i==="basic"?"#8D6E63":i==="combat"?"#E57373":"#9575CD"}function Ut(i){return i==="basic"?"기본":i==="combat"?"전투":"특수"}const Kt=["패시브","블레이드 스킬","슛 스킬","매직 스킬","마샬 스킬","무사 스킬","할버드 스킬","듀얼소드 스킬","크러셔 스킬","매직 디바이스 스킬","민스트럴 스킬","다크파워 스킬","기사 스킬","어쌔신 스킬","댄서 스킬","쉴드 스킬","특수"],St={All:!0,"0~30":i=>D(i,0,30),"30~100":i=>D(i,30,100),"100~150":i=>D(i,100,150),"150~200":i=>D(i,150,200),"200~300":i=>D(i,200,300)};function D(i,t,e){return i.includes("All")?!0:i.some(n=>typeof n=="number"&&n>=t&&n<=e)}let tt=[];function Gt(){var i,t,e;q.innerHTML=`
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">💍 레지스트릿 검색</h2>
    </div>

    <div class="reg-search-container">
      
      <!-- 1. 레벨 필터 -->
      <div style="text-align:center; margin-bottom:10px; color:var(--accent-light); font-weight:bold;">획득 레벨 (Obtain Lv)</div>
      <div class="reg-lv-group">
        ${Object.keys(St).map((n,a)=>`
          <input type="radio" name="lv-range" id="lv-${a}" value="${n}" ${n==="All"?"checked":""}>
          <label for="lv-${a}">${n}</label>
        `).join("")}
      </div>

      <hr style="border:0; border-top:1px solid var(--border-color); margin:20px 0;">

      <!-- 2. 스킬 종류 (Category) - 버튼형 -->
      <div style="text-align:center; margin-bottom:10px; color:var(--accent-light); font-weight:bold;">스킬 종류 (Category)</div>
      <div class="reg-cat-group" id="reg-cat-filters">
        <!-- '전체' 버튼 -->
        <input type="radio" name="cat-select" id="cat-all" value="All" checked>
        <label for="cat-all">전체</label>
        
        <!-- 카테고리 버튼들 -->
        ${Kt.map((n,a)=>`
          <input type="radio" name="cat-select" id="cat-${a}" value="${n}">
          <label for="cat-${a}">${n}</label>
        `).join("")}
      </div>

      <hr style="border:0; border-top:1px solid var(--border-color); margin:20px 0;">

      <!-- 3. 이름 검색 -->
      <div class="reg-control-row">
        <span style="font-weight:bold;">이름 검색: </span>
        <input type="text" id="reg-name-input" class="search-input" style="margin:0; width:200px;" placeholder="검색어 입력...">
        <button id="btn-reg-search" style="padding:8px 20px;">검색</button>
      </div>
    </div>

    <!-- 결과 리스트 -->
    <div id="registlet-results">
      <div style="grid-column:1/-1; text-align:center; padding:20px; color:#888;">데이터 로딩 중...</div>
    </div>
  `,(i=document.getElementById("back-home"))==null||i.addEventListener("click",I),(t=document.getElementById("btn-reg-search"))==null||t.addEventListener("click",z),(e=document.getElementById("reg-name-input"))==null||e.addEventListener("keypress",n=>{n.key==="Enter"&&z()}),document.querySelectorAll('input[name="lv-range"], input[name="cat-select"]').forEach(n=>{n.addEventListener("change",z)}),Wt()}async function Wt(){const i=document.getElementById("registlet-results");if(i){if(tt.length>0){z();return}try{const t=await fetch("registlet/registlet_list.js");if(!t.ok)throw new Error("File not found");const e=await t.text(),n=e.substring(e.indexOf("{")),a=new Function(`return ${n}`)();if(a&&Array.isArray(a.items))tt=a.items,z();else throw new Error("Invalid data format")}catch(t){console.error(t),i.innerHTML='<div style="grid-column:1/-1; text-align:center; color:#ff4444;">데이터 로딩 실패</div>'}}}function z(){const i=document.getElementById("registlet-results");if(!i)return;const e=document.getElementById("reg-name-input").value.trim().toLowerCase(),n=document.querySelector('input[name="cat-select"]:checked'),a=n?n.value:"All",o=document.querySelector('input[name="lv-range"]:checked'),s=o?o.value:"All",l=tt.filter(c=>{if(e&&(!c.name||!c.name.toLowerCase().includes(e))||a!=="All"&&c.category!==a)return!1;const u=St[s];return!(u&&!u(c.obtain_lv))});if(l.length===0){i.innerHTML='<div style="grid-column:1/-1; text-align:center; padding:20px; color:#888;">검색 결과가 없습니다.</div>';return}i.innerHTML=l.map(c=>{const u=Array.isArray(c.obtain_lv)?c.obtain_lv.join(", "):c.obtain_lv;return`
      <div class="registlet-card">
        <div class="reg-header">
          <span class="reg-category">${c.category}</span>
          <span class="reg-name">${c.name}</span>
        </div>
        <div class="reg-body">
          <div class="reg-desc">${c.description}</div>
          <div class="reg-meta">
            <span>🆙 ${c.max_lv_info}</span>
            <span>📍 Lv: ${u}</span>
          </div>
        </div>
      </div>
    `}).join("")}function Qt(){var i;q.innerHTML=`
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">🍳 요리 주소 검색</h2>
    </div>
    <div class="container" style="text-align:center; padding:50px;">
      <h3>준비 중입니다 (Construction)</h3>
      <p>요리 버프 및 주소 코드를 준비 중입니다.</p>
    </div>
  `,(i=document.getElementById("back-home"))==null||i.addEventListener("click",I)}function Xt(){var i;q.innerHTML=`
    <div class="nav-bar">
      <button class="btn-home" id="back-home">🏠 Home</button>
      <h2 style="margin:0 0 0 15px; border:none;">🛡️ 장비 검색</h2>
    </div>
    <div class="container" style="text-align:center; padding:50px;">
      <h3>준비 중입니다 (Construction)</h3>
      <p>무기 및 방어구 데이터를 준비 중입니다.</p>
    </div>
  `,(i=document.getElementById("back-home"))==null||i.addEventListener("click",I)}function Jt(){const i=document.createElement("button");i.className="theme-toggle-btn",i.id="theme-btn",i.onclick=Yt,document.body.appendChild(i),localStorage.getItem("toram-theme")==="dark"?(document.body.classList.add("dark-mode"),i.innerText="☀️ 낮 모드"):i.innerText="🌙 밤 모드"}function Yt(){const i=document.body,t=document.getElementById("theme-btn");i.classList.toggle("dark-mode"),i.classList.contains("dark-mode")?(t.innerText="☀️ 낮 모드",localStorage.setItem("toram-theme","dark")):(t.innerText="🌙 밤 모드",localStorage.setItem("toram-theme","light"))}Jt();I();
