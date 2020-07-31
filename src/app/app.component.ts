import {
  Component,
  ViewEncapsulation,
  OnInit,
  Inject,
  Input
} from "@angular/core";
import { ITranslationService, I18NEXT_SERVICE } from "angular-i18next";

@Component({
  selector: "app-root",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  constructor(@Inject(I18NEXT_SERVICE) private i18n: ITranslationService) {}

  @Input() language: string = "en";

  ngOnInit() {
    this.i18n.events.initialized.subscribe(e => {
      if (e) {
        this.language = this.i18n.language;
      }
    });
    this.i18n.events.languageChanged.subscribe(lang => {
      if (this.language !== lang) {
        this.language = lang;
      }
    });
  }

  changeLanguage(lang: string) {
    this.i18n.changeLanguage(lang).then(x => {
      this.language = lang;
      document.location.reload();
    });
  }
}
