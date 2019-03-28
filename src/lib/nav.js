export default class Nav {
    /**
     * コンストラクタ
     * @param {HTMLElement} currentElement - 親要素
     * @param {number} time - スライダー画像の表示時間
     * @param {Boolean} navigation - ナビゲーション表示可否設定
     */
    constructor(currentElement, time, navigation) {
        this.currentElement = currentElement;
        this.time = this.time;
        this.navigation = this.navigation;
        this.elem = document.createElement("nav");
        this.elem.classList.add('pager-nav');
    }

    /**
     * navに画像の枚数だけボタンを挿入する
     * @param {number} imagesLength - 受け取った配列長
     */
    setNavigation(imagesLength) {
        for (let i = 0; i < imagesLength; i++) {

            //ナビボタンを生成
            const navBtn = document.createElement("a");
            navBtn.classList.add('nav-btn');
            navBtn.setAttribute("href", "#");
            navBtn.style.left = `${i * 30}px`;
            //ナビボタンをnavに挿入
            this.elem.appendChild(navBtn);
        }
        this.currentElement.appendChild(this.elem);
    }

    /**
     * ナビゲーションをクリックできる状態にする
     * @param {Move} move - スライダー移動用インスタンス
     * @param {Timer} timer - タイマー管理用インスタンス
     */
    setupListener(move, timer) {
        const navBtn = this.elem.getElementsByTagName('a');

        //ナビボタンをクリックするとクリックしたナビボタンと同じ番号のスライドに切り替える
        for (let i = 0; i < navBtn.length; i++) {
            navBtn[i].addEventListener("click", e => {
                e.preventDefault();
                const target = e.target;
                // ページャーをクリックしたらタイマーをリセットする
                timer.stop();

                const targetIndex = [].slice.call(navBtn).indexOf(target);

                //クリックしたナビボタンと同じ番号のスライドに切り替える
                move.moveSlider(targetIndex);

                //targetIndex番目のナビボタンをアクティブにする
                this.update(targetIndex);
                // タイマー再開
                timer.start(move, this, this.time, this.navigation);
            });
        }
    }

    /**
     * 現在表示されている画像と同じ番号のナビボタンをアクティブにする
     * @param {number} currentIndex - スライダーの現在位置
     */
    update(currentIndex) {
        const navBtn = this.elem.getElementsByTagName('a');
        //一旦全てのナビボタンをinactiveにする
        for (let i = 0; i < navBtn.length; i++) {
            navBtn[i].classList.remove("active");
        }
        //currentIndex番目のナビボタンをactiveにする
        navBtn[currentIndex].classList.add("active");
    }
}
