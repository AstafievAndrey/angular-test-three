import { Injectable, Inject } from '@angular/core';
import { IConfig, Config } from '../interfaces/iconfig';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public layout$: BehaviorSubject<string>;

  constructor(@Inject(Config) private config: IConfig) {
    this.resize();
    this.layout$ = new BehaviorSubject(this.checkSize(window.innerWidth));
  }

  private resize(): void {
    window.addEventListener('resize', (event: any) => {
      const { innerWidth } = event.target;
      this.layout$.next(this.checkSize(innerWidth));
    });
  }

  private checkSize(width: number): string {
    if (width >= this.config.large) {
      return 'large';
    }
    if (width >= this.config.medium) {
      return 'medium';
    }
    return 'small';
  }

  public getLayoutValue() {
    return this.layout$.value;
  }

  public getLayout$(): Observable<string> {
    return this.layout$.asObservable();
  }

}
