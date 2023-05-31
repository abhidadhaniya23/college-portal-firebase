const SafeArea = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <div className="max-w-7xl mx-auto text-center relative px-4 lg:px-8">
        {children}
      </div>
    </>
  );
};

export default SafeArea;
