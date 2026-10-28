from pathlib import Path
import shutil, hashlib
root=Path('/Users/dodohsu/Desktop/ai-tagger')
bundle=Path(__file__).resolve().parent
expected={'AISearchMVP.tsx': '2c333ab00ea1c3fceece98c3941d7620cc72cd96728802c0dab9ecdc34194b49', 'StreamAIDemo.tsx': '8ef6aeddb72c9a2b78f5cf8db4f5720f87a97c229f1d5b6593f2b3e1e057f8f2'}
for name,digest in expected.items():
 if hashlib.sha256((root/'app/src'/name).read_bytes()).hexdigest()!=digest: raise SystemExit('Source changed: '+name+'; rebuild before installing.')
backup=root/'design/variants/ai-discovery-before-shadcn-navigation-20261027'
if backup.exists(): raise SystemExit('Backup already exists; refusing to overwrite.')
backup.mkdir(parents=True)
for name in expected: shutil.copy2(root/'app/src'/name,backup/name)
shutil.copytree(root/'demo',backup/'demo')
for name in expected: shutil.copy2(bundle/'src'/name,root/'app/src'/name)
shutil.copy2(bundle/'src/assistant-registry.ts',root/'app/src/assistant-registry.ts')
for name in ['checkbox.tsx','textarea.tsx','label.tsx']:
 destination=root/'app/src/components/ui'/name
 if destination.exists(): shutil.copy2(destination,backup/name)
 shutil.copy2(bundle/'src/components/ui'/name,destination)
shutil.copytree(bundle/'demo',root/'demo',dirs_exist_ok=True)
for name in ['weekly-changes.md','decisions.md','features/ai-search-mvp.md']: shutil.copy2(bundle/'docs'/name,root/'docs/product'/name)
print('Updated AI Discovery navigation and shadcn UI. Refresh http://127.0.0.1:5173/#search')
