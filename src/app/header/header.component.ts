import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SettingsService } from "../shared/services/settings.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    public theme$: BehaviorSubject<string> = this.settingsService.getTheme();

    constructor(
        public settingsService: SettingsService
    ) { }

    switchTheme() {
        this.settingsService.switchTheme();
    }


}