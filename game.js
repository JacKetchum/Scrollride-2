var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var cursors;
var projectiles;
var lastProjectileTime = 0;
var projectileInterval = 1000; // Spawn a projectile every 1000 ms

var game = new Phaser.Game(config);

function preload () {
    this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
    this.load.image('jetpack', 'https://labs.phaser.io/assets/sprites/jetpack.png');
    this.load.image('projectile', 'https://labs.phaser.io/assets/sprites/bomb.png'); // Placeholder image for projectile
}

function create () {
    // Add background
    this.add.image(400, 300, 'sky');

    // Create the player
    player = this.physics.add.sprite(100, 450, 'jetpack');
    player.setGravityY(300);

    // Create a group for projectiles
    projectiles = this.physics.add.group();

    // Player input
    cursors = this.input.keyboard.createCursorKeys();

    // Collision between player and projectiles
    this.physics.add.collider(player, projectiles, hitProjectile, null, this);
}

function update (time) {
    // Player controls
    if (cursors.up.isDown) {
        player.setVelocityY(-300);
    } else if (cursors.down.isDown) {
        player.setVelocityY(300);
    } else {
        player.setVelocityY(0);
    }

    // Spawn new projectiles
    if (time > lastProjectileTime + projectileInterval) {
        var projectile = projectiles.create(800, Phaser.Math.Between(100, 500), 'projectile');
        projectile.setVelocityX(-200); // Set the horizontal velocity to negative so it moves left
        lastProjectileTime = time;
    }

    // Remove off-screen projectiles
    projectiles.getChildren().forEach(function(projectile) {
        if (projectile.x < -50) {
            projectiles.remove(projectile, true, true);
        }
    });
}

// Handle collision with projectile
function hitProjectile (player, projectile) {
    this.physics.pause();
    player.setTint(0xff0000);
    // Handle game over logic here
}
