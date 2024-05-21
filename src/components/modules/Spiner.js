const Spiner = ({w, h, border, borderTop, borderColor}) => {
  return (
    <span className={`inline-block ${w} ${h} ${border} animate-spin ${borderColor ?? 'border-gray-400'} ${borderTop ?? "border-t-white"} rounded-[50%] `}>
      
    </span>
  );
};

export default Spiner;