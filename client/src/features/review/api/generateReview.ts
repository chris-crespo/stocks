import { useQuery } from "react-query";
import { QueryConfig } from "~/lib/react-query";
import openai from '~/lib/openai';

const maxTokens = 50

const defaultUserName = 'Unknown'
const defaultTwitterHandle = '@unknown'
const defaultContent = ''

const generateAvatar = async () => {
  const prompt = 'Generate a real person\'s image'
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: '256x256'
  })

  return response.data.data[0].url!
}

const generateUserName = async () => {
  const prompt = 'Generate a person\'s fullname'
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: maxTokens 
  })

  return response.data.choices[0].text ?? defaultUserName
}

const trimHandle = (handle: string) => {
  const [, handleName] = handle.split('@')
  return `@${handleName}`
}

const generateTwitterHandle = async () => {
  const prompt = 'Generate a twitter handle'
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 50
  })

  const completion = response.data.choices[0].text ?? defaultTwitterHandle

  // The model may generate twitter handles such as `<username> @<handle>`.
  // We only want the `@<handle>` part.
  return trimHandle(completion)
}

const removeLastSentence = (completion: string) => {
  const sentences = completion.split('.')
  const withoutLast = sentences.slice(0, -1)
  return withoutLast.join('.') + '.'
}

const generateContent = async () => {
  const prompt = 'Generate a positive review for a stock market based web app called Stock Seer'
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 70,
    temperature: 1
  })

  const completion = response.data.choices[0].text ?? defaultContent

  // Last sentence may be incomplete
  return removeLastSentence(completion!)
}

type Review = {
  user: { name: string, twitterHandle: string, avatar: string },
  content: string
}

const generateReview = async (): Promise<Review> => {
  const [name, twitterHandle, avatar, content] = await Promise.all([
    generateUserName(),
    generateTwitterHandle(),
    generateAvatar(),
    generateContent()
  ])

  return {
    user: { name, twitterHandle, avatar },
    content
  }
}

type UseOpinionOptions = {
  config?: QueryConfig<Review>
}

export const useReview = ({ config }: UseOpinionOptions = {}) => {
  return useQuery<Review>({
    ...config,
    queryKey: ['opinion'],
    queryFn: () => generateReview()
  })
}
