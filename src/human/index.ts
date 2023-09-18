import { Engine, Entity, Vector3 } from "@galacean/engine";
import { SpineAnimation } from "@galacean/engine-spine";
import * as dat from "dat.gui";

export function createHuman(engine: Engine, rootEntity: Entity, cameraEntity: Entity): void {

    const gui = new dat.GUI();

    cameraEntity.transform.position = new Vector3(0, 0, 60);

    engine.resourceManager
        .load({
            urls: [
                "https://gw.alipayobjects.com/os/OasisHub/c51a45ef-f248-4835-b601-6d31a901f298/1629713824525.json",
                "https://gw.alipayobjects.com/os/OasisHub/b016738d-173a-4506-9112-045ebba84d82/1629713824527.atlas",
                "https://gw.alipayobjects.com/zos/OasisHub/747a94f3-8734-47b3-92b3-2d7fe2d36e58/1629713824527.png",
            ],
            type: "spine",
        })
        .then((spineEntity: Entity) => {
            rootEntity.addChild(spineEntity);
            const spineAnimation = spineEntity.getComponent(SpineAnimation);
            const { skeleton, state } = spineAnimation;
            spineEntity.transform.setPosition(0, -18, 0);
            state.setAnimation(0, "dance", true);
            skeleton.setSkinByName("girl"); // 1. Set the active skin
            skeleton.setSlotsToSetupPose(); // 2. Use setup pose to set base attachments.
            state.apply(skeleton);
            spineAnimation.scale = 0.05;
            const info = {
                skin: "girl",
            };
            gui
                .add(info, "skin", ["girl", "girl-blue-cape", "girl-spring-dress", "boy"])
                .onChange((skinName) => {
                    skeleton.setSkinByName(skinName); // 1. Set the active skin
                    skeleton.setSlotsToSetupPose(); // 2. Use setup pose to set base attachments.
                    state.apply(skeleton);
                });
        });
}