import { transition } from './transitions';
export default class Move {
    /**
     * コンストラクタ
     * @param {HTMLElement} sliderContainer - スライダーの親要素
     * @param {HTMLElement} element - スライダーを生成する要素
     * @param {number} current - スライダーの現在位置
     * @param {string} easing - イージングの設定
     * @param {number} time - スライダー画像の表示時間
     * @param {Boolean} navigation - ナビゲーション表示可否設定
     */
    constructor(sliderContainer, element, current, easing, time, navigation) {
        this.element = element;
        this._current = current;
        this.containerElement = sliderContainer;
        //コンテナをmousedownしたときのポインターのx座標
        this.downX = 0;
        //コンテナをmousemoveしたときのポインターのx座標
        this.moveX = 0;
        //downX~moveXまでの距離
        this.differenceX = 0;
        //ドラッグしているかどうか
        this.isDragging = false;
        this.easing = easing;
        this.time = time;
        this.navigation = navigation;
    }

    get currentIndex() {
        return this._current;
    }

    set currentIndex(value) {
        if (typeof value === 'number') {
            this._current = value;
        }
    }

    /**
     * スライダーを動作させる処理
     * @param {number} index - 現在のコンテンツのインデックス
     */
    moveSlider(index) {
        const images = this.element.getElementsByTagName('img');
        const max = images.length - 1;
        if (index < 0) {
            index = max;
        }
        if (index > max) {
            index = 0;
        }
        this.containerElement.style.left = `${-100 * index}%`;
        //更新
        this._current = index;
    }

    /**
     * ドラッグ&ドロップでスライドを移動できる状態にする
     */
    setupListener(timer, nav) {
        this.containerElement.addEventListener("mousedown", e => this.mouseDown(e));
        document.body.addEventListener("mousemove", e => this.mouseMove(e), { passive: false });
        document.body.addEventListener("mouseup", e => this.mouseUp(e, nav), { passive: false });
        document.body.addEventListener("mouseleave", e => this.mouseUp(e, nav), { passive: false });

        this.containerElement.addEventListener("touchstart", e => this.mouseDown(e));
        document.body.addEventListener("touchmove", e => this.mouseMove(e), { passive: false });
        document.body.addEventListener("touchend", e => this.mouseUp(e, nav), { passive: false });
        document.body.addEventListener("touchleave", e => this.mouseUp(e, nav), { passive: false });

        this.containerElement.addEventListener('mouseover', (e) => timer.stop());
        this.containerElement.addEventListener('mouseout', (e) => timer.start(this, nav, this.time, this.navigation));
    }

    /**
     * mousedownされると実行されるメソッド
     */
    mouseDown(e) {
        e.preventDefault();

        let event;

        if (e.type === "mousedown") {
            event = e;
        } else {
            event = e.changedTouches[0];
        }

        this.downX = event.clientX;

        //ドラッグ開始
        this.isDragging = true;
    }

    /**
     * mouse{move}されると実行されるメソッド
     */
    mouseMove(e) {
        if (this.isDragging) {
            e.preventDefault();

            let event;
            if (e.type === "mousemove") {
                event = e;
            } else {
                event = e.changedTouches[0];
            }
            this.moveX = event.clientX;
            this.differenceX = this.moveX - this.downX;
            const slidesWidth = this.containerElement.clientWidth;
            this.containerElement.style.transform = `translateX(${Move.clamp(this.differenceX, this.differenceX - slidesWidth, this.differenceX + slidesWidth)}px)`;
        }
    }

    /**
     * mouseupされると実行されるメソッド
     */
    mouseUp(e, nav) {
        this.containerElement.style.transition = "all 0.5s ease";
        this.containerElement.style.transform = '';

        if (this.isDragging) {
            //ドラッグ終了
            this.isDragging = false;
            const slidesWidth = this.containerElement.clientWidth;
            //右へslidesWidth / 6より多くドラッグしていれば移動する
            if (this.moveX > this.downX && Math.abs(this.differenceX) > slidesWidth / 4) {
                this._current -= 1;
            }
            //左へslidesWidth / 6より多くドラッグしていれば移動する
            if (this.moveX < this.downX && Math.abs(this.differenceX) > slidesWidth / 4) {
                this._current += 1;
            }
            //スライドを移動
            this.moveSlider(this._current);
            //ナビゲーションを更新
            nav.update(this._current);
            //transition後に次に備えて元に戻す
            setTimeout(() => {
                this.containerElement.style.transition = transition[this.easing];
            }, 500);
        }
    }
    //スライドの移動範囲を制限するメソッド
    static clamp(number, min, max) { //numberをminからmaxまでの値で返す
        return Math.max(min, Math.min(number, max));
    }
}