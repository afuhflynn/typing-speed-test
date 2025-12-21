export const RenderTimer = ({ timer }: { timer: Timer }) => {
  const { m, h, s } = timer;
  if (h) {
    return (
      <span className="flex items-center font-extrabold">
        {h < 10 ? `0${h}` : h} : {m < 10 ? `0${m}` : m} : {s < 10 ? `0${s}` : s}
      </span>
    );
  }
  return (
    <span className="flex items-center font-extrabold">
      {m < 10 ? `0${m}` : m} : {s < 10 ? `0${s}` : s}
    </span>
  );
};
