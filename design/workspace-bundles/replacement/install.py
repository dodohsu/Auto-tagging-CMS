from pathlib import Path
import shutil, hashlib
root=Path('/Users/dodohsu/Desktop/ai-tagger')
stage=Path(__file__).resolve().parent
backup=root/'design/variants/ai-search-before-general-20261027'
if backup.exists():
 raise SystemExit('Backup already exists; refusing to overwrite previous snapshot')
backup.mkdir(parents=True)
shutil.copy2(root/'app/src/AISearchMVP.tsx',backup/'AISearchMVP.tsx')
shutil.copytree(root/'demo',backup/'demo')
shutil.copy2(root/'docs/product/features/ai-search-mvp.md',backup/'ai-search-mvp.md')
shutil.copy2(stage/'app/src/AISearchMVP.tsx',root/'app/src/AISearchMVP.tsx')
shutil.copytree(stage/'app/src/general-search',root/'app/src/general-search',dirs_exist_ok=True)
# Copy the verified build; retain unrelated existing media and screenshots.
shutil.copytree(stage/'demo',root/'demo',dirs_exist_ok=True)
for rel in ['features/ai-search-mvp.md','weekly-changes.md','decisions.md']:
 shutil.copy2(stage/'docs'/rel,root/'docs/product'/rel)
print('Installed AI Search replacement; old proposal retained at',backup)
print('Preview: http://127.0.0.1:5173/#search')
