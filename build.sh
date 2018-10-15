#!/bin/sh
CURRENT_PATH=$(cd "$(dirname "$0")"; pwd)

APP_NAME="xiongzhang"
APP_VERSION=$(git rev-list HEAD | head -n 1)
#rm -fr $CURRENT_PATH/output && mkdir -p $CURRENT_PATH/output/webroot && mkdir $CURRENT_PATH/output/template
mkdir -p $CURRENT_PATH/output
node build/build.js
cp -fr dist/* $CURRENT_PATH/output
#cp -fr dist/* $CURRENT_PATH/output/webroot
#mv $CURRENT_PATH/output/webroot/index.html $CURRENT_PATH/output/template/home.tpl

# cp v3Jump.html ./output/webroot/static
# cp update.html ./output/webroot/static

(cd output && tar cvzf $APP_NAME.tar.gz ./*)
rm -fr output/template output/webroot dist/*

# (cd output && tar cvzf $APP_NAME-tpl.tar.gz ./template)
# (cd output && tar cvzf $APP_NAME-static.tar.gz ./webroot)
# rm -fr output/template output/webroot dist/*
