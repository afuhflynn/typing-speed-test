export const Header = () => {
  return (
    <header className="w-full h-[39.18px] flex items-center justify-between">
      <>
        <img
          src="/images/logo-large.svg"
          alt="App logo"
          className="hidden md:block"
        />
        <img
          src="/images/logo-small.svg"
          alt="App logo"
          className=" md:hidden"
        />
      </>
      <>
        <img
          src="/images/WPM_Large.svg"
          alt="WPM Banner"
          className="hidden md:block"
        />
        <img
          src="/images/WPM_Small.svg"
          alt="WPM Banner"
          className=" md:hidden"
        />
      </>
    </header>
  );
};
