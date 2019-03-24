export default class Timer {
    /**
     * コンストラクタ
     */
    constructor() {
        this.timer = null;
    }

     /**
     * タイマー有効化
     * @param {Move} move - Moveクラス
     * @param {Nav} nav - Navクラス
     * @param {number} time - スライド時間
     * @param {Boolean} isNavigation - 初期設定でナビゲーションが有効になっているかどうか
     */
    start(move, nav, time, isNavigation) {
        this.timer = setInterval(() => {
            move.currentIndex +=1;
            move.moveSlider(move.currentIndex)
            if(isNavigation) {
                nav.update(move.currentIndex);
            }
        },time)
    }

    /**
     * タイマー初期化
     */
    stop() {
        clearInterval(this.timer);
    }
}