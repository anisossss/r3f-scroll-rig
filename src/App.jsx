import React, { Suspense, useRef, useState } from "react";
import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import { Environment, Loader } from "@react-three/drei";

import { BodyCopy, Headline, Subtitle } from "./Text";
import { Image } from "./Image";
import { ImageCube } from "./ImageCube";
import { WebGLBackground } from "./WebGLBackground";
import { Lens } from "./Lens";
import CodropsFrame from "./CodropsFrame";
import EffectsToggle from "./EffectsToggle";

import "@14islands/r3f-scroll-rig/css";


export default function App() {
  const eventSource = useRef();
  const [enabled, setEnabled] = useState(true);

  return (
    <div ref={eventSource}>
      <CodropsFrame />
      <GlobalCanvas
        debug={false}
        scaleMultiplier={0.01}
        eventSource={eventSource}
        eventPrefix="client"
        flat 
        camera={{ fov: 14 }}
        style={{ pointerEvents: "none", zIndex: -1 }}
      >
        {(globalChildren) => (
          <Lens>
            <WebGLBackground />
            <Suspense fallback="">
              
              <Environment files="env/empty_warehouse_01_1k.hdr" />
              {globalChildren}
            </Suspense>
          </Lens>
        )}
      </GlobalCanvas>
      <SmoothScrollbar
        enabled={enabled}
        config={{ syncTouch: true }} 
      />
      <article>
        <EffectsToggle setEnabled={setEnabled} enabled={enabled} />
        <header className="container">
          <div className="headerLayout">
            <h2>
              <Headline wobble>
                RESPONSIVE {enabled ? "WEBGL" : "HTML"}
              </Headline>
            </h2>
            <BodyCopy as="p" className="subline">
              Progressively enhance your React website with WebGL using
              r3f-scroll-rig, React Three Fiber and Three.js
            </BodyCopy>
          </div>
        </header>
        <section className="container">
          <Image
            src="images/maxim-berg-1_U2RcHnSjc-unsplash.jpg"
            className="ImageLandscape"
          />
        </section>
        <section className="container">
          <h3>
            <Subtitle>We use CSS to create a responsive layout.</Subtitle>
            <em>
              <Subtitle>
                A Canvas on top tracks DOM elements and enhance them with WebGL.
              </Subtitle>
            </em>
          </h3>
          <p>
            <BodyCopy>
              Try turning off WebGL using the button in the sticky header.
              You’ll notice smooth scrolling is disabled, and all scroll-bound
              WebGL effects disappears.
            </BodyCopy>
          </p>
        </section>
        <section className="ParallaxContainer">
          <Image
            src="images/maxim-berg-qsDfqZyTCAE-unsplash-crop.jpg"
            className="aspect-9_13"
            parallaxSpeed={1.08}
          />
          <Image
            src="images/maxim-berg-ANuuRuCRRAc-unsplash.jpg"
            className="aspect-16_11"
            parallaxSpeed={0.92}
          />
        </section>
        <section className="container">
          <h4>
            <BodyCopy>
              Thanks to Threejs we can also render 3D geometry or models. The
              following image is replaced by a box. Try scrolling hard to make
              it wiggle.
            </BodyCopy>
          </h4>
        </section>
        <section>
          <ImageCube
            src="images/maxim-berg-TcE45yIzJA0-unsplash.jpg"
            className="JellyPlaceholder"
          />
        </section>
        <section className="container">
          <h3>
            <Subtitle>Most websites use a mix of WebGL and HTML.</Subtitle>
            <em>
              <Subtitle>
                However, the Lens refraction requires all images and text to be
                WebGL.
              </Subtitle>
            </em>
          </h3>
       
        </section>
        <footer>
          <CodropsFrame />
        </footer>
      </article>

      <Loader
        containerStyles={{
          background: "transparent",
          top: "auto",
          bottom: 0,
          height: "5px",
        }}
        innerStyles={{ background: "white", width: "100vw", height: "5px" }}
        barStyles={{ background: "#6e6bcd", height: "100%" }}
      />
    </div>
  );
}
