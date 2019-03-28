export default class Timer {
    /**
     * コンストラクタ
     * @param {number} time - スライダー画像の表示時間
     * @param {Boolean} navigation - ナビゲーション表示可否設定
     */
    constructor(time, navigation) {
        this.timer = null;
        this.time = time;
        this.navigation = navigation;
    }

     /**
     * タイマー有効化
     * @param {Move} move - スライダー移動用インスタンス
     * @param {Timer} timer - タイマー管理用インスタンス
     */
    start(move, nav) {
        this.timer = setInterval(() => {
            move.currentIndex +=1;
            move.moveSlider(move.currentIndex)
            if(this.navigation) {
                nav.update(move.currentIndex);
            }
        },this.time)
    }

    /**
     * タイマー初期化
     */
    stop() {
        clearInterval(this.timer);
    }
}