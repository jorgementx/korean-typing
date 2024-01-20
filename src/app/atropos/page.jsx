"use client";
import "atropos/css";
import Atropos from "atropos/react";

function Atropostest() {
  return (
    <div className="max-w-screen-lg mx-auto pt-32 pb-16 px-4 md:px-8 lg:px-16">
      <Atropos className="w-full aspect-square">
        {/* 
  Element with negative offset will move in reverse direction,
  making it appear behind the scene
  */}
        <img src="https://atroposjs.com/images/header/atropos-mountains.svg" data-atropos-offset="-5" className="absolute object-contain w-full h-full" />
        {/* 
  Element with no offset will not move
  */}
        <img src="https://atroposjs.com/images/header/atropos-forest-back.svg" data-atropos-offset="0" className="absolute object-contain w-full h-full" />
        {/* 
  Element with positive offset will move in same direction,
  making it appear in front of the scene
  */}
        <img src="https://atroposjs.com/images/header/atropos-forest-front.svg" data-atropos-offset="5" className="absolute object-contain w-full h-full" />
      </Atropos>
      </div>
  );
}

export default Atropostest;
