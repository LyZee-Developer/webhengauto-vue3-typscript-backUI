#!/bin/bash
comment="$1"
branch=$(git branch --show-current)
if [[ -z $comment ]];then 
    echo "Comment is empty ❌"
    exit 1
fi
git add .
git commit -m "$comment"
git push -u origin $branch