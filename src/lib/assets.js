import _ from 'lodash';
import { transition } from './transitions';

export default class Asset {
    /**
     * DOM, 画像生成用クラスのコンストラクタ
     * @param {HTMLElement} element - スライダーを生成する要素
     * @param {number} width - 画像コンテナの横幅
     * @param {number} height - 画像コンテナの縦幅
     * @param {Array<Object>} images - 画像のパス・リンク先URL
     * @param {string} easing - Easing Functionの設定
     * @param {Boolean} random - 画像シャッフルの設定
     */
    constructor(element, width, height, images, easing, random) {
        this.element = element;
        this.width = width;
        this.height = height;
        this.images = images;
        this.easing = easing;
        this.sliderContainer = document.createElement('div');
        this.sliderContainer.classList.add('slider-container');
        this.random = random;
    }

    /**
     * DOM生成
     * @return {Void}
     */
    createSliderNodes() {
        this.element.style.cssText = `
            width: ${this.width}px;
            height : ${this.height}px;
            overflow: hidden;
        `;
        this.createImageNodes();
    }

    /**
     * 画像パスから画像DOMを生成
     * @return {Void}
     */
    createImageNodes() {
        if(this.random) {
            this.images = _.shuffle(this.images);
        }
        this.images.forEach((image, index) => {
            const contentNode = document.createElement('div');
            const linkNode = document.createElement('a');
            const imageNode = document.createElement('img');

            contentNode.classList.add('slider-content');
            imageNode.classList.add('slider-image');
            linkNode.setAttribute('href', image.url);
            imageNode.setAttribute('src', image.path);

            contentNode.style.cssText = `
                width: ${this._width}px;
                height : ${this._height}px;
            `;

            this.setContainerPotision(contentNode, index);

            linkNode.appendChild(imageNode);
            contentNode.appendChild(linkNode);
            this.sliderContainer.appendChild(contentNode);
            this.sliderContainer.style.transition = transition[this.easing]

        })
        this.element.appendChild(this.sliderContainer);
    }

    setContainerPotision(content, index) {
        content.style.left = `${100 * index}%`;
    }
}