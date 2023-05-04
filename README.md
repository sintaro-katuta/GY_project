### Git clone
```bash
git clone https://github.com/sintaro-katuta/GY_project
```

### とりまこれ
```bash
# Dockerコンテナ起動
docker-compose up -d

# Next.js起動
docker-compose exec frontend yarn dev

http://localhost:3000/
```

### Dockerコマンド
```bash
# Dockerコンテナ起動
docker-compose up -d

# Dockerコンテナ全停止(PCが重かったらこれ)
docker stop $(docker ps -q)

# Dockerコンテナ全削除
docker rm $(docker ps -q -a)

# Dockerイメージ全削除(これは禁止で)
docker rm $(docker ps -q -a)
```

### 利用させて頂いたテンプレート
[mizu0715/docker-next.js](https://github.com/mizu0715/docker-next.js)
