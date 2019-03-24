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
        const asset = new Asset(this._element, this._width, this._height, this._images, this._easing, this._random);
        const pager = new Pager(this._prevText, this._nextText);
        const timer = new Timer();
        const nav = new Nav(this._element, this._images);
        const move = new Move(this._element, this._current);
        asset.createSliderNodes();
        // 自動スタート有効判定
        if(this._autoStart) {
            timer.start(move, nav, this._time, this._navigation)
        }
        // ナビゲーション有効判定
        if(this._navigation) {
            nav.setNavigation(this._images.length)
            nav.update(move.currentIndex);
            nav.setupListener(move, timer, this._time, this._navigation);
        }
        // ページャー有効判定
        if(this._pager) {
            pager.setupListener(move, nav, timer, this._time, this._navigation);
        }
    }

    /**
     * スライダー開始
     */
    getSlider() {
        this.init();
    }
}