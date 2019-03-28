export default class Pager {
     /**
     * コンストラクタ
     * @param {string} prevText - 戻るボタンのテキスト
     * @param {string} nextText - 次へボタンのテキスト
     * @param {number} time - スライダー画像の表示時間
     * @param {Boolean} navigation - ナビゲーション表示可否設定
     */
    constructor(prevText, nextText, time, navigation) {
        this.prevText = prevText;
        this.nextText = nextText;
        this.time = time;
        this.navigation = navigation;
        this.element = this.initElement();
    }

     /**
     * ページャー初期化
     * @returns {HTMLElement} pagerNode
     */
    initElement() {
        const pagerNode = document.createElement('div');
        pagerNode.classList.add('slider-pager');
        const pagerBtn = ['prev', 'next'];
        pagerBtn.forEach(direction => {
            const btnNode = document.createElement('a');
            btnNode.setAttribute('href', '#');
            btnNode.classList.add(`pager-btn-${direction}`);
            btnNode.textContent = this[`${direction}Text`];
            pagerNode.appendChild(btnNode);
        })
        return pagerNode;
    }

     /**
     * ページャーの要素をセットする
     * @param {HTMLElement} currentElement - ページャーのコンテナ要素
     */
    setPager(currentElement) {
        currentElement.appendChild(this.element);
    }

     /**
     * ページャーをクリックできる状態にする
     * @param {Move} move - スライダー移動用インスタンス
     * @param {Nav} nav - ナビゲーション用インスタンス
     * @param {Timer} timer - タイマー管理用インスタンス
     */
    setupListener(move, nav, timer) {
        this.setPager(move.element);
        const pagerBtn = this.element.getElementsByTagName('a');
        for (let i = 0; i < pagerBtn.length; i++) {
            pagerBtn[i].addEventListener("click", e => {
                e.preventDefault();
                const target = e.target;
                // ページャーをクリックしたらタイマーをリセットする
                timer.stop();
                //クリックしたページャーボタンが.pager-btn-prevであれば一つ前のスライドに切り替える
                if (target.classList.contains('pager-btn-prev')) {
                    move.currentIndex = move.currentIndex - 1;
                //.pager-btn-nextであれば一つ後のスライドに切り替える
                } else {
                    move.currentIndex = move.currentIndex + 1;
                }
                move.moveSlider(move.currentIndex);
                if(this.navigation) {
                    nav.update(move.currentIndex);
                }
                // タイマー再開
                timer.start(move, nav, this.time, this.navigation);
            });
        }
    }
}