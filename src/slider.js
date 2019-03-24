import Asset from './lib/assets';
import Pager from './lib/pager';
export default class SimpleSlider {
    /**
     * コンストラクタ
     * @param {HTMLElement} element - スライダーを生成する要素
     * @param {Object} options - スライダーのオプション
     */
    constructor(element, current) {
        this._element = element;
        this._current = current;
    }

    get currentIndex() {
        return this._current;
    }

    set currentIndex(value) {
        if(typeof value === 'number') {
            this._current = value;
        }
    }
    /**
     * 初期化設定
     * @returns {Object}
     */
    initializeOptions(customOptions) {
    }

    moveSlider(index) {
        const container = this._element.getElementsByClassName('slider-container')[0];
        const images = this._element.getElementsByTagName('img');
        const max = images.length - 1;
        if (index < 0) {
            index = max;
        }

        if (index > max) {
            index = 0;
        }

        container.style.left = `${-100 * index}%`;

        //更新
        this._current = index;
    }
}