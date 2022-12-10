import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private theme$: BehaviorSubject<string> = new BehaviorSubject('light');

    constructor(
        private translateService: TranslateService
    ) {
        this.translateService.setDefaultLang('en');
    }

    public switchTheme() {
        this.theme$.next(
            this.theme$.getValue() === 'light'
                ? 'dark' : 'light');
    }

    public switchLang(lang: string) {
        if (lang === 'en' || lang === 'ru')
            this.translateService.use(lang);
    }

    public getTheme(): BehaviorSubject<string> {
        return this.theme$;
    }
}
