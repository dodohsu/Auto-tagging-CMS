from pathlib import Path
import shutil, hashlib
root=Path('/Users/dodohsu/Desktop/ai-tagger')
bundle=Path(__file__).resolve().parent
expected={'AISearchMVP.tsx': '4202ce395a57f392a151aaf70f44f64237866c42f6cf7c440bc689a834dd38f8', 'StreamAIDemo.tsx': '7308df53ce484273bf394ede0ff949f0c3ed4a34507fd5d4c9fa4c0f02d821da'}
for name, digest in expected.items():
 if hashlib.sha256((root/'app/src'/name).read_bytes()).hexdigest()!=digest:
  raise SystemExit('Source changed since preparation: '+name+'; rebuild before installing.')
backup=root/'design/variants/ai-discovery-before-multi-demo-20261027'
if backup.exists(): raise SystemExit('Backup already exists; refusing to overwrite it.')
backup.mkdir(parents=True)
for name in expected: shutil.copy2(root/'app/src'/name,backup/name)
shutil.copytree(root/'demo',backup/'demo')
for name in expected: shutil.copy2(bundle/'src'/name,root/'app/src'/name)
shutil.copytree(bundle/'demo',root/'demo',dirs_exist_ok=True)
for name in ['weekly-changes.md','decisions.md','features/ai-search-mvp.md']: shutil.copy2(bundle/'docs'/name,root/'docs/product'/name)
print('Installed AI Discovery multi-demo module. Refresh http://127.0.0.1:5173/#search')
