const { Router } = require('express');
const https = require('https');

const router = Router();

router.get('/', (req, res, next) => {
  https.get('https://jsonplaceholder.typicode.com/users', (jsonPlaceholderResponse) => {
    let data = '';
    jsonPlaceholderResponse.on('data', () => { 
      // ...
    });
    jsonPlaceholderResponse.on('end', () => {
      // ...
    });
  })

});
router.get('/:id', (req, res, next) => {
    let location = 'https://jsonplaceholder.typicode.com/users/';
    location.concat(+req.params.id);
    https.get(location, (jsonPlaceholderResponse) => {
        // ...
        jsonPlaceholderResponse.on('data', () => { 
          // ...
        });
        jsonPlaceholderResponse.on('end', () => {
          // ...
        });
      })
});

module.exports = router;