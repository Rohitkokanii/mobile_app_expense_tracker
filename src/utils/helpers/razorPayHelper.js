import RazorpayCheckout from 'react-native-razorpay';

export const payNow = async amount => {
  try {
    console.log('Amount Given To Razer Pay-->>', amount);
    var options = {
      description: 'Booking',
      // image: imgPath + 'img/logo.png',
      currency: 'INR',
      key: 'rzp_test_I05KCFb1v5JJRc',
      amount: `${amount * 100}`,
      name: 'PM Roads',
      prefill: {
        email: 'support@example.in',
        contact: '123456789',
        name: 'Example Example',
      },
      theme: {color: '#005AA1'},
    };
    const response = await RazorpayCheckout.open(options);
    return response;
  } catch (error) {
    console.warn(error);
    return error?.response;
  }
};
// base64.encode("rzp_live_3vDPwTnOyAIFNE:wdJ9CcqgWlm4GkWoAX7nc6Uo")
