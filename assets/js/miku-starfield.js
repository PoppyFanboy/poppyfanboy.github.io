const canvasSize = document.getElementById("front-image").height;

const starfieldSpeed = 7;
const starDefaultSize = 10;
const starsCount = 300;

const mikuAmplitude = 50;
const mikuRotationSpeed = 0.004;
const mikuYSpeed = 0.01;

const app = new PIXI.Application({
    width: canvasSize,
    height: canvasSize
});
document.getElementById("front-thing").appendChild(app.view);

const blurSize = 48, radius = 48;
const circle = new PIXI.Graphics()
    .beginFill(0xFFFFFF)
    .drawCircle(radius + blurSize, radius + blurSize, radius)
    .endFill();
circle.filters = [ new PIXI.filters.BlurFilter(blurSize, 10) ];
const bounds = new PIXI.Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
const starTexture = app.renderer.generateTexture(circle, PIXI.SCALE_MODES.NEAREST, 1, bounds);

class Star {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.sprite = new PIXI.Sprite(starTexture);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = starDefaultSize;
        this.sprite.height = starDefaultSize;
    }

    update(delta) {
        this.z -= delta * starfieldSpeed;
        if (this.z < 1) {
            this.x = (Math.random() - 0.5) * canvasSize;
            this.y = (Math.random() - 0.5) * canvasSize;
            this.z = canvasSize;
        }

        this.sprite.x = (this.x / this.z) * canvasSize / 2;
        this.sprite.y = (this.y / this.z) * canvasSize / 2;
        const dScale = Math.sqrt(this.sprite.x * this.sprite.x + this.sprite.y * this.sprite.y) / (Math.sqrt(2) * canvasSize / 2);
        this.sprite.width = starDefaultSize * (1 - this.z / canvasSize);
        this.sprite.height = starDefaultSize * (1 - this.z / canvasSize);
        this.sprite.scale.x = dScale * dScale * starfieldSpeed * 0.05;
        this.sprite.rotation = Math.atan2(this.sprite.y, this.sprite.x);
    }
}

app.loader.add('miku', 'assets/images/miku-plush.png').load((loader, resources) => {
    const miku = new PIXI.Sprite(resources.miku.texture);

    app.stage.x = canvasSize / 2;
    app.stage.y = canvasSize / 2;

    miku.width = canvasSize / 2;
    miku.height = canvasSize / 2;
    miku.anchor.x = 0.5;
    miku.anchor.y = 0.5;

    let stars = Array.from({ length: starsCount }, () => {
        const x = (Math.random() - 0.5) * app.renderer.width;
        const y = (Math.random() - 0.5) * app.renderer.height;
        const z = Math.random() * app.renderer.width;
        return new Star(x, y, z);
    });

    stars.forEach(star => app.stage.addChild(star.sprite));
    app.stage.addChild(miku);

    let t = 0;
    app.ticker.add((delta) => {
        miku.rotation += mikuRotationSpeed * delta;
        miku.y = mikuAmplitude * Math.sin(t);
        t += mikuYSpeed;
        if (t >= 2 * Math.PI) {
            t -= 2 * Math.PI;
        }

        stars.forEach(star => star.update(delta));
    });
});