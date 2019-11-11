import Container, {Service} from 'typedi';
import TorreMW from '../middleware/torreMW';
import { delay, first, catchError } from 'rxjs/operators';
import { of, merge } from 'rxjs';

const torreMW = Container.get(TorreMW);
const TIMEOUT = 30000;
const emptyState = {result: []};

@Service()
class TorreService {

  public search$(searchTerm: string) {
    const timer$ = of(emptyState).pipe(delay(Number(TIMEOUT)));
    const query$ = torreMW.querySearch$(searchTerm);
    return merge(timer$, query$)
      .pipe(catchError((error) =>{
        console.log(error);
        return of(emptyState);
      }))
      .pipe(first());
    // return torreMW.querySearch$(searchTerm);
  }

  public profile$(username: string) {
    const timer$ = of(emptyState).pipe(delay(Number(TIMEOUT)));
    const query$ = torreMW.queryProfile$(username);
    return merge(timer$, query$)
      .pipe(catchError((error) =>{
        console.log(error);
        return of(emptyState);
      }))
      .pipe(first());
    
  }

  public connections$(username: string) {
    const timer$ = of(emptyState).pipe(delay(Number(TIMEOUT)));
    const query$ = torreMW.queryConnections$(username);
    return merge(timer$, query$)
      .pipe(catchError((error) =>{
        console.log(error);
        return of(emptyState);
      }))
      .pipe(first());
    // return torreMW.queryConnections$(username);
  }
}

export default TorreService;