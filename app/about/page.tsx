import React from "react";
import { SiFirebase, SiNextdotjs, SiReact, SiTypescript } from "react-icons/si";

function AboutPage() {
  return (
    <div className="text-zinc-800 dark:text-neutral-100">
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
      <p>This project is still under development.</p>
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
      <p>
        <SiTypescript />
        <SiReact />
        <SiNextdotjs />
        Typescript, React.js, Next.js
      </p>
      <h4>Back End:</h4>
      <p>
        <SiFirebase />
        Firebase Auth and Firestore
      </p>
      {/*"Our Rubik's Cube Timer App is designed for all levels of cube enthusiasts, 
      from beginners to world-class solvers. With our app, you can easily track your solving times 
      and monitor your progress. The app features a user-friendly interface and is optimized for 
      quick and accurate timekeeping. Whether you're looking to improve your personal best or 
      compete against others, our timer app is the perfect tool to help you reach your goals. 
      Join the growing community of cube enthusiasts and elevate your solving experience today!"
      
      Timer: The core feature of the app, allowing users to time their Rubik's Cube solves.
      History: A record of the user's past solves, including date and time, to help track progress.
      Statistics: Detailed analysis of the user's solving times, including average time, best time, and more.
      Scramble Generator: A feature that generates a random scramble for the Rubik's Cube, to simulate real-life solving conditions.
      Social Sharing: Option to share solving times with friends and compete against them, either locally or globally.
      Customizable Settings: Allow users to adjust timer preferences, such as starting and stopping methods, display format, and more.
      Tutorials and Solving Tips: Guidance for beginners, including tutorials on solving methods and tips for improving speed and accuracy.
      User Accounts: Ability to create and manage user accounts, with options to sync data across devices.
      Multiple Languages: Support for multiple languages, to accommodate users from different countries and regions.
      Regular Updates: Commitment to regularly releasing updates and new features to enhance the user experience.

      */}
    </div>
  );
}

export default AboutPage;
