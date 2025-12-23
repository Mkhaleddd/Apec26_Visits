import 'bootstrap/dist/css/bootstrap.min.css';

const ThankYouFeedback = () => {
  return (
    <div className="thank-you-container w-50 mx-auto">
      <div className="text-center mt-5">
        <h1 className="heading1">APEC'25 <span className="heading2">Premium</span></h1>
        <div className="thank-box mt-4 p-5 shadow rounded">
          <p className="thank-text text-xl text-red-700">
            Thank you for giving us your feedback!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouFeedback;
