import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import ResponseJsonHelper from "../helpers/responseJsonHelper";
import Container from "typedi";
import TorreService from "../services/torreService";

/* 
Functions inside controller are similar, I'll explain just the first one 
*/

// Bringing TorreService to call its methods inside controller functions
const torreService = Container.get(TorreService);

const torreController = {
  
  search: (event: APIGatewayEvent, context: Context, cb: Callback) => {
    // Reiciving path parameters sent by API gateway
    const { searchTerm } = event.pathParameters;
    console.log(searchTerm);
    // Querying search method to create an observable then subscribing to wait for results
    const search$ = torreService.search$(searchTerm);
    return search$.subscribe(
      (searchResponses) => {
        // Results are then sent back by callback in API gateway
        console.log({searchResponses});
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