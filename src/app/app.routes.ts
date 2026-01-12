import { Routes } from '@angular/router';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { SideBarAndMainContentComponent } from './Components/side-bar-and-main-content/side-bar-and-main-content.component';
import { AppComponent } from './app.component';
import { ManagePlaylistComponent } from './Components/BackOfficeOperation/manage-playlist/manage-playlist.component';
import { ManageScheduleComponent } from './Components/BackOfficeOperation/manage-schedule/manage-schedule.component';
import { ManageDaySlabsComponent } from './Components/BackOfficeOperation/manage-day-slabs/manage-day-slabs.component';
import { ManageLayoutComponent } from './Components/BackOfficeOperation/manage-layout/manage-layout.component';
import { ManageUptimeComponent } from './Components/BackOfficeOperation/manage-uptime/manage-uptime.component';
import { ViewDailyScreenRunsComponent } from './Components/BackOfficeOperation/view-daily-screen-runs/view-daily-screen-runs.component';
import { ManageScreenPlayersComponent } from './Components/BackOfficeOperation/manage-screen-players/manage-screen-players.component';
import { B2BAccountManagementComponent } from './Components/BackOfficeOperation/B2B-Account Management/B2B-Account.component';
import { AllocatePromosComponent } from './Components/DemandSideOperation/allocate-promos/allocate-promos.component';
import { MyContentRepositorySupplySideComponent } from './Components/SupplySideOperation/my-content-repository-supply-side/my-content-repository-supply-side.component';
import { MyContentrepositoryDemandSideComponent } from './Components/DemandSideOperation/my-contentrepository-demand-side/my-contentrepository-demand-side.component';
import { MyTransactionHistoryComponent } from './Components/DemandSideOperation/my-transaction-history/my-transaction-history.component';
import { ManageUsersSupplySideComponent } from './Components/SupplySideOperation/manage-users-supply-side/manage-users-supply-side.component';
import { ManageSubAccountsSupplySideComponent } from './Components/SupplySideOperation/manage-sub-accounts-supply-side/manage-sub-accounts-supply-side.component';
import { ManageScreenSubscriptionComponent } from './Components/SupplySideOperation/manage-screen-subscription/manage-screen-subscription.component';
import { MyScreenMISComponent } from './Components/SupplySideOperation/my-screen-mis/my-screen-mis.component';
import { MyReceivedPaymentsComponent } from './Components/SupplySideOperation/my-received-payments/my-received-payments.component';
import { MediaValidationComponent } from './Components/BackOfficeOperation/media-validation/media-validation.component';
import { EcomWorflowComponent } from './Components/BackOfficeOperation/ecom-worflow/ecom-worflow.component';
import { ManageUsersDemandSideComponent } from './Components/DemandSideOperation/manage-users-demand-side/manage-users-demand-side.component';
import { ManageSubAccountsDemandSideComponent } from './Components/DemandSideOperation/manage-sub-accounts/manage-sub-accounts.component';
import { ManageScreenComponent } from './Components/BackOfficeOperation/manage-screen/manage-screen.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
// import { LoginComponent } from './Components/login/login.component';

// import { ManageB2bComponent } from './Components/CloudTv/CreateTVonCloud/manage-b2b/manage-b2b.component';
// import { ManageD2cComponent } from './Components/CloudTv/CreateTVonCloud/manage-d2c/manage-d2c.component';

import { CreateTvOnCloudComponent } from './Components/CloudTv/create-tv-on-cloud/create-tv-on-cloud.component';

import { ManageContentProvidersComponent } from './Components/CloudTv/manage-content-providers/manage-content-providers.component';
import { ManageOemsComponent } from './Components/CloudTv/manage-oems/manage-oems.component';
import { KeyInstallOnServerComponent } from './Components/ManageChannelOperations/key-install-on-server/key-install-on-server.component';
import { ManageChannelSubitemsComponent } from './Components/ManageChannelOperations/manage-channel-subitems/manage-channel-subitems.component';
import { ManageChannelTemsComponent } from './Components/ManageChannelOperations/manage-channel-items/manage-channel-items.component';
import { ManageChannelUsersComponent } from './Components/ManageChannelOperations/manage-channel-user/manage-channel-user.component';
import { ManageChannelsComponent } from './Components/CloudTv/ManageCLD/manage-channels/manage-channels.component';
import { ManageProdLinesComponent } from './Components/CloudTv/ManageCLD/manage-prod-lines/manage-prod-lines.component';
import { ManageVerticalsComponent } from './Components/CloudTv/ManageCLD/manage-verticals/manage-verticals.component';
import { B2bUsersComponent } from './Components/CloudTv/ManageTvUsers/b2b-users/b2b-users.component';
import { CldtvUsersComponent } from './Components/CloudTv/ManageTvUsers/cldtv-users/cldtv-users.component';
import { D2cUsersComponent } from './Components/CloudTv/ManageTvUsers/d2c-users/d2c-users.component';

