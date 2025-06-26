import React from 'react';
import { GiTestTubes } from 'react-icons/gi';
import { PiOvenThin } from "react-icons/pi";
import { FaLeaf } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
    <div >
      <h2 className="text-3xl font-bold text-primary mb-4">
        Fresh, Frozen, and Ready in Minutes
      </h2>
      <p className="text-lg text-secondary max-w-3xl mx-auto mb-10">
        At Crave&Fusion we believe entertaining should be easy enough that you can <em>(and want!)</em> to do it often. <br />
        Selling our appetizers frozen is the perfect way to do that.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Preservative Free */}
        <div className="flex flex-col items-center">
          <GiTestTubes className="text-5xl text-primary mb-2" />
          <p className="font-semibold text-secondary">Preservative Free</p>
        </div>

        {/* Just Bake & Serve */}
        <div className="flex flex-col items-center">
          <PiOvenThin  className="text-5xl text-primary mb-2" />
          <p className="font-semibold text-secondary">Just Bake & Serve</p>
        </div>

        {/* Non GMO */}
        <div className="flex flex-col items-center">
          <FaLeaf className="text-5xl text-primary mb-2" />
          <p className="font-semibold text-secondary">secondaryNon GMO</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;