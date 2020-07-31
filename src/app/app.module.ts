import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { I18NextModule } from "angular-i18next";
import { AppComponent } from "./app.component";
import { I18N_PROVIDERS } from "./i18n";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, I18NextModule.forRoot()],
  providers: [I18N_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {}
