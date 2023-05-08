### Git
```bash
git clone https://github.com/sintaro-katuta/GY_project
```

### とりまこれ
```bash
# Dockerコンテナ起動
docker-compose up -d
```
ブラウザで
http://localhost:3000/


### それでも起動しなかったら
ちょっとわかんないんでそれぞれでエラーで調べるか、私が見ます


### Dockerコマンド
```bash
# Dockerコンテナ起動
docker-compose up -d
```
```bash
# Dockerコンテナ全停止(PCが重かったらこれ)
docker stop $(docker ps -q)
```
```bash
# Dockerコンテナ全削除
docker rm $(docker ps -q -a)
```
```bash
# Dockerイメージ全削除(これは禁止で)
docker rm $(docker ps -q -a)
```

### 利用させて頂いたテンプレート
[mizu0715/docker-next.js](https://github.com/mizu0715/docker-next.js)
