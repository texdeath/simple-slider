import Asset from './assets';
import Pager from './pager';
import { transition } from './transitions';
export default class Move {
    /**
     * コンストラクタ
     * @param {HTMLElement} element - スライダーを生成する要素
     * @param {number} current - スライダーの現在位置
     */
    constructor(sliderContainer, element, current, easing) {
        this.element = element;
        this._current = current;
        this.containerElement = sliderContainer;
        //#slideshow-containerをmousedownしたときのポインターのx座標
        this.downX = 0;

        //#slideshow-containerをmousemoveしたときのポインターのx座標
        this.moveX = 0;

        //downX~moveXまでの距離
        this.differenceX = 0;

        //ドラッグしているかどうか
        this.isDragging = false;
        this.easing = easing;
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
     * @returns {Void}
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
    setupListener(timer, nav, time, isNavigation) {
        this.containerElement.addEventListener("mousedown", e => this.mouseDown(e));
        document.body.addEventListener("mousemove", e => this.mouseMove(e), {passive: false });
        document.body.addEventListener("mouseup", e => this.mouseUp(e, nav), {passive: false });
        document.body.addEventListener("mouseleave", e => this.mouseUp(e, nav), {passive: false });

        this.containerElement.addEventListener("touchstart", e => this.mouseDown(e));
        document.body.addEventListener("touchmove", e => this.mouseMove(e), {passive: false });
        document.body.addEventListener("touchend", e => this.mouseUp(e, nav), {passive: false });
        document.body.addEventListener("touchleave", e => this.mouseUp(e, nav), {passive: false });

        this.containerElement.addEventListener('mouseover', (e) => timer.stop());
        this.containerElement.addEventListener('mouseout', (e) => timer.start(this, nav, time, isNavigation));
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
            //右へslidesWidth / 4より多くドラッグしていれば移動する
            if (this.moveX > this.downX && Math.abs(this.differenceX) > slidesWidth / 4) {
                this._current -= 1;
            }
            //左へslidesWidth / 4より多くドラッグしていれば移動する
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