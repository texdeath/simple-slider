import Slider from './slider';
import Asset from './lib/assets';
import Nav from './lib/nav';
import Pager from './lib/nav';

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
        Object.keys(options).forEach(opt => {
            if(options[opt] !== undefined) {
                this[`_${opt}`] = options[opt];
            }
        })
    }

    /**
     * スライダー開始
     * @return {Void}
     */
    getSlider() {
        const asset = new Asset(this._element, this._width, this._height, this._images, this._easing, this._direction);
        const pager = new Pager();
        const slider = new Slider(this._element, this._current);
        asset.createSliderNodes()
        if(this._autoStart) {
            setInterval(() => {
                this._current +=1;
                slider.moveSlider(this._current)
            },this._time)
        }
        pager.setupListener(slider);
    }
}

// export { default as Slider } from './slider.js';