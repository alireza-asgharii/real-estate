const Profile = ({name}) => {
  return (
    <div className="bg-blue-400 rounded-full w-7 h-7 mt-2 text-white flex flex-col justify-center items-center">
      <p className="pt-[4px]">{name[0].toUpperCase() ?? name}</p>
    </div>
  );
};

export default Profile;
