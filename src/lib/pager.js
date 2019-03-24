export default class Pager {
     /**
     * コンストラクタ
     * @param {string} prevText - 戻るボタンのテキスト
     * @param {string} nextText - 次へボタンのテキスト
     */
    constructor(prevText, nextText) {
        this.prevText = prevText;
        this.nextText = nextText;
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
     * @param {Move} move - Moveクラス
     * @param {Nav} nav - Navクラス
     * @param {Timer} timer - Timerクラス
     * @param {number} time - スライド時間
     * @param {Boolean} isNavigation - 初期設定でナビゲーションが有効になっているかどうか
     */
    setupListener(move, nav, timer, time, isNavigation) {
        this.setPager(move._element);
        const pagerBtn = this.element.getElementsByTagName('a');
        for (let i = 0; i < pagerBtn.length; i++) {
            pagerBtn[i].addEventListener("click", e => {
                e.preventDefault();
                const target = e.target;
                // ページャーをクリックしたらタイマーをリセットする
                timer.stop();
                //クリックしたページャーボタンが.pager-btn-prevであれば一つ前のスライドに切り替える
                if (target.classList.contains('pager-btn-prev')) {
                    move.current = move.current - 1;
                //.pager-btn-nextであれば一つ後のスライドに切り替える
                } else {
                    move.current = move.current + 1;
                }
                move.moveSlider(move.current);
                if(isNavigation) {
                    nav.update(move.current);
                }
                // タイマー再開
                timer.start(move, nav, time, isNavigation);
            });
        }
    }
}