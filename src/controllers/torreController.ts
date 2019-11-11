import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import ResponseJsonHelper from "../helpers/responseJsonHelper";


const torreController = {
  
  search: (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const { searchTerm } = event.pathParameters;
    const search$ = torreService.query$(searchTerm);
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
    const { profile } = event.pathParameters;
    const profile$ = torreService.profile$(profile);
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
    const { profile } = event.pathParameters;
    const connections$ = torreService.connections$(profile);
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