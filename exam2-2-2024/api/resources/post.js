const { Router } = require('express');

const router = Router();

router.get('/', (req, res, next) => {
    https.get('https://jsonplaceholder.typicode.com/posts', (jsonPlaceholderResponse) => {
        let data = '';
        jsonPlaceholderResponse.on('data', (chunk) => { 
          data+=chunk.toString();
        });
        jsonPlaceholderResponse.on('end', () => {
          res(JSON.parse(data));
        });
      })
});
router.get('/:userId', (req, res, next) => {
    let location = 'https://jsonplaceholder.typicode.com/posts';
    let id = +req.params.userId;
    https.get(location, (jsonPlaceholderResponse) => {
        let data = '';
        jsonPlaceholderResponse.on('data', () => { 
          data += chunk.toString();
          next();
        });
        jsonPlaceholderResponse.on('end', () => {
          const parsedData = JSON.parse(data);
          let userPost = [];
          for(post in parsedData){
            if(post.userId = id){
                userPost.push(post);
            }
          }
          res(userPost);
        });
      })
});

module.exports = router;