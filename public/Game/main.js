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
let heart
let heart2
let heart3
let lives = 3
let music
let isPlaying = false
let win
let gameOver

function preload() {
    this.load.audio('backgroundMusic', ['../images/yellow-forest.ogg'])
    this.load.image('background', '../images/apple-tree.png')
    this.load.image('ground', '../images/ground.png')
    this.load.image('boy', '../images/boy.png')
    this.load.image('heart', '../images/heart.png')
    this.load.image('win', '../images/youWin.png')
    this.load.image('gameOver', '../images/gameOver.png')
    this.load.spritesheet('goodApple', '../images/mini-apple.png', {
        frameWidth: 90,
        frameHeight: 90,
        spacing: 1
    })
    this.load.spritesheet('badApple', '../images/mini-bad-apple.png', {
        frameWidth: 90,
        frameHeight: 90,
        spacing: 1
    })
}

function create() {
    const musicConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    }
    music = this.sound.add('backgroundMusic', musicConfig)

    background = this.add.image(0, 0, 'background').setOrigin(0).setScale(0.85)

    ground = this.physics.add.staticSprite(600, 675, 'ground')

    scoreText = this.add.text(16, 16, 'Score: 0', {
        fontSize: '20px',
        fill: '#000'
    })

    gameOver = this.add.sprite(600, 300, 'gameOver')
    gameOver.visible = false

    win = this.add.sprite(550, 300, 'win')
    win.visible = false

    heart = this.add.image(25, 50, 'heart')
    heart2 = this.add.image(55, 50, 'heart')
    heart3 = this.add.image(85, 50, 'heart')

    person = this.physics.add.sprite(500, 500, 'boy')

    this.input.keyboard.on('keydown_D', function (event) {
        person.x += 20

        if (isPlaying === false) {
            music.play()
            isPlaying = true
        }
    })

    this.input.keyboard.on('keydown_A', function (event) {
        person.x -= 20

        if (isPlaying === false) {
            music.play()
            isPlaying = true
        }
    })

    goodApple = this.physics.add.group()

    goodApple.createMultiple({
        key: 'goodApple',
        frame: Phaser.Utils.Array.NumberArray(0, 11),
        randomFrame: true,
        repeat: 2

    })

    goodApple.children.iterate((child) => {
        let y = Phaser.Math.Between(-1000, -2000)
        let x = Phaser.Math.Between(0, 1200)
        child.setY(y)
        child.setX(x)
        child.setMaxVelocity(200)
    })

    badApple = this.physics.add.group()

    badApple.createMultiple({
        key: 'badApple',
        frame: Phaser.Utils.Array.NumberArray(0, 3),
        randomFrame: true,
        repeat: 1
    })

    badApple.children.iterate((child) => {
        let y = Phaser.Math.Between(-1000, -2000)
        let x = Phaser.Math.Between(0, 1200)
        child.setY(y)
        child.setX(x)
        child.setMaxVelocity(200)
    })


    this.physics.add.collider(person, ground)
    this.physics.add.collider(person, badApple, function (person, badApple) {
        badApple.destroy()
        lives -= 1
    })
    this.physics.add.overlap(person, goodApple, collectFood)

}

function update(time, delta) {
    this.physics.world.wrap(goodApple, 300)
    this.physics.world.wrap(badApple, 300)

    if (lives === 2) {
        heart3.destroy()
    } else if (lives === 1) {
        heart2.destroy()
    } else if (lives <= 0) {
        heart.destroy()
        this.physics.pause()
        person.setTint('#FF0000')
        gameOver.visible = true
    }

    if (score === 30 && lives > 0) {
        this.physics.pause()
        person.destroy()
        win.visible = true
    }
}

function collectFood(person, goodApple) {
    goodApple.disableBody(true, true)

    score += 1

    scoreText.setText('Score: ' + score)
}
