import React from 'react';
import { CameraAngleType } from '../../store/useExperienceStore';

interface LightingStageProps {
  cameraAngle: CameraAngleType;
  rotation: number;
  className?: string;
}

export const LightingStage: React.FC<LightingStageProps> = ({
  cameraAngle,
  rotation,
  className = '',
}) => {
  const getActiveImage = () => {
    if (cameraAngle === '02 TOP') {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy1kL9MOi_H-6PY62Bzc6G2CvgwMLuEOYuWGl77URTkOefTK4-SKE9DuNwnHCjYTxm71WZaFnYanl-lK5Q74i53V6HVVXgyq9PvRvwqHHSRAm32rL6vG08bM7mGNLVpvGHodW1Wk15hL_SLP-xpanMeF2XEI3iCiy1KrhPx1IC9amJFh38CR2wsaOsl3qJmYnuy2qXdp8xxV3P0sn-6461p1pIPPRFbZRKvl4yR91v-zVOwQiM1h0';
    }
    if (cameraAngle === '03 FRONT') {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFgTDx5CwV7CuEe1jS4IDq1fRESZkRjIo7Jfy_EBEqG6Hp67sLJn3lb2l8fmvsGfcO5_coWuJMiaEbmg2aOoDmFpMN2cMAlaCbbPbrMuwiM4qe5H3FG5ABEGYfZL1JQM-40oe5Qwuz6QYGjBOX8EXHB3lZtWSyNh57YEewD9mnZAw7BiSvZdSoQkt-cT_wqRWbMUmhLKEq6Pg0IRO1PMOv0XzZLfrxOYS_IJ1MrpOKuSJV4pN4oHY';
    }
    return 'https://lh3.googleusercontent.com/aida/AEtjO1UEqPcLwy4UB0E_o1P7qYqnc3Eg63xUkjUQMvOTTzMUW1GLX6QmksJ7NQuQqMEXyOZ1KR3d5zs79vhqGIkHBnYGB_VW749LY6O3PGWxm29EBGZ5JvEkhXj_ucVUhkR5D755LJKMBWR6vyTlC_we-pQxqwFJGRihiVJ4GLIG9M47MVKCtpkaoyXnOVpn5hK2Gyz7Nq072_BPp5XE3cNMlS2-qn3h8OLr5yjT-LBp3D_lpE7_IkSWDU2NMA';
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Dynamic Ambient Projection Canvas / Layer */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-75 ease-out"
        style={{ transform: `scale(1.02) rotate(${rotation * 0.04}deg)` }}
      >
        <img
          alt="BMW M Concept Dynamic Light and Drag Stage View"
          className="w-full h-full object-cover object-center filter contrast-125"
          src={getActiveImage()}
        />

        {/* Dual-Tone Ambient Lighting: Warm Amber (#FFA040) Left Spotlight and Ice-Cyan (#40DFFF) Right Rim Light */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFA040]/25 via-transparent to-[#40DFFF]/25 mix-blend-screen pointer-events-none"></div>
      </div>
    </div>
  );
};
