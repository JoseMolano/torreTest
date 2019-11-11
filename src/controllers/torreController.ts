import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import ResponseJsonHelper from "../helpers/responseJsonHelper";


const torreController = {
  
  query: (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const query = event.pathParameters.searchTerm;
    const search$ = torreService.query$(query);
    return search$.subscribe(
      (searchResponses) => {
        return cb(null, ResponseJsonHelper.okResponse(searchResponses, false))
      },
      (error) => {
        console.log(error);
        return cb(null, ResponseJsonHelper.errorResponse(500));
      }
    )
  },

  profile: (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const username = event.pathParameters.username;
    const profile$ = torreService.profile$(username);
    return profile$.subscribe(
      (profileResponse) => {
        return cb(null, ResponseJsonHelper.okResponse(profileResponse, false))
      },
      (error) => {
        console.log(error);
        return cb(null, ResponseJsonHelper.errorResponse(500));
      }
    )
  },

  connections: (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const username = event.pathParameters.username;
    const connections$ = torreService.connections$(username);
    return connections$.subscribe(
      (connectionsResponses) => {
        return cb(null, ResponseJsonHelper.okResponse(connectionsResponses, false))
      },
      (error) => {
        console.log(error);
        return cb(null, ResponseJsonHelper.errorResponse(500));
      }
    )
  }
};

export default torreController;