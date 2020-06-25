const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 650,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 200
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

const game = new Phaser.Game(config)

let person
let goodApple
let badApple
let background

function preload() {
    this.load.image('background', '../images/apple-tree.png')
    this.load.image('boy', '../images/boy.png')
    this.load.image('goodApple', '../images/mini-apple.png')
    this.load.image('badApple', '../images/mini-bad-apple/png')
}

function create() {
    background = this.add.image(0, 0, 'background').setOrigin(0).setScale(0.85)


    person = this.add.sprite(500, 540, 'boy')

    this.input.keyboard.on('keydown_D', function (event) {
        person.x += 30
    })

    this.input.keyboard.on('keydown_A', function (event) {
        person.x -= 30
    })

    // goodApple = game.add.emitter(game, 100, 0, 100)
    // goodApple.makeParticles('goodApple', 1000, 20, true, true)
    // goodApple.start(false, 8000, 500)
}

function update() {

}