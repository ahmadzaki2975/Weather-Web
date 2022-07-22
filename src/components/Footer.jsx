export const Footer = () => {
  return (
    <div className="flex flex-col text-center bg-black text-white p-5">
      <p className="text-lg mb-5">
        Website and Icons made by <br/> <a className="font-bold" href="https://github.com/ahmadzaki2975/">Ahmad Zaki Akmal</a>
      </p>
      <h1 className="text-xl">Credits</h1>
      <p className="text-m">
        Data by <span className="font-bold">Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) Indonesia</span>
      </p>
      <p className="text-m">
        Public API by <a className="font-bold underline" href="https://github.com/ibnux">ibnux</a>, in
        repository <a className="font-bold underline" href="https://github.com/ibnux/BMKG-importer">BMKG-Importer</a>
      </p>
    </div>
  );
};
