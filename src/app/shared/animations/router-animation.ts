import { trigger, animate, transition, style, query } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
    transition('* => *', [
        query(
            ':enter', [style({ opacity: 0 })],
            { optional: true }
        ),
        query(
            ':leave', [style({ opacity: 1 }), animate('200ms', style({ opacity: 0 }))],
            { optional: true }
        ),
        query(
            ':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))],
            { optional: true }
        )
    ])
]);
