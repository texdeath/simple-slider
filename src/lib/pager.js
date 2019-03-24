export default class Pager {
    constructor() {
        this.elem = document.getElementById("pager");
        this.btn = this.elem.getElementsByTagName("a");
    }

    init() {
        const pagerNode = document.createElement('div');
        const btnNode = document.createElement('a');
        btnNode.setAttribute('href', '#');
        const prevBtn = btnNode.classList.add('slider-prev');
        const nextBtn = btnNode.classList.add('slider-next');
        pagerNode.classList.add('slider-pager');
        this._element = pagerNode;
    }

    setupListener(slides) {
        const pagerBtn = this.btn;
        for (let i = 0; i < pagerBtn.length; i++) {
            pagerBtn[i].addEventListener("click", e => {
                e.preventDefault();
                const target = e.target;

                //クリックしたページャーボタンが.pager-btn-prevであれば一つ前のスライドに切り替える
                if (target.classList.contains("pager-btn-prev")) {
                    slides.current = slides.current - 1;

                //.pager-btn-nextであれば一つ後のスライドに切り替える
                } else {
                    slides.current = slides.current + 1;
                }

                slides.move(slides.current);
            });
        }
    }
}