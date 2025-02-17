import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { title, description } = req.body;

    const prompt = `A professional food photography style image of ${title}. ${description}. The image should be well-lit, appetizing, and styled like a high-end restaurant dish. Food photography, centered composition, soft lighting, shallow depth of field.`;

    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: "256x256",
      quality: "standard",
    });

    return res.status(200).json({ imageUrl: response.data[0].url });
  } catch (error) {
    if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
    } else {
        console.log(error.message);
    }
    return res.status(500).json({ message: 'Error generating image' });
  }
} 