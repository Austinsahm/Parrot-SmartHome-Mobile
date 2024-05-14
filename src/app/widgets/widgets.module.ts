import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { HeaderComponent } from "./layout/header/header.component";
import { ProgressPipe } from "./progress.pipe";

@NgModule({
    imports:[
        CommonModule,
    ],
    declarations:[
        ProgressPipe,
 
    ],
    exports:[
        ProgressPipe
    ]

})

export class WidgetsModule {}