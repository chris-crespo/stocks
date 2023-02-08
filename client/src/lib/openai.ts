import { Configuration, OpenAIApi} from 'openai'
import { openaiApiKey } from '~/config'

const configuration = new Configuration({
  apiKey: openaiApiKey
})

const openai = new OpenAIApi(configuration)

export default openai
