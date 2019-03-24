export default class Nav {
    /**
     * コンストラクタ
     * @param {HTMLElement} currentElement - 親要素
     * @param {HTMLElement} elem - ナビゲーション要素
     */
    constructor(currentElement) {
        this.currentElement = currentElement;
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
     * @param {Move} move - Moveクラス
     * @param {Timer} timer - Timerクラス
     * @param {number} time - スライド時間
     * @param {Boolean} isNavigation - 初期設定でナビゲーションが有効になっているかどうか
     */
    setupListener(move, timer, time, isNavigation) {
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
                timer.start(move, this, time, isNavigation);
            });
        }
    }

    /**
     * 現在表示されている画像と同じ番号のナビボタンをアクティブにする
     * @param {number} currentIndex - スライダーの現在位置
     */
    update(currentIndex) {
        console.log(currentIndex);
        const navBtn = this.elem.getElementsByTagName('a');
        //一旦全てのナビボタンをinactiveにする
        for (let i = 0; i < navBtn.length; i++) {
            navBtn[i].classList.remove("active");
        }
        //currentIndex番目のナビボタンをactiveにする
        navBtn[currentIndex].classList.add("active");
    }
}
