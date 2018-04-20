import * as Rx from 'rxjs/Rx';


export default class AnimationLoop {

    static animationEngine$: Rx.Observable<number> = Rx.Observable
        .of(0, Rx.Scheduler.animationFrame)
        .repeat()
        .share()

}