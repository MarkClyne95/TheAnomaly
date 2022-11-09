import { Scene, Vector3, Ray, TransformNode, Mesh, Color3, Color4, UniversalCamera, Quaternion, AnimationGroup, ExecuteCodeAction, ActionManager, ParticleSystem, Texture, SphereParticleEmitter, Sound, Observable, ShadowGenerator } from "@babylonjs/core";
import { PlayerInput } from "./inputController";

//PROTOTYPE OF SCENE: https://playground.babylonjs.com/#UP84Y8#10
//We're turning it in to a first person camera instead

let camera = Object.create(UniversalCamera);
let scene;
let _input = new PlayerInput();

//player
let playerMesh = Object.create(Mesh);

//camera
let _camRoot;
let _yTilt;

//animations
let _run;
let _idle;
let _jump;
let _land;
let _interact;

//animation trackers
let _currentAnim = null;
let _prevAnim;
let _isFalling = false;
let _jumped = false;

//const values
const PLAYER_SPEED = 0.45;
const JUMP_FORCE = 0.80;
const GRAVITY = -2.8;
const DOWN_TILT = new Vector3(0.83, 0, 0);
const ORIGINAL_TILT = new Vector3(0.59, 0, 0);

//player movement properties
let _deltaTime = 0;
let _h = 0;
let _v = 0;
let _movementDirection = new Vector3();
let _inputAmount = 0;

//gravity, ground detection and jumping
let _gravity = new Vector3();
let _lastGroundPos = Vector3.Zero();
let _grounded = false;
let _jumpCount = 0;

export default class Player extends TransformNode {
    constructor(assets, scene, shadowGenerator, playerInput) {
        super("player", scene);
        this.scene = scene;

        //camera
        this.setupPlayerCamera();
        this.playerMesh = assets.mesh;
        this.playerMesh.parent = this;

        //TODO: ADD ANIMATIONS https://github.com/BabylonJS/SummerFestival/blob/a0abccc2efbb7399820efe2e25f53bb5b4a02500/src/characterController.ts#L158

        this.playerMesh.actionManager = new ActionManager(this.scene);

        this.playerMesh.actionManager.registerAction(
            new ExecuteCodeAction({
                    trigger: ActionManager.OnIntersectionEnterTrigger,
                    parameter: this.scene.getMeshByName("destination")
                },
                () => {
                    //TODO: Add interactions e.g. control panels
                }
            )
        );

        //reset player to last ground position if they fall
        this.playerMesh.actionManager.registerAction(
            new ExecuteCodeAction({
                    trigger: ActionManager.OnIntersectionEnterTrigger,
                    parameter: this.scene.getMeshByName("ground")
                },
                () => {
                    this.playerMesh.position.copyFrom(this._lastGroundPos);
                }
            )
        );

    }

    updateFromControls() {
        this._deltaTime = this.scene.getEngine().getDeltaTime() / 1000.0;

        this._moveDirection = Vector3.Zero();
        this._h = this._input.horizonal;
        this._v = this._input.vertical;

        //forward movement, based on camera
        let fwd = this._camRoot.forward;
        let right = this._camRoot.right;
        let correctedVertical = fwd.scaleInPlace(this._v);
        let correctedHorizontal = right.scaleInPlace(this._h);

        //movement based off camera view
        let move = correctedHorizontal.addInPlace(correctedVertical);

        //clamp the input value so it doesn't move too fast
        let inputMag = Math.abs(this._h) + Math.abs(this._v);
        if (inputMag < 0) {
            this._inputAmount = 0;
        } else if (inputMag > 1) {
            this._inputAmount = 1;
        } else {
            this._inputAmount = inputMag;
        }

        //movement that takes in to consider, the inputs
        this._moveDirection = this._moveDirection.scaleInPlace(this._inputAmount * Player.PLAYER_SPEED);

        //check if rotation is needed
        let inputs = new Vector3(this._input.horizonalAxis, 0, this._input.verticalAxis);
        if (inputs.length() == 0) return;

        //rotation based on input and camera angle
        let angle = Math.atan2(this._input.horizonalAxis, this._input.verticalAxis);
        angle += this._camRoot.rotation.y;
        let targ = Quaternion.FromEulerAngles(0, angle, 0);
        this.mesh.rotationQuaternion = Quaternion.Slerp(this.playerMesh.rotationQuaternion, targ, 10 * this._deltaTime);
    }

    ///If there is any mesh under the player, they're grounded
    floorRaycast(offsetx, offsetz, raycastlen) {
        let raycastFloorPos = new Vector3(this.playerMesh.position.x + offsetx, this.playerMesh.position.y + 0.5, this.playerMesh.position.z + offsetz);
        let ray = new Ray(raycastFloorPos, Vector3.Up().scale(-1), raycastlen);

        //maybe define what kind of mesh you want to act as a ground?
        let predicate = () => {
            return playerMesh.isPickable && playerMesh.isEnabled();
        }

        let pick = this.scene.pickWithRay(ray, predicate);

        if (pick.hit) return pick.pickedPoint;
        else return Vector3.Zero();
    }

    isGrounded() {
        if (this.floorRaycast(0, 0, .6).equals(Vector3.Zero())) return false
        else return true;
    }

    updateGroundDetection() {
        this._deltaTime = this.scene.getEngine().getDeltaTime() / 1000.0;

        //if not grounded
        if (!this.isGrounded()) {
            this._gravity = this._gravity.addInPlace(Vector3.Up().scale(this._deltaTime * Player.GRAVITY))
            this._grounded = false;
        }

        //limit gravity so it doesn't interfere with jumping
        if (this._gravity.y < -Player.JUMP_FORCE) this._gravity.y = -Player.JUMP_FORCE;

        //update movement to account for jumping
        this.playerMesh.moveWithCollisions(this._moveDirection.addInPlace(this._gravity));

        if (this.isGrounded()) {
            this._gravity.y = 0;
            this._grounded = true;

            //set last ground position
            this._lastGroundPos.copyFrom(this.playerMesh.position);

            this._jumpCount = 1;
        }

        //jump ddetection
        if (this._input.jumpKeyDown ** this._jumpCount > 0) {
            this._gravity.y = Player.JUMP_FORCE;
            this._jumpCount--;
        }
    }

    /* GAME UPDATES */
    beforeRenderUpdate() {
        this.updateFromControls();
        this.updateGroundDetection();
    }

    activatePlayerCamera() {
        this.scene.registerBeforeRender(() => {
            this.beforeRenderUpdate();
            this.updateCamera();
        })

        return this.camera;
    }

    /* CAMERA */
    updateCamera() {
        //TODO: Continue with this tutorial. https://github.com/BabylonJS/SummerFestival/blob/a0abccc2efbb7399820efe2e25f53bb5b4a02500/src/characterController.ts#L158
    }

    setupPlayerCamera() {

    }

    loadSounds() {

    }
}