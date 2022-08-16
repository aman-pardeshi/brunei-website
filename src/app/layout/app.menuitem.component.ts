import { Component, Input, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuService } from './app.menu.service';
import { AppLayoutComponent } from './app.layout.component';
import { AppComponent } from '../app.component';

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-menuitem]',
    /* tslint:enable:component-selector */
    template: `
          <ng-container *ngIf="visible">
              <div *ngIf="root" class="layout-menuitem-root-text">{{item.label}}</div>
              <a [attr.href]="item.url" (click)="itemClick($event)" *ngIf="!item.routerLink || item.items" (mouseenter)="onMouseEnter()"
                 (keydown.enter)="itemClick($event)"  [attr.target]="item.target" [attr.tabindex]="0" [ngClass]="item.class"
                 [pTooltip]="item.label" [tooltipDisabled]="active || !(root && appLayout.isSlim() && !appLayout.isMobile())" tooltipStyleClass="layout-tooltip" pRipple>
                  <i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
                  <span class="layout-menuitem-text">{{item.label}}</span>
				  <i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="item.items"></i>
              </a>
              <a (click)="itemClick($event)" (mouseenter)="onMouseEnter()" *ngIf="item.routerLink && !item.items"
                  [routerLink]="item.routerLink" routerLinkActive="active-menuitem-routerlink"
                  [routerLinkActiveOptions]="{exact: !item.preventExact}" [attr.target]="item.target" [attr.tabindex]="0" [ngClass]="item.class"
                 [pTooltip]="item.label" [tooltipDisabled]="active || !(root && appLayout.isSlim() && !appLayout.isMobile())" tooltipStyleClass="layout-tooltip" pRipple>
                  <i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
                  <span class="layout-menuitem-text">{{item.label}}</span>
				  <i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="item.items"></i>
              </a>
              <ul *ngIf="item.items" role="menu" [@children]="(root ? 'visible' : active ? 'visibleAnimated' : 'hiddenAnimated')">
                  <ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
                      <li app-menuitem [item]="child" [index]="i" [parentKey]="key" [class]="child.badgeClass"></li>
                  </ng-template>
              </ul>
          </ng-container>
      `,
    host: {
        '[class.layout-root-menuitem]': 'root',
        '[class.active-menuitem]': '(active && !root) || (active && appLayout.isSlim())'
    },
    animations: [
        trigger('children', [
            state('void', style({
                height: '0px'
            })),
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('void => visibleAnimated, visibleAnimated => void',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMenuitemComponent implements OnInit, OnDestroy {

    @Input() item: any;

    @Input() index: number;

    @Input() root: boolean;

    @Input() parentKey: string;

    active = false;

    menuSourceSubscription: Subscription;

    menuResetSubscription: Subscription;

    key: string;

    constructor(public appLayout: AppLayoutComponent, public app: AppComponent, public router: Router,
                private cd: ChangeDetectorRef, private menuService: MenuService) {
        this.menuSourceSubscription = this.menuService.menuSource$.subscribe(key => {
            // deactivate current active menu
            if (this.active && this.key !== key && key.indexOf(this.key) !== 0) {
                this.active = false;
            }
        });

        this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
            this.active = false;
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(params => {
                if (this.appLayout.isSlim()) {
                    this.active = false;
                } else {
                    if (this.item.routerLink) {
                        this.updateActiveStateFromRoute();
                    } else {
                        this.active = false;
                    }
                }
            });
    }

    ngOnInit() {
        if (!this.appLayout.isSlim() && this.item.routerLink) {
            this.updateActiveStateFromRoute();
        }

        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);
    }

    updateActiveStateFromRoute() {
        this.active = this.router.isActive(this.item.routerLink[0], !this.item.items && !this.item.preventExact);
    }

    itemClick(event: Event) {
        // avoid processing disabled items
        if (this.item.disabled) {
            event.preventDefault();
            return;
        }

        // notify other items
        this.menuService.onMenuStateChange(this.key);

        // execute command
        if (this.item.command) {
            this.item.command({originalEvent: event, item: this.item});
        }

        // toggle active state
        if (this.item.items) {
            this.active = !this.active;
        } else {
            // activate item
            this.active = true;

            if (this.appLayout.isMobile()) {
                this.appLayout.staticMenuMobileActive = false;
            }

            // reset slim menu
            if (this.appLayout.isSlim()) {
                this.menuService.reset();
                this.appLayout.menuHoverActive = false;
            }
        }

        this.removeActiveInk(event);
    }

    removeActiveInk(event: Event) {
        const currentTarget = (event.currentTarget as HTMLElement);
        setTimeout(() => {
            if (currentTarget) {
                const activeInk = currentTarget.querySelector('.p-ink-active');
                if (activeInk) {
                    if (activeInk.classList) {
                        activeInk.classList.remove('p-ink-active');
                    }
                    else {
                        activeInk.className = activeInk.className.replace(new RegExp('(^|\\b)' + 'p-ink-active'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                    }
                }
            }
        }, 401);
    }

    onMouseEnter() {
        // activate item on hover
        if (this.root && this.appLayout.menuHoverActive && this.appLayout.isSlim() && !this.appLayout.isMobile() && !this.appLayout.isTablet()) {
            this.menuService.onMenuStateChange(this.key);
            this.active = true;
        }
    }

    get visible() {
        return this.item ? (typeof this.item.visible === 'function' ? this.item.visible() : this.item.visible !== false) : false;
    }

    ngOnDestroy() {
        if (this.menuSourceSubscription) {
            this.menuSourceSubscription.unsubscribe();
        }

        if (this.menuResetSubscription) {
            this.menuResetSubscription.unsubscribe();
        }
    }
}
