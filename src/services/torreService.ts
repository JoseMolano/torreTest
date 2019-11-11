import Container, {Service} from 'typedi';
import TorreMW from '../middleware/torreMW';
import { delay, first, catchError } from 'rxjs/operators';
import { of, merge } from 'rxjs';

/* 
Functions inside service are similar, I explain just the first one 
*/

// Bring torre middleware to make queries
const torreMW = Container.get(TorreMW);
const TIMEOUT = 30000;
// Empty state to answer when timeout occurs
const emptyState = {result: []};

// Decorator for using TorreService as a service in controller
@Service()
class TorreService {

  public search$(searchTerm: string) {
    // custom timer observable for lambda timeouts
    const timer$ = of(emptyState).pipe(delay(Number(TIMEOUT)));
    // calling search method in Torre middleware as an observable
    const query$ = torreMW.querySearch$(searchTerm);
    // merging observables and getting the first one that answer
    return merge(timer$, query$)
      .pipe(catchError((error) =>{
        console.log(error);
        return of(emptyState);
      }))
      .pipe(first());
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
  }
}

export default TorreService;