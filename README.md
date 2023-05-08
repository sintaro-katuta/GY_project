### Git
```bash
git clone https://github.com/sintaro-katuta/GY_project
```

### とりまこれ
Dockerコンテナ起動
```bash
docker-compose up -d
```
コンテナ内のfrontend(SNS)のnext.js起動
```bash
docker-compose exec frontend yarn dev
```
ブラウザで
http://localhost:3000/


### それでも起動しなかったら
ちょっとわかんないんでそれぞれでエラーで調べるか、私が見ます


### Dockerコマンド

Dockerコンテナ起動
```bash
docker-compose up -d
```

Dockerコンテナ全停止(PCが重かったらこれ)
```bash
docker stop $(docker ps -q)
```

Dockerコンテナ全削除
```bash
docker rm $(docker ps -q -a)
```

Dockerイメージ全削除(これは禁止で)
```bash
docker rm $(docker ps -q -a)
```

### 利用させて頂いたテンプレート
[mizu0715/docker-next.js](https://github.com/mizu0715/docker-next.js)
