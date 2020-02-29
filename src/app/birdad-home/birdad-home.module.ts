import { BirdadHomeComponent } from "./birdad-home.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ListadComponent } from './listad/listad.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        NgbModule
    ],
    declarations: [BirdadHomeComponent, ListadComponent],
    exports: [BirdadHomeComponent],
    providers: []
})
export class BirdadHomeModule {}