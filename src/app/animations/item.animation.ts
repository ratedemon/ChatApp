import {trigger,state,style,animate,transition, keyframes, group, query, stagger} from '@angular/animations';

export const itemAnim = trigger('itemAnim', 
[
  state('*', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
transition(
  ':enter', [
    style({transform: 'translateX(100%)', opacity: 0}),
    animate('500ms', style({transform: 'translateX(0)', 'opacity': 1}))
  ]
),
transition(
  ':leave', [
    // style({transform: 'translateX(0)', 'opacity': 1}),
    animate('500ms', style({transform: 'translateX(100%)', 'opacity': 0})
)])]
);

export const myAnim = trigger('myAnim', [
        transition('void => *', [
            query('*', style({ opacity: 0, background: 'blue' }), {optional: true}),
            query('*', stagger('300ms', [
                animate('0.8s ease-in', keyframes([
                    style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
                    style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
                    style({opacity: 1, transform: 'translateY(0)', offset: 1.0}),
                    ]))]), {optional: true}),
            ]),
        transition('* => void', [
            query('*', style({ opacity: 1, background: 'red' }), {optional: true}),
            query('*', stagger('300ms', [
                animate('0.8s ease-in', keyframes([
                    style({opacity: 1, transform: 'translateY(0)', offset: 0}),
                    style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
                    style({opacity: 0, transform: 'translateY(-75%)', offset: 1.0}),
                    ]))]), {optional: true}),
            ])
        ])

// trigger(
//             "myAnim",
//             [
//                 state(
//                     "none",
//                     style({
//                         backgroundColor: "white",
//                         color: "black"
//                     })
//                 ),
//                 state(
//                     "red",
//                     style({
//                         backgroundColor: "red",
//                         color: "white"
//                     })
//                 ),
//                 state(
//                     "blue",
//                     style({
//                         backgroundColor: "blue",
//                         color: "white"
//                     })
//                 ),
//                 transition( "none => red", animate( "2000ms ease-in-out" ) ),
//                 transition( "red => blue", animate( "2000ms ease-in-out" ) )
//             ]
//         )

// trigger('myAnim',[
//   state('none', style({
//     transform: 'scale(0.5)'
//   })),
//   state('small', style({
//     transform: 'scale(1)'
//   })),
//   state('large', style({
//     transform: 'scale(3)'
//   })),
//   transition('none =>small', animate("2000ms ease-in-out")),
//   transition('small => large', animate("2000ms ease-in-out"))
// ]);

/*trigger('itemAnim', [
  transition(':enter', [
    style({transform: 'translateX(-100%)'}),
    animate(350)
  ]),
  transition(':leave', [
    group([
      animate('0.2s ease', style({
        transform: 'translate(150px,25px)'
      })),
      animate('0.5s 0.2s ease', style({
        opacity: 0
      }))
    ])
  ])
]);*/