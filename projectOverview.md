This project is a high-performance, single-page institutional portal for MDF Enterprises, designed to bridge the gap between global brands and government procurement (GeM). It combines luxury aesthetics (Serif typography and glassmorphism) with engineered reliability (smooth scroll and precise navigation).

Below is the detailed technical brief and architectural breakdown.

1. Core Infrastructure & Technology Stack
The website is built on a "Vanilla+" architecture—using modern browser APIs for performance while remaining extremely lightweight.

Markup: HTML5 (Semantic).
Styling: Vanilla CSS3 with heavy use of backdrop-filter for glassmorphic effects and CSS Variables for theme consistency.
Smooth Scroll Engine: Lenis.js. This is the most critical part of the user experience. It intercepts the browser's default scroll and applies a custom easing curve to make movement feel "weighty" and premium.
Animation System: A custom Intersection Observer implementation. Unlike heavy libraries like AOS, this native JS solution monitors when elements enter the screen and triggers fade-up transitions on-the-fly.
Favicon/Icons: SVG-first approach. Using 

mdfFavicon.svg
 ensures the logo stays mathematically sharp even on 4K or Retinal displays.
2. File-by-File Analysis

index.html
 — The Brain
This is the command center. It contains the DOM structure and three critical script blocks:

Lenis Initialization: Configured with a duration: 1.8 and lerp: 0.1 for a luxurious scroll speed.
Intersection Observer: Targets every h2, h5, and card. It applies a 40px translation and 0.8s fade-in as you scroll.
The Magnetic Engine: JavaScript logic that calculates the distance between your cursor and the buttons, applying a translate transform to make the buttons feel "attracted" to your mouse.

css/styles.css
 — The Skin
Handles the "Premium" visual language.

Glassmorphism: Uses rgba(255, 255, 255, 0.08) and blur(12px) to create the translucent sections.
Typography: Manages the hierarchy between Playfair Display (Heading) and Helvetica Neue (Body).
Portfolio Logic: Handles the "Brands" scrolling ribbon using an infinite CSS keyframe animation (translateX).

css/website-base.css
 — The Skeleton
This contains the foundational grid system. It ensures the layout remains responsive across mobile and desktop without using heavy frameworks like Bootstrap.


js/script.js
 — The Utility Layer
A compiled bundle of foundational utilities (including Lodash and Webpack runtime) that handles low-level browser compatibility.

3. How Key Systems Work Together
The Navigation Workflow
Instead of using standard <a href="#id"> (which can cause a sudden browser "jump"), we use a custom data-scroll-to system:

When you click a button (e.g., "About"), a global JS listener catches the click.
It identifies the target element (like mdf-brands-anchor).
It instructs the Lenis Engine to scroll to that element with a 160px offset.
The offset is critical because it ensures the section header lands perfectly below our sticky navbar rather than behind it.
Institutional Trust (Footer & GeM)
The footer is engineered for compliance. We've integrated:

An inverted GeM Logo (

gemLogo.png
).
The footer-badge class which provides a high-contrast label to immediately signal to government clients that the business is a registered supplier.
Performance Optimization
SVG Logos: 

mdfLogoWtext.svg
 is used in both the Loading screen and the Header. Because it's a vector, it loads instantly and never looks pixelated.
Loading Spinner: A custom CSS-only spinner (square1) ensures the user sees a smooth transition while the high-res overlays (

overlay.webp
) are being fetched by the browser.
4. Design Philosophy
The project aims for "Engineered Reliability." Everything on the screen—from the magnetic hover effects to the specific 1.8s scroll duration—is tuned to make the company look sturdy, weighted, and technologically advanced.


