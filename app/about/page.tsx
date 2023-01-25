import React from "react";

function AboutPage() {
  return (
    <div>
      <h1>About AMTimer</h1>
      <p>
        Hi, my name is Andrew, and I am an undergraduate student at the
        university of Notre Dame studying Computer Engineering. I created
        AMTimer in my free time as an opportunity to learn and solve a problem.
        I have been a competitive{" "}
        <a
          href="https://en.wikipedia.org/wiki/Speedcubing"
          target="_blank"
          className="text-blue-500"
        >
          speed cuber
        </a>{" "}
        since 2017{" "}
        <a
          href="worldcubeassociation.org/persons/2017MITC08"
          target="_blank"
          className="text-blue-500"
        >
          My WCA profile
        </a>
      </p>
      <p>Check out more of my projects on my portfolio at </p>
      <a
        href="https://andrewmitchell25.github.io/"
        target="_blank"
        className="text-blue-500"
      >
        https://andrewmitchell25.github.io/
      </a>
      <h2>Tech Stack: </h2>
      <h4>Front End:</h4>
      <p>Typescript, React.js, Next.js</p>
      <h4>Back End:</h4>
      <p>Firebase Auth and Firestore</p>
    </div>
  );
}

export default AboutPage;
