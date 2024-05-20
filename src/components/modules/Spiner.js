const Spiner = ({w, h, border}) => {
  return (
    <span className={`inline-block ${w} ${h} ${border} animate-spin border-gray-400 border-t-white rounded-[50%] `}>
      
    </span>
  );
};

export default Spiner;