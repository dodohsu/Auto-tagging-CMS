const fs=require('fs'),vm=require('vm'),assert=require('assert'),ts=require('typescript'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const source=fs.readFileSync('src/AISearchMVP.tsx','utf8')+'\n globalThis.testing = { demoSeed, titleSeed, findTitles, mask, configFor, profiles, profileDemoSeed, migrateDemos };';
const compiled=ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2023}}).outputText;
const moduleRecord={exports:{}},saved=new Map(),uiCache=new Map();
function loadUI(name){
 const path='src/'+name.slice(2)+'.tsx';if(uiCache.has(path))return uiCache.get(path);
 const record={exports:{}};uiCache.set(path,record.exports);
 const code=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2023}}).outputText;
 const env={exports:record.exports,module:record,console,require:n=>n.startsWith('@/')?loadUI(n):require(n)};
 vm.createContext(env);vm.runInContext(code,env);return record.exports;
}
const sandbox={module:moduleRecord,exports:moduleRecord.exports,structuredClone,console,crypto:global.crypto,localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)},require:n=>n.startsWith('@/')?loadUI(n):require(n)};
vm.createContext(sandbox);vm.runInContext(compiled,sandbox);
const t=sandbox.testing;let count=0;function check(name,fn){fn();count++;console.log('PASS',name)}
check('three demos and eight shared titles',()=>{assert.equal(t.demoSeed.length,3);assert.equal(t.titleSeed.length,8)});
check('drama scope',()=>assert(t.findTitles('下班想看美食節目',t.demoSeed[0].config,t.titleSeed).ids.includes('MOCK-TEL-01')));
check('animation scope excludes dramas',()=>assert(t.findTitles('搞笑',t.demoSeed[1].config,t.titleSeed).ids.every(id=>id==='MOCK-TEL-05')));
check('variety scope excludes animation',()=>assert.deepEqual(Array.from(t.findTitles('搞笑',t.demoSeed[2].config,t.titleSeed).ids),['MOCK-TEL-08']));
check('failed science candidate diagnosed',()=>{const r=t.findTitles('偏科學辦案',t.demoSeed[0].config,t.titleSeed);assert.equal(r.ids.length,0);assert(r.excluded.some(x=>x.includes('Failed')))});
check('reindex enables science candidate',()=>{const titles=structuredClone(t.titleSeed);Object.assign(titles[2],{status:'Indexed',indexed:1});assert(t.findTitles('偏科學辦案',t.demoSeed[0].config,titles).ids.includes('MOCK-TEL-03'))});
check('zero result within catalog',()=>assert.equal(t.findTitles('找 NBA 賽事',t.demoSeed[2].config,t.titleSeed).ids.length,0));
check('followup duration filters',()=>assert.equal(t.findTitles('想看戀愛喜劇 短一點',t.demoSeed[0].config,t.titleSeed).ids.length,0));
check('published snapshot separate from draft',()=>{const d=structuredClone(t.demoSeed[0]);d.published=structuredClone(d.config);d.config.greeting='new';assert.notEqual(d.config.greeting,d.published.greeting)});
check('duplicated configs independently editable',()=>{const original=t.demoSeed[0],copy=structuredClone(original.config);copy.content=[];assert(original.config.content.length>0)});
check('PII masking',()=>{const q=t.mask('test@example.com 0912345678');assert(!q.includes('@'));assert(!q.includes('0912345678'))});
for(const section of ['list','settings','content','playground','conversations','analytics'])check('render '+section,()=>{const html=renderToStaticMarkup(React.createElement(moduleRecord.exports.default,{section,demoId:section==='list'?null:'profile-general',onDemoChange(){},onSectionChange(){}}));assert(html.includes(section==='list'?'New Demo':'General｜通用推薦'));assert(html.length>1000)});
check('eight mock profiles and four default demos',()=>{assert.equal(t.profiles.length,8);assert.equal(t.profileDemoSeed.length,4)});
check('same query yields profile rankings',()=>{const results=t.profileDemoSeed.map(d=>t.findTitles('推薦適合我的內容',d.config,t.titleSeed).ids[0]);assert.deepEqual(Array.from(results),['MOCK-TEL-01','MOCK-TEL-04','MOCK-TEL-06','MOCK-TEL-08'])});
check('explicit animation overrides romance profile',()=>{const ids=t.findTitles('推薦動畫',t.profileDemoSeed[1].config,t.titleSeed).ids;assert(ids.length>0);assert(ids.every(id=>['MOCK-TEL-05','MOCK-TEL-06'].includes(id)))});
check('profile cannot expand content scope',()=>{const config={...t.profileDemoSeed[1].config,content:['MOCK-TEL-01']};assert.deepEqual(Array.from(t.findTitles('推薦適合我的內容',config,t.titleSeed).ids),['MOCK-TEL-01'])});
check('replace untouched legacy samples',()=>assert.equal(t.migrateDemos(structuredClone(t.demoSeed)).length,4));
check('preserve modified demos during migration',()=>{const old=structuredClone(t.demoSeed);old[0].name='Custom';assert.equal(t.migrateDemos(old).length,5)});
check('profile migration idempotent',()=>{const first=t.migrateDemos([]);assert.equal(t.migrateDemos(first).length,4)});
console.log(count+' checks passed');
