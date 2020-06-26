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
        update: update,
        collectFood: collectFood
    }
}

const game = new Phaser.Game(config)

let person
let goodApple
let badApple
let background
let scoreText
let score = 0
let ground

function preload() {
    this.load.image('background', '../images/apple-tree.png')
    this.load.image('ground', '../images/ground.png')
    this.load.image('boy', '../images/boy.png')
    this.load.spritesheet('goodApple', '../images/mini-apple.png', {
        frameWidth: 100,
        frameHeight: 100,
        spacing: 1
    })
    // this.load.spritesheet('badApple', '../images/mini-bad-apple/png')
}

function create() {
    background = this.add.image(0, 0, 'background').setOrigin(0).setScale(0.85)
    ground = this.physics.add.staticSprite(600, 675, 'ground')

    scoreText = this.add.text(16, 16, 'Score: 0', {
        fontSize: '20px',
        fill: '#000'
    })

    person = this.physics.add.sprite(500, 500, 'boy')


    this.input.keyboard.on('keydown_D', function (event) {
        person.x += 20
    })

    this.input.keyboard.on('keydown_A', function (event) {
        person.x -= 20
    })

    goodApple = this.physics.add.group()
    goodApple.createMultiple({
        key: 'goodApple',
        frame: Phaser.Utils.Array.NumberArray(0, 13),
        randomFrame: true,
        repeat: 1

    })

    goodApple.children.iterate((child) => {
        let y = Phaser.Math.Between(-200, -2000)
        let x = Phaser.Math.Between(0, 1200)
        child.setY(y)
        child.setX(x)
        child.setMaxVelocity(200)
    })

    this.physics.add.collider(person, ground)
    // this.physics.add.collider(person, goodApple, function (person, goodApple) {
    //     goodApple.destroy()
    // })
    this.physics.add.overlap(person, goodApple, collectFood)
}

function update(time, delta) {
    this.physics.world.wrap(goodApple, 300)
}

function collectFood(person, goodApple) {
    goodApple.disableBody(true, true)

    score += 1
    scoreText.setText('Score: ' + score)
}