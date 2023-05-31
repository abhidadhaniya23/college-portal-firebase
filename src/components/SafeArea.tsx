const SafeArea = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <div className="max-w-7xl mx-auto text-center relative px-3 lg:px-0">
        {children}
      </div>
    </>
  );
};

export default SafeArea;
