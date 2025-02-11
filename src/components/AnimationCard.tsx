"use client";
import { Bodies, Bounds, Engine, Events, Mouse, MouseConstraint, Render, World } from "matter-js";
import { useEffect, useRef } from "react";

const AnimationCard = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const instance = useRef<any | Render>(null);

  useEffect(() => {
    const containerElement = canvasRef.current!;
    const containerWidth = containerElement.clientWidth;
    const containerHeight = containerElement.clientHeight;
    const engine = Engine.create();
    if (canvasRef.current && !instance.current) {
      instance.current = Render.create({
        element: containerElement,
        engine: engine,
        options: {
          width: containerWidth,
          height: containerHeight,
          pixelRatio: 2,
          background: "#000000",
          wireframes: false,
        },
      });
    }
    // create an engine

    // create a renderer

    // Add the renderer to the DOM
    Render.run(instance.current);

    // add mouse control
    const mouse = Mouse.create(instance.current.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

    // Add bodies to the world
    // create bounds
    const ground = Bodies.rectangle(containerWidth / 2 + 160, containerHeight + 80, containerWidth + 320, 160, { render: { fillStyle: "#fff" }, isStatic: true });
    const wallLeft = Bodies.rectangle(-80, containerHeight / 2, 160, containerHeight, { isStatic: true });
    const wallRight = Bodies.rectangle(containerWidth + 80, containerHeight / 2, 160, 1200, { isStatic: true });
    const roof = Bodies.rectangle(containerWidth / 2 + 160, -80, containerWidth + 320, 160, { isStatic: true });
    const radius = 20;
    // create objects

    // tagVideo & design
    const categories1 = Bodies.rectangle(containerWidth / 2 + 150, 500, 164, 56, {
      chamfer: { radius: radius },
      render: {
        sprite: {
          texture: "./images/mattericon/t1.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });
    const categories2 = Bodies.rectangle(containerWidth / 2 - 150, 460, 122, 56, {
      chamfer: { radius: radius },
      render: {
        sprite: {
          texture: "./images/mattericon/t2.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });

    const categories3 = Bodies.rectangle(containerWidth / 2 + 250, 420, 204, 56, {
      chamfer: { radius: radius },
      render: {
        sprite: {
          texture: "./images/mattericon/t3.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });

    const categories4 = Bodies.rectangle(containerWidth / 2 - 75, 380, 204, 56, {
      chamfer: { radius: radius },
      render: {
        sprite: {
          texture: "./images/mattericon/t4.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });
    // video
    const categories5 = Bodies.rectangle(containerWidth / 2 - 74, 540, 194, 56, {
      chamfer: { radius: radius },
      render: {
        sprite: {
          texture: "./images/mattericon/t5.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });
    const categories6 = Bodies.rectangle(containerWidth / 2 + 174, 490, 216, 56, {
      chamfer: { radius: radius },
      render: {
        sprite: {
          texture: "./images/mattericon/t6.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });
    const categories7 = Bodies.rectangle(containerWidth / 2 - 142, 440, 167, 56, {
      chamfer: { radius: radius },
      render: {
        sprite: {
          texture: "./images/mattericon/t7.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });
    const categories8 = Bodies.rectangle(containerWidth / 2 - 10, 260, 260, 56, {
      chamfer: { radius: radius },
      render: {
        sprite: {
          texture: "./images/mattericon/t8.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });
    //misc
    const categories9 = Bodies.rectangle(containerWidth / 2 - 242, 420, 174, 56, {
      chamfer: { radius: radius },
      render: {
        sprite: {
          texture: "./images/mattericon/t9.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });
    const categories10 = Bodies.rectangle(containerWidth / 2 + 60, 300, 285, 56, {
      chamfer: { radius: radius },
      render: {
        sprite: {
          texture: "./images/mattericon/t10.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });
    const categories11 = Bodies.rectangle(containerWidth / 2, 320, 170, 56, {
      chamfer: { radius: radius },
      render: {
        sprite: {
          texture: "./images/mattericon/t11.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });
    const categories12 = Bodies.rectangle(containerWidth / 2 - 59, 260, 60, 56, {
      chamfer: { radius: radius },
      render: {
        sprite: {
          texture: "./images/mattericon/t12.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });
    const categories13 = Bodies.rectangle(containerWidth / 2 + 110, 260, 110, 56, {
      chamfer: { radius: radius },
      render: {
        sprite: {
          texture: "./images/mattericon/t13.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });

    // Add created bodies to the world
    World.add(engine.world, [
      mouseConstraint,
      ground,
      wallLeft,
      wallRight,
      roof,
      categories1,
      categories2,
      categories3,
      categories4,
      categories5,
      categories6,
      categories7,
      categories8,
      categories9,
      categories10,
      categories11,
      categories12,
      categories13,
    ]);

    let click = false;
    document.addEventListener("mousedown", () => (click = true));
    document.addEventListener("mousemove", () => (click = false));
    // Create a On-Mouseup Event-Handler
    Events.on(mouseConstraint, "mouseup", function (event) {
      const mouseConstraint = event.source;
      const bodies = engine.world.bodies;
      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        if (click === true) {
          if (Bounds.contains(body.bounds, mouseConstraint.mouse.position)) {
            break;
          }
        }
      }
      if (!mouseConstraint.body) {
        for (let i = 0; i < bodies.length; i++) {
          const body = bodies[i];
          if (click === true) {
            if (Bounds.contains(body.bounds, mouseConstraint.mouse.position)) {
              break;
            }
          }
        }
      }
    });
    // run the engine
    Engine.run(engine);
    // run the renderer

    return () => {
      Render.stop(instance.current);
      Engine.clear(engine);
    };
  }, []);

  return <div ref={canvasRef} className="tags-container relative"></div>;
};

export default AnimationCard;
