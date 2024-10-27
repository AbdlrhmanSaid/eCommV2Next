import Heading from "../_components/Heading";
const About = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <Heading title={"About"} isMargin={true} />
          </header>
        </div>
      </div>
    </section>
  );
};

export default About;
