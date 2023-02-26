import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  response: any
  error: string | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') return res.status(405).end()

  const { prompt } = req.body

  if (!prompt) {
    return res.status(400).json({ response: null, error: 'Promp is required' })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    })

    if (!response.ok) {
      return res.status(500).json({ response: null, error: 'OpenAI API error' })
    }

    const json = await response.json()
    return res.status(200).json({ response: json.choices[0].text, error: null })
  } catch (error) {
    console.error(error)
    res.status(500).json({ response: null, error: 'OpenAI API error' })
  }
}