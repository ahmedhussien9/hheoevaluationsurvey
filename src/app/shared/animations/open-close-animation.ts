import { trigger, state, style, transition, animate } from "@angular/animations";


export const openAndCloseAnimation = trigger('slideInOut', [
    state('in', style({
        overflow: 'hidden',
        height: '*',
        padding: '2rem auto'
    })),
    state('out', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px',
        width: '0px'
    })),
    transition('in => out', animate('500ms ease-in-out')),
    transition('out => in', animate('500ms ease-in-out'))
])