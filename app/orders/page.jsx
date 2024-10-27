import Heading from "../_components/Heading";
const Orders = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <Heading title={"Your Orders"} isMargin={true} />
          </header>
        </div>
      </div>
    </section>
  );
};

export default Orders;
