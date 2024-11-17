import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Header } from "./landing_page/header/header.component";
import { Main } from "./landing_page/main/main.component";
import { Footer } from "./landing_page/footer/footer.component";
import { ReasonItem } from "./landing_page/main/reason/reason.component";
import { ArticleItem } from "./landing_page/main/article/article.component";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../service/api.service";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../service/auth.service";
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { SubtopicsComponent } from './pages/subtopics/subtopics.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { EncryptionService } from "../service/encrypt.service";
import { ModalComponent } from './shared/modal/modal.component';
import { AuthGuard } from "../service/auth.guard";
import { Header2 } from "./landing_page/header2/header.component";
import { SliderComponent } from "./landing_page/main/slidercomponent/slidercomponent.component";

const routes: Routes = [
  { path: '', component: Main, data: { showHeader: true }, },  // Redirect from MasterPageComponent
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'topics', component: TopicsComponent, canActivate: [AuthGuard] },
  { path: 'subtopics/:id/:report_id', component: SubtopicsComponent, canActivate: [AuthGuard] },
  { path: 'question', component: QuestionsComponent, canActivate: [AuthGuard] },
];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, routerOptions),
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    Header,
    Header2,
    Main,
    Footer,
    ReasonItem,
    ArticleItem,
    LoginComponent,
    SignupComponent,
    EmailVerificationComponent,
    TopicsComponent,
    SubtopicsComponent,
    QuestionsComponent,
    ModalComponent,
    SliderComponent
  ],
  providers: [ApiService, AuthService, EncryptionService],
  exports: [
    Header,
    Header2,
    Main,
    Footer,
    ReasonItem,
    ArticleItem,
    RouterModule
  ]
})

export class ComponentModules { }
