'use server';

interface SubscribeResult {
  success: boolean;
  message: string;
}

export async function subscribeToNewsletter(email: string): Promise<SubscribeResult> {
  const apiKey = process.env.BUTTONDOWN_API_KEY;

  if (!apiKey) {
    console.error('BUTTONDOWN_API_KEY is not configured');
    return {
      success: false,
      message: 'Newsletter service is not configured',
    };
  }

  try {
    const response = await fetch('https://api.buttondown.com/v1/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify({
        email_address: email,
        tags: ['blog-signup'],
      }),
    });

    const data = await response.json();
    console.log('Buttondown response:', response.status, data);

    if (response.status === 201) {
      return {
        success: true,
        message: 'Successfully subscribed!',
      };
    }

    if (response.status === 400) {
      if (data.email?.includes('already subscribed')) {
        return {
          success: true,
          message: "You're already subscribed!",
        };
      }
      return {
        success: false,
        message: data.email?.[0] || data.detail || 'Invalid email address',
      };
    }

    return {
      success: false,
      message: data.detail || 'Something went wrong. Please try again.',
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.',
    };
  }
}
