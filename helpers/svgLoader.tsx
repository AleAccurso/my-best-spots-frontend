import React from "react";

interface SvgLoaderProps {
  svgContent: string;
}

const SvgLoader: React.FC<SvgLoaderProps> = ({ svgContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
};

export default SvgLoader;
