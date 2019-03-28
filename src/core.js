import Move from './lib/move';
import Asset from './lib/assets';
import Nav from './lib/nav';
import Pager from './lib/pager';
import Timer from './lib/timer';

export default class SimpleSlider {
    /**
     * コンストラクタ
     * @param {HTMLElement} element - スライダーを生成する要素
     * @param {Object} options - スライダーのオプション
     */
    constructor(element, options) {
        this._element = document.querySelector(element);
        this._height =  300;
        this._width = 700;
        this._direction = "horizontal";
        this._loop = true;
        this._time = 3000;
        this._images = []
        this._overflow = 'hidden';
        this._autoStart = true;
        this._current = 0;
        this._easing = 'linear';
        this._pager = true,
        this._loop = false,
        this._random = true,
        this._navigation = true,
        this._prevText = '<';
        this._nextText = '>';
        this._responsible = true;
        // HTMLでのインスタンス呼び出し時に初期値がセットされていないものは、コンストラクタの初期値を利用する
        Object.keys(options).forEach(opt => {
            if(options[opt] !== undefined) {
                this[`_${opt}`] = options[opt];
            }
        })
    }

    /**
     * インスタンス初期化
     */
    init() {
        const asset = new Asset(
            this._element,
            this._width,
            this._height,
            this._images,
            this._easing,
            this._random,
            this._responsible
            );
        const pager = new Pager(
            this._prevText,
            this._nextText,
            this._time,
            this._navigation
            );
        const timer = new Timer(
            this._time,
            this._navigation
        );
        const nav = new Nav(
            this._element,
            this._images,
            this._time,
            this._navigation
            );
        const move = new Move(
            asset.sliderContainer,
            this._element,
            this._current,
            this._easing,
            this._time,
            this._navigation
            );
        // スライダー用ノード作成
        asset.createSliderNodes();
        // イベントリスナ設定
        move.setupListener(timer, nav);
        // 自動スタート有効判定
        if(this._autoStart) {
            timer.start(move, nav)
        }
        // ナビゲーション有効判定
        if(this._navigation) {
            nav.setNavigation(this._images.length)
            nav.update(move.currentIndex);
            nav.setupListener(move, timer);
        }
        // ページャー有効判定
        if(this._pager) {
            pager.setupListener(move, nav, timer);
        }
    }

    /**
     * スライダー開始
     */
    getSlider() {
        this.init();
    }
}