import { roleGuard } from './role.guard';
import { authGuard } from './auth.guard';
import { NotFoundComponentComponent } from './Components/not-found-component/not-found-component.component';
import { LogoComponentComponent } from './Components/logo-component/logo-component.component';
import { BrandsForMarketersComponent } from './Components/login/brands-for-marketers/brands-for-marketers.component';

export const routes: Routes = [

  { path: 'brands-for-marketers', component: BrandsForMarketersComponent },
  { path: 'backoffice', component: LogoComponentComponent },
  { path: 'backoffice/BOB2BAccountManagement', component: B2BAccountManagementComponent, canActivate: [roleGuard], data: { expectedRole: 'BO Super Admin' } },
  { path: 'backoffice/managescreen', component: ManageScreenComponent, canActivate: [roleGuard], data: { expectedRole: 'BO Super Admin' } },
  { path: 'backoffice/manageplaylist', component: ManagePlaylistComponent, canActivate: [roleGuard], data: { expectedRole: 'BO Super Admin' } },
  { path: 'backoffice/manageschedule', component: ManageScheduleComponent, canActivate: [roleGuard], data: { expectedRole: 'BO Super Admin' } },
  { path: 'backoffice/managelayout', component: ManageLayoutComponent, canActivate: [roleGuard], data: { expectedRole: 'BO Super Admin' } },
  { path: 'backoffice/managedayslabs', component: ManageDaySlabsComponent, canActivate: [roleGuard], data: { expectedRole: 'BO Super Admin' } },
  { path: 'backoffice/manageuptime', component: ManageUptimeComponent, canActivate: [roleGuard], data: { expectedRole: 'BO Super Admin' } },
  { path: 'backoffice/viewdailyscreenruns', component: ViewDailyScreenRunsComponent, canActivate: [roleGuard], data: { expectedRole: 'BO Super Admin' } },
  { path: 'backoffice/manageScreenPlayers', component: ManageScreenPlayersComponent, canActivate: [roleGuard], data: { expectedRole: 'BO Super Admin' } },
  { path: 'backoffice/mediaValidation', component: MediaValidationComponent, canActivate: [roleGuard], data: { expectedRole: 'BO Super Admin' } },
  { path: 'backoffice/ecomWorkflow', component: EcomWorflowComponent, canActivate: [roleGuard], data: { expectedRole: 'BO Super Admin' } },
  
  { path: 'demand-side', component: LogoComponentComponent},
  { path: 'demand-side/allocatePromos', component: AllocatePromosComponent, canActivate: [roleGuard], data: { expectedRole: 'DS Super Admin' } },
  { path: 'demand-side/myContentRepository', component: MyContentrepositoryDemandSideComponent, canActivate: [roleGuard], data: { expectedRole: 'DS Super Admin' } },
  { path: 'demand-side/myTransactionHistory', component: MyTransactionHistoryComponent, canActivate: [roleGuard], data: { expectedRole: 'DS Super Admin' } },
  { path: 'demand-side/manageUsers', component: ManageUsersDemandSideComponent, canActivate: [roleGuard], data: { expectedRole: 'DS Super Admin' } },
  { path: 'demand-side/manageSubAccounts', component: ManageSubAccountsDemandSideComponent, canActivate: [roleGuard], data: { expectedRole: 'DS Super Admin' } },
  
  { path: 'supply-side', component: LogoComponentComponent},
  { path: 'supply-side/manageUsers', component: ManageUsersSupplySideComponent, canActivate: [roleGuard], data: { expectedRole: 'SS Super Admin' } },
  { path: 'supply-side/myContentRepository', component: MyContentRepositorySupplySideComponent, canActivate: [roleGuard], data: { expectedRole: 'SS Super Admin' } },
  { path: 'supply-side/manageSubAccounts', component: ManageSubAccountsSupplySideComponent, canActivate: [roleGuard], data: { expectedRole: 'SS Super Admin' } },
  { path: 'supply-side/manageScreenSubscriptions', component: ManageScreenSubscriptionComponent, canActivate: [roleGuard], data: { expectedRole: 'SS Super Admin' } },
  { path: 'supply-side/myScreenMIS', component: MyScreenMISComponent, canActivate: [roleGuard], data: { expectedRole: 'SS Super Admin' } },
  { path: 'supply-side/myReceivedPayments', component: MyReceivedPaymentsComponent, canActivate: [roleGuard], data: { expectedRole: 'SS Super Admin' } },
  // { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: '', component: HomePageComponent, canActivate: [authGuard] },


  { path: 'cloud-tv', component: LogoComponentComponent },
  { path: 'cloud-tv/create-tv-on-cloud', component: CreateTvOnCloudComponent,canActivate: [roleGuard], data: { expectedRole: ['CLDTV Super Admin', 'CLDTV Admin', 'CLDTV D2C  Executive', 'CLDTV B2B Executive'] } },
  { path: 'cloud-tv/manage-content-providers', component: ManageContentProvidersComponent,canActivate: [roleGuard], data: { expectedRole: ['CLDTV Super Admin', 'CLDTV Admin', 'CLDTV D2C  Executive', 'CLDTV B2B Executive'] } },
  { path: 'cloud-tv/manage-oems', component: ManageOemsComponent,canActivate: [roleGuard], data: { expectedRole: ['CLDTV Super Admin', 'CLDTV Admin', 'CLDTV D2C  Executive', 'CLDTV B2B Executive'] } },
  { path: 'cloud-tv/manage-channels', component: ManageChannelsComponent,canActivate: [roleGuard], data: { expectedRole: ['CLDTV Super Admin', 'CLDTV Admin', 'CLDTV D2C  Executive', 'CLDTV B2B Executive'] } },
  { path: 'cloud-tv/manage-prod-lines', component: ManageProdLinesComponent,canActivate: [roleGuard], data: { expectedRole: ['CLDTV Super Admin', 'CLDTV Admin', 'CLDTV D2C  Executive', 'CLDTV B2B Executive'] } },
  { path: 'cloud-tv/manage-verticals', component: ManageVerticalsComponent,canActivate: [roleGuard], data: { expectedRole: ['CLDTV Super Admin', 'CLDTV Admin', 'CLDTV D2C  Executive', 'CLDTV B2B Executive'] } },
  { path: 'cloud-tv/b2b-users', component: B2bUsersComponent,canActivate: [roleGuard], data: { expectedRole: ['CLDTV Super Admin', 'CLDTV Admin', 'CLDTV D2C  Executive', 'CLDTV B2B Executive'] } },
  { path: 'cloud-tv/cldtv-users', component: CldtvUsersComponent,canActivate: [roleGuard], data: { expectedRole: ['CLDTV Super Admin', 'CLDTV Admin', 'CLDTV D2C  Executive', 'CLDTV B2B Executive'] } },
  { path: 'cloud-tv/d2c-users', component: D2cUsersComponent,canActivate: [roleGuard], data: { expectedRole: ['CLDTV Super Admin', 'CLDTV Admin', 'CLDTV D2C  Executive', 'CLDTV B2B Executive'] } },
  

  { path: 'manage-ch-opr', component: LogoComponentComponent },
  { path: 'manage-ch-opr/key-install-on-server', component: KeyInstallOnServerComponent,canActivate: [roleGuard], data: { expectedRole: ['Channel Super Admin', 'Channel Content Manager', 'Channel Content Executive'] } },
  { path: 'manage-ch-opr/manage-channel-subitems', component: ManageChannelSubitemsComponent,canActivate: [roleGuard], data: { expectedRole: ['Channel Super Admin', 'Channel Content Manager', 'Channel Content Executive'] } },
  { path: 'manage-ch-opr/manage-channel-items', component: ManageChannelTemsComponent,canActivate: [roleGuard], data: { expectedRole: ['Channel Super Admin', 'Channel Content Manager', 'Channel Content Executive'] } },
  { path: 'manage-ch-opr/manage-channel-users', component: ManageChannelUsersComponent,canActivate: [roleGuard], data: { expectedRole: ['Channel Super Admin', 'Channel Content Manager', 'Channel Content Executive'] } },

];  
