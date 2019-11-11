import {of,from} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {flatMap} from 'rxjs/operators';
import { XMLHttpRequest } from 'xmlhttprequest';
import { Service } from 'typedi';

@Service()
class TorreMW {

  public querySearch$(searchTerm: string) {
    return ajax({
      createXHR: () => {
        return new XMLHttpRequest();
      },
      crossDomain: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      url: `https://torre.bio/api/people?q=${searchTerm}&limit=25`,
    })
      .pipe(
        flatMap((resp) => {
          return from(this.parseSearchResult(resp).toPromise().then((result) => {
            return {
              result
            };
          }));
        })
      );
  }

  public queryProfile$(username: string) {
    return ajax({
      createXHR: () => {
        return new XMLHttpRequest();
      },
      crossDomain: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      url: `https://torre.bio/api/bios/${username}`,
    })
      .pipe(
        flatMap((resp) => {
          return from(this.parseProfileResult(resp).toPromise().then((result) => {
            return {
              result
            };
          }));
        })
      );
  }

  public queryConnections$(username: string) {
    return ajax({
      createXHR: () => {
        return new XMLHttpRequest();
      },
      crossDomain: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      url: `https://torre.bio/api/people/${username}/connections?limit=30`,
    })
      .pipe(
        flatMap((resp) => {
          return from(this.parseConnectionsResult(resp).toPromise().then((result) => {
            console.log({result});
            return {
              result
            };
          }));
        })
      );
  }

  public parseSearchResult(resp) {
    const fixedResults = resp.response.map((element) => {
      return {
        name: element.name,
        headLine: element.professionalHeadline,
        completion: element.completion,
        weight: element.weight,
        image: element.image,
        username: element.publicId
      }
    });
    return of(fixedResults);
  }

  public parseProfileResult(resp) {
    
    const element = resp.response;
    const picture = element.person.picture || null;
    const links = element.person.links ? (
      element.person.links.map((link) => {
        return {
          name: link.name,
          address: link.address
        }
      }) 
    ) : null ;
    const summaryOfBio = element.summaryOfBio || null;
    const location = element.person.location ? element.person.location.name : null;
    const strengths = element.strengths ? (
      element.strengths.map((strength) => {
        return {
          name: strength.name,
          weight: strength.weight,
          recommendations: strength.recommendations
        }
      })
    ) : null;

    const experiences = element.experiences ? (
      element.experiences.map((experience) => {
        return {
          category: experience.category,
          name: experience.name,
          fromMonth: experience.fromMonth,
          fromYear: experience.fromYear,
          toMonth: experience.toMonth,
          toYear: experience.toYear
        }
      })
    ) : null;
    const fixedResult = {
      name: element.person.name,
      headLine: element.person.professionalHeadline,
      verified: element.person.verified,
      weight: element.person.weight,
      picture,
      links,
      location,
      summaryOfBio,
      strengths,
      experiences
    };
    return of(fixedResult);
  }

  public parseConnectionsResult(resp) {
    const fixedResults = resp.response.map((element) => {
      const person = element.person;
      const picture = person.picture || null;
      const professionalHeadline = person.professionalHeadline || null;
      return {
        name: person.name,
        username: person.publicId,
        headLine: professionalHeadline,
        picture,
        weight: person.weight
      }
    });
    return of(fixedResults);
  }
}

export default TorreMW;