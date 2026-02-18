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
git checkout source -- dist
mv dist/* .
rm -rf dist
git add .
git commit -m "Deploy: $(date)"
git branch -M main
git push -f origin main
git checkout source
# git branch -D main_temp
#
#cleaner way

npm run build
git subtree push --prefix dist origin main
# It DOES push automatically to the remote.
