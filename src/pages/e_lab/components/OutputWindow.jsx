import React from "react";

const OutputWindow = ({ defaultOutput, customOutput }) => {

  const getOutput = (outputDetails, title) => {
    let statusId = outputDetails?.status?.id;
    let outputContent;

    if (statusId === 6) {
      // compilation error
      outputContent = <pre className="px-2 py-1 font-normal text-xs text-red-500">{atob(outputDetails?.compile_output)}</pre>;
    } else if (statusId === 3) {
      outputContent = <pre className="px-2 py-1 font-normal text-xs text-green-500">{atob(outputDetails.stdout) !== null ? `${atob(outputDetails.stdout)}` : null}</pre>;
    } else if (statusId === 5) {
      outputContent = <pre className="px-2 py-1 font-normal text-xs text-red-500">{`Time Limit Exceeded`}</pre>;
    } else {
      outputContent = <pre className="px-2 py-1 font-normal text-xs text-red-500">{atob(outputDetails?.stderr)}</pre>;
    }

    return (
      <div>
        <h2 className="font-bold  text-black  text-lg bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">{title}</h2>
        {/* <textarea
          rows="5"
          readOnly
          value={outputContent}
          className="w-full bg-[#1e293b] text-black rounded-md overflow-y-auto"
        /> */}
        <span className="text-black">{outputContent}</span> 
      </div>
    );
  };

  return (
    <div className="w-full min-h-[10rem] h-56 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
      {defaultOutput ? getOutput(defaultOutput, "Default Output") : null}
      {customOutput ? getOutput(customOutput, "Custom Output") : null}
    </div>
  );
  
};

export default OutputWindow;
