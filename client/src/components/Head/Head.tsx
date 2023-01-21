import { Helmet } from "react-helmet-async";

type Props = {
  title?: string;
  description?: string;
}

const Head: React.FC<Props> = ({ title = '', description = '' } = {}) => (
  <Helmet
    title={title && `${title} | Stock Seer`}
    defaultTitle='Stock Seer'
  >
    <meta name="description" content={description} />
  </Helmet>
)

export default Head
