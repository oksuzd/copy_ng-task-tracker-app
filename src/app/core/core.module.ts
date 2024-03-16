import { NgModule } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class CoreModule {}