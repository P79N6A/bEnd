#!/bin/sh
# 云编译，原build.sh保留，自动化集成需要采用
CURRENT_PATH=$(cd "$(dirname "$0")"; pwd)

APP_NAME="xiongzhang"
APP_VERSION=$(git rev-list HEAD | head -n 1)

echo '--------------------- Node -v ---------------------'
export PATH=$NODEJS_BIN_LATEST:$PATH
echo "node $(node -v)"
echo "npm v$(npm -v)"
npm install

echo '--------------------- run build ---------------------'
mkdir -p $CURRENT_PATH/output
mkdir -p $CURRENT_PATH/dist
node build/build.js

echo '--------------------- end build ---------------------'
cp -fr dist/* $CURRENT_PATH/output

(cd output && tar cvzf $APP_NAME.tar.gz ./*)
rm -fr output/template output/webroot dist/*
echo '--------------------- Compile done ---------------------'