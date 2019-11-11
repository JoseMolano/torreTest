import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import ResponseJsonHelper from "../helpers/responseJsonHelper";
import Container from "typedi";
import TorreService from "../services/torreService";

const torreService = Container.get(TorreService);

const torreController = {
  
  search: (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const { searchTerm } = event.pathParameters;
    console.log(searchTerm);
    const search$ = torreService.search$(searchTerm);
    return search$.subscribe(
      (searchResponses) => {
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