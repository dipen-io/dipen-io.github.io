# 1. You're on source branch, make edits
# ... edit your files ...

# 2. Save changes
# git add .
# git commit -m "Updated something"
# git push origin source

# 3. Deploy
npm run build
git checkout --orphan main_temp
git rm -rf .
mv dist/* .
rm -rf dist
git add .
git commit -m "Deploy: $(date)"
git push origin main_temp:main --force
git branch -D main_temp
git checkout source
git branch -D main_temp
