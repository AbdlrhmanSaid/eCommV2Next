const Heading = ({ title, isMargin }) => {
  return (
    <div className="text-center py-8">
      <h2
        className={`text-3xl w-fit m-auto rounded md:text-4xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text p-2 transition-all duration-500 hover:scale-105 hover:shadow-xl ${
          isMargin && "mt-24"
        } `}
      >
        {title}
      </h2>
    </div>
  );
};

export default Heading;
