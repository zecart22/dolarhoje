import "./index.css";

import { useMediaQuery, Box } from "@chakra-ui/react";

export const Waves = () => {
  const [isLargerThan1281] = useMediaQuery("(min-width: 1281px)");

  return (
    <>
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          class="wave2"
          fill="#c8eed9"
          opacity="50%"
          d="M0,0L160,32L320,0L480,96L640,64L800,192L960,0L1120,288L1280,64L1440,32L1440,320L1280,320L1120,320L960,320L800,320L640,320L480,320L320,320L160,320L0,320Z"
        ></path>
        <path
          class="wave1"
          fill="#53EC96"
          d="M0,224L240,224L480,256L720,96L960,288L1200,128L1440,288L1440,320L1200,320L960,320L720,320L480,320L240,320L0,320Z"
        ></path>

        <path
          class="wave3"
          fill="#7cf6a5"
          d="M0,224L240,224L480,256L720,96L960,288L1200,128L1440,288L1440,320L1200,320L960,320L720,320L480,320L240,320L0,320Z"
        ></path>
      </svg>
    </>
  );
};
