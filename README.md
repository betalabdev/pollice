Pollice
=======

> Yet another poll app

## Setup server

1. Install `mongodb` & start it in default port

2. Start server

```
cd server
yarn
yarn run start
```

## Setup client

```
cd client
yarn
yarn serve
```

## Setup Chrome extension

Load unpacked from `chrome_extension` folder.


## Quick start

1. Create poll from http://127.0.0.1:8080, get question id from response, e.g. `5d6bca941d58c724cf712ee3`.

2. Insert a shape in your Google Slides presentation, add hyper link to `#poll=5d6bca941d58c724cf712ee3`.

3. Start your presentation, click in the shape you just link in step 2 above and enjoy!