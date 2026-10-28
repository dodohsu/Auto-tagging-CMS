from pathlib import Path
import shutil
root=Path('/Users/dodohsu/Desktop/ai-tagger')
bundle=Path(__file__).resolve().parent
backup=root/'design/variants/ai-discovery-before-navigation-20261027'
if backup.exists(): raise SystemExit('Backup exists; refusing to overwrite it')
backup.mkdir(parents=True)
for name in ['AISearchMVP.tsx','StreamAIDemo.tsx']: shutil.copy2(root/'app/src'/name,backup/name)
shutil.copytree(root/'app/src/general-search',backup/'general-search')
shutil.copytree(root/'demo',backup/'demo')
for name in ['AISearchMVP.tsx','StreamAIDemo.tsx']: shutil.copy2(bundle/'src'/name,root/'app/src'/name)
shutil.copytree(bundle/'src/general-search',root/'app/src/general-search',dirs_exist_ok=True)
shutil.copytree(bundle/'demo',root/'demo',dirs_exist_ok=True)
for name in ['weekly-changes.md','decisions.md','features/ai-search-mvp.md']: shutil.copy2(bundle/'docs'/name,root/'docs/product'/name)
print('Installed AI Discovery navigation and five pages. Refresh http://127.0.0.1:5173/#search')
