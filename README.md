# Simple-Slider

## Usage
```shell
yarn add simple-responsible-slider # or npm install simple-responsible-slider
```

## HTML
- Download [Build Module.](https://github.com/texdeath/simple-slider/archive/develop.zip)
- Copy your Project `simple_responsible_slider.js` and `simple-slider.css`
```html
<link rel="stylesheet" type="text/css" href="./simple-slider.css">
<script src="./simple_responsible_slider.js"></script>
...
<div class="simple-slider"></div>
...
<script>
    const slider = new lib.Slider(".simple-slider", {
        width: 950,
        height: 333,
        easing: 'easeInBack',
        autoStart: true,
        pager : true,
        navigation : true,
        random : true,
        responsible : true,
        images: [{
            path: "./assets/1.jpg",
            url: "https://google.co.jp",
        },
        {
            path: "./assets/2.jpg",
            url: "https://yahoo.co.jp",
        },
        {
            path: "./assets/3.jpg",
            url: "https://amazon.co.jp",
        },
        {
            path: "./assets/4.jpg",
            url: "https://www.paypal.com/jp/home",
        },
        {
            path: "./assets/5.jpg",
            url: "https://www.microsoft.com/ja-jp",
        }]
    });
    slider.getSlider()
</script>

```

## Options

|  Name  |  Type  | Description |
| ---- | ---- | ---- |
|  width  |  `number` | Slider Container width |
|  height  |  `number` | Slider Container height |
|  easing  |  `string` | Use [Easing Function](https://easings.net/en) |
|  autoStart  |  `Boolean` | The slider will start automatically if it is `true` |
|  pager  |  `Boolean` | Wither to display pager |
|  navigation  |  `Boolean` | Wither to display navigation |
|  random  |  `Boolean` | Arrange image paths randomly |
|  responsible  |  `Boolean` | Corresponds to responsive |
|  images  |  `Array<Object>` | path: Images
Relative path. url: Images Link URL. |




