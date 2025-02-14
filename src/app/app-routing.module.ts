import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './components/login/login.component';
import { PersonalDetailsComponent } from './components/application/personal-details/personal-details.component';
import { ApplicationComponent } from './components/application/application.component';
import { ProcessApplicationsComponent } from './components/process-applications/process-applications.component';
import { ReportsComponent } from './components/reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'demo',
    component: AppLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./demo/components/dashboards/dashboards.module').then(
            (m) => m.DashboardsModule
          ),
      },
      {
        path: 'uikit',
        data: { breadcrumb: 'UI Kit' },
        loadChildren: () =>
          import('./demo/components/uikit/uikit.module').then(
            (m) => m.UIkitModule
          ),
      },
      {
        path: 'utilities',
        data: { breadcrumb: 'Utilities' },
        loadChildren: () =>
          import('./demo/components/utilities/utilities.module').then(
            (m) => m.UtilitiesModule
          ),
      },
      {
        path: 'pages',
        data: { breadcrumb: 'Pages' },
        loadChildren: () =>
          import('./demo/components/pages/pages.module').then(
            (m) => m.PagesModule
          ),
      },
      {
        path: 'profile',
        data: { breadcrumb: 'User Management' },
        loadChildren: () =>
          import('./demo/components/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'documentation',
        data: { breadcrumb: 'Documentation' },
        loadChildren: () =>
          import('./demo/components/documentation/documentation.module').then(
            (m) => m.DocumentationModule
          ),
      },
      {
        path: 'blocks',
        data: { breadcrumb: 'Prime Blocks' },
        loadChildren: () =>
          import('./demo/components/primeblocks/primeblocks.module').then(
            (m) => m.PrimeBlocksModule
          ),
      },
      {
        path: 'ecommerce',
        data: { breadcrumb: 'E-Commerce' },
        loadChildren: () =>
          import('./demo/components/ecommerce/ecommerce.module').then(
            (m) => m.EcommerceModule
          ),
      },
      {
        path: 'apps',
        data: { breadcrumb: 'Apps' },
        loadChildren: () =>
          import('./demo/components/apps/apps.module').then(
            (m) => m.AppsModule
          ),
      },
      {
        path: 'admin/applications',
        data: { breadcrumb: 'Applications' },
        component: ProcessApplicationsComponent,
      },
      {
        path: 'admin/reports',
        data: { breadcrumb: 'Reports' },
        component: ReportsComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'application',
    loadChildren: () =>
      import('./components/application/application.module').then(
        (m) => m.ApplicationModule
      ),
  },
  {
    path: 'auth',
    data: { breadcrumb: 'Auth' },
    loadChildren: () =>
      import('./demo/components/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./demo/components/landing/landing.module').then(
        (m) => m.LandingModule
      ),
  },
  {
    path: 'notfound',
    loadChildren: () =>
      import('./demo/components/notfound/notfound.module').then(
        (m) => m.NotfoundModule
      ),
  },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
