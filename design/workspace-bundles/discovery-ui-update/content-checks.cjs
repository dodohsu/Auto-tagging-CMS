const fs=require('fs'),vm=require('vm'),assert=require('assert'),ts=require('typescript'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const cache=new Map();
function load(path){if(cache.has(path))return cache.get(path);const record={exports:{}};cache.set(path,record.exports);const compiled=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2023}}).outputText;const env={exports:record.exports,module:record,console,require:n=>n.startsWith('@/')?load('src/'+n.slice(2)+'.tsx'):require(n)};vm.createContext(env);vm.runInContext(compiled,env);return record.exports;}
const component=load('src/SearchableContent.tsx');
const titles=Array.from({length:2500},(_,i)=>({id:`ITEM-${String(i).padStart(4,'0')}`,title:`影片 ${String(i).padStart(4,'0')}`,kind:'日劇',tags:'測試',summary:'摘要',status:i===0?'Failed':'Indexed',version:2,indexed:i===1?1:2}));
assert.equal(component.indexState(titles[0]),'failed');assert.equal(component.indexState(titles[1]),'pending');assert.equal(component.indexState(titles[2]),'ready');
let detailCalls=0;const html=renderToStaticMarkup(React.createElement(component.default,{titles,included:titles.map(t=>t.id),editable:true,onScopeChange(){},renderDetail(){detailCalls++;return null}}));
assert.equal((html.match(/aria-label="選取 影片 /g)||[]).length,25);assert(html.includes('2,500'));assert(!html.includes('ITEM-2499'));assert.equal(detailCalls,0);assert(html.includes('已納入但需處理'));assert(html.includes('1 / 100'));
console.log('PASS 2,500 items: 25 rendered rows, 100 pages, lazy details; index health distinguishes failure and stale version');
