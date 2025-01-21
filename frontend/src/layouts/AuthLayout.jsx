import React from "react";

const AuthLayout = ({ children }) => {
  // Convert children to an array and handle null or non-element children
  const childArray = React.Children.toArray(children);

  // Filter children based on the `region` prop
  const leftContent = childArray?.filter(
    (child) => React.isValidElement(child) && child.props?.region === "left"
  );

  const rightContent = childArray?.filter(
    (child) => React.isValidElement(child) && child.props?.region === "right"
  );

  return (
    <section className="w-full min-h-screen h-auto flex justify-center items-center">
      <div className="w-full h-[600px] overflow-y-auto md:w-4/5 lg:w-2/3 flex justify-center items-center shadow-lg shadow-gray-800">
        {/* LEFT */}
        <div className="w-full h-full md:w-1/2 flex flex-col items-center justify-center">
          {leftContent}
        </div>

        {/* RIGHT */}
        <div className="hidden h-full md:flex md:w-1/2 flex-col items-center justify-center">
          {rightContent}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
