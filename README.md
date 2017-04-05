# Minimum weight path

Description omitted on purpose.

## Install
```bash
git clone git@github.com:18thletter/matrix-path.git
cd matrix-path
npm install
```

## Run
```
npm start
```

## Test
```
npm test
```

## Usage
Run it. A server will be started on port 3000.

Hit it with a cURL (the only endpoint is /)
```
curl --request POST \
     --url http://localhost:3000 \
     --header 'content-type: application/json' \
     --data '[[8,9,7,6,7],  [0,6,1,3,5],  [8,6,4,2,3],  [2,5,1,1,4],  [0,0,1,1,9]]'
```

Response:
```
{"path":[6,1,2,1,0],"weight":10}
```
