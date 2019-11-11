# Torre test Back End

For backend, I used mainly Node.js, typescript and serverless from AWS, where I built three lambda functions to retrieve data from available API's:

- Search.
- Profile/Bio information.
- Connections.

I created a controller (**torreController**)to receive APIGateway calls and redirect them to the respective lambda functions inside service (**torreService**). Every function at the service makes a call to the middleware (**torreMW**) where querys to every API are made. For those asynchronous calls I used RxJs Observables and different operators it provides. After every call, responses are piped to modify the responses and get just the data I need. 

At the end the controller subscribes to those observables. When there is a response it is sent to the callback with specified response format inside the response helper (**responseJsonHelper**).

Endpoints for lambda functions are:

- GET https://1tzm5muki7.execute-api.us-east-1.amazonaws.com/prod/search/{searchTerm}
- GET https://1tzm5muki7.execute-api.us-east-1.amazonaws.com/prod/profile/{profile}
- GET https://1tzm5muki7.execute-api.us-east-1.amazonaws.com/prod/connections/{profile}