import { trigger, transition, style, animate, sequence, state, query } from '@angular/animations';

export const fadeRowAnimation =
    trigger('fadeRowAnimation', [
        transition('void => *', [
            style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
            sequence([
                animate(".4s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none' })),
                animate(".4s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
            ])
        ])
    ]);


export const flyOut =
    trigger('flyInOut', [
        state('in', style({ opacity: 1, transform: 'translateX(0)' })),
        transition('void => *', [
            style({
                opacity: 0,
                transform: 'translateX(-100%)'
            }),
            animate('.5s 1s ease-in')
        ]),
        transition('* => void', [
            animate('0.2s 0.1s ease-out', style({
                opacity: 0,
                transform: 'translateX(100%)'
            }))
        ])
    ]);


export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', [
        query(
            ':enter',
            [style({ opacity: 0 })],
            { optional: true }
        ),
        query(
            ':leave',
            [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
            { optional: true }
        ),
        query(
            ':enter',
            [style({ opacity: 0 }), animate('0.4s', style({ opacity: 1 }))],
            { optional: true }
        )
    ])
]);
