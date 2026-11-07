import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(res.data.isPremium);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      {
        withCredentials: true,
      },
    );

    console.log(order);

    const { keyId, savedPayment } = order.data;

    const { amount, currency, orderId, firstName, lastName, emailId } =
      savedPayment;
    // Open Razorpay Checkout
    const options = {
      key: keyId,
      amount: amount,
      currency: currency,
      name: "Dev Matches", // this will be shown on the razorpay dialogue box
      description: "connect to other developers",
      order_id: orderId, // This is the order_id created in the backend
      prefill: {
        name: firstName + " " + lastName,
        email: emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options); // this razorpay will come from the script that we have added inside the head tag in the index.html.to access it, you have to write window
    rzp.open();
  };

  return (
    <>
      {!isUserPremium ? (
        <div className="my-30 m-10">
          <div className="flex w-full">
            <div className="card bg-base-300 p-10 rounded-box grid grow place-items-center">
              <h1 className="font-bold mb-5 text-xl">Silver Membership</h1>
              <ul>
                <li> - Chat with other people</li>
                <li> - Blue Tick for 3 months</li>
              </ul>
              <button
                onClick={() => handleBuyClick("silver")}
                className="btn btn-primary mt-5"
              >
                Buy Silver
              </button>
            </div>
            <div className="divider divider-horizontal">OR</div>
            <div className="card bg-base-300 p-10 rounded-box grid grow place-items-center">
              <h1 className="font-bold mb-5 text-xl">Gold Membership</h1>
              <ul>
                <li> - Chat with other people</li>
                <li> - Blue Tick for 6 months</li>
              </ul>
              <button
                onClick={() => handleBuyClick("gold")}
                className="btn btn-secondary mt-5"
              >
                Buy Gold
              </button>
            </div>
            <div className="divider divider-horizontal">OR</div>
            <div className="card bg-base-300 p-10 rounded-box grid grow place-items-center">
              <h1 className="font-bold mb-5 text-xl">Diamond Membership</h1>
              <ul>
                <li> - Chat with other people</li>
                <li> - Blue Tick for 9 months</li>
              </ul>
              <button
                onClick={() => handleBuyClick("diamond")}
                className="btn btn-success mt-5"
              >
                Buy Diamond
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1>You're already a premium user</h1>
      )}
    </>
  );
};

export default Premium;
